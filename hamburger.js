const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");

hamburger.onclick = function toggleSidebar() {
    sidebar.classList.toggle("active");
}