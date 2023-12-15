const p = document.createElement('p');
const form = document.querySelector('form');
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
   const formdata = new FormData(form);
   const res = await fetch('http://localhost:3000/update',{
        method:'POST',
        body:formdata
    })
    const result = await res.json();
   if(result.mes  ==='Your data updated successfully'){
        p.innerHTML = result.mes;
    p.classList.add('para');
    form.after(p);
    document.querySelector('#First').value =""
   document.querySelector('#Last').value =""
   document.querySelector('#pswd').value =""
   }
   else{
    console.log('error occured!');
   }
})

const pswd = document.querySelector('#pswd')
const eye = document.querySelector('#eye');
eye.addEventListener('click',()=>{
    if(eye.classList.toggle(true)){
       pswd.type = 'text';
       eye.innerHTML = 'Hide'
    }
    else{
        pswd.type ="password";
        eye.innerHTML = 'Show'
        
    }
})