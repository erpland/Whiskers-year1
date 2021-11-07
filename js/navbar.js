
//אם יש משתמש מחובר נציג את התמונה בתפריט אם לא נציג את אפשרות ההתחברות
const noUserBtn = document.querySelector(`#not-logged`)
const userAvatar = document.querySelector(`.avatar`)
if (!sessionStorage.getItem(`login_user`)) {
    userAvatar.style.display = `none`
    noUserBtn.style.display = `contents`
}
else {
    const userImage = JSON.parse(sessionStorage.getItem(`login_img`))
    userAvatar.querySelector(`img`).src = userImage
    userAvatar.style.display = `block`
    noUserBtn.style.display = `none`
}

//אם אין משתמשים בלוקל נכניס את המשתמשים הדיפולטיבים
if (!localStorage.getItem(`users_data`)) {
    localStorage.setItem(`users_data`, JSON.stringify(defualtUsers))
    localStorage.setItem(`users_images`, JSON.stringify(defaultUsersImages))
}
//אם אין מוצרים בלוקל נכניס את המוצרים הדיפולטיבים
if (!localStorage.getItem(`products`))
    localStorage.setItem(`products`, JSON.stringify(defaultProducts))
    
//מחיקת המוצר שנלחץ בחנות אם אנחנו לא בדף שלו(לא חובה אבל אין למה לשמור)
if (location.pathname != `/item.html`)
    sessionStorage.removeItem('selected_item');

//פונקציה להתנקות המתשמש
function Disconnect() {
    sessionStorage.removeItem(`login_user`)
    location.reload();
}

//משתנים לסכימת כל העגלות שנקנו של כל המשתמשים כדי להציג לאדמין
var total_sum = parseFloat(localStorage.getItem(`total_sum`)) || 0
var total_qty = parseInt(localStorage.getItem(`total_qty`)) || 0
//איפוס משתני העגלה הנוכחית של המשתמש הנוכחי
var userTotalSum = 0
var userTotalQty = 0

//שמירת העגלה מהסשן
var cart_items = JSON.parse(sessionStorage.getItem('cart')) || []
//הדפסת העגלה
PrintCart()