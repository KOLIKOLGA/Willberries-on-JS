const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeBtn = cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");

  cartBtn.addEventListener("click", function () {
    cart.style.display = "flex";
  });
  closeBtn.addEventListener("click", function () {
    cart.style.display = "";
  });

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (event) => {
      console.log(event.target);
      if (event.target.closest(".add-to-cart")) {
        const buttonToCart = event.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;
        console.log(goodId);
      }
    });
  }
};

cart();
