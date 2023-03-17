const countDownDate = new Date("Mar 28 2023, 00:00:00").getTime();
const x = setInterval(function(){
  const now =new Date();
  const distance = countDownDate - now.getTime();

  const days = Math.floor(distance/(1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 *60)) / (1000 * 60)); 
  const seconds = Math.floor((distance % (1000 * 60)) / (1000));

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  
  if(now >= countDownDate ){
    document.getElementById("days").innerHTML = "GENESIS";
    document.getElementById("hours").innerHTML = "IS";
    document.getElementById("minutes").innerHTML = "LIVE";
    document.getElementById("seconds").innerHTML = "NOW";
  }
}, 1000);