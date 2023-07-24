function loadYoutubeInfo(){
    let YoutubeInfo = document.getElementById("YoutubeInfo").value; 
    if (YoutubeInfo === ''){
        alert('원하는 정보 번호를 입력해 주세요'); 
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){ 
        if (xhr.readyState === XMLHttpRequest.DONE){
            if (xhr.status === 200){
                let data = JSON.parse(xhr.responseText)
                if(data.response === 'False'){
                    alert('유튜브 정보를 가져오는데 실패하였습니다.')
                }else{
                    let YoutubeInfo = '';
                    YoutubeInfo += '<h2>' + video_channel + '</h2>';
                    YoutubeInfo += '<p><strong>제목:</strong>' + video_title + '</p>';
                    YoutubeInfo += '<p><strong>이미지 : </strong>' + '<img src = "' + image_link + '"></p>'; 
                    YoutubeInfo += '<p><strong>채널:</strong>' + video_channel + '</p>';
                    YoutubeInfo += '<p><strong>디테일:</strong>' + video_detail + '</p>';  
                    YoutubeInfo += '<p><strong>id:</strong>' + video_id + '</p>';
                    YoutubeInfo += '<p><strong>링크:</strong>' + video_link + '</p>';
                    YoutubeInfo += '<p><strong>태그:</strong>' + video_tag + '</p>';
                    document.getElementById('YoutubeInfo').innerHTML = YoutubeInfo;
                }   
            }else {
                alert('유튜브 정보를 가져오는데 실패하였습니다.');
            }
        }
    };
    xhr.open('GET', 'http://oreumi.appspot.com/video/getVideoList&t=' + encodeURIComponent(YoutubeInfo), true); 
    xhr.send();
}