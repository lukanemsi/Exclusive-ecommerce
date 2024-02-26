import { fetchURL,PRODUCTS_URL,clearDiv,createItemGlobal,addToWishlist, addToCarts, WISHLIST_ITEMS} from "./global.js";

function updateTimer() {
    setInterval(updateTimer, 1000);
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    document.getElementById('timer').innerHTML = 
    `
    <span class="hours">${addZero(hours)}</span> : 
    <span class="minutes">${addZero(minutes)}</span> : 
    <span class="seconds">${addZero(seconds)}</span>
    `
    ;
}
function addZero(value) {
    return value < 10 ? `0${value}` : value;
}

const salesItems = [];
let from = 0;
let to = 3;
const limit = 12;
async function setSalesItems(){
    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");
    leftArrow.style.cursor = "pointer";
    rightArrow.style.cursor = "pointer";
    leftArrow.addEventListener("click", () => {
        if(from >= 3)
        {
            from -= 3
            to -= 3
        }
        fetchSalesItems(from,to);
    });
    rightArrow.addEventListener("click", () => {
        if(to <= limit - 3)
        {
            from += 3
            to += 3
        }
        fetchSalesItems(from,to)
    })

    await fetchURL(PRODUCTS_URL+`?limit=${limit}`).then(
        data => {
            data.forEach( el =>
                salesItems.push(el)
            )
        }
    )
}

function fetchSalesItems(from,to){
    clearDiv(document.getElementById("sales-items"));
    salesItems.forEach((el,index) => {
        if(index >= from && index < to) createItem(el,true,"sales-items")
    })
}

function createItem(data, forSale,parentID){
    let wishListIconSrc
    if(WISHLIST_ITEMS.includes(data))
    {
        wishListIconSrc = "wishlist-red.svg"
    }
    else
    {
        wishListIconSrc = "wishlist.svg"
    }
    const element = createItemGlobal(data,forSale,wishListIconSrc)

    const wishlistImg = element.querySelector(".wishlist-icon");
    wishlistImg.addEventListener("click", function () {
        addToWishlist(data,wishlistImg)
 
    });

    const cartImg = element.querySelector(".cart-icon");
    cartImg.addEventListener("click", () => {
        addToCarts(data, cartImg)
    })

    document.getElementById(parentID).appendChild(element);  
}

const bestProducts = [];
async function setBestSellingProducts(){
    await fetchURL(PRODUCTS_URL).then(
        data =>bestProducts.push(data.filter(el => el.rating.rate >= 4.5))
    )
    
    bestProducts.forEach(
        pList => 
        pList.forEach(el => createItem(el, false, 'best-selling-items'))
    )
}

let FILTER_VALUE = '';
function addEventToFilter(){
    const input = document.getElementById("user-input");
    input.addEventListener("change",() => {
        FILTER_VALUE = input.value.toLowerCase();
        clearDiv(document.getElementById("best-selling-items"));
        let filteredData = [];
        bestProducts.forEach(pList => 
            {
               filteredData = pList.filter(el => el.title.toLowerCase().includes(FILTER_VALUE) || el.description.toLowerCase().includes(FILTER_VALUE))
            }    
        )   
        filteredData.forEach(el => {
            createItem(el,false,'best-selling-items')
        })
        
      
    }) 
}

updateTimer();
await setSalesItems();
fetchSalesItems(0,3);
await setBestSellingProducts();
addEventToFilter();