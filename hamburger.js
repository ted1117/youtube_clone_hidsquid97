function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const containerList = document.querySelector(".container-list");
    sidebar.classList.toggle("active");
    containerList.classList.toggle("container_big")