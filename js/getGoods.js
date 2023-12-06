const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");

    goodsContainer.innerHTML = "";

    goods.forEach((good) => {
      const goodBlock = document.createElement("div");

      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");

      goodBlock.innerHTML = `
          <div class="goods-card">
            <span class="label">New</span>
            <img src="img/image-119.jpg" alt="image: Hoodie" class="goods-image"/>
            <h3 class="goods-title">Embroidered Hoodie</h3>
            <p class="goods-description">Yellow/Lilac/Fuchsia/Orange</p>
            <button class="button goods-card-btn add-to-cart" data-id="007">
            <span class="button-price">$89</span>
            </button>
          </div>
      `;
    });
  };

  const getData = (value, category) => {
    fetch("https://my-project-6cc9a-default-rtdb.firebaseio.com/db.json")
      .then((res) => res.json())
      .then((data) => {
        const array = category
          ? data.filter((item) => item[category] === value)
          : data;

        localStorage.setItem("goods", JSON.stringify(array));

        if (window.location.pathname !== "/Willberries-on-JS/goods.html") {
          window.location.href = "./goods.html";
        } else {
          renderGoods(array);
        }
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;

      getData(linkValue, category);
    });
  });
  if (
    localStorage.getItem("goods") &&
    window.location.pathname === "/Willberries-on-JS/goods.html"
  ) {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  }
};

getGoods();
//метод then() обратился к db.json и вернул нам ответ и он отрабатывает только тогда когда ответ получен
//
