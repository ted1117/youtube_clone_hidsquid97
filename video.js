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

                let print = '';

                print += "<video controls autoplay>";
                print += "<source src=" + `${response.video_link}` +" "+ "type=" +"video/mp4>";
                print += "</video>";
    
                // className 재정의
                document.querySelector('.videoPlayer').innerHTML = print;
            }
        }
    };

    // 요청 전송
    xhr.send();
}

// id = 0부터 아이템 불러오기
createVideoItem(id);