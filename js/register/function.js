
//ניווט אחורה בטופס
function Back1() {
    // back1.onclick=function(){
    page2.style.left = `100%`
    page1.style.left = `0`;
    progress.style.width = `33.3%`
}
function Back2() {
    // back2.onclick=function(){
    page3.style.left = `100%`
    page2.style.left = `0`
    progress.style.width = `66.6%`
}

//ניווט קדימה בטופס ובדיקת קלט של שני העמודים הראשונים
function Next1() {
    username.value = username.value.toLowerCase()
    if (username.value.trim() === ``)
        BlankError(username)
    else if (!IsUsernameValid(username.value))
        SetError(username, `Only English Letters,Number & Chars`)
    else if (IsUsernameExist(username.value) != -1 || username.value == `admin`)
        SetError(username, `Sorry Username Allready Taken`)
    else
        SetSuccses(username)

    email.value = email.value.toLowerCase()
    if (email.value.trim() === ``)
        BlankError(email)
    else if (!IsEmailValid(email.value))
        SetError(email, `Not A Valid Email Address!`)
    else if (!IsEmailExist(email.value))
        SetError(email, `Sorry Email Allready Taken`)
    else
        SetSuccses(email)

    if (password.value.trim() === ``)
        BlankError(password)
    else if (!IsPasswordValidUpperCase(password.value))
        SetError(password, `Must Contain A Uppercase Letter!`)
    else if (!IsPasswordValidNumber(password.value))
        SetError(password, `Must Contain A Number!`)
    else if (!IsPasswordValidChar(password.value))
        SetError(password, `Must Contain A Special Character`)
    else if (!IsPasswordValidString(password.value))
        SetError(password, `Only English,Numbers,And Chars!`)
    else if (password.value.length < 7)
        SetError(password, `Must Contain Minimum Of 7 Characters`)
    else if (password.value.length > 12)
        SetError(password, `Must Contain Maximum Of 12 Characters`)
    else
        SetSuccses(password)

    if (passwordConfirm.value.trim() === ``)
        BlankError(passwordConfirm)
    else if (passwordConfirm.value != password.value)
        SetError(passwordConfirm, `Must Be Identical To The Password!`)
    else
        SetSuccses(passwordConfirm)

    if (!IsFormValid(page1Inputs))
        return
    page1.style.left = `-100%`
    page2.style.left = `0`
    progress.style.width = `66.6%`
}
function Next2() {
    firstName.value = StringFormat(firstName.value)
    lastName.value = StringFormat(lastName.value)
    houseNumber.value=parseInt(houseNumber.value)
    city.value=city.value.trim()
    street.value=street.value.trim()
    if (firstName.value === ``)
        BlankError(firstName)
    else if (!IsNameValid(firstName.value))
        SetError(firstName, `Name Must Be In English OR Hebrew`)
    else
        SetSuccses(firstName)

    if (lastName.value === ``)
        BlankError(lastName)
    else if (!IsNameValid(lastName.value))
        SetError(lastName, `Name Must Be In English OR Hebrew`)
    else
        SetSuccses(lastName)

    if (birthday.value === ``)
        BlankError(birthday)
    else if (!IsDateValid(birthday.value))
        SetError(birthday, `Invalid Date!`)
    else
        SetSuccses(birthday)

    if (city.value === ``)
        BlankError(city)
    else if (!IsAddressValid(city.value))
        SetError(city, `City Name Must Be In Hebrew`)
    else
        SetSuccses(city)

    if (street.value === ``)
        BlankError(street)
    else if (!IsAddressValid(street.value))
        SetError(street, `Street Name Must Be In Hebrew`)
    else
        SetSuccses(street)

    if (houseNumber.value === ``)
        BlankError(houseNumber)
    else if (houseNumber.value < 1)
        SetError(houseNumber, `Number Must Be Greater Then 0`)
    else
        SetSuccses(houseNumber)

    if (!IsFormValid(page2Inputs))
        return

    document.querySelector(`#page3 h3`).innerHTML = `${page2Inputs[0].value} ${page2Inputs[1].value}`
    page2.style.left = `-100%`
    page3.style.left = `0`
    progress.style.width = `99.9%`
}

//בדיקת העמוד האחרון ויצירת המשתמש החדש
function RegisterUser() {
    if (!IsImageFormValid(image)) {
        return
    }
    let userIndex = users_data.length
    let user = new User(username.value, email.value, password.value, firstName.value, lastName.value, birthday.value, city.value, street.value, houseNumber.value, userIndex)
    users_data.push(user)
    users_images.push(image.src)

    localStorage.setItem(`users_data`, JSON.stringify(users_data))
    localStorage.setItem(`users_images`, JSON.stringify(users_images))

    location.href = `login.html`
}

