const observer = new IntersectionObserver((enteries) => {
  enteries.forEach((entry) => {
    if (
      entry.isIntersecting && entry.target.classList.contains("notvissible")
    ) {
      entry.target.classList.add("show");
    } else {
     
      if (entry.isIntersecting && entry.target.classList.contains("cardGlow")) {
        setTimeout(() => {
          entry.target.classList.add("scroll");
        }, 600);
      } else {
        entry.target.classList.remove("scroll");
      }
    }
  });
});

const hiddenElements = document.querySelectorAll(".notvissible");
hiddenElements.forEach((el) => observer.observe(el));

const cardGlow = document.querySelectorAll(".cardGlow");
cardGlow.forEach((cd) => {
  observer.observe(cd);
});

