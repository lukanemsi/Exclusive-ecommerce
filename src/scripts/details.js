import { PRODUCTS_URL, createItemGlobal, fetchURL,generateStarsHtml,addToWishlist, addToCarts } from "./global.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const detailsSection = document.getElementById("details-section")

let counter = 0;

function displayDetails(data){

    detailsSection.classList.add("flex","justify-center","gap-40","mt-50")
    const detailsHtml = `
        <div>
            <img src="${data.image}" alt="item image" class="item-image"/>
        </div>
        <div class="flex-column gap-20">
            <div class="flex-column gap-10">
                <h2>${data.title}</h2>
                <div>
                    ${generateStarsHtml(Math.round(data.rating.rate),true)}
                    ${generateStarsHtml(5 - Math.round(data.rating.rate),false)}
                    ${data.rating.count} Reviews | <span class="c-green">In Stock</span>
                </div>
                <p class="price">$${data.price}</p>
                <p class="description-text">${data.description}</p>
            </div>
            <form class="flex gap-40 align-center">
                <span class="bolder fs-25">Size:</span>
                <label class="label">
                    <input type="radio" name="size" value="xs">
                    <span class="checkmark">XS</span>
                </label>
                <label class="label">
                    <input type="radio" name="size" value="s">
                    <span class="checkmark">S</span>
                </label>
                <label class="label">
                    <input type="radio" name="size" value="m">
                    <span class="checkmark">M</span>
                </label>
                <label class="label">
                    <input type="radio" name="size" value="l">
                    <span class="checkmark">L</span>
                </label>
                <label class="label">
                    <input type="radio" name="size" value="xl">
                    <span class="checkmark">XL</span>
                </label>
            </form>
            <div class="flex-column gap-10">
                <div class="flex gap-40 align-center button-wrapper">
                    <div class="flex">
                        <div>
                        <button class="btn"  id="btn-decrement">-</button">
                        </div>
                        <div id="button-counter">${counter}</div>
                        <div>
                            <button class="btn" id="btn-increment">+</button>
                        </div>
                    </div>
                    <div>
                        <button class="btn" id="buy-now">Buy Now</button>
                    </div>
                </div>
                <div>
                    <p class="bolder fs-25">Total: $<span id="total-price">0</span><p>
                </div>
            </div>
            <div>
                <div class="flex align-center gap-20 border-black p-20">
                    <div>
                      <img src="./src/img/icons/details-delivery.svg" alt="delivery icon">
                    </div>
                    <div>
                        <p>FREE Delivery</p>
                        <p>Enter your postal code for Delivery Availability</p>
                    </div>
                </div>
                <div class="flex align-center gap-20 border-black p-20">
                    <div>
                        <img src="./src/img/icons/return.svg" alt="return icon">
                    </div>
                    <div>
                        <p>Return Delivery</p>
                        <p>Free 30 Days Delivery Returns. Details</p>
                    </div>
                    
                </div>
            </div>
        </div>
    `
    detailsSection.innerHTML = detailsHtml;
    document.getElementById("btn-decrement").addEventListener("click", () => {
        if(counter > 0)
        {
            updateCounter(--counter);
            updateTotalPrice(data.price)
        }
    })
    document.getElementById("btn-increment").addEventListener("click", () => {
        updateCounter(++counter);
        updateTotalPrice(data.price)
    })
}
function updateTotalPrice(price){
    document.getElementById("total-price").innerText = Math.round(price * counter);
}
function updateCounter(count){
        document.getElementById("button-counter").innerText = count;

}
function fetchItem(id){
    fetchURL(PRODUCTS_URL + `/${id}`).then(data =>{
        displayDetails(data)
        displayRecomendedItems(data.category)
    })
}

function displayRecomendedItems(category)
{
    fetchURL(PRODUCTS_URL + `/category/${category}`).then(
        data => reduceRecomendedItems(data)
    )
}
function reduceRecomendedItems(data){
    let reducedData = [];
    if(data.length > 3)
    {
        for(let i = 0; i < 3; i++)
        {
            const randomItem = getRandomItemFromList(data);
            data.splice(data.indexOf(randomItem),1)
            reducedData.push(randomItem)
        }
    }else{
        reducedData = data;
    }
    
    const recomendedWrapper = document.getElementById("related-items")
    reducedData.forEach(el => {
        const item = createItemGlobal(el,false,'wishlist.svg')
        const wishlistImg = item.querySelector(".wishlist-icon");
        wishlistImg.addEventListener("click", function () {
                    addToWishlist(el,wishlistImg) 
                });

        const cartsImg = item.querySelector(".cart-icon")
        cartsImg.addEventListener("click", () => {
            addToCarts(el,cartsImg)
        })        
        recomendedWrapper.appendChild(item)
    })
}

function getRandomItemFromList(list)
{
   const rand =  Math.floor(Math.random() * list.length)
   return list[rand]
}

fetchItem(id)