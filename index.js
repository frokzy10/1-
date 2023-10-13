const product = [];
const root = document.getElementById('root')

const searchBox = document.querySelector('.search-box');
const searchInput = document.querySelector('.field');

searchBox.addEventListener(`submit`, (e) => {
    e.preventDefault();
    return localHost(500, searchInput.value.toLowerCase())
})

async function localHost(ms, searchQuery) {
    console.log(searchQuery)

    await fetch(`http://localhost:3000/foodStorage`).then(res => res.json()).then(data => {
        const result = data;

        const item = result.filter(item => item.name.includes(searchQuery));
        console.log(item)
    })
}
// localHost(500)

function getOptions(word, product) {
    return product.filter(e => {
        const regex = new RegExp(word, 'gi')
        return e.name.match(regex);
    })
}

function displayOptions() {
    console.log(this.value);

    const options = (this.value, product)
    console.log(options);

    const addToHtml = options.map(product => {
        return `<li><span>${product.name}</span></li>`;
    })

}

// localStorage input //////////////////////////////////////
const inputField = document.querySelector(".field");
const searchForm = document.querySelector(".search-box");

window.addEventListener("load", () => {
    const savedSearch = localStorage.getItem("searchValue");
    if (savedSearch) {
        inputField.value = savedSearch;
    }
});

searchForm.addEventListener("keyup", (e) => {
    e.preventDefault();
    const searchValue = inputField.value;

    localStorage.setItem("searchValue", searchValue);
});

// dropdown//////////
let togglemenu = document.getElementById('subMenu');
let toggleclose = document.querySelector('.submenu_close');
let searchSystem = document.getElementById('searchSystem');
let fieldContainer = document.querySelector('.field-container');
let ClosePanel = document.querySelector('.icon-close')
let All = document.querySelector('body')

// Функция для скрытия меню
function hideMenu() {
    togglemenu.classList.remove('open');
}

function toggleMenu() {
    togglemenu.classList.toggle("open")
}

function hideModal() {
    fieldContainer.classList.remove('activeInput');
}

// Обработчик для показа/скрытия меню
togglemenu.addEventListener("click", () => {
    togglemenu.classList.toggle('open');

    hideModal();
});

// Обработчик для закрытия меню
toggleclose.addEventListener("click", () => {
    toggleclose.classList.remove('open');
    hideMenu();
});

searchSystem.addEventListener("click", () => {
    if (!fieldContainer.classList.contains('activeInput')) {
        fieldContainer.classList.add('activeInput');
        All.classList.toggle('activeBack');
        ClosePanel.classList.toggle('activeInput')
        hideMenu();
    } else {
        fieldContainer.classList.remove('activeInput');
        All.classList.remove('activeBack');
    }
});
document.querySelector('.icon-close').addEventListener('click', () => {
    fieldContainer.classList.remove('activeInput');
    All.classList.remove('activeBack');
})

document.querySelector('.icon-close').addEventListener("click", () => {
    hideModal();
});
// slider////////////////////////////////////////////////////////////////////
let slide = document.querySelectorAll('.slide');
let current = 0;
let refreshInterval = setInterval(next, 4500); // Start the autoplay carousel

function cls() {
    for (let i = 0; i < slide.length; i++) {
        slide[i].style.display = 'none';
    }
}

function next() {
    cls();
    if (current === slide.length - 1) current = -1;
    current++;

    slide[current].style.display = 'block';
    slide[current].style.opacity = 0.4;

    let x = 0.4;
    let intX = setInterval(function () {
        x += 0.1;
        slide[current].style.opacity = x;
        if (x >= 1) {
            clearInterval(intX);
            x = 0.2;
        }
    }, 20);
}

function prev() {
    cls();
    if (current === 0) current = slide.length;
    current--;

    slide[current].style.display = 'block';
    slide[current].style.opacity = 0.4;

    let x = 0.4;
    let intX = setInterval(function () {
        x += 0.1;
        slide[current].style.opacity = x;
        if (x >= 1) {
            clearInterval(intX);
            x = 0.4;
        }
    }, 20);
}

function start() {
    cls();
    slide[current].style.display = 'block';
}

function stopAutoPlay() {
    clearInterval(refreshInterval);
}

function resumeAutoPlay() {
    refreshInterval = setInterval(next, 4500);
}

start();
