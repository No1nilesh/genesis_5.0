

function toggleDisplay(className, displayState){
    var elements = document.getElementsByClassName(className)
    // console.log(className)
    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = displayState;
    }
  }


  function toggle(){
    document.onclick = function(e) {
      // console.log(e.target.tagName)
      if (e.target.tagName == 'BUTTON') {
        // console.log(e.target.tagName)
        var href = e.target.getAttribute("href");
        console.log(href)
        toggleDisplay('fold-section', 'none');
        document.getElementById(href).style.display = 'block';
      }
   
    }
  }

  const heading =  document.querySelectorAll('.heading');

for (let i=0; i < heading.length; i++){
    heading[i].addEventListener("click", function(){
        let current = document.getElementsByClassName("active");
        // console.log(current)
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    })
}  
