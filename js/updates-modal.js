//קובץ למודל עידכון פרטי משתמש ועידכון פרטי מוצר
//שייך לדף האדמין ולדף הפרופיל


//<---פונקציות עיצוב המודלים--->
function ClickPage1() {
  page1.style.left = `0px`
  page2.style.left = `100%`;
  page3.style.left = `100%`;
  pageBar.style.left = `0%`
}
function ClickPage2() {
  page2.style.left = `0px`
  page1.style.left = `-100%`;
  page3.style.left = `100%`;
  pageBar.style.left = `33.3%`
}
function ClickPage3() {
  page3.style.left = `0px`
  page1.style.left = `-100%`;
  page2.style.left = `-100%`;
  pageBar.style.left = `66.6%`
}
function EditProductPage1() {
  editPage1.style.left = `0`
  editPage2.style.left = `100%`
  editProgress.style.left = `0`
}
function EditProductPage2() {
  editPage1.style.left = `-100%`
  editPage2.style.left = `0`
  editProgress.style.left = `50%`
}


//<---פונקציות עידכון פרטי משתמש--->
function SetEditUser(index) {
  CitiesListCreator()
  userIndex = index
  username.value = users_data[userIndex].user_name
  email.value = users_data[userIndex].user_email
  password.value = users_data[userIndex].user_password
  firstName.value = users_data[userIndex].user_first_name
  lastName.value = users_data[userIndex].user_last_name
  birthday.value = users_data[userIndex].user_birthday
  city.value = users_data[userIndex].user_city
  street.value = users_data[userIndex].user_street
  houseNumber.value = users_data[userIndex].user_house_number
  image.src = users_images[userIndex]
}
function CheckUserUpdateForm(user) {
  firstName.value = StringFormat(firstName.value)
  lastName.value = StringFormat(lastName.value)
  houseNumber.value = parseInt(houseNumber.value)
  username.value = username.value.toLowerCase()
  email.value = email.value.toLowerCase()
  city.value = city.value.trim()
  street.value = street.value.trim()

  if (username.value == user.user_name)
    SetSuccses(username)
  else if (username.value === ``)
    BlankError(username)
  else if (!IsUsernameValid(username.value))
    SetError(username, `Only English Letters,Number & Chars`)
  else if (IsUsernameExist(username.value) != -1 || username.value == `admin`)
    SetError(username, `Sorry Username Allready Taken`)
  else {
    SetSuccses(username)
  }

  email.value = email.value
  if (email.value == user.user_email)
    SetSuccses(email)
  else if (email.value === ``)
    BlankError(email)
  else if (!IsEmailValid(email.value))
    SetError(email, `Not A Valid Email Address!`)
  else if (!IsEmailExist(email.value))
    SetError(email, `Sorry Email Allready Taken`)
  else {
    SetSuccses(email)
  }

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

  if (passwordConfirmField.style.display == `block`) {
    if (passwordConfirm.value.trim() === ``)
      BlankError(passwordConfirm)
    else if (passwordConfirm.value != password.value)
      SetError(passwordConfirm, `Must Be Identical To The Password!`)
    else {
      SetSuccses(passwordConfirm)
    }
  }


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

}
function SaveUserChangesProfile() {
  CheckUserUpdateForm(login_user_data)

  if (!IsFormValid(allInputs)) {
    AlertFail()
    return
  }
  if (!IsImageFormValid(image)) {
    AlertFail()
    return
  }

  let userUpdate = new User(username.value, email.value, password.value, firstName.value, lastName.value, birthday.value, city.value, street.value, houseNumber.value, userIndex)
  login_user_data = userUpdate
  login_user_img = image.src
  users_data[userIndex] = userUpdate
  users_images[userIndex] = image.src

  localStorage.setItem(`users_data`, JSON.stringify(users_data))
  localStorage.setItem(`users_images`, JSON.stringify(users_images))
  sessionStorage.setItem(`login_user`, JSON.stringify(login_user_data))
  sessionStorage.setItem(`login_img`, JSON.stringify(login_user_img))
  AlertSuccsess()
  PrintProfile()
}
function SaveUserChangesAdmin() {
  CheckUserUpdateForm(users_data[userIndex])
  if (!IsFormValid(allInputs)) {
    AlertFail()
    return
  }
  if (!IsImageFormValid(image)) {
    AlertFail()
    return
  }
  let userUpdate = new User(username.value, email.value, password.value, firstName.value, lastName.value, birthday.value, city.value, street.value, houseNumber.value, userIndex)
  users_data[userIndex] = userUpdate
  users_images[userIndex] = image.src

  localStorage.setItem(`users_data`, JSON.stringify(users_data))
  localStorage.setItem(`users_images`, JSON.stringify(users_images))
  AlertSuccsess()
}
function PasswordConfirmShow(user) {
  if (password.value != user.user_password)
    passwordConfirmField.style.display = `block`
  else {
    passwordConfirmField.style.display = `none `
    passwordConfirm.parentElement.className = `input-field valid`
    passwordConfirm.value = ``
  }
}


//<---פונקציות לעדכון פרטי המוצר--->
function SetEditProduct(index) {
  productIndex = index
  edit_brand.value = products[index].brand
  edit_itemName.value = products[index].name
  edit_abv.value = products[index].abv
  edit_price.value = products[index].price
  edit_region.value = products[index].region
  EditRegionOptions()

  edit_type.value = products[index].type
  edit_country.value = products[index].country
  edit_description.value = products[index].description
  edit_productImg.src = products[index].img_link

  if (products[index].age == `No Age Statement`) {
    edit_isAge.checked = false
  }
  else {
    edit_isAge.checked = true
  }
  EditAgeChecked(productIndex)

  if (products[index].sale_price == 0)
    edit_isSale.checked = false
  else
    edit_isSale.checked = true
  EditSaleChecked(productIndex)
  edit_sale_price.value = products[index].sale_price

}
function UpdateProduct() {
  let index = productIndex
  edit_brand.value = StringFormat(edit_brand.value)
  edit_itemName.value = StringFormat(edit_itemName.value)
  edit_description.value = StringFormat(edit_description.value, true)
  edit_age.value=parseInt(edit_age.value)
  edit_price.value=parseFloat(edit_price.value)
  edit_sale_price.value=parseFloat(edit_sale_price.value)
  let msgDiv = document.querySelector(`.edit-msg`)
  let msgStatus = document.querySelector(`#edit-product-status`)

  if (edit_brand.value === products[index].brand)
    SetSuccses(edit_brand)
  else if (edit_brand.value === ``)
    BlankError(edit_brand)
  else if (!IsProductNameValid(edit_brand.value))
    SetError(edit_brand, "Only English")
  else
    SetSuccses(edit_brand)

  if (edit_itemName.value === products[index].name)
    SetSuccses(edit_itemName)
  else if (edit_itemName.value === ``)
    BlankError(edit_itemName)
  else if (!IsProductNameValid(edit_itemName.value))
    SetError(edit_itemName, "Only English")
  else
    SetSuccses(edit_itemName)

  if (edit_age.value === products[index].age)
    SetSuccses(edit_age)
  else if (edit_age.value === ``)
    BlankError(edit_age)
  else if (edit_age.value < 3)
    SetError(edit_age, `Minimum Of 3 Years`)
  else
    SetSuccses(edit_age)

  if (edit_abv.value === products[index].abv)
    SetSuccses(edit_abv)
  else if (edit_abv.value === ``)
    BlankError(edit_abv)
  else if (edit_abv.value < 40)
    SetError(edit_abv, 'Min Of 40 abv')
  else if (edit_abv.value > 90)
    SetError(edit_abv, 'Max Of 90 abv')
  else
    SetSuccses(edit_abv)

  if (edit_description.value === products[index].description)
    SetSuccses(edit_description)
  else if (edit_description.value === ``)
    BlankError(edit_description)
  else if (!IsProductNameValid(edit_description.value))
    SetError(edit_description, "Only English")
  else if (edit_description.value.length < 30)
    SetError(edit_description, `Minimum Of 30 Letters`)
  else
    SetSuccses(edit_description)

  if (edit_price.value === products[index].price)
    SetSuccses(edit_price)
  else if (edit_price.value === ``)
    BlankError(edit_price)
  else if (edit_price.value <= 0)
    SetError(edit_price, `Only Positive Numbers`)
  else
    SetSuccses(edit_price)
  
  if (edit_isSale.checked && edit_sale_price.value == 0)
    SetError(edit_sale_price, `Cannot Be Zero`)
  // else if (edit_sale_price.value == products[index].sale_price)
  //     SetSuccses(edit_sale_price)
  else if (edit_sale_price.value < 0)
    SetError(edit_sale_price, `Only Positive Numbers`)
  else if (parseFloat(edit_sale_price.value) >= edit_price.value)
    SetError(edit_sale_price, `Invalid Price`)
  else
    SetSuccses(edit_sale_price)

  if (!IsProductValid(editProductInputs)) {
    SetProductMsg(`Invalid Product`, msgDiv, msgStatus, false)
    return
  }
  if (IsProductExist(edit_brand.value, edit_itemName.value)) {
    SetProductMsg(`Product Exist!`, msgDiv, msgStatus, false)
    return
  }

  const newProduct = new Product(edit_brand.value, edit_itemName.value, edit_region.value, edit_age.value, edit_price.value, edit_sale_price.value, edit_type.value, edit_country.value, edit_abv.value, edit_productImg.src, edit_description.value, index)
  products[index] = newProduct

  localStorage.setItem(`products`, JSON.stringify(products))
  SetProductMsg(`Update Succsessfully!`, msgDiv, msgStatus, true)
  PrintProducts()

}
function EditAgeChecked(index) {
  if (edit_isAge.checked) {
    edit_age.disabled = false
    edit_age.type = `number`
    edit_age.value = parseInt(products[index].age)
  }
  else {
    edit_age.disabled = true
    edit_age.type = `text`
    edit_age.value = `No Age Statement`
  }
}
function EditSaleChecked(index) {
  if (edit_isSale.checked) {
    edit_sale_price.value = products[index].sale_price
    edit_sale_price.disabled = false
  }
  else {
    edit_sale_price.value = 0
    edit_sale_price.disabled = true
  }
}
function EditRegionOptions() {
  if (edit_country.value != `Scotland`) {
    edit_region.selectedIndex = 6
    edit_region.disabled = true
  }
  else
    edit_region.disabled = false
}