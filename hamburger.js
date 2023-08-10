const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const section = document.querySelector("section");    // index.html에서 sidebar를 제외한 영역
const main = document.querySelector("main");          // channel.html에서 sidebar를 제외한 영역
const topMenu = document.querySelector(".top-menu");
const miniSidebar = document.querySelector(".miniSidebar");
let open = true;    // 메뉴 확장 플래그

hamburger.onclick = function toggleSidebar() {
    // sidebar.classList.toggle("active");

    if (!open) {
        if (section) {
            // index.html에서
            section.style.left = "240px";                  // section의 위치를 왼쪽에서 sidebar의 너비만큼 띄우기
            section.style.width = "calc(100% - 240px)";    // section의 너비를 전체에서 sidebar를 제외한 만큼으로 설정

            topMenu.style.width = "calc(100% - 240px)";
        }

        if (main) {
            // channel.html에서
            main.style.left = "240px";
            main.style.width = "calc(100% - 240px)";
        }
        sidebar.style.display = "block";
        miniSidebar.style.visibility = "hidden";
        open = true;
    } else {
        if (section) {
            section.style.left = "72px";
            section.style.width = "calc(100% - 72px)";

            topMenu.style.width = "calc(100% - 72px)";
        }

        if (main) {
            main.style.left = "72px";
            main.style.width = "calc(100% - 72px)";
        }
        sidebar.style.display = "none";
        miniSidebar.style.visibility = "visible";
        open = false;
    }
}