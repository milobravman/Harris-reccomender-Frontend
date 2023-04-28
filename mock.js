
var food_data = [];
var users_data = [];
var food_counter = 0;
let cookieText;

function loadImages(numImages = 10){
    container = document.getElementById('cardZone')
    

    //creates img htlm element
    const img = document.createElement('img')
    img.src = './food.jpg'
    

    //creates title html element
    const title = document.createElement('h4')
    var node;
    
    const div = document.createElement('div')
    div.className = 'media'


    if (food_counter < 120 ){ // this way I am not loading to many new images at once
      var name = food_data[food_counter].title
      node = document.createTextNode(name)
      div.id = food_data[food_counter].id;
      food_counter++
    }else {
       node = document.createTextNode("[Food] Name")
    }
    title.appendChild(node)

    //creates div

    //creates like icon
    const like = document.createElement('button')
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
    }
    dislike.onclick = function() 
    {
      dislike.style.color = 'blue'
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

function createUser() {

  fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(users => {
      users.forEach(user => {
          users_data.push(user);
      })
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
      setCookie("userId", users_data.length, 7);
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

  createUser();
  setTimeout(() => {
    checkCookie();
  }, 1000);
})

