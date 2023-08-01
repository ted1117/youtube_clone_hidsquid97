let urlParams = new URLSearchParams(window.location.search);
let video_channel = urlParams.get('video_channel');

function channelInfo(video_channel) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();

    // API 요청 설정
    let apiUrl = `http://oreumi.appspot.com/channel/getChannelInfo?video_channel=${video_channel}`;
    xhr.open("POST", apiUrl, true);

    console.log(apiUrl);
    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let response = JSON.parse(xhr.responseText);

            // 데이터 있는지 확인
            // console.log(response);

            if (response && response.channel_name !== undefined) {

                // 데이터 확인
                // console.log(response.channel_banner);
                // console.log(response.channel_name);
                // console.log(response.channel_profile);
                console.log(response.subscribers);

                // 배너 이미지
                const banner = document.querySelector(".banner");

                const bannerImg = document.createElement("img");
                bannerImg.setAttribute('src', response.channel_banner);

                banner.appendChild(bannerImg);

                // 채널 이름
                const channelName = document.querySelector("#channelName");
                channelName.innerHTML = response.channel_name;

                // 채널 프로필
                const channelProfilePic = document.querySelector(".channelProfilePic");
                
                const channelImg = document.createElement("img");
                channelImg.setAttribute('src', response.channel_profile);

                channelProfilePic.appendChild(channelImg);

                // 구독자 수
                const subscribers = document.querySelector("#subscribers");
                subscribers.innerHTML = adjustUnit(response.subscribers);


                
                
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

channelInfo(video_channel);