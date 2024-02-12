import { menuArray, orderArray} from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// console.log(menuArray)
// console.log(uuidv4())

const menuList = document.getElementById("menu-list")
const orderList = document.getElementById('order-list-container')

menuList.addEventListener("click", handleAddItemEvent)


function handleAddItemEvent(e){
    const menuItem = menuArray.filter((menuItem) => {
        return menuItem.uuid === e.target.id
    })[0]
    if(!orderArray.includes(menuItem)){
        orderArray.push(menuItem)
        renderOrders(orderArray)
    }
    // console.log(orderArray)
}

// Rendering Orders Array
function renderOrders(ordersArray){
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

}

function getOrderItemListHtml(ordersArray){
    return ordersArray.map((item) => `
    <div class="order-item">
        <div class="order-item-description">
            <h4>${item.name}</h4>
            <button class="remove-item-btn" id="remove-item-btn">REMOVE</button>
        </div>
        <h4>$${item.price}</h4>
    </div>
    `).join('')
}

function getOrderTotal(orderArray){
    return orderArray.reduce((total, item) => total + item.price, 0)
}

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


