const hamburgerEl = document.querySelector("#hamburger");
const sidebarEl = document.querySelector("#sidebar");

window.onclick = function(e){
    console.log(e.target.id)
    if(e.target.id !== 'sidebar' && e.target.id !== 'hamburger'  ){
            sidebarEl.classList.remove("open")
            hamburgerEl.classList.remove("open")
    
    }
}

hamburgerEl.onclick =function(){

    sidebarEl.classList.toggle("open")
  hamburgerEl.classList.toggle("open")
 
}



