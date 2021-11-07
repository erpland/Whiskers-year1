//פונקציות דף החנות


//<---הדפסת המוצרים וקרוסלת המבצעים-->
function PrintSales() {
    if(products.length==0)
        return
    let printIndicators = ``
    let printItems = ``
    const salesArr = new Array()
    for (let i = 0; i < products.length; i++) {
        if (products[i].sale_price != 0) {
            salesArr.push(products[i])
        }
    }
    salesArr.sort((a, b) => { return (CalculateDiscount(b)) - (CalculateDiscount(a)) })
    for (let i = 0; i < salesArr.length && i < 10; i++) {
        printIndicators += `<button type="button" data-bs-target="#carouselsales" data-bs-slide-to="${i}" aria-current="true"aria-label="Slide ${i + 1}"></button>`
        printItems += `
        <div class="carousel-item" data-index=${salesArr[i].index}>

            <div id="sales-container">
                <div id="sale-info">
                    <div class="sale-text">
                    <h1>Explore Our <br>Discounted Offers</h1>
                    <button onclick="GoToItemPage(${salesArr[i].index})">More Info</button>
                    <div class="vr"></div>
                    </div>
                </div>
                <div class="img-sale">
                <div class="sale-tag">
                <h5>ONLY</h5>
                <hr>
                <h4>£${salesArr[i].sale_price}</h4>
            </div>
                    <img src="${salesArr[i].img_link}" class="d-block w-100" onclick="GoToItemPage(${salesArr[i].index})">
                    <div class="media-text"><h4>${GetFullProductName(salesArr[i])}</h4><small>${CalculateDiscount(salesArr[i])}% OFF!</small></div>
                    </div>
            </div>
        </div> `
    }
    document.querySelector(`.carousel-indicators`).innerHTML = printIndicators
    document.querySelector(`.carousel-inner`).innerHTML = printItems

    document.querySelector(`[data-bs-slide-to="0"]`).classList.add(`active`)
    document.querySelector(`.carousel-item`).classList.add(`active`)
}
function PrintProducts() {
    let print = ``
    for (let i = 0; i < sorted.length; i++) {
        print += `<div class="shop-item-box" data-filter=${false}>
        <img src="${sorted[i].img_link}" onclick="GoToItemPage(${sorted[i].index})" alt="${GetFullProductName(sorted[i])}">
        <div class="shop-item-info">
          <h4>${GetFullProductName(sorted[i])}</h4>
          <div class="prices">`
        if (sorted[i].sale_price != 0) {
            print += `<h5 class="sale">£${sorted[i].price}</h5>
            <h3>£${sorted[i].sale_price}</h3>`
        }
        else {
            print += `<h5>£${sorted[i].price}</h5>`
        }
        print += `</div>
        <button class="buy-btn" onclick="AddToCart(sorted[${i}],${1})">Buy</button>
        </div >
        </div >`
    }
    document.querySelector(`#products`).innerHTML = print
}
function GoToItemPage(index) {
    sessionStorage.setItem(`selected_item`, JSON.stringify(index))
    location.href = `item.html`
}

//<---הדפסת אפשריות סינון דינמיות לפי המוצרים הקיימים-->
function SetSortOptions() {
    //יצירת רשימה שלא חוזרת על עצמה לפי כל מאפיין במוצר
    let options = [new Set(products.map(a => a.brand))]
    //המרתו מסט למערך רגיל
    options = Array.from(options[0])
    //מיון לפי האלף בית
    options.sort()
    //הדפסתו באפשרויות הבחירה
    PrintOptions(sortBrand, options)

    options = [new Set(products.map(a => a.country))]
    options = Array.from(options[0])
    options.sort()
    PrintOptions(sortCountry, options)

    options = [new Set(products.map(a => a.region))]
    options = Array.from(options[0])
    options.sort()
    PrintOptions(sortRegion, options)

    options = [new Set(products.map(a => a.type))]
    options = Array.from(options[0])
    options.sort()
    PrintOptions(sortType, options)
}
function PrintOptions(option, arr) {
    print = `<option value="All" selected="selected">All</option>`
    for (let i = 0; i < arr.length; i++) {
        print += `<option value="${arr[i]}">${arr[i]}</option>`
    }
    option.innerHTML = print
}

//<---------פונקציות הסינון והסדר--------->
function FilterItems() {
    //בדיקת כל אפשרויות הבחירה הישירות(אלו שבלי טווח)
    let selectedOption = []
    let inputName = []
    sorted = []
    //שמירת כל השדות השדות שנבחרו וערכם
    for (let i = 0; i < directSelect.length; i++) {
        if (directSelect[i].value != `All`) {
            inputName.push(directSelect[i].name.toLowerCase())
            selectedOption.push(directSelect[i].value)
        }
    }
    // let isFit = true;
    //לולאת הבדיקה בשלולשה חלקים
    //א.סינון מוצרים לפי אפשרויות הבחירה הישירות
    //ב.סינון המוצרים במבצע אם תבית הבחירה לחוצה
    //ג.סינון טווח אחוז האלכוהול אם נבחר
    for (let i = 0; i < products.length; i++) {
       let isFit = true;
        for (let j = 0; j < inputName.length; j++) {

            if (products[i][inputName[j]] != selectedOption[j]) {
                isFit = false
                break;
            }
        }
        if (sortOnSale.checked && !SortSale(products[i]))
            isFit = false
        if (sortAbv.value != `All` && !SortAbv(products[i]))
            isFit = false
        //אם המשתנה בולאיני לא השתנה כלמר שהמוצר מתאים לסינון לכן נכניס אותו למערך המסונן
        if (isFit)
            sorted.push(products[i])
    }
    //קריאה לפונקציית הסדר כדי לשמור על הסדר שהמשתמש ביקש
    SortOrder()
    //הדפסה חדשה של המוצרים במערך הסינון
    PrintProducts(sorted)
}

function SetSortOrder(icon) {
    icon.classList.add(`active`)
    sortIcons.forEach(element => {
        if (element != icon)
            element.classList.remove(`active`)
    });
    SortOrder()
}
function SortOrder() {
    let name = document.querySelector(`#sort-icons .active`).dataset.name
    if (name == `brand-down`)
        sorted.sort((a, b) => (a.brand > b.brand) ? 1 : -1)
    else if (name == `brand-up`)
        sorted.sort((a, b) => (a.brand < b.brand) ? 1 : -1)
    else if (name == `price-down`)
        sorted.sort((a, b) => a.price - b.price)
    else if (name == `price-up`)
        sorted.sort((a, b) => b.price - a.price)

    PrintProducts(sorted)
}
function SortSale(item) {
    if (item.sale_price != 0)
        return true
    return false
}
function SortAbv(item) {
    if (sortAbv.value == `43`)
        return item.abv < 43
    else if (sortAbv.value == `46`)
        return item.abv >= 43 && item.abv <= 46
    else
        return item.abv > 46
}
function ResetSort() {
    sorted = products
    SetSortOrder(sortIcons[0])

}
//<---------------------------------------->

//פונקציות עזר לחישוב אחוז ההנחה
function CalculateDiscount(item) {
    let result = ((item.price - item.sale_price) / item.price) * 100
    return parseInt(result)
}