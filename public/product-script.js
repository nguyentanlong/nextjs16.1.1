document.addEventListener("DOMContentLoaded", () => {
    // ===== THUMBNAIL ĐỔI ẢNH CHÍNH =====
    const mainImg = document.getElementById("main-img");
    const thumbs = document.querySelectorAll(".thumb");

    if (mainImg && thumbs.length > 0) {
        thumbs.forEach((thumb) => {
            thumb.addEventListener("click", function () {
                thumbs.forEach((t) => t.classList.remove("active"));
                this.classList.add("active");
                if (this.dataset.img) {
                    mainImg.src = this.dataset.img;
                }
            });
        });
    }

    // ===== TAB CHUYỂN NỘI DUNG =====
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach((btn) => {
            btn.addEventListener("click", function () {
                tabBtns.forEach((b) => b.classList.remove("active"));
                tabPanes.forEach((p) => p.classList.remove("active"));

                btn.classList.add("active");
                const tabId = btn.getAttribute("data-tab");
                const targetPane = document.getElementById(tabId);
                if (targetPane) {
                    targetPane.classList.add("active");
                }
            });
        });
    }

    // ===== RELATED CAROUSEL =====
    function initCarousel(carousel) {
        const track = carousel.querySelector(".carousel-track");
        const prev = carousel.querySelector(".carousel-prev");
        const next = carousel.querySelector(".carousel-next");

        if (!track || !prev || !next || track.children.length === 0) return;

        const items = track.children.length;
        let index = 0;

        function update() {
            const width = track.children[0].offsetWidth + 20;
            track.style.transform = `translateX(-${index * width}px)`;
        }

        next.addEventListener("click", () => {
            index = index < items - 5 ? index + 1 : 0;
            update();
        });

        prev.addEventListener("click", () => {
            index = index > 0 ? index - 1 : items - 5;
            update();
        });

        window.addEventListener("resize", update);
        update();
    }

    document.querySelectorAll(".related-carousel").forEach(initCarousel);
});
