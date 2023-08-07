const queryParams = new URLSearchParams(window.location.search);
const videoId = queryParams.get('id');

const addComment = document.querySelector(".add-comment");
const inputComment = document.querySelector(".comment-text");

const posting = document.querySelector('.posting');

const container = document.querySelector(".comment-container");

function commentForm() {
  const commentItem = document.createElement('div');
  const userImg = document.createElement('img');
  const mainComment = document.createElement('p');
  const likeAction = document.createElement('div');

  userImg.classList.add('comment_img')
  mainComment.classList.add('comment_main')
  commentItem.classList.add('comment-item');
  likeAction.classList.add('like-action');

  userImg.setAttribute('src', 'images/User-Avatar.svg');
  mainComment.innerText = inputComment.value;
  const commentText = inputComment.value;
  if (commentText.trim() !== "") {
    // 코멘트 객체 생성
    const commentObj = createCommentObj("Name", commentText);
    // 코멘트 저장
    saveComment(commentObj);
    // 입력란 초기화
    inputComment.value = "";
  }
}

// enter시 posting
inputComment.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    commentForm();
    inputComment.value = "";
  }
});


// click시 posting
posting.addEventListener('click', function (event) {
  console.log(123)
  commentForm();
  inputComment.value = "";
});

function saveComment(commentObj) {
  // 이전에 저장된 코멘트가 있을 경우 가져옴
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  // 새로운 코멘트를 배열의 첫 번째로 추가
  savedComments.unshift(commentObj);
  // 최대 10개까지만 유지하도록 처리 (선택적)
  if (savedComments.length > 10) {
    savedComments.splice(10, savedComments.length - 10);
  }
  // 로컬 스토리지에 코멘트 저장
  localStorage.setItem("comments", JSON.stringify(savedComments));
  // 코멘트 화면에 보여주기
  showComments();
}


function showComments() {
  // 이전에 저장된 코멘트가 있을 경우 가져옴
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  // video_id를 비교하여 해당 페이지에서 작성한 댓글만 표시
  const filteredComments = savedComments.filter(comment => comment.video_id == videoId);
  // 코멘트 컨테이너 초기화
  container.innerHTML = "";
  // 코멘트를 화면에 보여줌 (배열의 처음부터 순회)
  for (const commentObj of filteredComments) {
    if (!isEmptyObject(commentObj)) {
      const commentItem = createCommentItem(commentObj);
      container.appendChild(commentItem);
    }
  }

  const commentsCount = document.querySelector(".connect_But h2");
  commentsCount.textContent = `댓글 ${filteredComments.length}개`;
}

function isEmptyObject(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

function createCommentItem(commentObj) {
  const commentItem = document.createElement('div');
  const userImg = document.createElement('img');
  const content_item = document.createElement('div');
  const commentContent = document.createElement('p');
  const likeAction = document.createElement('div');
  const likeBtn = document.createElement('a');
  const dislikeBtn = document.createElement('a');
  const likeImg = document.createElement('img');
  const dislikeImg = document.createElement('img');
  const authorSpan = document.createElement('span');
  const timestampSpan = document.createElement('span');

  userImg.classList.add('comment_img')
  likeAction.classList.add('like-action');
  commentItem.classList.add('comment_all_container')
  content_item.classList.add('comment-item');
  likeBtn.classList.add('likeBtn');
  dislikeBtn.classList.add('dislikeBtn');

  userImg.setAttribute('src', 'images/User-Avatar.svg');
  commentContent.innerText = commentObj.content;
  likeImg.setAttribute('src', 'images/liked.svg');
  dislikeImg.setAttribute('src', 'images/DisLiked.svg');
  commentContent.classList.add('comment_main')
  authorSpan.innerText = commentObj.author;
  timestampSpan.innerText = commentObj.timestamp;

  likeBtn.appendChild(likeImg);
  likeAction.appendChild(likeBtn);
  likeAction.innerHTML += '<span class="likeSpan">' + commentObj.likes + ' </span>';
  dislikeBtn.appendChild(dislikeImg);
  likeAction.appendChild(dislikeBtn);
  likeAction.innerHTML += '<span class="dislikeSpan">' + commentObj.dislikes + ' </span>';
  likeAction.innerHTML += '<span>' + 'REPLY' + '</span>';

  commentItem.appendChild(userImg);
  const h3Element = document.createElement('h3');
  h3Element.appendChild(authorSpan);
  h3Element.innerHTML += '<span>' + ' ' + calcDateDiff(commentObj.timestamp) + '</span>';
  content_item.appendChild(h3Element);
  content_item.appendChild(commentContent);
  content_item.appendChild(likeAction);
  commentItem.appendChild(content_item)

  return commentItem;
}


function createCommentObj(author, content) {
  const timestamp = new Date(); // 현재 시간을 문자열로 변환하여 타임스탬프로 사용

  let commentObj = {
    author: author,
    timestamp: timestamp,
    content: content,
    likes: 0, // 초기 좋아요 수 0으로 설정
    dislikes: 0, // 초기 싫어요 수 0으로 설정
    video_id: videoId
  };

  return commentObj;
}

function calcDateDiff(date) {
  const start = new Date(date);
  const end = new Date();

  const diff = (end - start) / 1000;

  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return '방금 전';
}

// 초기화면에 코멘트 목록 보여주기
showComments();