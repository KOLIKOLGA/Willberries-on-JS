const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeBtn = cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods");

  console.log(cartTable);

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((good) => good.id === id);
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    console.log(clickedGood);
    console.log(cart);

    const someGood = cart.some((good) => good.id === clickedGood.id);
    if (someGood) {
      console.log("what");
      console.log("Увеличить количество clickedGood");
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      console.log("Добавить товар в корзину");
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const renderCartGoods = (goods) => {
    goods.forEach((good) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${good.name}</td>
      <td>${good.price}$</td>
      <td><button class="cart-btn-minus">-</button></td>
      <td>${good.count}</td>
      <td><button class=" cart-btn-plus">+</button></td>
      <td>${+good.price * +good.count}$</td>
      <td><button class="cart-btn-delete">x</button></td>
      `;
      cartTable.append(tr);

      tr.addEventListener("click", (e) => {
        console.log(e.target);
        if (e.target.classList.contains("cart-btn-plus")) {
          console.log("+");
        } else if (e.target.classList.contains("cart-btn-minus")) {
          console.log("-");
        } else if (e.target.classList.contains("cart-btn-delete")) {
          console.log("delete");
        }
      });
    });
  };

  cartBtn.addEventListener("click", function () {
    console.log("рендер товара");
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    renderCartGoods(cartArray);
    cart.style.display = "flex";
  });
  closeBtn.addEventListener("click", function () {
    cart.style.display = "";
  });

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-cart")) {
        const buttonToCart = event.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;
        console.log(goodId);
        addToCart(goodId);
      }
    });
  }
};

cart();
