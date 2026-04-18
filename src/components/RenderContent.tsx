"use client";

import parse from "html-react-parser";
import Image from "next/image";

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

export default function RenderContent({ content }: { content: string }) {
    return (
        <div className="image-wrapper-l">
            {parse(content, {
                replace: (node: any) => {
                    // ===== IMG =====
                    if (node.name === "img") {
                        const rawSrc = node.attribs?.src;
                        const src = normalizeSrc(rawSrc);

                        if (!src || !isValidUrl(src)) {
                            console.log("❌ INVALID IMG:", rawSrc);
                            return null;
                        }

                        return (
                            <Image
                                src={src}
                                alt={node.attribs?.alt || "image"}
                                width={800}
                                height={600}
                                style={{ width: "100%", height: "auto" }}
                                className="product-image"
                            />
                        );
                    }

                    // ===== VIDEO =====
                    if (node.name === "video") {
                        const src = normalizeSrc(node.attribs?.src);

                        if (!src) return null;

                        return (
                            <video
                                controls
                                className="w-full rounded-lg my-4"
                            >
                                <source src={src} />
                                Trình duyệt không hỗ trợ video
                            </video>
                        );
                    }

                    // ===== IFRAME (YouTube) =====
                    if (node.name === "iframe") {
                        const src = node.attribs?.src;

                        if (!src) return null;

                        return (
                            <div className="my-4 aspect-video">
                                <iframe
                                    src={src}
                                    className="w-full h-full rounded-lg"
                                    allowFullScreen
                                />
                            </div>
                        );
                    }
                },
            })}
        </div>
    );
}