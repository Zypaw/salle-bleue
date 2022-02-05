const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");
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