
function createVideoItem(video_id) {
    let xhr = new XMLHttpRequest();
    let apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`;
    xhr.open("GET", apiUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);

            if (response && response.video_id !== undefined) {
                const containerList = document.getElementById("video-list");
                const item = document.createElement("div");
                item.classList.add("item");

                const itemDiv = document.createElement("a");
                itemDiv.setAttribute("href", `video.html?id=${video_id}`);

                const thumbnailImg = document.createElement("img");
                thumbnailImg.setAttribute("src", response.image_link);
                thumbnailImg.classList.add("thumbnail");

                const itemInfoDiv = document.createElement("div");
                itemInfoDiv.classList.add("item-info");

                const videoInfoDiv = document.createElement("div");
                videoInfoDiv.classList.add("video-info");

                // title, name, view를 묶는 div 태그 생성
                const titleNameViewImgDiv = document.createElement("div");
                titleNameViewImgDiv.classList.add("title-name-view-img");

                // title 이미지 추가
                const imgElement = document.createElement("img");
                imgElement.setAttribute("src", "video/Orumi.png");
                imgElement.classList.add("title-image");
                titleNameViewImgDiv.appendChild(imgElement);

                const titleDiv = document.createElement("div");
                titleDiv.classList.add("title");
                const linkA = document.createElement("p");
                linkA.innerText = response.video_title;
                titleDiv.appendChild(linkA);

                const nameDiv = document.createElement("div");
                nameDiv.classList.add("name");
                const linkB = document.createElement("a");
                let video_channel = response.video_channel;
                linkB.setAttribute("href", `channel.html?video_channel=${video_channel}`); // 채널 url
                linkB.innerText = response.video_channel;
                nameDiv.appendChild(linkB);

                const viewDiv = document.createElement("div");
                viewDiv.classList.add("view");
                const pTag = document.createElement("p");
                pTag.innerText = response.views + " Views. " + response.upload_date;
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
                videoElement.setAttribute("autoplay", true); // 자동 재생을 추가합니다.
                videoElement.setAttribute("src", response.video_link);
                videoElement.setAttribute("preload", "metadata"); // Load only metadata to get video duration

                
                // 비디오 재생 관련 이벤트 추가
                itemDiv.addEventListener('mouseenter', () => {
                    setTimeout(() => {
                        item.classList.add('active');
                        thumbnailImg.style.display = "none";
                        videoElement.style.display = "block";
                        videoElement.play();
                    }, 300); // 0.5초 딜레이 추가 (500ms)
                });

                itemDiv.addEventListener('mouseleave', () => {
                    setTimeout(() => {
                        item.classList.remove('active');
                        videoElement.style.display = "none";
                        thumbnailImg.style.display = "block";
                        videoElement.pause();
                    }, 300); // 0.5초 딜레이 추가 (500ms)
                });
                
                
                item.appendChild(itemDiv);
                itemDiv.appendChild(videoElement); // 새로 생성한 비디오를 itemDiv 뒤에 추가
                itemDiv.appendChild(itemInfoDiv);
                containerList.appendChild(item);

                createVideoItem(video_id + 1);
            }
        }
    };

    xhr.send();
}

createVideoItem(0);

