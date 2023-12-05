const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");

  const renderGoods = (goods) => {
    console.log(goods);
  };

  const getData = (value, category) => {
    fetch("https://my-project-6cc9a-default-rtdb.firebaseio.com/db.json")
      .then((res) => res.json())
      .then((data) => {
        const array = category
          ? data.filter((item) => item[category] === value)
          : data;

        localStorage.setItem("goods", JSON.stringify(array));

        if (window.location.pathname !== "/goods.html") {
          window.location.href = "/goods.html";
        }
      });
  };
  console.log(window.location);
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;

      getData(linkValue, category);
    });
  });
};

getGoods();
//метод then() обратился к db.json и вернул нам ответ и он отрабатывает только тогда когда ответ получен
//