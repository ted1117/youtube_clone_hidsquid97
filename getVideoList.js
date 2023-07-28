

const getVideoList = function () {
    return fetch('http://oreumi.appspot.com/video/getVideoList')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('데이터를 가져오는데 오류가 발생했습니다:', error);
        });
}

getVideoList().
    then((videoData) => {
        // console.log(videoData)
        let date = [];
        let titles = [];
        let viewsList = [];
        let channels = [];
        const containerList = document.getElementById("video-list");

        // for (let i = 0; i < videoData.length; i++) {
        //     date.push(videoData[i].upload_date);
        //     titles.push(videoData[i].video_title);
        //     viewsList.push(videoData[i].views);
        //     channels.push(videoData[i].video_channel);

        // }

        for (let i = 0; i < videoData.length; i++) {

            const itemDiv = document.createElement("div");
            // itemDiv.setAttribute("href", "#");
            itemDiv.classList.add("item");

            const thumbnailImg = document.createElement("img");
            thumbnailImg.setAttribute("src", "images/image 1.svg");
            thumbnailImg.classList.add("thumbnail");

            const itemInfoDiv = document.createElement("div");
            itemInfoDiv.classList.add("item-info");

            const videoInfoDiv = document.createElement("div");
            videoInfoDiv.classList.add("video-info");

            // 영상 제목
            const linkA = document.createElement("p");
            // linkA.setAttribute("href", "#");
            // linkA.innerText = titles[i];
            linkA.innerText = videoData[i].video_title;

            // 채널 이름
            const linkB = document.createElement("a");
            linkB.setAttribute("href", "#");
            // linkB.innerText = channels[i];
            linkB.innerText = videoData[i].video_channel;

            //  조회수 + 업로드 일자
            const pTag = document.createElement("p");
            pTag.innerText = videoData[i].views + " " + videoData[i].upload_date;
            // pTag.innerText = viewsList[i] + " " + date[i];

            videoInfoDiv.appendChild(linkA);
            videoInfoDiv.appendChild(linkB);
            videoInfoDiv.appendChild(pTag);
            itemInfoDiv.appendChild(videoInfoDiv);
            itemDiv.appendChild(thumbnailImg);
            itemDiv.appendChild(itemInfoDiv);
            containerList.appendChild(itemDiv);
        }
    });