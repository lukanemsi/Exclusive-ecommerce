const API = "https://fakestoreapi.com/";
export const CATEGORIES_URL = API + "products/categories";
export const PRODUCTS_URL = API + "products";
export const CART_ITEMS = [];
export const WISHLIST_ITEMS = [];

export async function fetchURL(URL){
    const res = await fetch(URL);
    if(res.status !== 200)
    {
        throw new Error("Invalid http code")
    }
    return await res.json();
}

export function clearDiv(div) {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
}
export function generateStarsHtml(count, activeStar){
  let src = './src/img/icons/'
  activeStar ? src += 'star-active.svg' : src += 'star-inactive.svg'
  return `<img src="${src}">`.repeat(count)
}
export function addToCarts(data,cartImg)
{
  changeCartsIcon(cartImg)

  if(CART_ITEMS.includes(data))
  {
    CART_ITEMS.splice(CART_ITEMS.indexOf(data),1)
  }
  else{
    CART_ITEMS.push(data);
  }

  updateHeaderCounter(CART_ID)

}
export function addToWishlist(data,icon){
  changeWishIcon(icon);

  if(WISHLIST_ITEMS.includes(data))
  {
    WISHLIST_ITEMS.splice(WISHLIST_ITEMS.indexOf(data),1)
  }
  else{
    WISHLIST_ITEMS.push(data);
  }
  updateHeaderCounter(WISHLIST_ID)

}

function changeCartsIcon(icon){
  const svg = "add-cart.svg";
  const activeSvg = "empty-cart.svg"
  if(icon.src.toString().includes(svg)){
      icon.src = icon.src.toString().replace(svg, activeSvg)
  }
  else if(icon.src.toString().includes(activeSvg)){
      icon.src = icon.src.toString().replace(activeSvg,svg)
  }
}

export function createItemGlobal(data, forSale,wishListIconSrc){
    const element = document.createElement("div");
    element.classList.add("item","flex-column","align-center","gap-40")

    addRightClick(element, data.id);

    element.innerHTML = `   
    <div class="relative flex justify-center">
        ${forSale ? `<div class="sale-icon bolder c-white p-10 absolute">-40%</div>`: ``}
        <img src="${data.image}" class="data-image">
        <img src="./src/img/icons/${wishListIconSrc}" class="wishlist-icon absolute" alt="wishlist">   
        <img src="./src/img/icons/empty-cart.svg" class="cart-icon absolute" alt="cart">
    </div>
    <div class="item-content text-center">
        <h3>${data.title}<h3>
        <div class="item-sale  text-center">
            <span class="item-price mr-10">$${data.price}</span>
            ${forSale ? `<span class="item-old-price text-line-through c-gray">$${Math.round(data.price + (data.price * 0.4))}</span>` : ''}
        </div>
        <div class="item-rating">
            ${generateStarsHtml(Math.round(data.rating.rate),true)}
            ${generateStarsHtml(5 - Math.round(data.rating.rate),false)}
            ${data.rating.rate}
        </div>
    </div>
    `
    return element;
}

export function createHeaderGlobal(){
    const navigation = `
        <nav class="flex justify-between align-center" id="nav-bar">
        <div class="mobile-none">
            <p><a class="decoration-none c-black bolder page-link" href="./index.html">Exclusive</a></p>
        </div>
        <div>
            <div class="burger-icon desktop-none" id="menu-button">
            <img
                class="w-30"
                src="./src/img/icons/burger-menu.svg"
                alt="menu icon"
            />
            </div>
            <ul class="flex gap-40 list-none mobile-none" id="pages-link">
            <li class="page-link">
                <a class="decoration-none c-black" href="./index.html">Home</a>
            </li>
            <li class="page-link">
                <a class="decoration-none c-black" href="./products.html">Products</a>
            </li>
            <li class="page-link">
                <a class="decoration-none c-black" href="./about.html">About</a>
            </li>
            </ul>
        </div>
        <div>
            <div class="flex align-center gap-20">
            <div class="filter-input">
                <input
                type="text"
                id="user-input"
                name="user-input"
                placeholder="What're you looking for?"
                />
                <img src="./src/img/icons/search.svg" alt="search icon" id="search-icon" />
            </div>
            <div id="wishlist-page-wrapper">
              <img
              class="pointer"
              src="./src/img/icons/wishlist.svg"
              alt="wishlist icon"
              id="wishlist-page-icon"
              />
              <span class="item-counter"></span>
            </div>
            <div id="cart-page-wrapper">
              <img 
              class="pointer"
              src="./src/img/icons/cart.svg" 
              alt="cart icon" 
              id="cart-page-icon"
              />
              <span class="item-counter"></span>
            </div>
            </div>
        </div>
        </nav>`;
    const header = document.createElement("header")
    header.classList.add("p-20")
    header.innerHTML = navigation;
    return header;
}
export function createFooterGlobal(){
    const footerHtml = `
    <div class="footer-content flex m-side-40 justify-between align-center gap-40">
      <div class="flex-column gap-10 ">
        <h4>Exclusive</h4>
        <p>Subscribe</p>
        <p>Get 10% off your first order</p>
        <div class="email-input">
          <input
            type="email"
            placeholder="Enter your Email"
            class="p-10 bc-transparent c-white"
          />
          <img src="./src/img/icons/email-arrow.svg" alt="arrow" />
        </div>
      </div>
      <div class="flex-column gap-10">
        <h4>Support</h4>
        <p>
          111 Gldani, Tbilisi, <br />
          DH 1515, Georgia.
        </p>
        <p>luka.nemsitsveridze16@gmail.com</p>
        <p>+555-555-555</p>
      </div>
      <div class="flex-column gap-10">
        <h4>Quick Link</h4>
        <p>Privacy Policy</p>
        <p>Terms Of Use</p>
        <p>FAQ</p>
        <p>Contact</p>
      </div>
      <div class="flex-column gap-10">
        <h4>Download</h4>
        <p>Save $3 with App New User Only</p>
        <div class="flex gap-10">
          <div>
            <img src="./src/img/QR-code.png" alt="QR code" />
          </div>
          <div class="flex-column gap-10">
            <img src="./src/img/google-play.png" alt="google play" />
            <img src="./src/img/app-store.png" alt="app store" />
          </div>
        </div>
        <div class="flex justify-between align-center">
          <img
            src="./src/img/icons/fb.svg"
            class="social-net-icon"
            alt="facebook"
          />
          <img
            src="./src/img/icons/twitter.svg"
            class="social-net-icon"
            alt="twitter"
          />
          <img
            src="./src/img/icons/linkdin.svg"
            class="social-net-icon"
            alt="linkdin"
          />
          <img
            src="./src/img/icons/instagram.svg"
            class="social-net-icon"
            alt="instagram"
          />
        </div>
      </div>
    </div>
    <div class="copyright-footer text-center mt-50 pt-20">
      <p>&copy; Copyright Rimel 2022. All right reserved</p>
    </div>`

    const footer = document.createElement("footer");
    footer.classList.add("mt-50","bc-black","c-white","p-50")
    footer.innerHTML = footerHtml;
    return footer
}

export function changeWishIcon(icon){
  const svg = "wishlist.svg";
  const activeSvg = "wishlist-red.svg"
  if(icon.src.toString().includes(svg)){
      icon.src = icon.src.toString().replace(svg, activeSvg)
  }
  else if(icon.src.toString().includes(activeSvg)){
      icon.src = icon.src.toString().replace(activeSvg,svg)
  }
}

export const WISHLIST_ID = "wishlist-page-wrapper"
export const CART_ID = "cart-page-wrapper";
export function updateHeaderCounter(id){
  if(id === WISHLIST_ID)
  {
    const wishlist = document.getElementById(WISHLIST_ID);
    const counterSpan = wishlist.getElementsByClassName("item-counter")[0];

    const result = WISHLIST_ITEMS.length === 0 ? '' : WISHLIST_ITEMS.length; 
    counterSpan.textContent = result;
  }
  else if(id === CART_ID){
    const cart = document.getElementById(CART_ID)
    const counterSpan = cart.getElementsByClassName("item-counter")[0];

    const result = CART_ITEMS.length === 0 ? '' : CART_ITEMS.length; 
    counterSpan.textContent = result;
  }
}

function addRightClick(element, id)
{
  element.addEventListener("contextmenu", (e) => {
    e.preventDefault(); 

    const menu = document.createElement("div");
    menu.style.position = "absolute";
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
    menu.style.zIndex = "1000";
    menu.innerHTML = `   
        <button id="viewDetails" class="p-15 br-5 pointer c-black bolder border-none">View Details</button>
      `;
    document.body.appendChild(menu);

    document.getElementById("viewDetails").addEventListener("click", () => {
      window.location.href = `details.html?id=${id}`;
      menu.remove();
    })
    
    document.addEventListener(
      "click",
      (event) => {
        if (!menu.contains(event.target)) {
          menu.remove();
        }
      }
    );
  });

}

function setHtmlHeaderAndFooter(){
    const body =   document.getElementsByTagName("body")[0];
    body.prepend(createHeaderGlobal())
    body.appendChild(createFooterGlobal())
}
function addEventToShoppingCart(){
  document.getElementById("cart-page-icon").addEventListener("click",
  () => {
    window.location.href = `carts.html?cartsList=${encodeURIComponent(JSON.stringify(CART_ITEMS))}`;
  });
}
function addEventToWishlist(){
  document.getElementById("wishlist-page-icon").addEventListener("click",
  () => {
    window.open(`wishlist.html?wishlistItems=${encodeURIComponent(JSON.stringify(WISHLIST_ITEMS))}`,"_blank");
  });
}

function addEventToMenuButton(){
  const menuButton = document.getElementById("menu-button")
  const navBar = document.getElementById("nav-bar")
  menuButton.addEventListener("click", () => {
    const pages = document.getElementById("pages-link");
    if(pages.classList.contains("mobile-none"))
    {
      pages.classList.remove("mobile-none")
      pages.classList.add("flex-column")
      navBar.classList.add("align-start")
    }
    else {
      pages.classList.add("mobile-none")
      pages.classList.remove("flex-column")
      navBar.classList.remove("align-start")
    }
  })
}

setHtmlHeaderAndFooter();
addEventToShoppingCart();
addEventToWishlist();
addEventToMenuButton();

// wishlist-page-icon
// cart-page-icon

