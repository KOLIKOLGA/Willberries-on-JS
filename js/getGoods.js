const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");
  const more = document.querySelector(".more");

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");

    goodsContainer.innerHTML = "";

    goods.forEach((good) => {
      const goodBlock = document.createElement("div");

      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");

      goodBlock.innerHTML = `
          <div class="goods-card">
            <span class="label ${good.label ? null : "d-none"}">${
        good.label
      }</span>
            <img src="db/${good.img}" alt="${good.name}" class="goods-image"/>
            <h3 class="goods-title">${good.name}</h3>
            <p class="goods-description">${good.description}</p>
            <button class="button goods-card-btn add-to-cart" data-id="${
              good.id
            }">
            <span class="button-price">$ ${good.price}</span>
            </button>
          </div>
      `;
      goodsContainer.append(goodBlock);
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

        // if (
        //   window.location.pathname !== "/goods.html" ||
        //   "/Willberries-on-JS/goods.html"
        // ) {
        //   window.location.href = "/goods.html"; //(window.location.pathname !== "/Willberries-on-JS/goods.html")
        // }
        if (
          window.location.pathname !== "/goods.html" ||
          "/Willberries-on-JS/goods.html"
        ) {
          window.location.href =
            "/goods.html" || "/Willberries-on-JS/goods.html";
          console.log("first line");
        } else if (window.location.pathname !== "./goods.html") {
          window.location.href = "./goods.html";
          console.log("second line");
        } else if (
          window.location.pathname !== "/Willberries-on-JS/goods.html"
        ) {
          window.location.href = "/Willberries-on-JS/goods.html";
          console.log("three line");
        } else if (
          window.location.pathname !== "/Willberries-on-JS/goods.html"
        ) {
          window.location.href = "/goods.html";
          console.log("four line");
        } else {
          renderGoods(array);
        }
      });
  };
  console.log(window.location.pathname);
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;

      getData(linkValue, category);
    });
  });
  // if (
  //   (localStorage.getItem("goods") &&
  //     window.location.pathname === "/goods.html") ||
  //   "/Willberries-on-JS/goods.html"
  // ) {
  //   renderGoods(JSON.parse(localStorage.getItem("goods"))); //window.location.pathname === "/Willberries-on-JS/goods.html"
  // }

  if (
    localStorage.getItem("goods") &&
    window.location.pathname === "/goods.html"
  ) {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  } else if (
    localStorage.getItem("goods") &&
    window.location.pathname === "./goods.html"
  ) {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  } else if (
    localStorage.getItem("goods") &&
    window.location.pathname === "/Willberries-on-JS/goods.html"
  ) {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  }

  if (more) {
    more.addEventListener("click", (event) => {
      event.preventDefault();
      getData();
      console.log("click");
    });
  }
};

getGoods();
//метод then() обратился к db.json и вернул нам ответ и он отрабатывает только тогда когда ответ получен
//
