document.addEventListener("DOMContentLoaded", function () {
    var wrap = document.querySelector("#wrap");
    var moreButton = document.getElementById("moreButton");
    var isExpanded = false

    // 초기에는 첫 2개의 항목만 보이도록 설정합니다.
    var items = wrap.getElementsByTagName("a");
    for (var i = 0; i < items.length; i++) {
        if (i >= 6) {
            items[i].style.display = "none";
        }
    }

    // 더보기 버튼 클릭 시 다음 3개의 항목을 보여줍니다.
    moreButton.addEventListener("click", function () {
        event.preventDefault();
        // 메뉴가 축소되어있을 때
        if (!isExpanded) {
            collButton.style.display = "flex";
            moreButton.style.display = "none";
            for (var i = 6; i < items.length; i++) {
                items[i].style.display = "flex";
                isExpanded = true
            }
        }
    });

    collButton.addEventListener("click", function () {
        event.preventDefault();
        if (isExpanded) {
            moreButton.style.display = "flex";
            collButton.style.display = "none";
            for (var i = 6; i < items.length; i++) {
                items[i].style.display = "none";
                isExpanded = false
            }
        }
    })
});
