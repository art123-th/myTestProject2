console.log("Football Hub Loaded");

const btn = document.getElementById("themeBtn");

btn.addEventListener("click",()=>{

document.body.classList.toggle("dark")

})

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("click",()=>{

alert("More news coming soon ⚽")

})

})