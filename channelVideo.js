// 채널 정보 불러오기
function channelVideo(video_channel) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();

    // API 요청 설정
    let apiUrl = `http://oreumi.appspot.com/channel/getChannelVideo?video_channel=${video_channel}`;
    xhr.open("POST", apiUrl, true);

    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let response = JSON.parse(xhr.responseText);

            if (response !== undefined) {

                for (i in response) {
                    
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
                    plVideoViews.innerHTML += adjustUnit(response[i].views) +" "+ calcDateDiff(response[i].upload_date);
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
    let apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${id}`;
    xhr.open("GET", apiUrl, true);

    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let response = JSON.parse(xhr.responseText);

            // 데이터 있는지 확인
            if (response && response.video_id !== undefined) {

                // 누르면 비디오로 연결
                const tagA = document.createElement("a");
                tagA.setAttribute('href', `video.html?id=${response.video_id}`);

                // 썸네일
                const playThumbnail = document.createElement("img");
                playThumbnail.setAttribute('src', response.image_link);
                playThumbnail.classList.add("playThumbnail");

                // 추가
                tagA.appendChild(playThumbnail);
                tagA.appendChild(playlistDesc);
                document.querySelector(".playlistVideo").appendChild(tagA);
            }
        }
    };
    // 요청 전송
    xhr.send();
}