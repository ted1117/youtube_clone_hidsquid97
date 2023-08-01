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
                console.log(response[0].upload_date);
                console.log(response[0].video_channel);
                console.log(response[0].video_detail);
                console.log(response[0].video_id);
                console.log(response[0].video_tag);
                console.log(response[0].video_title);
                console.log(response[0].views);

                for (i in response) {

                    const playlistVideo = document.querySelector(".playlistVideo");

                    // // 썸네일 추가 코드, 썸네일 바로 추가 못 해요
                    // const playThumbnail = document.createElement("img");
                    // playThumbnail.setAttribute('src', response[i].);
                    // playThumbnail.classList.add("playlistDesc");

                    const playlistDesc = document.createElement("div");
                    playlistDesc.classList.add("playlistDesc");

                    // 타이틀 추가
                    const plVideoName = document.createElement("span");
                    plVideoName.innerHTML = response[i].video_title;
                    plVideoName.classList.add("plVideoName");

                    // 채널명
                    const plVideoChannel = document.createElement("span");
                    plVideoChannel.innerHTML = response[i].video_channel;
                    plVideoChannel.classList.add("plVideoChannel");

                    // 조회수, 업로드일
                    const plVideoViews = document.createElement("span");
                    plVideoViews.innerHTML += adjustUnit(response[i].views) +" "+ calcDateDiff(response[i].upload_date);
                    plVideoViews.classList.add("plVideoViews");

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

channelVideo(video_channel);