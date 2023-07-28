function createVideoItem(video_id) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();
  
    // API 요청 설정
    let apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`;
    xhr.open("GET", apiUrl, true);

    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let response = JSON.parse(xhr.responseText);

            // 데이터 있는지 확인
            if (response && response.video_id !== undefined) {
                // 데이터 확인
                // console.log(response.video_id);
                // console.log(response.image_link);
                // console.log(response.upload_date);
                // console.log(response.video_channel);
                // console.log(response.video_detail);
                // console.log(response.video_link);
                // console.log(response.video_tag);
                // console.log(response.video_title);
                // console.log(response.views);

                const containerList = document.getElementById("video-list");

                const itemDiv = document.createElement("div");
                itemDiv.classList.add("item");

                const thumbnailImg = document.createElement("img");
                thumbnailImg.setAttribute("src", response.image_link);
                thumbnailImg.classList.add("thumbnail");

                const itemInfoDiv = document.createElement("div");
                itemInfoDiv.classList.add("item-info");

                const videoInfoDiv = document.createElement("div");
                videoInfoDiv.classList.add("video-info");

                // 영상 제목
                const linkA = document.createElement("p");
                linkA.innerText = response.video_title;

                // 채널 이름
                const linkB = document.createElement("a");
                linkB.setAttribute("href", "#"); // 채널 url
                linkB.innerText = response.video_channel;

                //  조회수 + 업로드 일자
                const pTag = document.createElement("p");
                pTag.innerText = response.views + " Views. " + response.upload_date;

                videoInfoDiv.appendChild(linkA);
                videoInfoDiv.appendChild(linkB);
                videoInfoDiv.appendChild(pTag);
                itemInfoDiv.appendChild(videoInfoDiv);
                itemDiv.appendChild(thumbnailImg);
                itemDiv.appendChild(itemInfoDiv);
                containerList.appendChild(itemDiv);

                // 다음 video_id로 재귀 호출
                createVideoItem(video_id + 1);
            }
        }
    };

    // 요청 전송
    xhr.send();
}

// id = 0부터 아이템 불러오기
createVideoItem(0);