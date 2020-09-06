"use strict";
class Item {
    constructor(image, name, price, color, qty, size,time) {
        this.image = image,
            this.name = name,
            this.price = price,
            this.color = color,
            this.qty = qty,
            this.size = size,
            this.time = time
    }
}


class Local{
    static getCartItem() {
        let items;
        if (localStorage.getItem('atlis') === null) {
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem('atlis'))
        }
        return items;
    }
    

    static addItem(item) {
        const items = Local.getCartItem();
        items.push(item);
        localStorage.setItem('atlis', JSON.stringify(items))
    }

    static removeItem(time) {
        const items = Local.getCartItem();
        items.forEach((item, n) => {
            if (item.time == time) {
                items.splice(n, 1)

            }
        })
        localStorage.setItem('atlis', JSON.stringify(items))
    }
}
class UI {
    static displayCart() {
        const items = Local.getCartItem();
        items.forEach(item => { UI.addItemToCart(item) })
        cartTotal();

    }
    static addItemToCart(item) {
        const cartContainer = document.querySelector('.cart-container');
        let cartItemContainer = document.createElement('div');
        cartItemContainer.className = "cart-item-container";
        cartItemContainer.innerHTML = `
                <h3 class="delete">X</h3>
                <img class="cart-item-image" src="${item.image}" alt="">
                <div class="cart-item-description">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <h3 class="cart-item-price"> ${item.price}</h3>
                    <h3 class="cart-item-color">${item.color} </h3>
                    <h3><span class="item-qty">${item.qty}</h3>
                    <h3 class="cart-item-size">${item.size} </h3>
                    <p class="cart-item-size" style='color:white;font-size: 1px'>${item.time} </p>
                </div>

        `
        cartContainer.appendChild(cartItemContainer);
        cartTotal();



    }
    static deleteItem(e) {
        if (e.target.className === 'delete') {
            e.target.parentElement.remove();
            shoppingBagAnimation();

        }
    }
}

document.addEventListener('click', e => {
    const name = e.target.parentElement.parentElement.childNodes[1].childNodes[5].childNodes[1].innerText;
    const image = e.target.parentElement.parentElement.childNodes[1].childNodes[3].currentSrc;
    const time = e.target.parentElement.parentElement.childNodes[1].childNodes[5].childNodes[11].innerText
    console.log(time)
    UI.deleteItem(e);
    if (e.target.innerText === 'X') {
        Local.removeItem(time);
        bagContentCounter();
        cartTotal();
    }


});

const products = document.querySelectorAll('.buy');
products.forEach(product => {
    product.addEventListener('click', e => {
        const image = e.target.parentElement.parentElement.childNodes[1].currentSrc;
        const name = e.target.parentElement.parentElement.childNodes[2].nextElementSibling.childNodes[1].innerText;
        const color = e.target.parentElement.parentElement.childNodes[2].nextElementSibling.childNodes[2].nextElementSibling.childNodes[1].innerText;
        const qty = e.target.parentElement.parentElement.childNodes[2].nextElementSibling.childNodes[4].nextSibling.childNodes[2].innerText;
        const size = e.target.parentElement.parentElement.childNodes[2].nextElementSibling.childNodes[7].childNodes[1].innerText;
        const price = e.target.parentElement.parentElement.childNodes[5].firstChild.nextElementSibling.innerText;
        const date = new Date;
        const time = date.getTime()
        const item = new Item(image, name, price, color, qty, size,time);
        
        Local.addItem(item);
        bagContentCounter();
        shoppingBagAnimation();
        cartTotal();

    })
})
document.addEventListener('DOMContentLoaded', UI.displayCart);















const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

// Navigation Bar
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
})

//Count down clock for summer sales
const countDown = () => {
    const countDownDate = new Date("Oct 20, 2020 17:00:00").getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = countDownDate - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (document.querySelector('.counter')) {
            document.querySelector(".counter").innerHTML = days + "D " + hours + "H "
                + minutes + "M " + seconds + "S ";
        }
        if (difference < 0) {
            clearInterval(interval);
            document.querySelector(".counter").innerHTML = "No deals available";
        }
    }, 1000);
}
countDown();


//Hover effect for furniture categories
const imageBackground = document.querySelectorAll('.category-item-container');
imageBackground.forEach(image => {
    image.addEventListener('mouseover', e => {
        /* console.log(e.target.nextElementSibling.innerHTML); */
        image.childNodes[1].classList.add('img-darken');
    }
    )
});

imageBackground.forEach(image => {
    image.addEventListener('mouseout', () => {
        image.childNodes[1].classList.remove('img-darken');

    }
    )
});

// Counter for quantity of items
const counter = () => {
    const increase = document.querySelectorAll('.add');
    const decrease = document.querySelectorAll('.minus');
    increase.forEach(increment => {
        increment.addEventListener('click', (e) => {
            e.target.parentElement.childNodes[2].innerHTML++;

        })

    })
    decrease.forEach(decrement => {
        decrement.addEventListener('click', (e) => {
            e.target.parentElement.childNodes[2].innerHTML--;
            if (e.target.parentElement.childNodes[2].innerHTML < 1) {
                e.target.parentElement.childNodes[2].innerHTML = 1;

            }

        })

    })
}
counter();


//Counts the number of items in the local storage and displays it
const bagContentCounter = () => {
    const bagCount = document.querySelectorAll('.cart-number');

    bagCount.forEach(addedContent => {
        addedContent.innerText = 0;
        addedContent.innerText = Local.getCartItem().length;
        const item = Local.getCartItem();

    })
}
bagContentCounter();


const shoppingBagAnimation = () => {
    const shoppingBag = document.querySelector('.shoppingBag');
    shoppingBag.classList.add('shoppingBagAnimation');
    setTimeout(() => {
        shoppingBag.classList.remove('shoppingBagAnimation');
    }, 1000);
}

const cartTotal = () => {
    const container = document.getElementsByClassName('cart-container')[0];
    const itemsContainer = container.getElementsByClassName('cart-item-container');
    let total = 0;

    for (let i = 0; i < itemsContainer.length; i++) {
        const itemContainer = itemsContainer[i];
        const itemPrice = itemContainer.getElementsByClassName('cart-item-price')[0];
        const itemQty = itemContainer.getElementsByClassName('item-qty')[0];
        let price = parseFloat(itemPrice.innerText.replace('£', ''));
        let qty = itemQty.innerText;
        total += price * qty;
    }
    document.querySelector('.total-price').innerText = '£' + total;
}