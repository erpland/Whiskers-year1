
function LoginUser() {

    if (username.value.trim() === '') {
        BlankError(username)
        return
    }
    else if (username.value == adminUser) {
        SetAdminSuccses(username, `Admin Username Accepted!`)
        if (password.value != adminPassword) {
            SetError(password, `Wrong Admin Password!`)
            return
        }
        SetAdminSuccses(password, `Admin Password Accepted!`)
        location.href = `admin.html`
        return
    }
    else if (!IsUsernameValid(username.value)) {
        SetError(username, `Only English Letters,Number & Chars`)
        return
    }
    let userIndex = IsUsernameExist(username.value.toLowerCase())
    if (userIndex == -1) {
        SetError(username, `Username Doesnt Not Exist`)
        return
    }
    else
        SetSuccses(username)
    let user_data=users_data[userIndex]
    let user_img=users_img[userIndex]

    if (password.value.trim() === ``) {
        BlankError(password)
        return
    }

    else if (!IsPasswordValidUpperCase(password.value)){
        SetError(password, `Must Contain A Uppercase Letter!`)
        return
    }

    else if (!IsPasswordValidNumber(password.value)){
        SetError(password, `Must Contain A Number!`)
        return
    }
    else if (!IsPasswordValidChar(password.value)){
        SetError(password, `Must Contain A Special Character`)
        return
    }
    else if (password.value.length < 7){
        SetError(password, `Must Contain Minimum Of 7 Chars`)
        return
    }
    else if (password.value.length > 12){
        SetError(password, `Must Contain Maximum Of 12 Chars`)
        return
    }
    else if (password.value != user_data.user_password){
        SetError(password, `Wrong Password! Please Try Again`)
        return
    }
        SetSuccses(password)
        sessionStorage.setItem(`login_user`, JSON.stringify(user_data))
        sessionStorage.setItem(`login_img`, JSON.stringify(user_img))
        location.href = "user.html"
}