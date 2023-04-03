

function loadImages(numImages = 10){
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
    img.sizes = 'small'

    //creates title html element
    const title = document.createElement('h4')
    const node = document.createTextNode("[Food] Name")
    title.appendChild(node)

    //creates div
    const div = document.createElement('div')
    div.className = 'media'

    

    div.appendChild(title)
    div.appendChild(img)
    container.appendChild(div)
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