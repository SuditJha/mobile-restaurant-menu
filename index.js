import menuArray from "./data.js"

console.log(menuArray)


function render(menuArray){
    return menuArray.map((item)=>{
        return `
                    <div class="menu-item">
                        <div class="menu-item-description">
                            <h2 class="emoji">${item.emoji}</h2>
                            <div class="description">
                                <h4>${item.name}</h4>
                                <p>${item.ingredients}</p>
                                <h5>${'$'+item.price}</h5>
                            </div>
                        </div>
                        <div><button class="addItem">+</button></div>
                    </div>
`
    }).join('')
    
}
document.getElementById("menu-list").innerHTML = render(menuArray)
// render(menuArray)

