
document.addEventListener("DOMContentLoaded", () => {

  // MENU
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ANO DO RODAPÉ
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // CATÁLOGO
  const productGrid = document.querySelector(".product-grid");

  if (!productGrid) return;

  // Aceita tanto window.products quanto const products
  const productList =
    window.products ||
    (typeof products !== "undefined" ? products : []);

  if (!Array.isArray(productList) || productList.length === 0) {
    productGrid.innerHTML =
      "<p>Não foi possível carregar os produtos. Confira o arquivo products.js.</p>";

    console.error("Produtos não encontrados. Verifique products.js.");
    return;
  }

  // RENDERIZAR PRODUTOS
  function getProducts(list) {
    productGrid.innerHTML = list.map(product => `
      <article class="product-card" data-category="${product.category}">

        <div class="product-image">
          <img
            src="${product.image}"
            alt="${product.title}"
            loading="lazy"
          >
        </div>

        <div class="product-info">

          <span class="product-type">
            ${product.category.toUpperCase()}
          </span>

          <h3>${product.title}</h3>

          <p>${product.descricao}</p>


          <strong>R$ ${product.price}</strong>
          <br>

          <strong class="prazo">10 dias para produção</strong>

          <a
            href="${product.linkCompra || "index.html"}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Comprar agora ↗
          </a>

        </div>
      </article>
    `).join("");
  }

  // MOSTRAR TODOS OS PRODUTOS
  getProducts(productList);

  // FILTROS
  const filters = document.querySelectorAll(".filter");

  filters.forEach(button => {
    button.addEventListener("click", () => {

      filters.forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      const selected = button.dataset.filter;

      const filteredProducts = selected === "todos"
        ? productList
        : productList.filter(product =>
            product.category === selected
          );

      getProducts(filteredProducts);
    });
  });

});
