// XMLHttpRequest 객체 생성
let xhr = new XMLHttpRequest();

// API 요청 설정
let apiUrl = `http://oreumi.appspot.com/video/getVideoList`;
xhr.open("GET", apiUrl, true);

// 응답 처리 설정
xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        // 가져온 응답 처리
        let response = JSON.parse(xhr.responseText);

        for (i in response) {
        // 데이터 확인
        // console.log(response[].image_link);
        // console.log(response.upload_date);
        // console.log(response.video_channel);
        // console.log(response.video_detail);
        // console.log(response.video_link);
        // console.log(response.video_tag);
        // console.log(response[i].video_title);
        // console.log(response.views);


            function getImgs(i) {
                let Url = `https://storage.googleapis.com/oreumi.appspot.com/img_${i}.jpg`;
                return Url;
            }
            

            const containerList = document.getElementById("video-list");

            const item = document.createElement("div");
            item.classList.add("item");

            // <a href="video.html?id=123">Watch Video</a>
            const itemDiv = document.createElement("a");
            itemDiv.setAttribute("href", `video.html?id=${response[i].video_id}`);

            const thumbnailImg = document.createElement("img");
            thumbnailImg.setAttribute("src", getImgs(i));
            thumbnailImg.classList.add("thumbnail");

            const itemInfoDiv = document.createElement("div");
            itemInfoDiv.classList.add("item-info");

            const videoInfoDiv = document.createElement("div");
            videoInfoDiv.classList.add("video-info");

            // 영상 제목
            const linkA = document.createElement("p");
            linkA.innerText = response[i].video_title;

            // 채널 이름
            const linkB = document.createElement("a");
            let video_channel = response.video_channel;
            linkB.setAttribute("href", `channel.html?channel=${video_channel}`); // 채널 url
            linkB.innerText = response[i].video_channel;

            //  조회수 + 업로드 일자
            const pTag = document.createElement("p");
            // pTag.innerText = response.views + " Views. " + response.upload_date;
            pTag.innerText = adjustUnit(response[i].views) + " Views. " + calcDateDiff(response[i].upload_date);

            videoInfoDiv.appendChild(linkA);
            videoInfoDiv.appendChild(linkB);
            videoInfoDiv.appendChild(pTag);
            itemInfoDiv.appendChild(videoInfoDiv);
            // itemDiv.appendChild(itemDiv);
            itemDiv.appendChild(thumbnailImg);
            itemDiv.appendChild(itemInfoDiv);
            item.appendChild(itemDiv);
            containerList.appendChild(item);
        }
    }
};

// 요청 전송
xhr.send();


function adjustUnit(views) {
    if (views > 10000) {
        return (views / 10000).toFixed(1) + "M";
    } else if (views > 1000) {
        return (views / 1000).toFixed(1) + "K";
    } else {
        return views;
    }
}

function calcDateDiff(date) {
    const inputDate = new Date(date);
    const currentDate = new Date();

    // 두 날짜의 차이 (ms)
    const msDiff = currentDate - inputDate;

    // 두 날짜의 차이 (일)
    const daysDiff = msDiff / (1000 * 60 * 60 * 24);

    // 날짜 계산
    if (daysDiff >= 365) {
        const yearsDiff = Math.floor(daysDiff / 365);
        return `${yearsDiff}년 전`;
    } else if (daysDiff >= 30) {
        const monthsDiff = Math.floor(daysDiff / 30);
        return `${monthsDiff}달 전`;
    } else if (daysDiff >= 7) {
        const weeksDiff = Math.floor(daysDiff / 7);
        return `${weeksDiff}주 전`;
    } else {
        return `${Math.floor(daysDiff)}일 전`;
    }
}