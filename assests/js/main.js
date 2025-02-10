const getcategories =async()=>{
  const{data}=await axios.get('https://dummyjson.com/products/category-list');
  return data;
  }
  const displaycategories= async()=>{
  const load=document.querySelector('.loader-container');
  load.classList.add('active');
  try{
      const categoris= await getcategories();
      const result=categoris.map((category)=>{
          return `<div class='category'>
          <h2>${category}</h2>
          <a href='categoryDetails.html?category=${category}'> details</a>
          </div>`
      }).join('');
      document.querySelector('.categories .row').innerHTML=result;
      
    }
    catch(error){
      document.querySelector('.categories .row').innerHTML='<p> eroor in get categories</p>';
      
    }
    finally{
      load.classList.remove('active');
    }
  
  
  }
  
  
  
  
  
  
  
  const getproducts=async(page)=>{
    let skip=(page-1)*30;
      const {data}=await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);

      return data;
     
  }
  const displayproducts=async(page=1)=>{
   
    const load=document.querySelector('.loader-container');
    load.classList.add('active');
    
  
  try{
    
      const data=await getproducts(page);
      const pages=Math.ceil(data.total/30);
     
     

  
    const result=data.products.map((product)=>{
      return `<div class='product'>
      <img src=${product.thumbnail} alt=${product.description} class='images'/>
      <h3>${product.title}</h3>
      <span>${product.price}</span>
      </div>`
    }).join('');
    document.querySelector('.products .row').innerHTML=result;
    let linkp=``;
    if(page==1){
   linkp=` <li class="page-item"><button  class="page-link" >&laquo;</button></li>`;
    }
    else{
      linkp=`   <li class="page-item"><button onclick='displayproducts(${page-1})' class="page-link">&laquo;</button></li>`;
    }
    for(let i=1;i<=pages;i++){
      linkp+=`<li class="page-item ${i==page?'active':''}"><button onclick='displayproducts(${i})' class="page-link">${i}</button></li>`;
    }
    if(page==pages){
      linkp+=`<li class="page-item"><button class="page-link" >&raquo;</button></li>`;
  }
  else{
     linkp+=`<li class="page-item"><button onclick='displayproducts(${page+1})' class="page-link" >&raquo;</button></li>`;
  }
    document.querySelector('.pagination').innerHTML=linkp;

modal();

  
  }
  catch(error){
    document.querySelector('.products .row').innerHTML='<p> eroor in get products</p>';
  }
  finally{
    load.classList.remove('active');
  }
  }


  displaycategories();
  displayproducts();


  window.onscroll=function(){
  const nav=document.querySelector('.header');
  const categories=document.querySelector('.categories');
 if(window.scrollY>categories.offsetTop){
  nav.classList.add('scrollnav');

 }
 else{
  nav.classList.remove('scrollnav');
 }
  }
  const countdown=()=>{
 const countDownDate=new Date('2025-03-02T00:00:00').getTime();
 const now=new Date().getTime();
 const distance=countDownDate-now;
 const days=Math.floor(distance/86400000);
 const hours=Math.floor((distance%86400000)/3600000);
 const minutes=Math.floor(((distance%86400000)%3600000)/60000);
 const seconds=Math.floor((((distance%86400000)%3600000)%60000)/1000);




 document.querySelector('#days').textContent=days;
 document.querySelector('#hours').textContent=hours;
 document.querySelector('#minutes').textContent=minutes;
 document.querySelector('#seconds').textContent=seconds;



  }

  setInterval(()=>{
  countdown();
  },1000);

  function modal(){
    const img=Array.from(document.querySelectorAll('.images'));
    const modal=document.querySelector('.my-modal');
    const close=document.querySelector('.close');
    const right=document.querySelector('.rightarr');
    const left=document.querySelector('.leftarr');
let index=0;

  img.forEach(function(im){
im.addEventListener('click',function(e){
  
modal.querySelector('img').setAttribute('src',e.target.src);
 modal.classList.remove('d-none');
 index=img.indexOf(im);


})
})
close.addEventListener('click',function(){
  modal.classList.add('d-none');
})
right.addEventListener('click',function(){
  if(index==img.length-1){
index=0;

  }
  else{
  index++;

  }
  modal.querySelector('img').setAttribute('src',img[index].src);
  })
  left.addEventListener('click',function(){
    if(index==0){
      index=img.length-1;

    }
    else{
      index--;
    }
    modal.querySelector('img').setAttribute('src',img[index].src);

  });
  document.addEventListener('keydown',function(e){
    console.log(e.code);
   if(e.code=='Escape'){
    modal.classList.add('d-none');
   }
   else if(e.code== 'ArrowRight'){
    if(index==img.length-1){
      index=0;
      
        }
        else{
        index++;
      
        }
        modal.querySelector('img').setAttribute('src',img[index].src);
   }
   else if(e.code=='ArrowLeft'){
    if(index==0){
      index=img.length-1;

    }
    else{
      index--;
    }
    modal.querySelector('img').setAttribute('src',img[index].src);
  
 


  }

  });
  

  }



  
  
    

    
   