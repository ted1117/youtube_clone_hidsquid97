let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

function createVideoItem(id) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();

    // API 요청 설정
    let apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${id}`;
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

                // html에서 태그가 이렇게 보여야함
                // <video controls autoplay>
                //     <source src="" type="video/mp4">
                // </video>

                // 영상
                const videoElement = document.createElement("video");
                videoElement.classList.add("video");
                videoElement.src = `${response.video_link}`;
                videoElement.controls = true;
                videoElement.autoplay = true;

                document.querySelector(".videoPlayer").appendChild(videoElement);

                // 영상 제목
                const videoTitle = document.getElementById("videoTitle");
                videoTitle.textContent = response.video_title;

                // 조회수 업로드
                const videoViews = document.getElementById("videoInfoText");
                videoViews.textContent = adjustUnit(response.views) + " " + calcDateDiff(response.upload_date);

                // 채널명
                const channelName = document.getElementById("channelName");
                channelTitle = response.video_channel;
                channelName.textContent = response.video_channel;

                // 구독자 수
                getSubs(channelTitle, function (subsCount) {
                    const subscribers = document.getElementById("subscribers");
                    subscribers.textContent = `${subsCount} subscribers`;
                });

                // 영상 설명
                const videoDescText = document.getElementById("videoDescText");
                videoDescText.textContent = response.video_detail;
            }
        }
    };

    // 요청 전송
    xhr.send();
}

function getSubs(video_channel, callback) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();

    // API 요청 설정
    let apiUrl = `http://oreumi.appspot.com/channel/getChannelInfo?video_channel=${video_channel}`;
    xhr.open("POST", apiUrl, true);

    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let response = JSON.parse(xhr.responseText);

            if (response && response.channel_name !== undefined) {
                // 구독자 수
                let subsCount = adjustUnit(response.subscribers);
                callback(subsCount);
            }
        }
    };

    // 요청 전송
    xhr.send();
}

createVideoItem(id);