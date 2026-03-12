// components/AppImage.tsx
import Image from "next/image";
interface AppImageProps {
    src?: string | null;   // có thể null
    alt: string;
    width: number;
    height: number;
    className?: string;
    // key?: string;
}

export default function AppImage({
    src,
    alt,
    width,
    height,
    className,
}: AppImageProps) {
    const fallbackSrc = "/favicon.ico"; // ảnh mặc định trong public
    const finalSrc = src && src.trim() !== "" ? src : fallbackSrc;

    return (
        <Image
            src={finalSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    );
}
