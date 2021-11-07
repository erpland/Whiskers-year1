//-->איתחול<--
//אם יש משתמש מחוברת נעבור לדף המשתמש
if(sessionStorage.getItem(`login_user`))
    location.href=`user.html`
//שמירת המשתמשים מהלוקל
var users_data = JSON.parse(localStorage.getItem('users_data')) || []
var users_images = JSON.parse(localStorage.getItem('users_images')) || []

//יצירת השלמה אוטומטית של הערים
CitiesListCreator()

//מעבר בין העמודים בטופס ההרשמה
var page1 = document.querySelector(`#page1`)
var page2 = document.querySelector(`#page2`)
var page3 = document.querySelector(`#page3`)
var next1 = document.querySelector(`#btnNext1`)
var next2 = document.querySelector(`#btnNext2`)
var back1 = document.querySelector(`#btnBack1`)
var back2 = document.querySelector(`#btnBack2`)
var progress = document.querySelector(`#progress`)
next1.addEventListener(`click`, Next1)
next2.addEventListener(`click`, Next2)
back1.addEventListener(`click`, Back1)
back2.addEventListener(`click`, Back2)

//הצגת הסיסמאות כטקסט בלחיצת כפתור
document.querySelector('#showPassword').addEventListener(`click`,ShowPassword)
document.querySelector('#showPasswordConfirm').addEventListener(`click`,ShowPassword)

////כל האינפוטים של ההרשמה בנפרד
const username=document.querySelector(`#username`)
const email=document.querySelector(`#email`)
const password=document.querySelector(`#password`)
const passwordConfirm=document.querySelector(`#passwordConfirm`)
const firstName=document.querySelector(`#firstName`)
const lastName=document.querySelector(`#lastName`)
const birthday=document.querySelector(`#birthday`)
const city=document.querySelector(`#city`)
const street=document.querySelector(`#street`)
const houseNumber=document.querySelector(`#houseNumber`)
const imageUpload=document.querySelector(`#image`)
const image = document.querySelector(`#profileImg`)
//שמירת כל נתוני הטופס לאחר האימות
document.querySelector(`#btnSubmit`).addEventListener(`click`,RegisterUser)

//תפיסת כל האינפוטים של ההרשמה לפי עמודים
const page1Inputs = document.querySelectorAll(`#page1 input`)
const page2Inputs = document.querySelectorAll(`#page2 input`)
//איפוס כל האינפוטים עם קלט שגוי כאשר עורכים אותם
page1Inputs.forEach(element => {
    element.addEventListener(`keyup`,KeyUpReset)
});
page2Inputs.forEach(element => {
    element.addEventListener(`keyup`,KeyUpReset)
});

//הצגת התמונה
imageUpload.addEventListener(`change`,()=>ImageLoader(event,image))

//הגבלת התאריך בטופס
var minDate
var maxDate
SetDate()







