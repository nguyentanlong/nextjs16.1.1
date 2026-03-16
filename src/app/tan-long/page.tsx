import Image from "next/image";

// pages/index.js
export default function gioiThieu() {
  return (
    <>
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
          img{width: 100%}
      `}</style>

        <header>
          <h1>Nguyên Tấn Long</h1>
          <p>Sinh ngày 09/09/1989</p>
        </header>

        <section>
          <h2>Về Tôi</h2>
          <p>
            Tôi là <span className="highlight">Nguyên Tấn Long</span>, sinh ngày 09/09/1989.
            Với niềm đam mê học hỏi và khát vọng phát triển, tôi luôn hướng đến việc tạo ra giá trị
            bền vững cho cộng đồng và xã hội.
          </p>
          <Image src="/public/ANH-DD.webp" alt="Nguyen-Tan-Long" width={578} height={600} />

          <p>
            Trang web này được xây dựng nhằm chia sẻ hành trình, kinh nghiệm và những dự án mà tôi đã và đang thực hiện.
            Tôi tin rằng mỗi bước đi đều mang lại bài học quý giá, và tôi muốn lan tỏa tinh thần tích cực đó đến mọi người.
          </p>
          <p>
            Nếu bạn quan tâm, hãy kết nối để cùng nhau hợp tác và phát triển.
          </p>
          <h4>
            Kết nối ngay
          </h4>
        </section>

        <footer>
          <p>&copy; 2026 Nguyên Tấn Long - All Rights Reserved</p>
        </footer>
      </>
    </>
  );
}
