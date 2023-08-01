const addComment = document.querySelector(".add-comment");
const inputComment = document.querySelector(".comment-text");

// const posting = document.querySelector('.posting');

const container = document.querySelector(".comment-container");

function commentForm() {
    const commentItem = document.createElement('div');
    const userImg = document.createElement('img');
    const mainComment = document.createElement('p');
    const likeAction = document.createElement('div');
    const likeImg = document.createElement('img');
    const disLikeImg = document.createElement('img');
    
    commentItem.classList.add('comment-item');
    likeAction.classList.add('like-action');

    userImg.setAttribute('src', 'images/User-Avatar.svg');
    mainComment.innerText = inputComment.value;

    likeImg.setAttribute('src', 'images/liked.svg');
    disLikeImg.setAttribute('src', 'images/DisLiked.svg');

    likeAction.appendChild(likeImg);
    likeAction.innerHTML += '<span>' + '2 ' + '</span>';
    likeAction.appendChild(disLikeImg);
    likeAction.innerHTML += '<span>' + '5 ' + '</span>';
    likeAction.innerHTML += '<span>' + 'REPLAY' + '</span>';

    commentItem.appendChild(userImg);
    commentItem.innerHTML += '<h3>' + 'Name' + '<span>' + ' 2 days ago' + '</span>' + '</h3>';
    commentItem.appendChild(mainComment);
    commentItem.appendChild(likeAction);
    
    container.appendChild(commentItem);
}

// enter시 posting
inputComment.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        commentForm();
        inputComment.value = "";
    }
}); 


// // click시 posting
// posting.addEventListener('click', function(event) {
//     commentForm();
//     inputComment.value = "";
// });