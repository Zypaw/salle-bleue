const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

// Scroll to top :

home = document.querySelector(".home");

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = home.scrollTop;
    let calcHeight =
      home.scrollHeight -
      home.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      home.scrollTop = 0;
    });
    if (body.classList.contains("dark")) {
        scrollProgress.style.background = `conic-gradient(#c4c4c4 ${scrollValue}%, #242526 ${scrollValue}%)`;
    } else {
        scrollProgress.style.background = `conic-gradient(#2395e0 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
    }
  };

  home.onscroll = calcScrollValue;
  home.onload = calcScrollValue;
    
page = sessionStorage.page
if (page != ".index" && page) {
    switch_page(page)
}
sidebar_token = sessionStorage.sidebar
if (sidebar_token == "open") {
    toggle_sidebar();
}
theme_token = sessionStorage.theme
if (theme_token == "night") {
    switch_theme();
}
function disconnect() {
    sessionStorage.setItem("token", null);
    window.location.assign("../Login/index.html");
}
function auth_check() {
    auth_token = sessionStorage.token
    if (auth_token != "connected") {
        disconnect();
    }
}

toggle.addEventListener("click", () => {
    toggle_sidebar()
})
function toggle_sidebar() {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        sessionStorage.setItem("sidebar", "close")
        console.log("True")
    } else {
        sessionStorage.setItem("sidebar", "open")
    }
}
searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
    switch_theme();
});
function switch_theme() {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        sessionStorage.setItem("theme", "night")
        modeText.innerText = "Jour";
    } else {
        sessionStorage.setItem("theme", "day")
        modeText.innerText = "Nuit";
    }
    calcScrollValue();
}
function disconnect() {
    sessionStorage.removeItem("token");
    window.location.assign("../Login/index.html");
}
function auth_check() {
    auth_token = sessionStorage.token
    if (auth_token != "connected") {
        disconnect();
    }
}
setInterval(auth_check, 200);

function switch_page(page) {
    actual_link = body.querySelector(".choosen")
    actual_link.classList.toggle("choosen");
    actual_page = body.querySelector(".home .choosen")
    actual_page.style.display = "none"
    actual_page.classList.toggle("choosen");
    new_link = body.querySelector(page)
    new_link.classList.toggle("choosen");
    new_page = body.querySelector(".home " + page)
    new_page.style.display = "block"
    new_page.classList.toggle("choosen");
    sessionStorage.setItem("page", page)
}

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
    switch_page(".eleves")
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible =
            user.name.toLowerCase().includes(value) ||
            user.nat.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch("http://192.168.1.78:3000/eleves")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const image = card.querySelector("[data-image]")
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")
            image.src = user.picture_url
            header.textContent = user.grade
            body.textContent = (`${user.first_name} ${user.last_name}`)
            userCardContainer.append(card)
            return { name: (`${user.first_name} ${user.last_name}`), grade: user.grade, element: card }
        })
    })