document.querySelector('button').addEventListener('click',()=>{
    jokes();
   
})


var bold = document.querySelector('b');
const jokes = async()=>{
  try{
    let header = {headers:{Accept:'application/json'}};
    const joke = await axios.get('https://icanhazdadjoke.com/',header);
    bold.innerHTML = joke.data.joke;
   
    document.querySelector('div').style.background = ranColor();
    
  }
  catch(e){
    console.log(e);
  }
}

const ranColor =()=>{
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = Math.floor(Math.random()*255);
 let a = Math.random()*0.5;

let color = `rgba(${r},${g},${b},${a})`
return color;
} 

