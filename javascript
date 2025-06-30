// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Progress bar animation
const progressBars = document.querySelectorAll(".progress-fill");
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const width = progressBar.style.width;
      progressBar.style.width = "0%";
      setTimeout(() => {
        progressBar.style.width = width;
      }, 200);
    }
  });
}, observerOptions);

progressBars.forEach((bar) => observer.observe(bar));

// Chart bar animation
const chartBars = document.querySelectorAll(".chart-bar");
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const height = bar.style.height;
      bar.style.height = "0%";
      setTimeout(() => {
        bar.style.height = height;
      }, 300);
    }
  });
}, observerOptions);

chartBars.forEach((bar) => chartObserver.observe(bar));

// Course card interactions
document.querySelectorAll(".course-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Button click effects
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Notification counter
let notificationCount = 3;
const notificationIcon = document.querySelector(".notification-icon");

notificationIcon.addEventListener("click", function () {
  alert(
    `Anda memiliki ${notificationCount} notifikasi baru:\n\n1. Webinar "Tren Teknologi Medis" akan dimulai dalam 2 jam\n2. Quiz "Prosedur Medis" tersedia untuk dikerjakan\n3. Sertifikat "Komunikasi Efektif" siap diunduh`
  );
});

// Profile dropdown simulation
const userAvatar = document.querySelector(".user-avatar");
userAvatar.addEventListener("click", function () {
  alert("Menu Profil:\n\n• Lihat Profil\n• Pengaturan\n• Bantuan\n• Keluar");
});

// Course completion simulation
document.querySelectorAll(".btn-course, .btn-completed").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const courseTitle =
      this.closest(".course-card").querySelector("h3").textContent;

    if (this.textContent === "Mulai Kursus") {
      alert(
        `Memulai kursus: ${courseTitle}\n\nAnda akan diarahkan ke halaman pembelajaran...`
      );
    } else if (this.textContent === "Lanjutkan") {
      alert(
        `Melanjutkan kursus: ${courseTitle}\n\nAnda akan diarahkan ke halaman pembelajaran...`
      );
    } else if (this.textContent === "Lihat Sertifikat") {
      alert(
        `Sertifikat untuk kursus: ${courseTitle}\n\nSertifikat akan diunduh...`
      );
    }
  });
});

// Statistics counter animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent =
        target + (element.textContent.includes("+") ? "+" : "");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(start) + (element.textContent.includes("+") ? "+" : "");
    }
  }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-card h3");
      counters.forEach((counter) => {
        const target = parseInt(counter.textContent);
        animateCounter(counter, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
});

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Welcome message
setTimeout(() => {
  console.log("🏥 Selamat datang di Cipta Learn Platform!");
  console.log("📚 Platform pembelajaran daring untuk PT Cipta Hospital INA");
  console.log("💻 Dikembangkan oleh PT Indonesia Infrastruktur");
}, 1000);
