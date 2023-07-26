// getVideoInfo API를 가져오는 sample

let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            let json = JSON.parse(xhr.responseText)

            let print = '';
            // 태그 정리 필요
            print += '<div>' + json.video_title;
            print += '<img src=' + json.image_link + '>';
            print += '<p>업로드 날짜: ' + json.upload_date + '</p>';
            print += '<p>채널이름: ' + json.video_channel + '</p>';
            print += '<p>링크: ' + json.video_link + '</p>';
            print += '<p>설명: ' + json.video_detail + '</p>';
            print += '<p>id: ' + json.video_id + '</p>';
            print += '<p>tag: ' + json.video_tag + '</p>';
            print += '<p>views: ' + json.views + '</p>';
            print += '</div>';

            // className 재정의, 위치 정리 필요, id로 하는 게 좋을까?
            document.querySelector('.item').innerHTML = print;
        } else {
            alert("Failed to get information"); // 전송문제
        }
    }
};

// 호출에 따라 video_id 값 변경 필요
let i = 1;

url = 'http://oreumi.appspot.com/video/getVideoInfo?&video_id='
xhr.open('get', url+i, true);
xhr.send();