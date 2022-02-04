const headerEL = document.querySelector(".header");
const btnOpenEL = document.querySelector(".btn--open");
const btnCloseEL = document.querySelector(".btn--close");

window.addEventListener('load', ()=>{
  alert('Website still in the works but you can check it out though!')
})

btnOpenEL.addEventListener("click", function () {
  headerEL.classList.add("nav-open");
});
btnCloseEL.addEventListener("click", function () {
  headerEL.classList.remove("nav-open");
});

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".date");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    headerEL.classList.remove("nav-open");
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }


  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
