/*fetch("https://fakestoreapi.com/products")
            .then(res=>res.json())
            .then(json=>console.log(json))*/
let products;
let searchproducts;

const selectCategory=document.getElementById("select");
if(localStorage.getItem("cart")==null){
    localStorage.setItem("cart",JSON.stringify([]))
}
function addItem(item,a){
    let notsameitem=false;
   
    if(a.length>0){
        for(let i=0;i<a.length;i++){
            if(a[i].name==item.name){
                notsameitem=true;
                
                a[i].quantity ++;
            }
        }
        if(notsameitem== false){
            let newitem={
                ...item,quantity:1,
            }
            a.push(newitem);
        }
               
    }
    else{
        let newitem={
            ...item,quantity:1,
        }
        a.push(newitem);
    }
    
    
    
    
}
fetch('https://fakestoreapi.com/products').then((data)=>{
    data.json().then((finaldata)=>{
         products=finaldata.map((p)=>{
            return{
                name:p.title,
                category:p.category,
                price:p.price,
                image:p.image,
                description:p.title,
                id:p.id,
                

            };
 

        });
        
          createproducts(products);

        });
       
});

const createproducts=(products)=>{


  const containerDiV=document.getElementById("prod1");

            for(let i=0; i<products.length;i++){
                const productcontainer=document.createElement("div");
                productcontainer.innerHTML=`
                <div class="prod-container">
        <div class="product">
            <img src="${products[i].image}">
            <div class="description">
                <span>"${products[i].category}"</span>
                <h5>"${products[i].description}"</h5>
                <div class="star">
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    <i class='bx bx-star'></i>
                    
                </div>
                <h4>"${products[i].price}"</h4>
        
            </div>
            
            <button id="${products[i].id}cart">Add to cart</button>
            
            
        
        
        </div>
        `;
                const kk=document.getElementById("notify");
                //console.log(products[i].id)
                containerDiV.appendChild(productcontainer);
              const button=  document.getElementById(`${products[i].id}cart`)
              
              button.addEventListener("click",()=> {

                const itemsStored=JSON.parse(localStorage.getItem("cart"))
                
               addItem(products[i],itemsStored);
               
             

               
               
                
                localStorage.setItem("cart",JSON.stringify(itemsStored))
             



              })

   

               
            }
        }
const resetproducts=()=>{
    const containerDiV=document.getElementById("prod1");
    containerDiV.innerHTML="";

}
// search function 
const searchitems=document.getElementById("search");
searchitems.addEventListener("input",()=>{
    const searchinput=searchitems.value;
    resetproducts();
    searchproducts=[...products];
    searchproducts=searchproducts.filter((p)=> p.category.toLowerCase().includes(searchinput.toLowerCase()))
    createproducts(searchproducts);
})

//sorting ascending
const ascending=document.getElementById("asce");
ascending.addEventListener("change",()=>{
    resetproducts();

    let x=(((products.filter((p)=> p.category.includes(selectCategory.value)))));
    x.sort((a,b)=>{
        if(a.price>b.price){
            return 1;
        }
        else if(a.price<b.price){
            return -1;
        }
        else {
            return 0;
        }
       
    })

    createproducts(x);
})
  

   

//sorting decending order

const descending=document.getElementById("dec");
descending.addEventListener("click",()=>{
    resetproducts();
    let x=(((products.filter((p)=> p.category.includes(selectCategory.value)))));
    x.sort((a,b)=>{
        if(a.price>b.price){
            return -1;
        }
        else if(a.price<b.price){
            return 1;
        }
        else {
            return 0;
        }
       
    })

    createproducts(x);    
})


//select category
selectCategory.addEventListener("input",()=>{
    resetproducts();
createproducts(((products.filter((p)=> p.category.includes(selectCategory.value)))));


})
//Dark mode 
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});






 