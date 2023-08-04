const hamburger = document.querySelector(".hamburger");
const hamburger1 = document.getElementById("hamburger1");
const hamburger2 = document.getElementById("hamburger2");
const sideMenu = document.getElementById("sideMenu");
let menuOpen = false;

// 헤더의 햄버거 아이콘을 클릭하면 메뉴 확장
hamburger1.addEventListener("click", () => {
    showMenu();
});

// 사이드바 내부 햄버거 아이콘 클릭 시 메뉴 축소
hamburger2.addEventListener("click", () => {
    hideMenu();
})

// 사이드바 외 영역을 클릭하면 메뉴가 닫히도록
document.addEventListener("click", (event) => {
    if (menuOpen && !sideMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hideMenu();
    }
});

// 메뉴 열림 함수
function showMenu() {
    sideMenu.style.left = "0";
    document.body.style.overflow = "hidden";
    sideMenu.classList.add("emphasized");
    menuOpen = true;
}

// 메뉴 닫힘 함수
function hideMenu() {
    sideMenu.style.left = "-100%";
    document.body.style.overflow = "visible";
    sideMenu.classList.remove("emphasized");
    menuOpen = false;
}