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

    await fetch(`http://localhost:3000/foodStorage`).then(res =>res.json()).then(data => {
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

    const addToHtml = options.map(product =>{
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
        hideMenu();
    } else {
        fieldContainer.classList.remove('activeInput');
    }
});

document.querySelector('.icon-close').addEventListener("click", () => {
    hideModal();
});
