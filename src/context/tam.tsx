/*const fetchMe = async () => {
            // if (!user) return;
            // try {

            const res = await fetch(`/api/auth/me`,
                { credentials: "include", });// bắt buộc để gửi cookie
            if (res.ok) {
                const data = await res.json();
                console.log("👉 AuthContext data User restored:", data.user);
                console.log("👉 AuthContext data.data User restored:", data.data.user);
                setUser(data.user);
            }
            else { console.log("❌ Không khôi phục được user:", res.status); }
            /*} catch (err) { console.error("❌ Error restoring user:", err); }*/
// };*/