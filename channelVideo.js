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

                // 데이터 확인
                // console.log(response[0].upload_date);
                // console.log(response[0].video_channel);
                // console.log(response[0].video_detail);
                // console.log(response[0].video_id);
                // console.log(response[0].video_tag);
                // console.log(response[0].video_title);
                // console.log(response[0].views);

                for (i in response) {
                    const playlistVideo = document.querySelector(".playlistVideo");

                    // // 썸네일 추가 코드, videoAPI에서 ID 받아서 처리해야할 듯
                    const playThumbnail = document.createElement("img");
                    playThumbnail.setAttribute('src', 'images/image 1.svg');
                    playThumbnail.classList.add("playThumbnail");

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

                    // 썸네일 테스트용 코드
                    playlistVideo.appendChild(playThumbnail);

                    playlistDesc.appendChild(plVideoName);
                    playlistDesc.appendChild(plVideoChannel);
                    playlistDesc.appendChild(plVideoViews);

                    playlistVideo.appendChild(playlistDesc);
                }
            }
        }
    };
    // 요청 전송
    xhr.send();
}

channelVideo(video_channel);