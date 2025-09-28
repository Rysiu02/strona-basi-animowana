document.addEventListener("DOMContentLoaded", () => {



  // ==============================

  // MENU

  // ==============================



  // ===== MENU =====

const menuBtn = document.querySelector("#menu-toggle");

const nav = document.querySelector("#nav");

if (menuBtn && nav) {

  menuBtn.addEventListener("click", () => nav.classList.toggle("active"));



  nav.querySelectorAll("a").forEach(link =>

    link.addEventListener("click", () => nav.classList.remove("active"))

  );

}



// ===== WHATSAPP =====

const whatsappLink = document.querySelector(".whatsapp a");

whatsappLink?.addEventListener("click", () => {

  const whatsappContainer = document.querySelector(".whatsapp");

  if (!whatsappContainer) return;



  // Reset klasy, żeby animacja zadziałała

  whatsappContainer.classList.remove("show-text");



  // Mała przerwa, żeby browser zauważył zmianę

  setTimeout(() => {

    whatsappContainer.classList.add("show-text");

  }, 10);



  // Usuń klasę po 1 sekundzie

  setTimeout(() => {

    whatsappContainer.classList.remove("show-text");

  }, 1000);

});





  // ==============================

  // FORMULARZ KONTAKTOWY

  // ==============================

  const form = document.querySelector(".contact-form");

  const formMsg = document.getElementById("formMessage");

  form?.addEventListener("submit", function(e) {

    e.preventDefault();

    fetch(this.action, {

      method: 'POST',

      body: new FormData(this),

      headers: { 'Accept': 'application/json' }

    })

    .then(response => {

      if(response.ok) {

        formMsg.textContent = "Twoja wiadomość dotarła do nas!";

        formMsg.style.color = "lightgreen";

        this.reset();

        setTimeout(() => formMsg.textContent = "", 5000);

      } else {

        formMsg.textContent = "Ups! Coś poszło nie tak.";

        formMsg.style.color = "red";

        setTimeout(() => formMsg.textContent = "", 5000);

      }

    })

    .catch(() => {

      formMsg.textContent = "Ups! Coś poszło nie tak.";

      formMsg.style.color = "red";

      setTimeout(() => formMsg.textContent = "", 5000);

    });

  });



  // ==============================

  // BACK TO TOP

  // ==============================

  const backToTopBtn = document.getElementById("backToTop");

  backToTopBtn?.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  window.addEventListener("scroll", () => {

    if(backToTopBtn) backToTopBtn.style.display = (window.scrollY > 1000) ? "flex" : "none";

  });

  if(backToTopBtn) backToTopBtn.style.display = "none";



  // ==============================

  // SLIDER / GALERIA

  // ==============================

  const slides = document.querySelectorAll(".slider-container > img");

  const prevBtn = document.querySelector(".slider-btn.prev");

  const nextBtn = document.querySelector(".slider-btn.next");



  const thumbnailsContainer = document.querySelector(".thumbnails");



  // Tworzenie miniaturek dynamicznie

  slides.forEach((slide, index) => {

    const thumb = document.createElement("img");

    thumb.src = slide.src;

    thumb.alt = slide.alt;

    if(index === 0) thumb.classList.add("active"); 

    thumbnailsContainer.appendChild(thumb);



    thumb.addEventListener("click", () => {

      showSlide(index);

    });

  });



  // Aktualizacja miniaturek

  function updateThumbnails() {

    const thumbs = thumbnailsContainer.querySelectorAll("img");

    thumbs.forEach((t, i) => t.classList.toggle("active", i === currentIndex));

  }



  // ==============================

  // LIGHTBOX

  // ==============================

  const lightbox = document.getElementById("lightbox");

  const lightboxImg = document.getElementById("lightboxImg");

  const closeBtn = document.getElementById("closeBtn");

  const lbPrev = document.getElementById("lightboxPrev");

  const lbNext = document.getElementById("lightboxNext");



  let currentIndex = 0;



  function showSlide(index) {

    slides.forEach((img, i) => img.classList.toggle("active", i === index));

    currentIndex = index;

    updateThumbnails();

  }



  prevBtn?.addEventListener("click", () => showSlide((currentIndex - 1 + slides.length) % slides.length));

  nextBtn?.addEventListener("click", () => showSlide((currentIndex + 1) % slides.length));



  slides.forEach((img, index) => {

    img.addEventListener("click", () => {

      currentIndex = index;

      lightboxImg.src = slides[currentIndex].src;

      lightbox.classList.add("active");

    });

  });



  closeBtn?.addEventListener("click", () => lightbox.classList.remove("active"));

  lightbox?.addEventListener("click", e => { if(e.target === lightbox) lightbox.classList.remove("active"); });



  lbPrev?.addEventListener("click", () => {

    currentIndex = (currentIndex - 1 + slides.length) % slides.length;

    lightboxImg.src = slides[currentIndex].src;

  });

  lbNext?.addEventListener("click", () => {

    currentIndex = (currentIndex + 1) % slides.length;

    lightboxImg.src = slides[currentIndex].src;

  });



  document.addEventListener("keydown", e => {

    if(!lightbox.classList.contains("active")) return;

    if(e.key === "Escape") lightbox.classList.remove("active");

    if(e.key === "ArrowLeft") lbPrev?.click();

    if(e.key === "ArrowRight") lbNext?.click();

  });



  // Start slidera

  showSlide(currentIndex);



  // ==============================

  // AUTOMATYCZNY ROK W FOOTERZE

  // ==============================

  const yearSpan = document.getElementById("currentYear");

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();



});


// ==============================
// COOKIES MODAL
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const cookieModal = document.getElementById("cookieModal");
  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("declineCookies");

  // Sprawdź czy cookies zostały zaakceptowane
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieModal.classList.add("active");
  }

  // Akceptacja
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieModal.classList.remove("active");
  });

  // Odrzucenie (też chowamy okienko, ale nie zapisujemy zgody)
  declineBtn.addEventListener("click", () => {
    cookieModal.classList.remove("active");
  });
});

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 70; 
      // -70 = wysokość menu (dopasuj do swojego)
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  });
});

function ustawVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Ustaw przy starcie i przy zmianie rozmiaru ekranu
window.addEventListener('resize', ustawVh);
ustawVh();
