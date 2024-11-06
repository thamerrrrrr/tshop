const getcategories =async()=>{
const{data}=await axios.get('https://dummyjson.com/products/category-list');
return data;
}
const displaycategories= async()=>{
    const categoris= await getcategories();
    const result=categoris.map((category)=>{
        return `<div class='category'>
        <h2>${category}</h2>
        <a href='categoryDetails.html?category=${category}'> details</a>
        </div>`
    }).join('');
    document.querySelector('.categories .row').innerHTML=result;


}


const getproducts=async()=>{
    const{data}=await axios.get(`https://dummyjson.com/products`);
  
    return data;
   
}
const displayproducts=async()=>{
    const data=await getproducts();
  const result=data.products.map((product)=>{
    return `<div class='product'>
    <img src=${product.thumbnail} alt=${product.description}/>
    <h3>${product.title}</h3>
    <span>${product.price}</span>
    </div>`
  }).join('');
  document.querySelector('.products .row').innerHTML=result;
}
displaycategories();
displayproducts();
getproducts();