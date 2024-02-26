import {fetchURL,CATEGORIES_URL, PRODUCTS_URL,addToCarts ,createItemGlobal, clearDiv,addToWishlist} from "./global.js";

async function fetchCategories()
{
    await fetchURL(CATEGORIES_URL)
    .then(
        data => {
            setCategoriesUI(data)
        }
    )
}

const itemWrapper = document.getElementById("items-wrapper")
function fetchProducts(category,sorting){
    clearDiv(itemWrapper)
    let url = PRODUCTS_URL;
    if(category !== undefined && category !== "all"){
        url += `/category/${category}`
    }
    url += `?sort=${sorting}`

 
    fetchURL(url).then(
        data => {
            data.forEach(el => {
                appendElement(el)
            })
        }
    );
}
function appendElement(el){
    const element = createItemGlobal(el,false,`wishlist.svg`);
                itemWrapper.appendChild(element)
                const wishlistImg = element.querySelector(".wishlist-icon");
                wishlistImg.addEventListener("click", function () {
                    addToWishlist(el,wishlistImg) 
                });
                
                const cartsImg = element.querySelector(".cart-icon");
                cartsImg.addEventListener("click", () => {
                    addToCarts(el,cartsImg)
                })
}


function setCategoriesUI(data){
    const categorySection = document.getElementById("category-section");
    categorySection.innerHTML = `
    <select id="category-select" class="p-10" name="categories" >
        <option value="all" class="category-option" disabled selected>categories</option>
        <option value="all" class="category-option">all</option>
        ${data.map(el => 
            `<option value="${el}" class="category-option">${el}</option>`
        ).join("")}
    </select>  
    <select id="category-sorting" class="p-10" names="sorting">
        <option value="asc" class="category-option">asc</option>
        <option value="desc" class="category-option">desc</option>
    </select>  
    `   
    const select = document.getElementById("category-select");
    const sorting = document.getElementById("category-sorting");

    select.addEventListener("change", () => {
            fetchProducts(select.value, sorting.value)
    })
    sorting.addEventListener("change", () => {
        fetchProducts(select.value,sorting.value)
    })
}

let FILTER_VALUE = '';
function addEventToFilter(){
    const input = document.getElementById("user-input");
    input.addEventListener("change",() => {
      FILTER_VALUE = input.value.toLowerCase();
      clearDiv(itemWrapper);
      fetchURL(PRODUCTS_URL).then(
        data => {
            const filteredData = data.filter(el => el.title.toLowerCase().includes(FILTER_VALUE) || el.description.toLowerCase().includes(FILTER_VALUE))
            filteredData.forEach(el => {
                appendElement(el)
            })
        }
      )
    }) 
}

await fetchCategories();
fetchProducts();
addEventToFilter();