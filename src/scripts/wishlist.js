import {createItemGlobal,addToCarts,clearDiv} from "./global.js";
const urlParams = new URLSearchParams(window.location.search);
const items = JSON.parse(decodeURIComponent(urlParams.get("wishlistItems")));

const wishListItemsDIv = document.getElementById("wishlist-items");  

function displayWishItems(){
    items.forEach(
        el => {
            appendElement(el)
        }
    )
}
function appendElement(el){
    const item = createItemGlobal(el,false,'wishlist-red.svg');

    const cartsImg = item.querySelector(".cart-icon");
    cartsImg.addEventListener("click", () => {
        addToCarts(el,cartsImg)
    })

    wishListItemsDIv.appendChild(item)
    removeFromWishList(item)

}

function removeFromWishList(item){
    item.getElementsByClassName("wishlist-icon")[0].addEventListener("click", () => {
        item.style.display = "none"
        items.splice(items.indexOf(item),1)
    })
    
}

let FILTER_VALUE = '';
function addEventToFilter(){
    const input = document.getElementById("user-input");
    input.addEventListener("change",() => {
        FILTER_VALUE = input.value.toLowerCase();
        clearDiv(wishListItemsDIv);
        const filteredData = items.filter(el => el.title.toLowerCase().includes(FILTER_VALUE) || el.description.toLowerCase().includes(FILTER_VALUE))
        filteredData.forEach(el => {
            appendElement(el)
        })
        
      
    }) 
}


displayWishItems();
addEventToFilter();