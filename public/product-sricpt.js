
// detail product
// ===== THUMBNAIL ĐỔI ẢNH CHÍNH =====
const mainImg = document.getElementById('main-img');
document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', function () {
        // Xóa active cũ
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        // Thêm active mới
        this.classList.add('active');
        // Đổi ảnh chính
        mainImg.src = this.dataset.img;
    });
});

// ===== TAB CHUYỂN NỘI DUNG =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Xóa active tất cả
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        // Thêm active cho cái được click
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});
// Thumbnail đổi ảnh chính
// document.querySelectorAll('.thumb').forEach(thumb => {
//   thumb.addEventListener('click', () => {
//     document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
//     thumb.classList.add('active');
//     document.getElementById('main-img').src = thumb.dataset.img;
//   });
// });

// // Tab chuyển nội dung
// document.querySelectorAll('.tab-btn').forEach(btn => {
//   btn.addEventListener('click', () => {
//     document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
//     document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
//     btn.classList.add('active');
//     document.getElementById(btn.dataset.tab).classList.add('active');
//   });
// });


//relation product
// Reuse hàm carousel cũ (nếu chưa có thì thêm hàm này)
function initCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const items = track.children.length;
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    let index = 0;

    function update() {
        const width = track.children[0].offsetWidth + 20;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    next.addEventListener('click', () => {
        index = (index < items - 5) ? index + 1 : 0;
        update();
    });

    prev.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : items - 5;
        update();
    });

    window.addEventListener('resize', update);
    update();
}

// Khởi động carousel related
document.querySelectorAll('.related-carousel').forEach(initCarousel); 