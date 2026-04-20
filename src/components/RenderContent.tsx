"use client";

import parse, { DOMNode, Element } from "html-react-parser";
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
// ✅ Hàm kiểm tra <p> có chứa iframe bên trong không
function hasIframeChild(node: Element): boolean {
    return (node.children as DOMNode[] | undefined)?.some(
        (child) => child instanceof Element && child.name === "iframe"
    ) ?? false;
}

export default function RenderContent({ content }: { content: string }) {
    return (
        <div className="image-wrapper-l">
            {parse(content, {
                replace: (domNode: DOMNode) => {
                    const node = domNode as Element;

                    // ✅ Fix hydration: nếu <p> chứa <iframe>, đổi thành <div>
                    if (node.name === "p" && hasIframeChild(node)) {
                        return (
                            <div className="my-2">
                                {/* parse tiếp children để iframe được xử lý bên dưới */}
                                {parse(
                                    node.children
                                        ?.map((c: any) => {
                                            if (c.type === "tag") {
                                                // reconstruct tag thô để parse lại
                                                const attribs = Object.entries(c.attribs || {})
                                                    .map(([k, v]) => `${k}="${v}"`)
                                                    .join(" ");
                                                return `<${c.name} ${attribs}></${c.name}>`;
                                            }
                                            return c.data || "";
                                        })
                                        .join("") ?? "",
                                    {
                                        replace: (innerNode: DOMNode) => {
                                            const inner = innerNode as Element;
                                            if (inner.name === "iframe") {
                                                const src = inner.attribs?.src;
                                                if (!src) return null;
                                                return (
                                                    <div className="my-4 aspect-video">
                                                        <iframe
                                                            src={src}
                                                            width={800}
                                                            height={600}
                                                            style={{ width: "100%", height: "auto" }}
                                                            className="w-full h-full rounded-lg"
                                                            allowFullScreen
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            referrerPolicy="strict-origin-when-cross-origin"
                                                            title="video"
                                                        />
                                                    </div>
                                                );
                                            }
                                        },
                                    }
                                )}
                            </div>
                        );
                    }
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
                    {/*if (node.name === "iframe") {
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
                    }*/}
                    if (node.name === "iframe") {
                        const src = node.attribs?.src;
                        if (!src) return null;
                        return (
                            <div className="my-4 aspect-video">
                                <iframe
                                    src={src}
                                    className="w-full h-full rounded-lg"
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    title="video"
                                />
                            </div>
                        );
                    }
                },
            })}
        </div>
    );
}