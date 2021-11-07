//איתחול ומשתנים כללים
const hamburger=document.querySelector(`.hamburger`)
hamburger.addEventListener(`click`,HamToggle)
var userIndex;
var productIndex
const users_data = JSON.parse(localStorage.getItem('users_data')) || []
const users_images = JSON.parse(localStorage.getItem('users_images')) || []
const products = JSON.parse(localStorage.getItem('products')) || []
document.querySelector(`#disconnect-btn`).addEventListener(`click`,Disconnect)
//הכנסת מוצרים דיפולטבים אם אין מוצרים בלוקל
if (!localStorage.getItem(`products`))
    localStorage.setItem(`products`, JSON.stringify(defaultProducts))

//הדפסות חלקי העמוד
PrintUsers()
PrintProducts()
StatsUpdate()


//---------------------עריכת משתמש----------------------->
//מעבר בין העמודים של מודל עריכת המשתמש
const page1=document.querySelector(`.modal-page1`)
const page2=document.querySelector(`.modal-page2`)
const page3=document.querySelector(`.modal-page3`)
const pageBar=document.querySelector(`#pick`)
const clickChoice1=document.querySelector(`#click1`)
clickChoice1.addEventListener(`click`,ClickPage1)
const clickChoice2=document.querySelector(`#click2`)
clickChoice2.addEventListener(`click`,ClickPage2)
const clickChoice3=document.querySelector(`#click3`)
clickChoice3.addEventListener(`click`,ClickPage3)
//הצגת הסיסמאות כטקסט בלחיצת כפתור
document.querySelector('#showPassword').addEventListener(`click`,ShowPassword)
document.querySelector('#showPasswordConfirm').addEventListener(`click`,ShowPassword)

//כל האינפוטים של המשתמש בנפרד
const username=document.querySelector(`#username`)
const email=document.querySelector(`#email`)
const password=document.querySelector(`#password`)
password.addEventListener(`keyup`,()=>PasswordConfirmShow(users_data[userIndex]))
const passwordConfirm=document.querySelector(`#passwordConfirm`)
const passwordConfirmField=document.querySelector(`#password-confirm-field`)
const firstName=document.querySelector(`#firstName`)
const lastName=document.querySelector(`#lastName`)
const birthday=document.querySelector(`#birthday`)
const city=document.querySelector(`#city`)
const street=document.querySelector(`#street`)
const houseNumber=document.querySelector(`#houseNumber`)
const image = document.querySelector(`#profileImg`)
const imageUpload=document.querySelector(`#image`)
const saveChanges=document.querySelector(`#saveBtn`)
//שמירת כל האינפוטים של המשתמש לשימוש נוח ומהיר
const allInputs = document.querySelectorAll(`.modal-page1 input,.modal-page2 input`)
//איפוס כל אינפוט שגוי לאחר עריכה
allInputs.forEach(element => {
    element.addEventListener(`keyup`,KeyUpReset)
});
//קריאה לפונקציה כאשר כפתור השמירה נלחץ
saveChanges.addEventListener(`click`,SaveUserChangesAdmin)
//הצגת התמונה
imageUpload.addEventListener(`change`,()=>ImageLoader(event,image))
//הגבלת התאריך במודל ערכית המשתמש
var minDate
var maxDate
SetDate()
//<--------------------------------------------------------->


//<-----------------------הוספת מוצר----------------------->
//שמירת כל האינפוטים של המוצר בנפרד
const brand=document.querySelector(`#brand`)
const itemName=document.querySelector(`#name`)
const region=document.querySelector(`#region`)
const age=document.querySelector(`#age`)
const price=document.querySelector(`#price`)
const isSale=document.querySelector(`#is-sale`)
const sale_price=document.querySelector(`#sale-price`)
const type=document.querySelector(`#type`)
const country=document.querySelector(`#country`)
const abv=document.querySelector(`#abv`)
const productImgUpload=document.querySelector(`#product-image-input`)
const productImg=document.querySelector(`#productImg`)
const description=document.querySelector(`#description`)
const addProductBtn=document.querySelector(`#add-product-btn`)
//שמירת כל האינפוטים ליצירת מוצר במשתנה אחד לשימוש נוח
var productInputs = [brand, itemName, age, abv, price, description, sale_price, type, country, region, productImgUpload.parentElement]
//איפוס כל אינפוט שגוי לאחר עריכה
productInputs.forEach(element => {
    element.addEventListener(`keyup`,KeyUpReset)
});
//קריאה לפונקציה כאשר כפתור השמירה נלחץ
addProductBtn.addEventListener(`click`,AddProduct)
//הצגת התמונה
productImgUpload.addEventListener(`change`,()=>ImageLoader(event,productImg,false))
//<--------------------------------------------------------->


//<-----------------------עריכת מוצר----------------------->
//מעבר בין העמודים של מודל עריכת המוצר
const productClick1=document.querySelector(`#product-click1`)
const productClick2=document.querySelector(`#product-click2`)
const editProgress=document.querySelector(`#product-pick`)
const editPage1=document.querySelector(`#edit-page1`)
const editPage2=document.querySelector(`#edit-page2`)
productClick1.addEventListener(`click`,EditProductPage1)
productClick2.addEventListener(`click`,EditProductPage2)

//שמירת כל האינפוטים של מודל עריכת המוצר בנפרד
const edit_brand=document.querySelector(`#edit-brand`)
const edit_itemName=document.querySelector(`#edit-name`)
const edit_region=document.querySelector(`#edit-region`)
const edit_age=document.querySelector(`#edit-age`)
const edit_isAge=document.querySelector(`#edit-is-age`)
const edit_price=document.querySelector(`#edit-price`)
const edit_isSale=document.querySelector(`#edit-is-sale`)
const edit_sale_price=document.querySelector(`#edit-sale-price`)
const edit_type=document.querySelector(`#edit-type`)
const edit_country=document.querySelector(`#edit-country`)
const edit_abv=document.querySelector(`#edit-abv`)
const edit_productImgUpload=document.querySelector(`#edit-product-image-input`)
const edit_productImg=document.querySelector(`#edit-productImg`)
const edit_description=document.querySelector(`#edit-description`)
const editProductBtn=document.querySelector(`#edit-product-btn`)
//שמירת כל האינפוטים לעריכת מוצר במשתנה אחד לשימוש נוח
var editProductInputs = [edit_brand, edit_itemName, edit_age, edit_abv, edit_price, edit_description, edit_sale_price, edit_type, edit_country, edit_region, edit_productImgUpload.parentElement]
//איפוס כל אינפוט שגוי לאחר עריכה
editProductInputs.forEach(element => {
    element.addEventListener(`keyup`,KeyUpReset)
});
//קריאה לפונקציה כאשר כפתור השמירה נלחץ
editProductBtn.addEventListener(`click`,UpdateProduct)
//הצגת התמונה
edit_productImgUpload.addEventListener(`change`,()=>ImageLoader(event,edit_productImg,false))
//<--------------------------------------------------------->

