// 채널 정보 불러오기
function channelVideo(video_channel) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();

    // API 요청 설정
    let apiUrl = `https://oreumi.appspot.com/channel/getChannelVideo?video_channel=${video_channel}`;
    xhr.open("POST", apiUrl, true);

    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let response = JSON.parse(xhr.responseText);

            if (response !== undefined) {

                for (i in response) {

                    if (i == 0) {
                        showFeaturedVideo(response[i].video_id);
                        continue;
                    }

                    const playlistDesc = document.createElement("div");
                    playlistDesc.classList.add("playlistDesc");

                    // 타이틀 추가
                    const plVideoName = document.createElement("span");
                    plVideoName.innerHTML = response[i].video_title;
                    plVideoName.classList.add("plVideoName");

                    // 채널명
                    const plVideoChannel = document.createElement("span");
                    plVideoChannel.innerHTML = response[i].video_channel;
                    plVideoChannel.classList.add("plVideoInfo");
                    plVideoChannel.id = "plVideoChannel";

                    // 조회수, 업로드일
                    const plVideoViews = document.createElement("span");
                    plVideoViews.innerHTML += adjustUnit(response[i].views) + " " + calcDateDiff(response[i].upload_date);
                    plVideoViews.classList.add("plVideoInfo");
                    plVideoViews.id = "plVideoViews";

                    playlistDesc.appendChild(plVideoName);
                    playlistDesc.appendChild(plVideoChannel);
                    playlistDesc.appendChild(plVideoViews);

                    // 비디오 아이디로 영상정보 불러오기
                    getVideoImg(response[i].video_id, playlistDesc);
                }
            }
        }
    };
    // 요청 전송
    xhr.send();
}

channelVideo(video_channel);

// 비디오 아이디로 영상정보 불러오기
function getVideoImg(id, playlistDesc) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();

    // API 요청 설정
    let apiUrl = `https://oreumi.appspot.com/video/getVideoInfo?video_id=${id}`;
    xhr.open("GET", apiUrl, true);

    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let response = JSON.parse(xhr.responseText);

            // 데이터 있는지 확인
            if (response && response.video_id !== undefined) {
                const playlistVideo = document.createElement("div");
                playlistVideo.classList.add("playlistVideo");

                // 누르면 비디오로 연결
                const tagA = document.createElement("a");
                tagA.setAttribute('href', `video.html?id=${response.video_id}`);
                tagA.style.textDecoration = "none";

                // 썸네일
                const playThumbnail = document.createElement("img");
                playThumbnail.setAttribute('src', response.image_link);
                playThumbnail.classList.add("playThumbnail");

                // 새로운 video 요소 생성
                const videoElement = document.createElement("video");
                videoElement.classList.add("video");
                videoElement.setAttribute("controls", true);
                videoElement.setAttribute("src", `https://storage.googleapis.com/oreumi.appspot.com/video_${response.video_id}.mp4`);
                videoElement.setAttribute("preload", "metadata"); // Load only metadata to get video duration
                videoElement.muted = true;

                // 비디오 재생 관련 이벤트 추가
                tagA.addEventListener('mouseenter', () => {
                    setTimeout(() => {
                        playlistVideo.classList.add('active');
                        playThumbnail.style.display = "none";
                        videoElement.style.display = "block";
                        videoElement.play();
                    }, 300); // 0.3초 딜레이 추가 (300ms)
                });

                tagA.addEventListener('mouseleave', () => {
                    setTimeout(() => {
                        playlistVideo.classList.remove('active');
                        videoElement.style.display = "none";
                        playThumbnail.style.display = "block";
                        videoElement.pause();
                        videoElement.currentTime = 0;
                    }, 300); // 0.3초 딜레이 추가 (300ms)
                });

                // 추가
                tagA.appendChild(playThumbnail);
                tagA.appendChild(videoElement);
                tagA.appendChild(playlistDesc);
                playlistVideo.appendChild(tagA);
                document.querySelector(".contentsList").appendChild(playlistVideo);
            }
        }
    };
    // 요청 전송
    xhr.send();
}

// getVideoInfo API
async function getVideoInfo(video_id) {
    const apiURL = `https://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`;

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("네트워크 응답이 올바르지 않습니다.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        return null;
    }
}

// 채널 페이지에서 대표 영상 표시
async function showFeaturedVideo(video_id) {
    const data = await getVideoInfo(video_id);

    // 영상 태그 생성 + 영상 링크
    const youtubePlayer = document.getElementById("youtubePlayer");
    const videoElement = document.createElement("video");
    videoElement.src = `${data.video_link}`;
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.controls = true;
    videoElement.style.width = "424px";
    videoElement.style.height = "238px";

    youtubePlayer.appendChild(videoElement);
    youtubePlayer.href = `video.html?id=${data.video_id}`

    // 영상 제목 + 업로드 일자 + 조회수 + 영상 설명
    const videoTitle = document.getElementById("title");
    const uploadDate = document.getElementById("time");
    const videoDescText = document.getElementById("description");
    const videoDesc = document.querySelector(".videoDesc");

    videoDesc.href = `video.html?id=${data.video_id}`;
    videoDesc.style.textDecoration = "none";
    videoTitle.textContent = `${data.video_title}`;
    uploadDate.textContent = `조회수 ${adjustUnit(data.views)}회 · ${calcDateDiff(data.upload_date)}`;
    videoDescText.textContent = `${data.video_detail}`;
}

// showFeaturedVideo();