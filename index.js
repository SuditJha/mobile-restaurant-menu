import { menuArray, orderArray} from "./data.js"
// import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// console.log(menuArray)
// console.log(uuidv4())

const menuList = document.getElementById("menu-list")
const orderList = document.getElementById('order-list-container')


menuList.addEventListener("click", handleAddItemEvent)//Add Item to menu
orderList.addEventListener("click", handleRemoveItemOrCompleteOrderEvent)//Remove Item from Orders

// Event Listeners

function handleAddItemEvent(e){
    const menuItem = menuArray.filter((menuItem) => {
        return menuItem.uuid === e.target.id
    })[0]
    if(!orderArray.includes(menuItem) && menuItem){
        orderArray.push(menuItem)
        renderOrders(orderArray)
    }
    // console.log(orderArray)
}

function handleRemoveItemOrCompleteOrderEvent(e){
    
    const removedItem = orderArray.filter((orderItem) => {
        return orderItem.uuid === e.target.id
    })[0]
    if(removedItem){
        const removedItemIndex = orderArray.indexOf(removedItem)
        orderArray.splice(removedItemIndex, 1)
        renderOrders(orderArray)
    }
// Handle Complete Order Event
    if(e.target.id === 'complete-order-btn'){
        // console.log(e.target.id)
        document.getElementById("payment-modal").style.display = 'block'
        completeOrderPayment()
    }
}

// Function Calls from Event Listeners

// Rendering Orders Array
function renderOrders(ordersArray){
    if(orderArray.length){
        orderList.style.display = 'block'
        let tempOrderHtml = `<h2>Your Order</h2>`
        tempOrderHtml += `
            <div id="order-item-list">
                ${getOrderItemListHtml(ordersArray)}
            </div>
            `
        tempOrderHtml += `<div class="order-item divider"><h3>Total Price:</h3><h3>$${getOrderTotal(orderArray)}</h3></div>`
        tempOrderHtml += `<button class="complete-order-btn" id="complete-order-btn">Complete Order</button>`
        const ordersHtml = tempOrderHtml
        orderList.innerHTML = ''
        orderList.innerHTML = ordersHtml
    }else{
        orderList.innerHTML = ''
    }
}

function completeOrderPayment(){
    const paymentFormEl = document.getElementById('payment-modal-inner')

    document.getElementById("customer-name").addEventListener("keypress", function(evt) {
        const keyPressed = evt.key;
        const isNumber = /^\d$/.test(keyPressed);
        if (isNumber) {
            evt.preventDefault();
        }
    })

    document.getElementById("cvv").addEventListener("keypress", function(evt) {
        const keyPressed = evt.key;
        const isNumber = /^\d$/.test(keyPressed);
        if (!isNumber) {
            evt.preventDefault();
        }
    })
    
    paymentFormEl.addEventListener("submit", function(e){
        e.preventDefault()
        const formData = new FormData(paymentFormEl)
        orderComplete(formData.get('customer-name'))
        paymentFormEl.reset()
    })
    // console.log(paymentFormEl)
    
}

// Function Calls from Other Functions

function getOrderItemListHtml(ordersArray){
    return ordersArray.map((item) => {
        return `
        <div class="order-item" >
            <div class="order-item-description">
                <h4>${item.name}</h4>
                <button class="remove-item-btn" id="${item.uuid}">REMOVE</button>
            </div>
            <h4>$${item.price}</h4>
        </div>
        `
    }).join('')
}

function getOrderTotal(orderArray){
    return orderArray.reduce((total, item) => total + item.price, 0)
}


function orderComplete(name){
    document.getElementById("payment-modal").style.display = 'none'
    orderList.style.display = 'none'

    document.getElementById("order-complete").innerHTML = `
        <div class="order-complete">
            <h2>Thanks, ${name}! Your order is on its way!</h2>
        </div>
    `
    setTimeout(function(){
        document.getElementById("order-complete").innerHTML = ''
        let orderArrayLength = orderArray.length 
        for(let i = 0; i < orderArrayLength; i++){
            orderArray.pop()
        }
        
    }, 5000)
    console.log(name)
}

// Default Menu Function Called on Load
function renderMenu(menuArray){
    return menuArray.map((item)=>{
        return `
                    <div class="menu-item" id="${item.id}">
                        <div class="menu-item-description">
                            <h2 class="emoji">${item.emoji}</h2>
                            <div>
                                <h3>${item.name}</h3>
                                <p class="ingredients">${item.ingredients}</p>
                                <h4>${'$'+item.price}</h4>
                            </div>
                        </div>
                        <div><button class="add-item-btn" id="${item.uuid}">+</button></div>
                    </div>
`
    }).join('')
    
}
document.getElementById("menu-list").innerHTML = renderMenu(menuArray)


