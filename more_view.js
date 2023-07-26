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
        if (isExpanded) {
            for (var i = 6; i < items.length; i++) {
                if (i < 9) {
                    items[i].style.display = "none"; // 또는 "block"으로 설정해도 됩니다.
                    isExpanded = false
                } else {
                    break; // 추가적인 항목이 없으면 더 이상 숨길 필요가 없으므로 반복문을 종료합니다.
                }
            }
        }
        else {
            for (var i = 6; i < items.length; i++) {
                if (i < 9) {
                    items[i].style.display = "flex"; // 또는 "block"으로 설정해도 됩니다.
                    isExpanded = true
                } else {
                    break; // 추가적인 항목이 없으면 더 이상 숨길 필요가 없으므로 반복문을 종료합니다.
                }
            }
        }
    });
});
//ㅇㅇ ㅇㅇㅁㅇㄴㅇㅁㄴㅇㅁㄴ