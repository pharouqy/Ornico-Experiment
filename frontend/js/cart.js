let arrayData = JSON.parse(localStorage.getItem("data"));

diplayDaata();
priceTotal();
clearStorage();

//Display the data on the web page
function diplayDaata() {
  if (localStorage.getItem("data")) {
    for (const data in arrayData) {
      console.log(arrayData[data]);
      const name = arrayData[data].nameT;
      const price = arrayData[data].priceT;
      const quantite = arrayData[data].qyt;
      const picture = arrayData[data].picT;
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
            src="${picture}"
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