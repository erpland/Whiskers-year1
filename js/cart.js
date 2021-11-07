//פונקציות לעגלת הקניות

function PrintCart() {
    let print = ``
    userTotalSum = 0
    userTotalQty = 0
    for (let i = 0; i < cart_items.length; i++) {
        print += `
        <div class="cart-item">
        <b class="cart-item-remove" onclick="RemoveFromCart(${i})">X</b>
        <img src="${cart_items[i].img_link}">
        <p class="item-cart-price">${GetFullProductName(cart_items[i])}</p>
        <div class="cart-qty">
            <div id="cart-add-remove">
                <small onclick="ChangeQty(${i},${1})">+</small>
                <small onclick="ChangeQty(${i},${-1})">-</small>
            </div>
        <p>${cart_items[i].qty}</p>
        </div>
        <div class="price">`
        if (cart_items[i].sale_price != 0) {
            userTotalSum += parseFloat(cart_items[i].sale_price) * cart_items[i].qty
            print += `<p class="crossed-price">£${cart_items[i].price}</p>
                        <p class="sale-price">£${cart_items[i].sale_price}</p>`
        }
        else {
            userTotalSum += parseFloat(cart_items[i].price) * cart_items[i].qty
            print += `<p>£${cart_items[i].price}</p>`

        }
        print += `</div></div>`
        userTotalQty += parseInt(cart_items[i].qty)
    }
    if (print == ``)
        document.querySelector(`#empty-cart`).className = `active`
    else
        document.querySelector(`#empty-cart`).className = `inactive`
    userTotalSum = userTotalSum.toFixed(2)
    document.querySelector(`#cart-items`).innerHTML = print
    document.querySelector(`#total-qty`).innerHTML = userTotalQty
    document.querySelector(`#total-price`).innerHTML = `£` + userTotalSum
    document.querySelector(`.badge-pill`).innerHTML = userTotalQty


}
function AddToCart(item, amount) {
    if (isNaN(amount) || amount < 1)
        return
    let IndexInCart = cart_items.findIndex((cartIndex) => { return cartIndex.index == item.index })
    if (IndexInCart != -1) {
        cart_items[IndexInCart].qty += parseInt(amount)
    }
    else {
        item.qty += parseInt(amount)
    }
    if (IndexInCart == -1)
        cart_items.push(item)
    sessionStorage.setItem(`cart`, JSON.stringify(cart_items))
    PrintCart()
}
function BuyCart() {
    if (userTotalQty == 0) {
        BuyCartMsg(false, `No Items!`)
        return
    }
    if (!sessionStorage.getItem(`login_user`)) {
        location.href = `login.html`
        return
    }
    total_sum += parseFloat(userTotalSum)
    total_qty += parseInt(userTotalQty)
    localStorage.setItem(`total_sum`, JSON.stringify(total_sum))
    localStorage.setItem(`total_qty`, JSON.stringify(total_qty))
    BuyCartMsg(true, `Thank You!`)

    ClearCart()


}
function RemoveFromCart(index) {
    cart_items[index].qty = 0
    cart_items.splice(index, 1)
    sessionStorage.setItem(`cart`, JSON.stringify(cart_items))
    PrintCart()
}
function ClearCart() {
    cart_items.forEach(element => {
        element.qty = 0
    });
    cart_items = []
    sessionStorage.setItem('cart', JSON.stringify([]))
    PrintCart()
}


function GetFullProductName(item) {
    return `${item.brand} ${item.name}`
}
function ChangeQty(index, amount) {
    cart_items[index].qty += parseInt(amount)
    if (cart_items[index].qty == 0)
        RemoveFromCart(index)
    sessionStorage.setItem(`cart`, JSON.stringify(cart_items))
    PrintCart()
}
function BuyCartMsg(state, msg) {
    let field = document.querySelector(`#cart-msg`)
    field.textContent = msg
    if (state)
        field.className = `succsess`

    else
        field.className = `failed`
    
    setTimeout(()=>{field.className=`cart-msg`},3000)

}
