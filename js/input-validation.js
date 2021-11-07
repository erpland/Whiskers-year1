//פונקציות לתקינות הטפסים של הרשמה התחברות מוצרים
//ועריכת משתמש/מוצר

//-->פונקציות לבדיקת קלט הרשמת משתמש<---
function IsUsernameValid(username) {
    return /^(?=.*[a-z])[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/.test(username)
}
function IsUsernameExist(username) {
    for (let i = 0; i < users_data.length; i++) {
        if (users_data[i].user_name == username)
            return users_data[i].index
    }
    return -1
}
function IsEmailValid(email) {
    return /^[!#$%&'*+-/=?^_`{|}~a-zA-Z]+@[a-zA-Z1-9-]+\.com$/.test(email)
}
function IsEmailExist(email) {
    for (let i = 0; i < users_data.length; i++) {
        if (users_data[i].user_email == email)
            return false
    }
    return true
}
function IsPasswordValidUpperCase(password) {
    return /[A-Z]/g.test(password)
}
function IsPasswordValidNumber(password) {
    return /[0-9]/g.test(password)
}
function IsPasswordValidChar(password) {
    return /[.,:;'!@#$%^&*_+=|(){}[?\-\]\/\\][^.,:;'!@#$%^&*_+=|(){}[?\-\]\/\\]*/g.test(password)
}
function IsPasswordValidString(password) {
    return /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/.test(password)
}
function IsNameValid(name) {
    return /^[\u0590-\u05fe]+$|^[a-zA-Z +]+$/.test(name)
}
function IsAddressValid(address) {
    return /^(?=.*[\u0590-\u05fe])[\u0590-\u05fe \-"`'()?* ]+$/.test(address)
}
function IsDateValid(birthday) {
    return birthday >= minDate && birthday <= maxDate
}
function IsImageValid(file) {
    if(file==undefined)
        return false
    return file.type.includes('image');
}
function IsImageFormValid(img) {
    let imgField = img.parentElement.parentElement
    if (!imgField.classList.contains(`valid`)) {
        SetImageError(`Proper Picture Is Requierd!`,imgField)
        return false
    }
    return true
}

//-->פונקציות לבדיקת קלט הוספת מוצר<---
function IsProductNameValid(name) {
    return /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z 0-9-]+$/.test(name)
}


//-->פונקציות להצגת הודעות<---
function BlankError(input) {
    const inputField = input.parentElement
    const msg = inputField.querySelector(`small`)
    msg.innerText = `Cannot Be Blank!`
    inputField.className = `input-field invalid`
}
function SetError(input, text) {
    const inputField = input.parentElement
    const msg = inputField.querySelector(`small`)
    msg.innerText = text
    inputField.className = `input-field invalid`
}
function SetSuccses(input) {
    const inputField = input.parentElement
    inputField.className = `input-field valid`
}
function SetImageError(text, imgField) {
    const msg = imgField.querySelector(`small`)
    msg.innerText = text
    imgField.className = `img-field invalid`
}
function SetImageSuccses(text, imgField) {
    const msg = imgField.querySelector(`small`)
    msg.innerText = text
    imgField.className = `img-field valid`
}
function SetAdminSuccses(input, text) {
    const inputField = input.parentElement
    const msg = inputField.querySelector(`small`)
    msg.innerText = text
    inputField.className = `input-field admin`
}
function AlertFail() {
    let alertElement = `<div class="alert alert-danger alert-dismissible fade show position-absolute" role="alert">
    <strong>Failed To Update Profile!</strong> You should check in on some of those fields below.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
    document.querySelector(`#alert`).innerHTML = alertElement
    setTimeout(() => { $('.alert').alert('close') }, 5000)

}
function AlertSuccsess() {
    let alertElement = `<div class="alert fade alert-success alert-dismissible fade show position-absolute" role="alert">
    <strong>Profile Updated Succsessfully!</strong> Please Remember Your Login Information.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
    document.querySelector(`#alert`).innerHTML = alertElement
    setTimeout(() => { $('.alert').alert('close') }, 5000)
}


//-->פונקציה לבדיקת כל הטופס<--
function IsFormValid(allInputs) {
    for (let i = 0; i < allInputs.length; i++) {
        if (!(allInputs[i].parentElement.classList.contains(`valid`))) {
            allInputs[i].focus()
            return false
        }
    }
    return true
}

//-->פונקציות עזר שונות<---
function StringFormat(string, description = false) {
    string = string.trim()
    if (string == ``)
        return ``
    while (string.indexOf(`  `) != -1)
        string = string.replace(`  `, ` `)

    string = string[0].toUpperCase() + string.slice(1)
    //אם זה השדה של תיאור המוצר לא נרצה להפוך כל אותו ראשונה במילה לגדולה
    if (description == true)
        return string

    //אם זה לא התיאור נרצה להפוך כל אות ראשונה לגדולה ואת השאר לקטנות    
    let index = string.indexOf(` `)
    while (index != -1) {
        string = string.slice(0, index + 1) + string[index + 1].toUpperCase() + string.slice(index + 2).toLowerCase()
        index = string.indexOf(` `, index + 1)
    }
    return string
}
function KeyUpReset(event) {
    const inputField = event.target.parentElement
    inputField.classList.remove(`invalid`)
}
function CitiesListCreator() {
    let citiesList = document.querySelector(`#cities-list`)
    if (citiesList.childNodes.length != 0)
        return
    document.querySelector(`.spinner-div`).style.display = `block`
    setTimeout(() => {
        cities.forEach(element => {
            citiesList.innerHTML += `<option>${element.name}</option>`
        });
    }, 1)
    setTimeout(() => {
        document.querySelector(`.spinner-div`).style.display = `none`
    }, 1)


}
function ShowPassword(event) {
    let input = event.target.previousElementSibling
    if (input.type == `password`)
        input.type = `text`
    else
        input.type = `password`
}
function ImageLoader(event, img, isUser = true) {
    let imgField = img.parentElement.parentElement
    let file = event.target.files[0]
    if (!IsImageValid(file)) {
        if (isUser)
            img.src = `../../images/emptyuser.png`
        else
            img.src = `./images/shop/emptybottle.png`
        SetImageError(`Proper Picture Is Requierd!`, imgField)
        return
    }
    SetImageSuccses(`File Loaded Succsesfully`, imgField)

    let reader = new FileReader()

    reader.onload = () => {
        img.src = reader.result
    }
    reader.readAsDataURL(file)
}
function SetDate() {
    let x = new Date()
    let year = x.getFullYear()
    let month = String(x.getMonth() + 1).padStart(2, `0`)
    let day = String(x.getDate()).padStart(2, `0`)
    minDate = `${year - 120}-${month}-${day}`
    //בעיקרון התאריך המקסמלי לאתר הזה יכול להיות פחות 18
    maxDate = `${year - 1}-${month}-${day}`
    birthday.min = minDate
    birthday.max = maxDate
}







