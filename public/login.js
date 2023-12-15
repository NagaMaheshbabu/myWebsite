
const email= document.querySelector('#email');
const p = document.createElement('p');
p.classList.add('para');
email.after(p);
email.addEventListener('input',()=>{
   const regex = 
   (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 )
    if(email.value){
        if(email.value.match(regex)){
            
        disp('Valid email Address','white',false);
            
          
        }
        else{
           disp('Invalid email Address','black',true)
           
            
        }
       
    }
    else{
        p.innerText ="";
        document.querySelector('#submit').disabled= false;
    }
    
})
const disp = (text,color,res)=>{
    p.innerText = text
    p.style.color = color
    document.querySelector('#submit').disabled =res
}

const form = document.querySelector('form');
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const formdata = new FormData(form);
  const res =  await fetch('http://localhost:3000/login',{
        method:'POST',
        body:formdata
    })
  const data = await res.json();
    if (data.message === 'Success') {
        document.querySelector('#email').value = ""
        document.querySelector('#pswd').value = ""
      // Redirect to the homepage
      window.location.href = '/index';
    }
    else{
        const para = document.createElement('p');
        para.classList.add('para');
        para.innerHTML = data.message;
        document.querySelector('#error').appendChild(para);
    }
})

//toggle the password
const eye = document.querySelector('#eye')
eye.addEventListener('click',()=>{
    if(eye.classList.toggle(true)){
       document.querySelector('#pswd').type ='text';
       eye.innerHTML = 'Hide'

    }
    else{
        document.querySelector('#pswd').type ='password';
        eye.innerHTML = 'Show'
    }
})