import Image from "next/image";

export function renderContent(html: string) {
    const regex = /<img([^>]*)>/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(html)) !== null) {
        // Nội dung trước <img>
        if (match.index > lastIndex) {
            parts.push(
                <span
                    key={key++}
                    dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, match.index) }}
                />
            );
        }

        // Parse thuộc tính
        const attrs = match[1];
        const srcMatch = attrs.match(/src="([^"]+)"/);
        const altMatch = attrs.match(/alt="([^"]*)"/);
        const widthMatch = attrs.match(/width="([^"]+)"/);
        const heightMatch = attrs.match(/height="([^"]+)"/);

        parts.push(
            <Image
                key={key++}
                src={srcMatch ? srcMatch[1] : ""}
                alt={altMatch ? altMatch[1] : ""}
                width={widthMatch ? parseInt(widthMatch[1], 10) : 500}
                height={heightMatch ? parseInt(heightMatch[1], 10) : 300}
            />
        );

        lastIndex = regex.lastIndex;
    }

    // Nội dung sau <img>
    if (lastIndex < html.length) {
        parts.push(
            <span
                key={key++}
                dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }}
            />
        );
    }

    return <div>{parts}</div>;
}
