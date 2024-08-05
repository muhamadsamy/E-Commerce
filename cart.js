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




function removeItem(item,a){
    for(let i=0;i<a.length;i++){

    if(a[i].name== item.name){
        if(a[i].quantity <1){
            a.pop(item)
        }
        if(a[i].quantity==1){
           a.splice(i,1);
        }else if(a[i].quantity >1){
            a[i].quantity--;
        }
    }
}
}
let products;
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
        
         //createproducts(products);

        });
       
});

const createproducts=(products)=>{


        const containerDiV=document.getElementById("checkout");

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
            
            <button id="${products[i].id}add">+</button>
            <h3 id="${products[i].id}quantity">${products[i].quantity}</h3>
            <button id="${products[i].id}remove">-</button>
            
            
        
        
        </div>
        `;
        containerDiV.appendChild(productcontainer);
              

        const bottonAdd=document.getElementById(`${products[i].id}add`);
        bottonAdd.addEventListener("click",()=>{
            addItem(products[i],itemdata)
            const quantity=document.getElementById(`${products[i].id}quantity`);
            quantity.innerText=products[i].quantity
            document.getElementById('notify').innerHTML =`
            <i class='bx bx-cart'> ${products[i].quantity} </i>`
            
            console.log(itemdata)

               
            })
        
        const bottonremove=document.getElementById(`${products[i].id}remove`);
        bottonremove.addEventListener("click",()=>{
            removeItem(products[i],itemdata)
            const quantity=document.getElementById(`${products[i].id}quantity`);
            quantity.innerText=products[i].quantity
            document.getElementById('notify').innerHTML =`
            <i class='bx bx-cart'> ${products[i].quantity} </i>`
            console.log(itemdata)
    })
        }
    }




const itemdata= JSON.parse(localStorage.getItem('cart'));
createproducts(itemdata);

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

    
   

