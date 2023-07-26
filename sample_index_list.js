// index.html에 정상적으로 목록이 뜨는지 확인하기 위한 코드입니다.
// 반복되면서 저장할 공간, 출력이 필요합니다.

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

// 저장을 안 하고 for문만 돌고 있음.
// 해당 코드로 실행 시 마지막 항목만 html에 전달해주게 됨.
for(i = 0; i <20; i++){
    url = 'http://oreumi.appspot.com/video/getVideoInfo?&video_id='
    xhr.open('get', url+i, true);
    xhr.send();
}