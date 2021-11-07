//אם לא נבחר מוצר מחנות נחזור לחנות
if(!sessionStorage.getItem(`selected_item`))
    location.href=`shop.html`
//משתנים לסכימת העגלה
// var userTotalSum=0
// var userTotalQty=0
//
//
//שמירת מערך המוצרים מהלוקל
const products = JSON.parse(localStorage.getItem(`products`))
// var sorted = products
//שמירת האינדקס של המוצר המבוקש שנשלח מהחנות
const index=JSON.parse(sessionStorage.getItem(`selected_item`))
//שליפת המוצר המתאים ממערך המוצרים
var item=products.filter((item)=>{return item.index==index})[0]
// item=item[0]

// var cart_items = JSON.parse(sessionStorage.getItem('cart')) || []
//הדפסת המוצר בעמוד
PrintItem()

//כמות המוצר מהאינפוט
var amount=1
const itemQty = document.querySelector(`#item-qty`)
itemQty.itemQty=addEventListener(`change`,(()=>{amount=parseInt(itemQty.value)}))

// PrintCart()






