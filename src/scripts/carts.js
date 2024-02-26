import "./global.js";

const urlParams = new URLSearchParams(window.location.search);
const items = JSON.parse(decodeURIComponent(urlParams.get("cartsList")));

function setCartsTable(items){
    const table = document.createElement("table")
    const tableHtml = `
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
        </tr>
    </thead>
    <tbody>
        ${
            items.map(el =>
                    `
                    <tr>
                        <td>
                            <img src="${el.image}" alt="product" class="item-image"/>      
                        </td>
                        <td class="item-price">
                            $${el.price}
                        </td>
                        <td>
                            <input type="number" value="1" min="1">
                        </td>
                        <td>
                            $${el.price}
                        </td>
                    </tr>
                    `   
            ).join(``)
        }
    </tbody>
    <tfoot>
        <tr>
            <td>Total</td>
            <td id="total">$${items.map(el => el.price).reduce((acc,curr) => { return acc+curr;}, 0)}</td>
        </tr>
    </tfoot>
    `
    table.innerHTML = tableHtml
    document.getElementById("item-table").appendChild(table);

    addListenerToQuantity()
}

function addListenerToQuantity(){
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function () {
            updateSubtotal(this);
        });
    });
}

function updateSubtotal(input) {
    const price = parseFloat(input.parentNode.previousElementSibling.textContent.replace('$', ''));
    const quantity = parseInt(input.value);
    const subtotal = price * quantity;
    input.parentNode.nextElementSibling.textContent = `$${subtotal.toFixed(2)}`;
    updateTotal();
}

function updateTotal() {
    // რადგან Subtotal ბოლო td ელემენტია 
    const subtotals = document.querySelectorAll('tbody td:last-child');
    let total = 0;

    subtotals.forEach(subtotal => {
        total += parseFloat(subtotal.textContent.replace('$', ''));
    });
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

setCartsTable(items);