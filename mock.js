
var food_data = [];
var food_counter = 0;

function loadImages(numImages = 10){
  console.log (food_data)
    //food_data = await fetchPosts(food_data);
    // let i=0;
    //  while(i < numImages){
    //  fetch('https://dog.ceo/api/breeds/image/random')
    //  .then(response=>response.json())
    //  .then(data=>{
    //  const img =  document.createElement('img');
    //  img.src = `${data.message}`
    //  container.appendChild(img)
    //  })
    //  i++;
    // }
    container = document.getElementById('cardZone')
    

    //creates img htlm element
    const img = document.createElement('img')
    img.src = './food.jpg'
    

    //creates title html element
    const title = document.createElement('h4')
    var node;
    if (food_counter < 120 ){ // this way I am not loading to many new images at once
      var name = food_data[food_counter].title
      node = document.createTextNode(name)
      food_counter++
    }else {
       node = document.createTextNode("[Food] Name")
    }
    title.appendChild(node)

    //creates div
    const div = document.createElement('div')
    div.className = 'media'

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
      //console.log("clicked like")
    }
    dislike.onclick = function() 
    {
      dislike.style.color = 'blue'
      //console.log("clicked like")
    }


   }
   
 

 //loadImages();

 window.addEventListener('scroll',()=>{
    //console.log(window.scrollY) //scrolled from top
    //console.log(window.innerHeight) //visible part of screen
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



document.addEventListener("DOMContentLoaded", ()=> {
  fetchPosts();
  setTimeout(() => {
    loadImages();
    loadImages();
    loadImages();
    loadImages();
  }, 1000);
  //loadImages();
})

