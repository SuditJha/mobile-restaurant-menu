import { menuArray, orderArray} from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// console.log(menuArray)
// console.log(uuidv4())

const menuList = document.getElementById("menu-list")
const orderList = document.getElementById('order-list-container')

menuList.addEventListener("click", handleAddItemBtn)


function handleAddItemBtn(e){
    const menuItem = menuArray.filter((menuItem) => {
        return menuItem.uuid === e.target.id
    })[0]
    if(!orderArray.includes(menuItem)){
        console.log(menuItem)
        orderArray.push(menuItem)
        renderOrders(orderArray)
    }
    // console.log(orderArray)
}

// Rendering Orders Array
function renderOrders(ordersArray){
    document.getElementById("order-list-container").style.display = 'block'
    const ordersHtml = ordersArray.map((item)=>{
        `<h2>Your Order</h2>
        <div id="order-item-list">
            ${getOrderItemListHtml(ordersArray)}
        </div>
        <button class="complete-order-btn" id="complete-order-btn">Complete Order</button>
        `
    }).join('')
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
// render(menuArray)

