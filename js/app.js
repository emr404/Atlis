const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

// Navigation Bar
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
})

//Count down clock for summer sales
countDown = () => {
    const countDownDate = new Date("Sep 5, 2020 17:00:00").getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = countDownDate - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        document.querySelector(".counter").innerHTML = days + "D " + hours + "H "
            + minutes + "M " + seconds + "S ";
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
counter = () => {
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