//פונקציות לדף האדמין- פונקציות עדכון המוצר והמשתמשים
//בקובץ נפרד-updates-modal


//<---פונקציות עיצוב והדפסת סטטיסטיקות--->
function HamToggle(event) {
    const nav = document.querySelector(`nav`)
    const main = document.querySelector(`.main-page`)
    event.target.classList.toggle(`active`)
    nav.classList.toggle(`active`)
    main.classList.toggle(`active`)
}
function StatsUpdate() {
    let registeredUsers = users_data.length || 0
    let itemsInStore = products.length || 0
    let itemsSold = JSON.parse(localStorage.getItem(`total_qty`)) || 0
    let itemsOnSale = products.filter((items) => { return items.sale_price != 0 }).length || 0
    let profits = JSON.parse(localStorage.getItem(`total_sum`)) || 0

    document.querySelector(`#registered-users`).innerHTML = registeredUsers
    document.querySelector(`#items-inStore`).innerHTML = itemsInStore
    document.querySelector(`#items-sold`).innerHTML = itemsSold
    document.querySelector(`#items-onSale`).innerHTML = itemsOnSale
    document.querySelector(`#sales-Profit`).innerHTML = parseFloat(profits).toFixed(2)
}
function Disconnect() {
    sessionStorage.clear()
    location.href = `home.html`
}
//<----------------------------------------------------->


//<---פונקציות למשתמשים--->
function PrintUsers() {
    let print = ``
    for (let i = 0; i < users_data.length; i++) {
        print += `<div class="user-row" data-index=${users_data[i].index}>
        <div class="img-div img-media"><img src="${users_images[i]}" alt=""></div>
        
        <p>${users_data[i].user_name}</p>
        <p>${users_data[i].user_email}</p>
        <p>${GetFullName(i)}</p>
        <div>
            <i class="fas fa-edit" data-toggle="modal" data-target="#update-profile-modal" onclick="SetEditUser(${i})"></i>
            <i class="fas fa-trash-alt" onclick="DeleteUser(${i})"></i>
        </div>
    </div>`
    }
    // <div class="img-div" style="background-image: url(${users_images[i]})"></div>
    document.querySelector(`#users .list`).innerHTML = print
}
function DeleteUser(userIndex) {
    users_data.splice(userIndex, 1)
    users_images.splice(userIndex, 1)
    SortIndexes(users_data)
    localStorage.setItem(`users_data`, JSON.stringify(users_data))
    localStorage.setItem(`users_images`, JSON.stringify(users_images))
    PrintUsers()
    StatsUpdate()
}
function GetFullName(index) {
    return `${users_data[index].user_first_name} ${users_data[index].user_last_name}`
}
//<----------------------------------------------------->

//<---פונקציות למוצרים--->
function PrintProducts() {
    let print = ``
    for (let i = 0; i < products.length; i++) {
        print += `<div class="user-row" data-index=${products[i].index}>
        <img class="img-media" src="${products[i].img_link}" alt="">
        <p>${products[i].brand}</p>
        <p>${products[i].name}</p>
        <p>£${products[i].price}</p>`
        if (products[i].sale_price != 0)
            print += `<p class="print-sale-price">£${products[i].sale_price}</p>`
        else {
            print += `-`
        }
        print += `<div>
            <i class="fas fa-edit" data-toggle="modal" data-target="#edit-product-modal" onclick="SetEditProduct(${i})"></i>
            <i class="fas fa-trash-alt" onclick="DeleteItem(${i})"></i>
        </div>
    </div>`
    }
    document.querySelector(`#products .list`).innerHTML = print
}
function DeleteItem(itemIndex) {
    products.splice(itemIndex, 1)
    SortIndexes(products)
    localStorage.setItem(`products`, JSON.stringify(products))
    PrintProducts()
    StatsUpdate()
}
//<----------------------------------------------------->

//<---פונקציות הוספת מוצר--->
function AddProduct() {
    brand.value = StringFormat(brand.value)
    itemName.value = StringFormat(itemName.value)
    description.value = StringFormat(description.value, true)
    age.value=parseInt(age.value)
    price.value=parseFloat(price.value)
    sale_price.value=parseFloat(sale_price.value)
    let msgDiv = document.querySelector(`.msg`)
    let msgStatus = document.querySelector(`#product-status`)

    if (brand.value === ``)
        BlankError(brand)
    else if (!IsProductNameValid(brand.value))
        SetError(brand, "Only English")
    else
        SetSuccses(brand)
    if (itemName.value === ``)
        BlankError(itemName)
    else if (!IsProductNameValid(itemName.value))
        SetError(itemName, "Only English")
    else
        SetSuccses(itemName)
    if (age.value === ``)
        BlankError(age)
    else if (age.value < 3)
        SetError(age, `3yo Minimum`)
    else
        SetSuccses(age)
    if (abv.value === ``)
        BlankError(abv)
    else if (abv.value < 40)
        SetError(abv, `40% abv Minimum`)
    else if (abv.value > 90)
        SetError(abv, `90% abv Maximum`)
    else
        SetSuccses(abv)
    if (price.value === ``)
        BlankError(price)
    else if (price.value <= 0)
        SetError(price, `Only Positive Numbers`)
    else
        SetSuccses(price)

    if (description.value === ``)
        BlankError(description)
    else if (!IsProductNameValid(description.value))
        SetError(description, "Only English")
    else if (description.value.length < 30)
        SetError(description, "30 Letters Minimum")
    else
        SetSuccses(description)
    if (isSale.checked && (sale_price.value == 0 || sale_price.value == ``))
        BlankError(sale_price)
    else if (sale_price.value < 0)
        SetError(sale_price, `Only Positive Numbers`)
    else if (isSale.checked && parseInt(sale_price.value) >= price.value)
        SetError(sale_price, `Invalid Sale Price`)
    else
        SetSuccses(sale_price)

    SetSuccses(type)
    SetSuccses(country)
    SetSuccses(region)

    if (!IsProductValid(productInputs)) {
        SetProductMsg(`Invalid Product`, msgDiv, msgStatus, false)
        return
    }


    if (IsProductExist(brand.value, itemName.value)
    ) {
        SetProductMsg(`Product Exist!`, msgDiv, msgStatus, false)
        return
    }

    const newProduct = new Product(brand.value, itemName.value, region.value, age.value, price.value, sale_price.value, type.value, country.value, abv.value, productImg.src, description.value, products.length)
    products.push(newProduct)
    localStorage.setItem(`products`, JSON.stringify(products))
    SetProductMsg(`Added Succsessfully!`, msgDiv, msgStatus, true)

    PrintProducts()
    StatsUpdate()
    setTimeout(() => { ClearProductForm() }, 5000)



}
function AgeChecked(event) {
    if (event.target.checked) {
        age.disabled = false
        age.type = `number`
    }
    else {
        age.disabled = true
        age.type = `text`
        age.value = `No Age Statement`
    }
    EnableAddProudctBtn()
}
function SaleChecked() {
    if (isSale.checked) {
        sale_price.value = ``
        sale_price.disabled = false
    }
    else {
        sale_price.value = 0
        sale_price.disabled = true
    }
    EnableAddProudctBtn()
}
function RegionOptions(event) {
    if (event.target.value != `Scotland`) {
        region.selectedIndex = 6
        region.disabled = true
    }
    else
        region.disabled = false
}
function EnableAddProudctBtn() {
    for (let i = 0; i < productInputs.length; i++) {
        if (productInputs[i].value == `` || productImgUpload.value == ``) {
            addProductBtn.disabled = true
            return
        }
    }
    addProductBtn.disabled = false
}
function ClearProductForm() {
    document.querySelector(`#product-form`).reset()
    document.querySelector(`#product-status`).className = ``
    productInputs.forEach(element => {
        element.parentElement.classList.remove(`valid`)
        element.parentElement.classList.remove(`invalid`)
    });
    productImg.src = `images/shop/emptybottle.png`
    addProductBtn.disabled = true
}
//<----------------------------------------------------->


//<---פונקציות המשמשות גם לעדכון וגם ליצירת מוצר--->
function SetProductMsg(text, msgDiv, msgStatus, isValid) {
    msgDiv.innerHTML = text
    if (isValid)
        msgStatus.className = `valid`
    else
        msgStatus.className = `invalid`
}
function IsProductValid(productInputs) {
    for (let i = 0; i < productInputs.length; i++) {
        if (!(productInputs[i].parentElement.classList.contains(`valid`))) {
            productInputs[i].focus()
            return false
        }
    }
    return true
}
function IsProductExist(brand, name) {
    return products.filter((item) => item.index != productIndex).filter((item) => { return item.brand == brand && item.name == name }).length != 0 ? true : false
}
function SortIndexes(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].index = i
    }
}
//<----------------------------------------------------->

