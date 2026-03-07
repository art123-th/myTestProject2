const newsContainer = document.getElementById("newsContainer")
const matchesContainer = document.getElementById("matchesContainer")

// NEWS API
fetch("https://newsapi.org/v2/everything?q=football&apiKey=demo")
.then(res => res.json())
.then(data => {

newsContainer.innerHTML=""

data.articles.slice(0,6).forEach(article=>{

newsContainer.innerHTML+=`

<div class="card">

<h3>${article.title}</h3>

<p>${article.description || ""}</p>

<a href="${article.url}" target="_blank">Read more</a>

</div>

`

})

})


// MATCH DATA (example)

const matches=[

{
home:"Arsenal",
away:"Chelsea",
logo1:"https://crests.football-data.org/57.png",
logo2:"https://crests.football-data.org/61.png"
},

{
home:"Liverpool",
away:"Manchester City",
logo1:"https://crests.football-data.org/64.png",
logo2:"https://crests.football-data.org/65.png"
}

]

matches.forEach(match=>{

matchesContainer.innerHTML+=`

<div class="card">

<div class="team">

<img src="${match.logo1}">
${match.home}

</div>

<p>vs</p>

<div class="team">

<img src="${match.logo2}">
${match.away}

</div>

</div>

`

})


// DARK MODE

const btn=document.getElementById("themeBtn")

btn.onclick=()=>{

document.body.classList.toggle("dark")

}