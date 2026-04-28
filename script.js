const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const whatsappBtn = document.getElementById("whatsappBtn");
const contactForm = document.getElementById("contactForm");
const toggleCoveragesBtn = document.getElementById("toggleCoveragesBtn");
const extraCards = document.querySelectorAll(".extra-card");
const header = document.querySelector(".header");
const whatsappHint = document.getElementById("whatsappHint");
const whatsappNumber = "5493875097617";

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

whatsappBtn.addEventListener("click", () => {
  const mensaje = "Hola, quiero hablar con un asesor para encontrar el seguro adecuado.";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const nombre = formData.get("nombre")?.toString().trim() || "";
  const tipoCliente = formData.get("tipoCliente")?.toString().trim() || "";
  const seguro = formData.get("seguro")?.toString().trim() || "";
  const mensajeLibre = formData.get("mensaje")?.toString().trim() || "";

  const mensaje = [
    "Hola, quiero asesoramiento para cotizar un seguro.",
    `Nombre: ${nombre}`,
    `Tipo de cliente: ${tipoCliente}`,
    `Tipo de seguro: ${seguro}`,
    `Consulta: ${mensajeLibre || "Sin detalle adicional."}`
  ].join("\n");

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
});

toggleCoveragesBtn.addEventListener("click", () => {
  const isExpanded = toggleCoveragesBtn.getAttribute("aria-expanded") === "true";

  extraCards.forEach((card) => {
    card.classList.toggle("is-visible", !isExpanded);
  });

  toggleCoveragesBtn.setAttribute("aria-expanded", String(!isExpanded));
  toggleCoveragesBtn.textContent = isExpanded ? "Ver más coberturas" : "Ver menos coberturas";
});

const updateHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

const formatStatValue = (value, prefix, suffix) => {
  const formatted = value >= 1000 ? value.toLocaleString("es-AR") : String(value);
  return `${prefix}${formatted}${suffix}`;
};

const animateStat = (element) => {
  if (element.dataset.animated === "true") {
    return;
  }

  element.dataset.animated = "true";

  const target = Number(element.dataset.target || "0");
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);

    element.textContent = formatStatValue(current, prefix, suffix);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = formatStatValue(target, prefix, suffix);
    }
  };

  requestAnimationFrame(tick);
};

const animatedElements = document.querySelectorAll(
  ".stat-card, .card, .about-content, .about-visual-card, .why-card, .faq-item, .company-list span, .process-card, .contact-form, .claims-content"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

       if (entry.target.classList.contains("stat-card")) {
        const statNumber = entry.target.querySelector(".stat-number");

        if (statNumber) {
          animateStat(statNumber);
        }
      }
    }
  });
}, {
  threshold: 0.15
});

animatedElements.forEach((element) => {
  element.classList.add("hidden");
  observer.observe(element);
});

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

window.setTimeout(() => {
  whatsappHint.classList.add("is-visible");
}, 8000);
