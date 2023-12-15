
//---------------------------------------//
window.addEventListener("scroll", myFunction);

const head = document.querySelector('header')
function myFunction() {
    if (window.pageYOffset > 350 && window.pageYOffset <390) {
       
        document.getElementById("txt-img").classList.add("first")
    }
    else if(window.pageYOffset <350 && window.pageYOffset >250){
        document.getElementById("txt-img").classList.add("sec")
        document.getElementById("txt-img").classList.remove("first")
        
    }
    else if(window.pageYOffset <800 && window.pageYOffset >0){
        document.querySelector('#home-txt').classList.remove('home-scroll')
        document.querySelector('#home-txt').classList.add('home-scroll1')
    }
    else if(window.pageYOffset >800 && window.pageYOffset <820){
        document.querySelector('#home-txt').classList.add('home-scroll')
       
    }
    else if (window.pageYOffset > 50 && window.pageYOffset <100) {
        document.getElementById("txt-img").classList.remove("sec")
        
    }

}

// Creating login button 
// let btn = document.querySelector('#btn')
// let login = document.createElement('div')
// login.classList.add('login_div')
// let new_btn = document.createElement("button")
// new_btn.classList.add("new_div")
// new_btn.style.padding="5px 20px"
// new_btn.style.marginBottom="0.5px"
// let anchor = document.createElement('a')
// anchor.setAttribute('href',"#")
// anchor.innerText ="Login"
// anchor.style.textDecoration= "none"
// new_btn.appendChild(anchor)
// login.appendChild(new_btn)
// btn.before(login)


//Applying random color to the header
function RandomColor(){
    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)
    let a = (Math.random()*0.5)
    const color = `rgba(${r},${g},${b},${a})`
   return color

}
const color =RandomColor()
        head.style.transition = "all 300ms 300ms ease-in"
        head.style.background = color
// Creating the button on header that contains home,Team,contact and etc
const head_btn = document.createElement('button')
head_btn.classList.add('drop-down_btn')
const main=document.querySelector('#main')


for(let i=1;i<=3;i++){
   const span = document.createElement('hr')
   span.classList.add('hr')
   head_btn.appendChild(span)
}
main.appendChild(head_btn)


//toggle the button
head_btn.addEventListener('click',()=>{
    if(head_btn.classList.toggle(true)){
        const menu_div = document.createElement('div')
      const  drop_down_btn= document.querySelector('.drop-down_btn')
        menu_div.classList.add('menu_div')
        drop_down_btn.appendChild(menu_div)
        //Creating the list items inside the div
        const ul = document.createElement('ul')
        ul.classList.add('ul')
        ul.style.listStyle='none'
        const ar=['Home','My Profile','Team','contact','Blogs'];
        const links = ['index.html',"https://nagamaheshbabu.github.io/profile/#Project",'Team','contact','Blogs'];
        for(let i=0;i<=4;i++){
            const li= document.createElement('li')
            li.classList.add('li')
            const anchor = document.createElement('a')
            anchor.classList.add('a')
            anchor.setAttribute('href',`#${links[i]}`)
            anchor.textContent = `${ar[i]}`
            li.appendChild(anchor)
            ul.appendChild(li)

            
        }
        menu_div.appendChild(ul)
       
    }
    else{
       const hr=document.querySelectorAll('hr')[2]
        hr.nextElementSibling.remove()
    }
})

//Updating time automatically
const time_div = document.createElement('div');
time_div.classList.add('time_div');
const span = document.createElement('span');
const span1 = document.createElement('span');
span.innerHTML = 'Time : '
span.style.fontFamily ='monospace'
span1.style.fontFamily ='monospace'
span.style.textAlign ='center'
span.style.marginLeft = '20px'
span1.style.marginLeft = '10px'
const login_button= document.querySelector('#menus');
login_button.after(time_div)
time_div.appendChild(span);
span.classList.add('span')
time_div.appendChild(span1);
span1.classList.add('span1')

const UpdateTime = ()=>{
    //getting the currentTime
    var currentTime = new Date();
   var hours = currentTime.getHours();
   var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
   
    if(minutes < 10){
        minutes = '0'+minutes;
    }
    if(seconds < 10){
        seconds = '0'+seconds;
    }

    var time = hours+' : '+minutes+" : "+seconds
    if(hours < 12 ){
     time+=' AM '
    }
    else{
        time+=' PM '
    }
    span1.innerHTML = time;
setTimeout(UpdateTime,1000)
}
UpdateTime();



//Button sound
document.querySelectorAll('a').forEach((item)=>{
item.addEventListener('click',()=>{
  document.querySelector('audio').play();  
})
})


   













