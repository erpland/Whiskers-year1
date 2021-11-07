
//שמירת מערך המוצרים המקורי
const products = JSON.parse(localStorage.getItem(`products`))
//העתקת המערך למשתנה חדש לשימוש במיון
var sorted = products
//מיון התחלתי לפי סדר האלף ב
sorted.sort((a, b) => (a.brand > b.brand) ? 1 : -1)

//כל האינפוטים של המיון בנפרד
const sortType = document.querySelector(`#sort-type`)
const sortCountry = document.querySelector(`#sort-country`)
const sortRegion = document.querySelector(`#sort-region`)
const sortBrand = document.querySelector(`#sort-brand`)
const sortAbv = document.querySelector(`#sort-abv`)
const sortOnSale = document.querySelector(`#sort-onSale`)
const sortIcons = document.querySelectorAll(`#sort-icons i`)
//שמירת כל אפשרויות הבחירה במיון במשתנה יחיד
const directSelect = [sortType, sortCountry, sortRegion, sortBrand]
//שליחת אפשרויות בחירה לפונקציה מסננת
directSelect.forEach(element => {
    element.addEventListener(`change`, FilterItems)
});
//שליחת תיבת בחירה של המבצעים לפונקציה מסננת
sortOnSale.addEventListener(`change`, FilterItems)
//שליחת אפשרות הבחירה של אחוז האלכוהל לפונקציה מסננת
sortAbv.addEventListener(`change`, FilterItems)
//שליחת כל אפשוריות סדר המוצרים לפונקצייה מסדרת
sortIcons.forEach(element => {
    element.addEventListener(`click`, () => SetSortOrder(element))
});

//הדפסות של כל העמוד כולל אפשוריות הסינון
PrintSales()
PrintProducts()
SetSortOptions()









