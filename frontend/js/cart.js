let arrayData = JSON.parse(localStorage.getItem("data"));

//create a table to send for server
let tableOfIds = [];
for (let i = 0; i < arrayData.length; i++) {
  tableOfIds.push(arrayData[i]["_id"]);
}

diplayDaata();
priceTotal();
clearStorage();

//Display the data on the web page
function diplayDaata() {
  if (localStorage.getItem("data")) {
    for (const data in arrayData) {
      let name = arrayData[data].name;
      let price = arrayData[data].price;
      let quantite = arrayData[data].quantity;
      //const picture = arrayData[data].picT;
      /*document.getElementById("name").innerHTML = name;
      document.getElementById("img").src = picture;
      document.getElementById("price").innerText = price;
      document.getElementById("quantite").value = quantite;*/
      const total = price * quantite;
      let totaux = 0;
      totaux += total;
      let tBody = document.getElementsByTagName("tbody")[0];
      tBody.innerHTML += `<tr>
      <td class="p-4">
        <div class="media align-items-center">
          <img
            id="img"
            src=""
            class="d-block ui-w-40 ui-bordered mr-4"
            alt=""
          />
          <div class="media-body">
            <a href="#" class="d-block text-dark" id="name">${name}</a>
            <small>
              <span class="text-muted"></span>
              <span class="align-text-bottom"></span>
              <span class="text-muted"></span>
            </small>
          </div>
        </div>
      </td>
      <td
        class="text-right font-weight-semibold align-middle p-4"
        id="price"
      >${price}</td>
      <td class="align-middle p-4">
        <input
          type="text"
          class="form-control text-center"
          value="${quantite}"
          id="quantite"
        />
      </td>
      <td
        class="text-right font-weight-semibold align-middle p-4 totaux"
        id="total"
      >${total}
      </td>
      <td class="text-center align-middle px-0">
      <a
        id="X"
        href="#"
        class="shop-tooltip close float-none text-danger"
        title=""
        data-original-title="Remove"
        >X</a>
    </td>
  </tr>`;
    }
  }
}
function priceTotal() {
  //total price
  let totaux = document.querySelectorAll("td.totaux");
  let sum = 0;
  let i = 0;
  for (i; i < totaux.length; i++) {
    sum += parseInt(totaux[i].innerHTML);
  }
  document.getElementById("totals").innerHTML = `Total = ${sum}`;
  return sum;
}
function clearStorage() {
  //clear localstorage
  document.getElementById("X").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "cart.html";
  });
}
//check input order
const submitInput = document.getElementById("submit");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const adressInput = document.getElementById("adress");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");
const erreurDisplay = document.getElementById("erreur");
//regex to check the email
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}
submitInput.addEventListener("click", function (e) {
  if (
    firstNameInput.value &&
    lastNameInput.value &&
    validateEmail(emailInput.value) &&
    cityInput.value &&
    emailInput.value
  ) {
    arrayDataDisplay = [];
    arrayDataDisplay.push(arrayData);
    //create the object to send
    let objectToSend = {
      contact: {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: adressInput.value,
        city: cityInput.value,
        email: emailInput.value,
      },
      products: tableOfIds,
    };
    let jsonOrder = JSON.stringify(objectToSend);
    erreurDisplay.innerHTML = ``;
    console.log(jsonOrder);
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectToSend),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        localStorage.clear();
        console.log(value);
        localStorage.setItem("orderId", value.orderId);
        localStorage.setItem("firstName", value.contact["firstName"]);
        localStorage.setItem("lastName", value.contact["lastName"]);
        window.location.href = "confirm.html";
      })
      .catch(function (erreur) {
        console.log(erreur);
      });
  } else if (!validateEmail(emailInput.value)) {
    erreurDisplay.innerHTML = `<h1>Remplissez tous les champs svp en vérifiant le bon format d'email</h1>`;
  } else {
    erreurDisplay.innerHTML = `<h1>Remplissez tous les champs svp</h1>`;
  }
});
