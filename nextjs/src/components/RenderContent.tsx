// src/components/RenderContent.tsx
"use client";

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";

// ─── helpers ────────────────────────────────────────────────
function normalizeSrc(src?: string) {
    if (!src) return null;
    if (src.startsWith("http")) return src;
    if (src.startsWith("//")) return `https:${src}`;
    if (src.startsWith("/")) return src;
    return `/${src}`;
}

function isValidUrl(src: string) {
    try {
        new URL(src, "http://dummy.com");
        return true;
    } catch {
        return false;
    }
}

// ─── tách img và iframe ra khỏi HTML, thay bằng placeholder ─
type Placeholder =
    | { type: "img"; src: string; alt: string; width: number; height: number }
    | { type: "iframe"; src: string };

function extractEmbeds(html: string): {
    processedHTML: string;
    embeds: Placeholder[];
} {
    const embeds: Placeholder[] = [];
    let index = 0;

    // 1. Tách <iframe>
    let processed = html.replace(
        /<iframe[^>]*src=["']([^"']+)["'][^>]*>(?:<\/iframe>)?/gi,
        (_, src) => {
            const key = `__EMBED_PLACEHOLDER_${index}__`;
            embeds.push({ type: "iframe", src });
            index++;
            return key;
        }
    );

    // 2. Tách <img>
    processed = processed.replace(
        /<img([^>]*)>/gi,
        (_, attrs) => {
            // lấy src
            const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
            const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
            const wMatch = attrs.match(/width=["']?(\d+)["']?/i);
            const hMatch = attrs.match(/height=["']?(\d+)["']?/i);

            const rawSrc = srcMatch?.[1];
            const src = normalizeSrc(rawSrc);
            if (!src || !isValidUrl(src)) return ""; // ảnh không hợp lệ → xóa

            const key = `__EMBED_PLACEHOLDER_${index}__`;
            embeds.push({
                type: "img",
                src,
                alt: altMatch?.[1] || "image",
                width: parseInt(wMatch?.[1] || "800"),
                height: parseInt(hMatch?.[1] || "600"),
            });
            index++;
            return key;
        }
    );

    return { processedHTML: processed, embeds };
}

// ─── component ──────────────────────────────────────────────
export default function RenderContent({ content }: { content: string }) {
    const [embeds, setEmbeds] = useState<Placeholder[]>([]);
    const [processedHTML, setProcessedHTML] = useState("");

    useEffect(() => {
        const { processedHTML, embeds } = extractEmbeds(content);
        setProcessedHTML(processedHTML);
        setEmbeds(embeds);
    }, [content]);

    const htmlToParse = processedHTML || content;

    return (
        <div className="image-wrapper-l">
            {parse(htmlToParse, {
                replace: (node: any) => {

                    // ===== VIDEO — giữ nguyên logic của bạn =====
                    if (node.name === "video") {
                        const src = normalizeSrc(node.attribs?.src);
                        if (!src) return null;
                        return (
                            <video controls className="w-full rounded-lg my-4">
                                <source src={src} />
                                Trình duyệt không hỗ trợ video
                            </video>
                        );
                    }

                    // ===== PLACEHOLDER (img + iframe) =====
                    if (
                        node.type === "text" &&
                        node.data?.startsWith("__EMBED_PLACEHOLDER_")
                    ) {
                        const match = node.data.match(/__EMBED_PLACEHOLDER_(\d+)__/);
                        if (!match) return null;
                        const idx = parseInt(match[1]);
                        const embed = embeds[idx];
                        if (!embed) return null; // server render → trả null, không hydration error

                        // --- IMG ---
                        if (embed.type === "img") {
                            return (
                                <Image
                                    src={embed.src}
                                    alt={embed.alt}
                                    width={embed.width}
                                    height={embed.height}
                                    style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0.5rem auto" }}
                                    className="product-image"
                                />
                            );
                        }

                        // --- IFRAME ---
                        if (embed.type === "iframe") {
                            return (
                                <iframe
                                    src={embed.src}
                                    className="youtube-embed"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    title="video"
                                />
                            );
                        }
                    }
                },
            })}
        </div>
    );
}