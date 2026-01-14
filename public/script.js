console.log("Script file loaded at all!");
document.addEventListener("DOMContentLoaded", () => {
  // === Dropdown (topbar + category) ===
  const dropdownBtns = document.querySelectorAll(
    ".dropdown .dropbtn, .category-dropdown .category-btn"
  );

  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = btn.closest(".dropdown, .category-dropdown");

      // Đóng tất cả dropdown khác
      document
        .querySelectorAll(".dropdown, .category-dropdown")
        .forEach((el) => el.classList.toggle("active", el === dropdown));
    });
  });

  // Click ngoài thì đóng hết
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown, .category-dropdown")
      .forEach((el) => el.classList.remove("active"));
  });

  // === Hero Slider ===
  const slides = document.querySelectorAll(".hero-slider .slides img");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".hero-slider .prev");
  const nextBtn = document.querySelector(".hero-slider .next");
  let currentSlide = 0;

  function showSlide(n) {
    if (slides.length === 0 || dots.length === 0) return;
    slides.forEach((slide, index) => {
      slide.classList.remove("active");
      dots[index]?.classList.remove("active");
    });
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide]?.classList.add("active");
  }

  if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
  if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  if (slides.length > 0) {
    showSlide(0); // khởi động
    setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  // === Carousel (categories + shops) ===
  function initCarousel(carousel) {
    const track = carousel.querySelector(".carousel-track");
    const items = track?.children.length || 0;
    const prev = carousel.querySelector(".carousel-prev");
    const next = carousel.querySelector(".carousel-next");
    let index = 0;

    function update() {
      if (!track || items === 0) return;
      const width = track.children[0].offsetWidth + 20; // + gap
      track.style.transform = `translateX(-${index * width}px)`;
    }

    if (next) {
      next.addEventListener("click", () => {
        index = index < items - 4 ? index + 1 : 0;
        update();
      });
    }

    if (prev) {
      prev.addEventListener("click", () => {
        index = index > 0 ? index - 1 : items - 4;
        update();
      });
    }

    window.addEventListener("resize", update);
    update();
  }

  document
    .querySelectorAll(".categories-carousel, .shops-carousel")
    .forEach(initCarousel);
  console.log("Custom script loaded!");
});
