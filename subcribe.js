let clickCount = 1;
let isIconAdded = false;

function changeImg() {
    let con = document.querySelector(".buttoncon");
    let selectOptionsDiv = document.getElementById("options");

    // 첫 번째 버튼 클릭 시 아이콘과 "구독중" 텍스트 추가
    if (!isIconAdded) {
        let temp = document.createElement("div");
        temp.innerHTML = '<img src="thumbnail_img/Bell.svg" class="bellsvg">'
        con.prepend(temp);

        let temp2 = document.createElement("div");
        temp2.innerHTML = '<img src="images/arrowBottom.svg" class="bellsvg">'
        con.append(temp2);

        isIconAdded = true;
    }

    document.getElementById('sub').innerText = '구독중'

    // 두 번째 버튼 클릭 시 select 요소를 바로 열도록 함
    if (clickCount === 2) {
        options.style.display = "block";
    }

    if (clickCount === 1) {
        con.classList.add("clicked");
      }

    clickCount++;

    // 세 번째 버튼 클릭 시 추가적인 동작을 막음
    if (clickCount === 3) {
        let buttons = document.querySelectorAll(".buttoncon button");
        for (let button of buttons) {
            button.removeEventListener("click", changeImg);
        }
    }
}