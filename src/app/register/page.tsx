"use client";

import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const avatar = formData.get("avatar") as File;
        // console.log("Mật khẩu từ form: ", password);
        try {
            // Gửi dữ liệu lên API
            const res = await fetch(`/api/auth/register`, {
                method: "POST",
                body: formData, // gửi multipart/form-data
            });
            // console.log("Mật khẩu từ form: ", password);
            if (!res.ok) {
                const errText = await res.text(); // hoặc res.json() nếu backend trả JSON 
                throw new Error(errText || "Không đăng ký được!");
            }

            const data = await res.json();
            alert("Đăng ký thành công!");
            window.location.href = "/admin";
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="page-wrapper bg-gra-03 p-t-45 p-b-50">
            <div className="wrapper wrapper--w790">
                <div className="card card-5">
                    <div className="card-heading">
                        <h2 className="title">Đăng ký tài khoản</h2>
                    </div>
                    <div className="card-body">
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="name">Họ &amp; Tên</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input className="input--style-5" type="text" name="fullName" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Tên đăng nhập</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input className="input--style-5" type="text" name="username" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Email</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input className="input--style-5" type="email" name="email" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row m-b-55">
                                <div className="name">Phone</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input
                                            className="input--style-5"
                                            type="text"
                                            name="phone"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="name">Mật Khẩu</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input
                                            className="input--style-5"
                                            type="password"
                                            name="password"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="form-row">
                                <div className="name">Lập lại mật Khẩu</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input
                                            className="input--style-5"
                                            type="password"
                                            name="repassword"
                                        />
                                    </div>
                                </div>
                            </div> */}
                            <div className="form-row">
                                <div className="name">Địa chỉ</div>
                                <div className="value">
                                    <div className="input-group">
                                        <input className="input--style-5" type="text" name="address" />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="file"
                                name="avatar"
                                id="imageUpload"
                                className="fileUpload"
                                accept="image/*"
                            />
                            <div className="image-preview">
                                {/* <Image id="previewImage" src="/favicon.icon" fill                     // ảnh sẽ fill toàn bộ container
                                    style={{ objectFit: "cover" }} // cách ảnh co giãn (cover, contain, fill, none, scale-down)
                                    priority /> */}
                                <Image src="/favicon.ico" alt="favicon" fill style={{ objectFit: "cover" }} priority />

                                <span id="previewText">Chưa chọn ảnh</span>
                            </div>
                            {/* <button type="button">Upload Image</button> */}
                            {/* <div className="form-row p-t-20">
                                <label className="label label--block">
                                    Bạn chắc chắn đúng thông tin?
                                </label>
                                <div className="p-t-15">
                                    <label className="radio-container m-r-55">
                                        Không
                                        <input type="radio" defaultChecked name="exist" />
                                        <span className="checkmark" />
                                    </label>
                                    <label className="radio-container">
                                        Có
                                        <input type="radio" name="exist" />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                            </div> */}
                            <div>
                                <button type="submit" disabled={loading}>
                                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                                </button>
                                {error && <p className="error">{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}
