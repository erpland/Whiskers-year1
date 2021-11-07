
//אם יש משתמש מחובר נעבור יש לדף היוזר
if(sessionStorage.getItem(`login_user`))
    location.href=`user.html`
const users_data = JSON.parse(localStorage.getItem('users_data')) || []
const users_img = JSON.parse(localStorage.getItem('users_images')) || []

const username = document.querySelector(`#username`)
const password = document.querySelector(`#password`)
const loginBtn=document.querySelector(`#login-btn`)
const adminUser=`admin`
const adminPassword=`admin1234admin`

username.addEventListener(`keyup`,KeyUpReset)
loginBtn.addEventListener(`click`,LoginUser)