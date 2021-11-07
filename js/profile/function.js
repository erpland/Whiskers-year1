function PrintProfile() {
  let profile = `
    <img src="${login_user_img}" alt="">
    <h3>${GetFullName()}</h3>
    <h5>${login_user_data.user_email}</h5>

    <hr>
    <div class="user-info">
      <!-- <h4>information</h4> -->
      <h5>Birthday</h5>
      <h5>City</h5>
      <h5>Street</h5>
      <p>${GetFullBirthday()}</p>
      <p>${login_user_data.user_city}</p>
      <p>${GetFullStreet()}</p>
      <hr>
    </div>`
    document.querySelector(`.user-details`).innerHTML = profile
}

function GetFullName() {
  return `${login_user_data.user_first_name} ${login_user_data.user_last_name}`
}
function GetFullStreet() {
  return `${login_user_data.user_house_number} ${login_user_data.user_street}`
}
function GetFullBirthday() {
  let birthDate = new Date(login_user_data.user_birthday)
  return `${birthDate.getDate()}/${birthDate.getMonth() + 1}/${birthDate.getFullYear()}`
}




