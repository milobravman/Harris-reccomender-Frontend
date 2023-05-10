
let food_data = [];
let users_data = [];
let food_counter = 0;
let cookieText;
let image_counter = 0;
const temparay_images = ['./food.jpg', './food1.jpg', './food2.jpg', './food3.jpg', './food4.jpg']


function loadImages(){
    container = document.getElementById('cardZone')
    

    //creates img htlm element
    const img = document.createElement('img')

    let image_link = temparay_images[image_counter]
    console.log(image_link)
    console.log(image_counter)
    img.src = image_link;
    image_counter++
    if (image_counter == 5) {image_counter = 0}

    //creates title html element
    const title = document.createElement('h4')
    let node;
    
    const div = document.createElement('div')
    div.className = 'media'


    if (food_counter < 120 ){ // this way I am not loading to many new images at once
      let name = food_data[food_counter].title
      node = document.createTextNode(name)
      div.id = food_data[food_counter].id
      food_counter++
    }else {
       node = document.createTextNode("[Food] Name")
    }
    title.appendChild(node)

    //creates div

    //creates like icon
    const like = document.createElement('button')
    like.id = food_data[food_counter].id -1;
//     <span class="material-symbols-outlined">
// thumb_up
// </span>


    //const like = document.createElement(i);
    //like.src = './dislike.png'
    like.className = "material-symbols-outlined"
    like.textContent = "thumb_up"

    //creates dislike icon
    const dislike = document.createElement('button')
    //const dislike = document.createElement(i);
    dislike.className = "material-symbols-outlined"
    dislike.textContent = "thumb_down"

    div.appendChild(title)
    div.appendChild(img)
    div.appendChild(like)
    div.appendChild(dislike)
    container.appendChild(div)
    like.onclick = function() 
    {
      like.style.color = 'red'
      dislike.style.color = ''
      console.log(like.id)
      // Post request between like that belongs to this food and this user

      // also needs to be able to chech if there is a dislike between this user and this food and if there is delete it
      // postLike()
      // checkDislike()

    }
    dislike.onclick = function() 
    {
      dislike.style.color = 'blue'
      like.style.color = ''

      // reverse of the above funtion. needs to post a dislike between this user and this food and also check if there is already a like joining them and delete that
        //postLike()
        //checkDislike() 
    }
   }

 window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
    loadImages();
    }
})

function fetchPosts() {

  fetch("http://localhost:3000/posts")
  .then(res => res.json())
  .then(posts => {
      posts.forEach(post => {
          food_data.push(post);
      })
  })

}

// this function only exists to calculate the id of this user. a better version of this function would be a custom fethch that return the length of the users array and then this is not dont on the front end

function getUserData() {

  fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(users => {
      users.forEach(user => {
          users_data.push(user);
      })
  })
  
}

function createUser() {

  fetch("http://localhost:3000/users", {
    method: "post",
    mode: 'cors',
    headers:{'Content-Type': 'application/json'},
    body: ""
  })
  
}

// setting cookies only works when using live server

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  console.log("setCookie function fired");

}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("userId");
  if (user != "") {
    // get user like history or data
    
  } else {
      setCookie("userId", users_data.length+1, 7);
      console.log(users_data.length)
      createUser();
  }
}

document.addEventListener("DOMContentLoaded", ()=> {
  fetchPosts();

  setTimeout(() => {
    loadImages();
    loadImages();
    loadImages();
    loadImages();
  }, 1000);

  getUserData();
  setTimeout(() => {
    checkCookie();
  }, 1000);
})

