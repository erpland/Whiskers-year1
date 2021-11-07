//הדפסת המוצר שנבחר בדף המוצר
function PrintItem(){
    let print=`
    <img src="${item.img_link}">
    <div class="item-info">
        <h2>
            ${GetFullProductName(item)}
        </h2>
        <p>${item.abv}% abv / ${item.region}</p>`
        if(item.sale_price==0)
        print+=`<h4>£${item.price}</h4>`
        else
            print+=`<h4  class="sale-dashed">£${item.price}</h4>
            <h4 class="sale">£${item.sale_price}</h4>`
        print+=`
        <span class="material-icons">
          star star star star star_half
          </span>
    </div>

    <div class="item-buy">
        <h4>Quantity</h4>
        <input id="item-qty" type="number" name="qty" min="1" max="10" value=1  >
        <button onclick="AddToCart(item,amount)">Add To Cart</button>
        <p>Free delivery when you spend £99.00</p>
        <hr>
        <span>
        <i class="material-icons">local_shipping</i>
        <p>In stock for delivery</p>
        </span>
    </div>

    <div class="item-description">
        <h2>${GetFullProductName(item)} Description</h2>
        <p>
          ${item.description}
      </p>
      <hr>
  </div>
    <table class="item-details">
        <tr>
            <th colspan="2"><h2>Product Details</h2></th>
        </tr>
        <tr>
            <td>Distillery/Brand</td>
            <td>${item.brand}</td>
        </tr>
        <tr>
            <td>Classification</td>
            <td>Whisky</td>
        </tr>
        <tr>
            <td>Region</td>
            <td>${item.region}</td>
        </tr>
        <tr>
            <td>Style</td>
            <td>${item.type}</td>
        </tr>
        <tr>
            <td>ABV</td>
            <td>${item.abv}%</td>
        </tr>
        <tr>
            <td>Age Statement</td>
            <td>${item.age}</td>
        </tr>
    </table>
    `
    document.querySelector(`#item-container`).innerHTML=print
    
}
function GetFullProductName(item) {
    return `${item.brand} ${item.name}`
}