function createVideoItem(searchKeyword) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, true);

    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let response = JSON.parse(xhr.responseText);

            // 제목에 검색어가 포함된 영상만 불러오기
            if (searchKeyword !== undefined) {
                clearContainer();
                var videoList = response.filter((video) =>
                    video.video_title.toLowerCase().includes(searchKeyword.toLowerCase())
                );
            }
            // 모든 동영상 불러오기
            else {
                var videoList = response;
            }

            for (i in videoList) {
                const containerList = document.getElementById("video-list");
                const item = document.createElement("div");
                item.classList.add("item");

                const itemDiv = document.createElement("a");
                itemDiv.setAttribute("href", `video.html?id=${videoList[i].video_id}`);

                const thumbnailImg = document.createElement("img");
                thumbnailImg.setAttribute("src", getImgs(videoList[i].video_id));
                thumbnailImg.classList.add("thumbnail");

                const itemInfoDiv = document.createElement("div");
                itemInfoDiv.classList.add("item-info");

                const videoInfoDiv = document.createElement("div");
                videoInfoDiv.classList.add("video-info");

                // title, name, view를 묶는 div 태그 생성
                const titleNameViewImgDiv = document.createElement("div");
                titleNameViewImgDiv.classList.add("title-name-view-img");

                // 채널 프로필 이미지
                const video_channel = videoList[i].video_channel;
                const imgElement = document.createElement("img");
                imgElement.setAttribute("src", getProfile(video_channel));
                imgElement.classList.add("title-image");
                titleNameViewImgDiv.appendChild(imgElement);

                // 영상 제목
                const titleDiv = document.createElement("div");
                titleDiv.classList.add("title");
                const linkA = document.createElement("p");
                linkA.innerText = videoList[i].video_title;
                titleDiv.appendChild(linkA);

                // 채널 이름
                const nameDiv = document.createElement("div");
                nameDiv.classList.add("name");
                const linkB = document.createElement("a");
                linkB.setAttribute("href", `channel.html?video_channel=${video_channel}`); // 채널 url
                linkB.innerText = video_channel;
                nameDiv.appendChild(linkB);

                // 조회수 + 업로드 일자
                const viewDiv = document.createElement("div");
                viewDiv.classList.add("view");
                const pTag = document.createElement("p");
                pTag.innerText = adjustUnit(videoList[i].views) + " Views. " + calcDateDiff(videoList[i].upload_date);
                viewDiv.appendChild(pTag);

                // titleNameViewImgDiv에 title, name, view 추가
                titleNameViewImgDiv.appendChild(titleDiv);
                titleNameViewImgDiv.appendChild(nameDiv);
                titleNameViewImgDiv.appendChild(viewDiv);

                // titleNameViewImgDiv를 videoInfoDiv에 추가
                videoInfoDiv.appendChild(titleNameViewImgDiv);
                itemInfoDiv.appendChild(videoInfoDiv);
                itemDiv.appendChild(thumbnailImg);


                // 새로운 video 요소 생성
                const videoElement = document.createElement("video");
                videoElement.classList.add("video");
                videoElement.setAttribute("controls", true);
                videoElement.setAttribute("src", getVidUrl(videoList[i].video_id));
                videoElement.setAttribute("preload", "metadata"); // Load only metadata to get video duration
                videoElement.muted = true;

                // 비디오 재생 관련 이벤트 추가
                itemDiv.addEventListener('mouseenter', () => {
                    setTimeout(() => {
                        item.classList.add('active');
                        thumbnailImg.style.display = "none";
                        videoElement.style.display = "block";
                        videoElement.play();
                    }, 300); // 0.3초 딜레이 추가 (300ms)
                });

                itemDiv.addEventListener('mouseleave', () => {
                    setTimeout(() => {
                        item.classList.remove('active');
                        videoElement.style.display = "none";
                        thumbnailImg.style.display = "block";
                        videoElement.pause();
                        videoElement.currentTime = 0;
                    }, 300); // 0.3초 딜레이 추가 (300ms)
                });

                item.appendChild(itemDiv);
                itemDiv.appendChild(videoElement); // 새로 생성한 비디오를 itemDiv 뒤에 추가
                itemDiv.appendChild(itemInfoDiv);
                containerList.appendChild(item);
            }
        }
    };

    // 요청 전송
    xhr.send();
}

// 영상 썸네일 불러오기
function getImgs(i) {
    const Url = vidInfoUrl + `img_${i}.jpg`;
    return Url;
}

// 채널 프로필 사진 불러오기
function getProfile(channelTitle) {
    const titleConvert = String(channelTitle).split(" ").join("_");
    const channelPic = vidInfoUrl + `${titleConvert}_profile.jpg`;
    return channelPic;
}

// 영상 URL 불러오기
function getVidUrl(id) {
    const videoUrl = vidInfoUrl + `video_${id}.mp4`;
    return videoUrl;
}

// 기존에 표시된 영상들 삭제
function clearContainer() {
    const container = document.getElementById("video-list");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


// *****************************
// 메인 함수 실행
// *****************************

// API 요청 설정
const apiUrl = `http://oreumi.appspot.com/video/getVideoList`;
const vidInfoUrl = `https://storage.googleapis.com/oreumi.appspot.com/`;

// 모든 영상 불러오기
createVideoItem();

// 검색 기능
let searchButton = document.getElementById("searchBtn");
let searchBox = document.getElementById("searchInput");

// 검색 버튼 클릭 시 필터링 실행
searchButton.addEventListener("click", function () {
    let searchKeyword = searchBox.value;
    createVideoItem(searchKeyword);
});

searchBox.addEventListener("keypress", function (event) {
    // 엔터 키의 키 코드 = 13
    if (event.keyCode === 13) {
        let searchKeyword = searchBox.value;
        createVideoItem(searchKeyword);
    }
});

searchBox.addEventListener("input", function () {
    let searchKeyword = searchBox.value;
    if (searchKeyword === "") {
        clearContainer();
        createVideoItem();
    }
})