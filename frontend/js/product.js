const cartBtn1 = document.querySelector("span#plus");
const cartBtn2 = document.querySelector("a.btn");
const nameTeddy = document.querySelector("h2#nameTeddy");
const picTeddy = document.getElementById("imgTeddy");
const qty = document.getElementById("value");
const priceTeddy = document.getElementById("priceTeddy");
const id = recupUrl();

recupProduct(recupUrl());
addeDataToCart();
cartSum();

function recupUrl() {
  //Retrieve the url
  const urlParams = new URLSearchParams(window.location.search);
  //Retrieve the id from the url
  const id = urlParams.get("id");
  return id;
}

function conveter(amount) {
  let price100 = amount / 100;
  let priceN = new Number(price100);
  var myObj = {
    style: "currency",
    currency: "EUR",
  };
  let priceConverted = priceN.toLocaleString("fr-FR", myObj);
  return priceConverted;
}

function cartSum() {
  //cart function
  //const cartBtn = document.querySelector(".btn");
  const numberCart = document.getElementById("value");
  let compteur = 0;
  cartBtn1.addEventListener("click", function () {
    compteur++;
    numberCart.innerHTML = compteur;
    return compteur;
  });
}

//data for cart
function addeDataToCart() {
  cartBtn2.addEventListener("click", function () {
    class ObjtCart {
      constructor(nameT, priceT, qyt, picT, _id) {
        this.nameT = nameT;
        this.priceT = priceT;
        this.qyt = qyt;
        this.picT = picT;
        this._id = _id;
      }
    }

    let newObect = new ObjtCart(
      nameTeddy.innerHTML,
      //retrieve the two number of string and converted to number
      parseFloat(priceTeddy.innerHTML.substr(0, 2)),
      parseInt(qty.innerHTML),
      picTeddy.src,
      id
    );
    let arrayData = JSON.parse(localStorage.getItem("data"));
    //Store data in local strorage
    if (localStorage.getItem("data") !== null) {
      arrayData.push(newObect);
      localStorage.setItem("data", JSON.stringify(arrayData));
      window.location.href = "cart.html";
    } else {
      arrayData = [];
      arrayData.push(newObect);
      localStorage.setItem("data", JSON.stringify(arrayData));
      window.location.href = "cart.html";
    }
  });
}

function recupProduct(id) {
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (teddy) {
      const displayTeddy = document.getElementById("display_product");
      //retrieve the name's teddy
      nameTeddy.innerHTML = teddy.name;
      //retrieve the description's teddy
      const descTeddy = document.getElementById("descr");
      descTeddy.innerHTML = teddy.description;
      //retrieve the picture's teddy
      picTeddy.src = teddy.imageUrl;
      picTeddy.classList.add("resize");
      //retrieve the price's teddy converted
      const resultPrice = conveter(teddy.price);
      priceTeddy.innerHTML = resultPrice;
      //Display colors of teddies
      for (let color in teddy.colors) {
        const select_colors = document.getElementById("select_colors");
        const option_colors = document.createElement("option");
        option_colors.textContent = teddy.colors[color];
        option_colors.value = teddy.colors[color];
        select_colors.appendChild(option_colors);
        displayTeddy.appendChild(select_colors);
      }
    })
    .catch(function (err) {
      console.log("Erreur de réception");
    });
}
