"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(
    () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
    { ssr: false }
);

// Tự định nghĩa type cho upload handler (tương thích TinyMCE 6)
type TinyMCEUploadHandler = (blobInfo: {
    blob: () => Blob;
    filename: () => string;
}) => Promise<string>;

const uploadHandler: TinyMCEUploadHandler = async (blobInfo) => {
    try {
        const formData = new FormData();
        formData.append("filesDesc", blobInfo.blob(), blobInfo.filename());

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/upload-description`,
            { method: "POST", body: formData }
        );

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Upload failed: no file returned");
        }

        return data[0].location;
    } catch (err: any) {
        throw new Error("Upload failed: " + err.message);
    }
};

interface TinyEditorProps {
    value: string;
    onChange: (content: string) => void;
    /** Chiều cao editor tính bằng px. Mặc định: 400 */
    height?: number;
    /** Bật upload ảnh lên server (dùng uploadHandler). Mặc định: false */
    enableUpload?: boolean;
    /** Bật chọn ảnh từ máy local dạng Base64. Mặc định: false */
    enableLocalImage?: boolean;
}

export default function TinyEditor({
    value,
    onChange,
    height = 400,
    enableUpload = false,
    enableLocalImage = false,
}: TinyEditorProps) {
    const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
    const tinymceCDN = `https://cdn.tiny.cloud/1/${apiKey}/tinymce/6/tinymce.min.js`;

    return (
        <Editor
            apiKey={apiKey}
            value={value}
            tinymceScriptSrc={tinymceCDN}
            init={{
                height,
                menubar: true,
                base_url: `https://cdn.tiny.cloud/1/${apiKey}/tinymce/6`,
                plugins:
                    "advlist autolink lists link image media charmap preview anchor " +
                    "searchreplace visualblocks code fullscreen " +
                    "insertdatetime table help wordcount emoticons",
                toolbar:
                    "undo redo | formatselect | bold italic underline forecolor backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | link image media | " +
                    "table charmap emoticons | removeformat | preview fullscreen help",
                media_live_embeds: true,
                media_filter_html: false, // cho phép giữ nguyên iframe
                sandbox_iframes: false,           // ← THÊM: không sandbox iframe
                convert_unsafe_embeds: false,     // ← THÊM: không convert iframe thành embed
                extended_valid_elements: "iframe[src|frameborder|allowfullscreen|allow|referrerpolicy|width|height]",
                content_style: "iframe {width:100%; height:400px;}",
                // --- Upload ảnh lên server ---
                ...(enableUpload && {
                    automatic_uploads: true,
                    images_upload_handler: uploadHandler,
                }),

                // --- Chọn ảnh local (Base64) ---
                ...(enableLocalImage && {
                    file_picker_types: "image",
                    file_picker_callback: (
                        callback: (url: string, meta?: Record<string, any>) => void,
                        _value: string,
                        _meta: Record<string, any>
                    ) => {
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.onchange = (event: Event) => {
                            const target = event.target as HTMLInputElement;
                            const file = target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = () => {
                                callback(reader.result as string, { alt: file.name });
                            };
                            reader.readAsDataURL(file);
                        };
                        input.click();
                    },
                }),
            }}
            onEditorChange={onChange}
        />
    );
}
