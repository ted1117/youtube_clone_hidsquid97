var sidebar = document.getElementsByClassName("Sidebar");
var subscriptions = document.getElementsByClassName("subscriptions");
var more = document.getElementsByClassName("more-from");
var bottom = document.getElementsByClassName("bottom");
var footer = document.getElementsByClassName("footer");
var collapsed = document.getElementById("collapsed");

function menuOpen() {
    sidebar.style.width = "240px";
    sidebar.style.overflowY = "scroll";
    sidebar.style.removeProperty("position");

    subscriptions.style.display = "flex";


    for (var i = 0; i < collapsed.length; i++) {
        collapsed[i].style.display = "flex";
        collapsed[i].style.width = "200px";
        collapsed[i].style.height = "30px";
    }
}
function menuClose() {
    sidebar.style.width = "70px";
    // sidebar.style.overflowY = "hidden";
    // sidebar.style.overflowX = "hidden";
    // sidebar.style.position = "fixed";

    subscriptions.style.display = "none";
    bottom.style.display = "none";
    footer.style.display = "none";

    for (var i = 0; i < collapsed.length; i++) {
        collapsed[i].style.display = "block";
        collapsed[i].style.width = "50px";
        collapsed[i].style.height = "55px";
    }
}

function menuFunction() {
    if (sidebar.style.width == "240px") {
        menuClose();
    } else {
        menuOpen();
    }
}