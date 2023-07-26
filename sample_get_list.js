// getVideoList API를 가져오는 sample

let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            let json = JSON.parse(xhr.responseText)

            let print = '';
            for (let id in json){
                // 태그 정리 필요
                print += '<a>' + json[id].video_title; + '</a>';
                print += '<p>업로드 날짜: ' + json[id].upload_date + '</p>';
                print += '<p>채널이름: ' + json[id].video_channel + '</p>';
                print += '<p>설명: ' + json[id].video_detail + '</p>';
                print += '<p>id: ' + json[id].video_id + '</p>';
                print += '<p>tag: ' + json[id].video_tag + '</p>';
                print += '<p>views: ' + json[id].views + '</p>';
            }

            // className 재정의, 위치 정리 필요, id로 하는 게 좋을까?
            document.querySelector('.item-info').innerHTML = print;
        } else {
            alert("Failed to get information"); // 전송문제
        }
    }
};

xhr.open('get', 'http://oreumi.appspot.com/video/getVideoList');
xhr.send();