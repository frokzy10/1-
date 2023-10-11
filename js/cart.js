let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', () => {
    if (cart.style.right == '-100%') {
        cart.style.right = '0';
        container.style.transform = 'translateX(0)';
    } else {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', () => {
    cart.style.right = '-100%';
    container.style.transform = 'translate(0)'
});

let products = null;

fetch('http://localhost:3000/foodStorage')
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        products = data;
        addDataToHtml();
    })

function addDataToHtml() {
    let listProductHtml = document.querySelector('.listProduct');
    listProductHtml.innerHTML = '';
    products.sort(()=>{
        return (0.5 - Math.random())
    })

    // add new datas
    if (products != null) {
        products.forEach(el => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img src="${el.img}" alt="">
            <h2>${el.name}</h2>
            <div class="price">${el.price}$</div>
            <button onclick="addCart(${el.id})">Add To Cart</button>`;
            listProductHtml.appendChild(newProduct);

        });
    }
}
let listCart = [];

function checkCart(){
    let cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();

function addCart($idProduct) {
    let productCopy = JSON.parse(JSON.stringify(products));
    // Если продукта нету в корзинке
    if (!listCart[$idProduct]) {
        let dataProduct = productCopy.filter(
            product => product.id == $idProduct
        )[0];
        // Добавление продукта в корзинку
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity = 1;
    } else {
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    addCartToHtml()
};
addCartToHtml();
function addCartToHtml() {
    // очистка даты
    let listCartHtml = document.querySelector('.listCart');
    listCartHtml.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if (listCart) {
        listCart.forEach(el => {
            if (el) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `
                <img src="${el.img}">
                <div class="content">
                    <div class="name">${el.name}</div>
                    <div class="price">${el.price}</div>
                </div>
                <div class="quantity">
                    <button class='cart-btn' onClick="changeQuantity(${el.id}, '-')">-</button>
                    <span class="value">${el.quantity}</span>
                    <button class='cart-btn' onClick="changeQuantity(${el.id}, '+')">+</button>
                </div>`

                listCartHtml.appendChild(newCart);
                totalQuantity = totalQuantity + el.quantity;
            }
        });
    }
    totalHTML.innerText = totalQuantity;
};
function changeQuantity($idProduct, $type) {
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // если значение равно 0,то удали его
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;


        default:
            break;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHtml();
}
