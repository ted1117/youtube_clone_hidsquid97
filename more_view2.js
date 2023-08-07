document.addEventListener("DOMContentLoaded", function () {
    var wrap = document.querySelector("#wrap2");
    var moreButton = document.getElementById("moreButton2");
    var collButton = document.getElementById("collButton2");
    
    // 마지막 더보기 child 제외한 자식노드들의 개수
    var plIconCount = moreButton.childNodes.length -1;
    var isExpanded = false

    moreButton.querySelector('p').textContent = `Show ${plIconCount} more`;

    // 초기에는 첫 2개의 항목만 보이도록 설정합니다.
    var items = wrap.getElementsByTagName("a");
    for (var i = 0; i < items.length; i++) {
        if (i >= 4) {
            items[i].style.display = "none";
        }
    }

    // 더보기 버튼 클릭 시 다음 3개의 항목을 보여줍니다.
    moreButton.addEventListener("click", function () {
        event.preventDefault();
        if (!isExpanded) {
            collButton.style.display = "flex";
            moreButton.style.display = "none";
            for (var i = 4; i < items.length; i++) {
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
            for (var i = 4; i < items.length; i++) {
                items[i].style.display = "none";
                isExpanded = false
            }
        }
    })
});
