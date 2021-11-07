
//שמירת הלוקל והסשן
var login_user_data = JSON.parse(sessionStorage.getItem('login_user')) || false
var login_user_img=JSON.parse(sessionStorage.getItem('login_img')) || []
var users_data = JSON.parse(localStorage.getItem('users_data')) || []
var users_images = JSON.parse(localStorage.getItem('users_images')) || []

//אם אין משתמש מחובר נחזור לדף ההתחברות אם יש נדפיס אותו בדף 
!login_user_data?location.href=`login.html`:PrintProfile()
//
// var userDetails = document.querySelector(`.user-details`)
//שמירת האינדקס של המשתמש לעידכון הפרטים בלוקל
var userIndex=login_user_data.index
//כפתור ההתנתקות
document.querySelector(`#disconnect-btn`).addEventListener(`click`,Disconnect)

//<--------------------מודל עריכת המשתמש-------------------->
//מעבר בין העמודים של מודל עריכת המוצר
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
password.addEventListener(`keyup`,()=>PasswordConfirmShow(login_user_data))
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
saveChanges.addEventListener(`click`,SaveUserChangesProfile)
//הצגת התמונה
imageUpload.addEventListener(`change`,()=>ImageLoader(event,image))
//הגבלת התאריך במודל ערכית המשתמש
var minDate
var maxDate
SetDate()







