let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

// 각종 변수들
// let targetTagList;
// let videoInfoList = await getVideoList();
let targetVideoId = id;

// 영상 정보 불러오기
function createVideoItem(id) {
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

                targetTagList = response.video_tag;

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
                videoViews.textContent = `조회수 ${adjustUnit(response.views)}회 ${calcDateDiff(response.upload_date)}`;

                // 채널명
                const channelName = document.getElementById("channelName");
                channelTitle = response.video_channel;
                channelName.textContent = channelTitle;
                channelName.href = `channel.html?video_channel=${channelTitle}`;

                // 구독자 수 + 채널 프로필 이미지
                getSubsPic(channelTitle, function (subsCount, channelPic) {
                    const subscribers = document.getElementById("subscribers");
                    const channelImg = document.querySelector(".channelImg");
                    const channelImgLink = document.getElementById("profileLink");
                    subscribers.textContent = `${subsCount} subscribers`;
                    channelImg.src = channelPic;
                    channelImgLink.href = `channel.html?video_channel=${channelTitle}`
                });

                // 영상 설명
                const videoDescText = document.getElementById("videoDescText");
                videoDescText.textContent = response.video_detail;

                // secondary 채널 이름
                const channel = document.querySelector(".channel");
                channel.textContent = `From ${channelTitle}`;
            }
        }
    };

    // 요청 전송
    xhr.send();
}

// 채널의 구독자수와 프로필 이미지 불러오기
function getSubsPic(video_channel, callback) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();

    // API 요청 설정
    let apiUrl = `https://oreumi.appspot.com/channel/getChannelInfo?video_channel=${video_channel}`;
    xhr.open("POST", apiUrl, true);

    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let response = JSON.parse(xhr.responseText);

            if (response && response.channel_name !== undefined) {
                // 구독자 수 + 채널 프로필 이미지
                let subsCount = adjustUnit(response.subscribers);
                let channelPic = response.channel_profile;
                callback(subsCount, channelPic);
            }
        }
    };

    // 요청 전송
    xhr.send();
}

// getVideoList API
async function getVideoList() {
    const apiURL = 'https://oreumi.appspot.com/video/getVideoList';

    try {
        const response = await fetch(apiURL);

        // 응답이 성공적인지 확인합니다.
        if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        return null;
    }
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

async function getSimilarity(firstWord, secondWord) {
    const openApiURL = "http://aiopen.etri.re.kr:8000/WiseWWN/WordRel";
    const access_key = "f7f1a351-b530-4e0a-bb13-bb68a594f301 ";

    let requestJson = {
        argument: {
            first_word: firstWord,
            second_word: secondWord,
        },
    };

    let response = await fetch(openApiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: access_key,
        },
        body: JSON.stringify(requestJson),
    });
    let data = await response.json();
    return data.return_object["WWN WordRelInfo"].WordRelInfo.Distance;
}

async function calculateVideoSimilarities(videoList, targetTagList) {
    let filteredVideoList = [];

    for (let video of videoList) {
        let totalDistance = 0;
        let promises = [];

        for (let videoTag of video.video_tag) {
            for (let targetTag of targetTagList) {
                if (videoTag == targetTag) {
                    promises.push(0);
                } else {
                    promises.push(getSimilarity(videoTag, targetTag));
                }
            }
        }

        let distances = await Promise.all(promises);

        for (let distance of distances) {
            if (distance !== -1) {
                totalDistance += distance;
            }
        }

        if (totalDistance !== 0) {
            if (targetVideoId !== video.video_id) {
                filteredVideoList.push({ ...video, score: totalDistance });
            }
        }
    }

    filteredVideoList.sort((a, b) => a.score - b.score);

    filteredVideoList = filteredVideoList.map((video) => ({
        ...video,
        score: 0,
    }));
    return filteredVideoList;
}

// 추천 영상 목록 구성
async function renderVideoList() {
    const topMenu = document.querySelector(".top-menu");
    try {
        const data = await getVideoList();
        const currentVideoInfo = await getVideoInfo(id);
        let tagList = currentVideoInfo.video_tag;
        let channelName = currentVideoInfo.video_channel;
        let targetTagList = currentVideoInfo.video_tag; //현재 비디오 태그

        let videoInfoPromises = data.map((video) =>
            getVideoInfo(video.video_id)
        );
        let videoInfoList = await Promise.all(videoInfoPromises);

        let filteredVideoList = await calculateVideoSimilarities(
            videoInfoList,
            targetTagList
        );

        for (let i = 0; i < 5; i++) {
            let video = filteredVideoList[i];
            let channelTitle = video.video_channel;
            let videoURL = `./video.html?id=${video.video_id}`;
            let channelURL = `./channel.html?channelName=${channelTitle}`;

            // 영상 틀
            const secVidList = document.createElement("a");
            secVidList.classList.add("secondary-video-list");
            secVidList.href = `${videoURL}`;
            secVidList.style.textDecoration = "none";

            // 영상 썸네일 틀
            const smallThumbnail = document.createElement("a");
            smallThumbnail.classList.add("small-thumbnail");

            // 영상 썸네일 이미지
            const thumbnailImg = document.createElement("img");
            thumbnailImg.src = `${video.image_link}`;

            // 영상 정보 틀
            const vidInfo = document.createElement("div");
            vidInfo.classList.add("secondary-vid-info");

            // 영상 제목
            const vidTitle = document.createElement("a");
            vidTitle.textContent = video.video_title;

            // 채널 이름
            const channelName = document.createElement("p");
            channelName.textContent = `${channelTitle}`;

            // 조회수 + 업로드 일자
            const vidViews = document.createElement("p");
            vidViews.textContent = `조회수 ${adjustUnit(video.views)}회 · ${calcDateDiff(video.upload_date)}`;

            vidInfo.appendChild(vidTitle);
            vidInfo.appendChild(channelName);
            vidInfo.appendChild(vidViews);

            smallThumbnail.appendChild(thumbnailImg);

            secVidList.append(smallThumbnail);
            secVidList.appendChild(vidInfo);

            topMenu.appendChild(secVidList);
        }

    } catch (error) {
        console.error("비디오 목록을 가져오는 중 오류 발생: ", error);
    }
}

// 현재 채널의 영상만 보이기
function hideVideos(title) {
    const secondaryVideoListContainers = document.querySelectorAll(".secondary-video-list");

    secondaryVideoListContainers.forEach(container => {
        const pElement = container.querySelector(".secondary-vid-info p:nth-child(2)");
        const channelName = pElement.textContent.trim();

        if (channelName !== title) {
            container.style.display = "none";
        }
    });
}

// 다시 모든 영상 보이기
function showAllVideos(title) {
    const secondaryVideoListContainers = document.querySelectorAll(".secondary-video-list");

    secondaryVideoListContainers.forEach(container => {
        if (channelName !== title) {
            container.style.display = "flex";
        }
    });
}
// 채널명 전역변수화
let channelTitle;

// 영상 재생
createVideoItem(id);

// 추천 영상 목록
renderVideoList();

// 추천 영상 목록에서 채널 별 필터링
const allChannel = document.querySelector(".allChannel");
const currnetChannel = document.querySelector(".channel");

// allChannel 클릭 시 현재 영상을 제외한 모든 영상 보이기
allChannel.addEventListener("click", function () {
    showAllVideos();
});

// channel 클릭 시 현재 영상과 동일한 채널의 영상만 보이기
currnetChannel.addEventListener("click", function () {
    hideVideos(channelTitle);
});