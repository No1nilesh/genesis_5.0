const observer = new IntersectionObserver((enteries) => {
  enteries.forEach((entry) => {
    if ( entry.isIntersecting && entry.target.classList.contains("notvissible")) {
      entry.target.classList.add("show")};
     
    if (entry.isIntersecting && entry.target.classList.contains("cardGlow")) {
        setTimeout(() => {entry.target.classList.add("scroll")}, 600);
      } else { entry.target.classList.remove("scroll")};
    
    if(entry.isIntersecting && entry.target.classList.contains("typo")){
      entry.target.classList.add("typewriter");
    }else{entry.target.classList.remove("typewriter")}
    
  });
});

const hiddenElements = document.querySelectorAll(".notvissible");
hiddenElements.forEach((el) => observer.observe(el));


const cardGlow = document.querySelectorAll(".cardGlow");
cardGlow.forEach((cd) => {
  observer.observe(cd);
});

const typewriter = document.querySelectorAll(".typo");
typewriter.forEach((ty)=>{
  observer.observe(ty);
})
