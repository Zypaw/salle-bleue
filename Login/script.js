let fullname = document.getElementById("username");
let address = document.getElementById("password");
let contactForm = document.getElementById("form");

contactForm.addEventListener("submit", function (e) {
  let messageName = [];
  let messageAddress = [];
  if (
    (fullname.value == "admin" && address.value == "9874")
  ) {
    sessionStorage.setItem("token", "connected")
    e.preventDefault();
    window.location.assign("../Dashboard/index.html");
  }
  else if (fullname.value && address.value) {
    alert("Mauvaises information")
    e.preventDefault();
    window.location.assign("../Login/index.html");
  }
});