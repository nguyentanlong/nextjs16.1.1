export default function notFound() {
    return (
        <>
            <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f9f9f9;
          color: #333;
        }
        header {
          background: linear-gradient(90deg, #0066cc, #0099ff);
          color: white;
          text-align: center;
          padding: 40px 20px;
        }
        header h1 {
          margin: 0;
          font-size: 2.5em;
        }
        header p {
          margin: 10px 0 0;
          font-size: 1.2em;
        }
        section {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        section h2 {
          color: #0066cc;
          margin-bottom: 20px;
        }
        section p {
          line-height: 1.6;
          margin-bottom: 15px;
        }
        footer {
          text-align: center;
          padding: 20px;
          background: #0066cc;
          color: white;
          margin-top: 40px;
        }
        .highlight {
          font-weight: bold;
          color: #0099ff;
        }
        button {
          background: #0099ff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        button:hover {
          background: #0066cc;
        }
      `}</style>

            <header>
                <p>Trang này không tồn tại, hoặc bị xóa</p>
            </header>

            <section>
                <h2>Nguyễn Tan Long</h2>
                <p>
                    Xin lỗi về <span className="highlight">sự bất tiện này</span>, tôi sẽ khắc phục sớm nhất có thể.
                </p>
                <p>
                    Bạn hãy click trở về trang chủ để tiếp tục, hoặc liên hệ trực tiếp với ADMIN để phản ánh nhé
                </p>
                <p>
                    Biết ơn vì bạn đã quan tâm đến website!
                </p>
                <h4>
                    Kết nối ngay
                </h4>
            </section>

            <footer>
                <p>&copy; 2026 Nguyên Tấn Long - All Rights Reserved</p>
            </footer>
        </>
    );
}
