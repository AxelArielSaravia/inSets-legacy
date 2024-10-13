// src/theme.js
function switchTheme() {
  const currTheme = document.body.className;
  if (currTheme !== "dark") {
    theme = "dark";
    btn.title = "light theme";
    btn.firstElementChild.classList.remove("hidden");
    btn.lastElementChild.classList.add("hidden");
  } else {
    theme = "light";
    btn.title = "dark theme";
    btn.firstElementChild.classList.add("hidden");
    btn.lastElementChild.classList.remove("hidden");
  }
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}
var btn = document.getElementById("change-theme_button");
var theme = localStorage.getItem("theme") !== null ? localStorage.getItem("theme") : window.matchMedia !== undefined && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
document.body.className = theme;
if (theme === "dark") {
  btn.title = "light theme";
  btn.firstElementChild.classList.remove("hidden");
} else {
  btn.title = "dark theme";
  btn.lastElementChild.classList.remove("hidden");
}
btn.addEventListener("click", switchTheme);
