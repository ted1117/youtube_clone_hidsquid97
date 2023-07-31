let clickCount = 0;
let isIconAdded = false;
function changeImg() {
    let con = document.querySelector(".buttoncon");
    let options = document.getElementById("options");
    let btn = document.getElementById("sub");
    let channelName = document.getElementById("channelName");
    const channelTitle = channelName.textContent;

    // SUBSCRIBE를 구독중으로 교체
    if (btn.textContent == "SUBSCRIBE") {
        // 구독 버튼 내부 문구 수정
        btn.innerText = "구독중";

        // 알림 아이콘 추가
        let notiIcon = document.createElement("img");
        notiIcon.setAttribute("src", "images/Video/Vector.svg");
        notiIcon.classList.add("bellsvg");
        notiIcon.setAttribute("id", "notiIcon");
        btn.prepend(notiIcon);

        // Expand 아이콘 추가
        let expandIcon = document.createElement("img");
        expandIcon.setAttribute("src", "images/arrowBottom.svg");
        expandIcon.classList.add("bellsvg");
        btn.append(expandIcon);

        // 클릭카운트 1 증가
        clickCount++;
        isIconAdded = true;
        return;
    }
    // 드롭다운 메뉴 펼치고 접기
    if (options.style.display == "none") {
        options.style.display = "block";
    }
    else {
        options.style.display = "none";
    }

}

function selectOption(option) {
    let btn = document.getElementById("sub");
    let notiIcon = btn.querySelector("img");
    switch (option) {
        case "all":
            notiIcon.setAttribute("src", "images/Subscribe/notifications_active.svg");
            break;
        case "custom":
            notiIcon.setAttribute("src", "images/Subscribe/notifications.svg");
            break;
        case "none":
            notiIcon.setAttribute("src", "images/Subscribe/notifications_off.svg");
            break;
        default:
            break;

    }
}


function showConfirmation() {
    if (confirm("구독을 취소하시겠습니까?")) {
        restoreState();
    }
}

function restoreState() {
    let options = document.getElementById("options");
    let btn = document.getElementById("sub");
    clickCount = 0;
    options.style.display = "none";
    btn.innerText = "SUBSCRIBE";
}