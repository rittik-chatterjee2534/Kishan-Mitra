const menuToggle = document.querySelector(".menu-toggle");
const navbarMenu = document.getElementById("navbar-menu");

const navbarLinks = document.querySelectorAll(".navbar-links a");

function setMobileMenu(open) {
  navbarMenu.classList.toggle("open", open);

  menuToggle.setAttribute("aria-expanded", String(open));

  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu",
  );

  menuToggle.innerHTML = open
    ? '<i data-lucide="x" aria-hidden="true"></i>'
    : '<i data-lucide="menu" aria-hidden="true"></i>';

  document.body.classList.toggle("menu-open", open);

  lucide.createIcons();
}

// Open or close mobile menu

menuToggle.addEventListener("click", () => {
  const isOpen = navbarMenu.classList.contains("open");
  setMobileMenu(!isOpen);
});

// Close mobile menu after selecting a link

navbarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMobileMenu(false);

    navbarLinks.forEach((navigationLink) => {
      navigationLink.classList.remove("active");
      navigationLink.removeAttribute("aria-current");
    });

    link.classList.add("active");
    link.setAttribute("aria-current", "location");
  });
});

// Close menu when clicking outside

document.addEventListener("click", (event) => {
  const clickedOutsideMenu =
    !navbarMenu.contains(event.target) &&
    !menuToggle.contains(event.target);

  if (clickedOutsideMenu) {
    setMobileMenu(false);
  }
});

// Close menu using Escape key

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMobileMenu(false);
  }
});

// Reset mobile menu on desktop

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    setMobileMenu(false);
  }
});

// Get sections connected to navbar links

const navigationSections = Array.from(navbarLinks)
  .map((link) => {
    const sectionSelector = link.getAttribute("href");

    if (!sectionSelector || sectionSelector === "#") {
      return null;
    }

    return document.querySelector(sectionSelector);
  })
  .filter(Boolean);

// Update active navbar link while scrolling

function updateActiveNavbarLink() {
  const headerHeight =
    document.querySelector(".site-header")?.offsetHeight || 0;

  const scrollMarker =
    window.scrollY + headerHeight + window.innerHeight * 0.25;

  let activeSectionId = navigationSections[0]?.id;

  navigationSections.forEach((section) => {
    if (scrollMarker >= section.offsetTop) {
      activeSectionId = section.id;
    }
  });

  const reachedPageBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 10;

  if (reachedPageBottom && navigationSections.length > 0) {
    activeSectionId =
      navigationSections[navigationSections.length - 1].id;
  }

  navbarLinks.forEach((link) => {
    const linkSectionId = link.getAttribute("href")?.slice(1);
    const isActive = linkSectionId === activeSectionId;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveNavbarLink, {
  passive: true,
});

window.addEventListener("resize", updateActiveNavbarLink);

// Footer year

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Initial page state

updateActiveNavbarLink();
lucide.createIcons();