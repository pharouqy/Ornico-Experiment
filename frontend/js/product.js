recupProduct(recupUrl());

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
      const nameTeddy = document.createElement("h2");
      nameTeddy.textContent = teddy.name;
      displayTeddy.appendChild(nameTeddy);
      //retrieve the description's teddy
      const descTeddy = document.createElement("p");
      descTeddy.textContent = teddy.description;
      displayTeddy.appendChild(descTeddy);
      //retrieve the picture's teddy
      const picTeddy = document.createElement("img");
      picTeddy.src = teddy.imageUrl;
      picTeddy.classList.add("resize");
      displayTeddy.appendChild(picTeddy);
      //retrieve the price's teddy converted
      const resultPrice = conveter(teddy.price);
      const priceTeddy = document.createElement("h4");
      priceTeddy.textContent = resultPrice;
      displayTeddy.appendChild(priceTeddy);
      //Display colors of teddies
      for (let color in teddy.colors) {
        const select_colors = document.getElementById("select_colors");
        const option_colors = document.createElement("option");
        option_colors.textContent = teddy.colors[color];
        option_colors.value = teddy.colors[color];
        select_colors.appendChild(option_colors);
        displayTeddy.appendChild(select_colors);
      }
      //Add to the cart
      const cart = document.createElement("a");
      displayTeddy.appendChild(cart);
      cart.classList.add("btn");
      cart.classList.add("btn-success");
      cart.textContent = "Add to cart";
    })
    .catch(function (err) {
      console.log("Erreur de réception");
    });
}
