// // write your code here
const state={
    images:[]
}

const postSection = document.querySelector('.image-container')

function getImages(){
    return fetch('http://localhost:3000/images')
    .then(resp=>{
        return resp.json()
    })
}
function updateStateFromServer(){
    getImages().then(images=>{
        state.images = images
        renderPosts()
    })
    
}
function createComment(comment, whereToAppend){
    const commentLi = document.createElement('li')
    commentLi.textContent = comment.content
    whereToAppend.append(commentLi)
}

function createPost(post){
    const imageCardArticle = document.createElement("article");
    imageCardArticle.setAttribute("class", "image-card");

    const titleH2 = document.createElement("h2");
    titleH2.setAttribute("class", "title");
    titleH2.textContent = post.title;

    const postImg = document.createElement("img");
    postImg.src = post.image;
    postImg.setAttribute("class", "image");

    const likesSectionDiv = document.createElement("div");
    likesSectionDiv.setAttribute("class", "likes-section");

    const likesSpan = document.createElement("span");
    likesSpan.setAttribute("class", "likes");
    likesSpan.textContent = post.likes;

    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "like-button");
    likeButton.innerText = "♥";

    const commentsUl = document.createElement("ul");
    commentsUl.setAttribute("class", "comments");
    for(let comment of post.comments){
        createComment(comment,commentsUl)
    }


    imageCardArticle.append(titleH2, postImg, likesSectionDiv, commentsUl)
    likesSectionDiv.append(likesSpan, likeButton);
    postSection.append(imageCardArticle)
}

function renderPosts(){

    postSection.innerHTML = ''
    for(let post of state.images){

        createPost(post)
    }

}


updateStateFromServer()