const initArr = rawdata;
let filterArrayImage;
let rawCopy = [...rawdata];
let categoryVar;
let priceVar;
let content;
let current_page = 1;
let no_items = 20;
console.log(`price variable ${priceVar}`);
console.log(`category variable ${categoryVar}`);

//DOM elements
const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");
const resetB = document.getElementById("reset");
const highLow = document.getElementById("highLow");
const lowHigh = document.getElementById("lowHigh");
let cateOptions = document.querySelectorAll("#categoryFilter option");
let priceOptions = document.querySelectorAll("#priceFilter option");

let url = window.location.search;
if (url) {
  refreshContent(url);
} else {
  filterImage(initArr);
  displayList(filterArrayImage, list_element, no_items, current_page);
  setupPagination(filterArrayImage, pagination_element, no_items);
}

const filterHandler = (filterName) => {
  if (filterName === "category") {
    let cateId = document.getElementById("categoryFilter").value;
    setUrlParam("category", cateId);
    filterChange(cateId);
  }
  if (filterName === "price") {
    let priceName = document.getElementById("priceFilter").value;
    setUrlParam("price", priceName);
    priceFilter(priceName);
  }
  if (filterName === "sort") {
    let sortID = document.getElementById("sortFilter").value;
    setUrlParam("sort", sortID);
    sortFilter(sortID);
  }
};

// Category Option
function filterChange(categoryType) {
  let category = [];
  if (!priceVar) {
    cateOnly(categoryType, category);
  } else {
    if (categoryType == 0) {
      priceOnly(priceVar, category);
    } else {
      priceCategory(priceVar, categoryType, category);
    }
  }
  filterImage(category);
  displayList(filterArrayImage, list_element, no_items, current_page);
  setupPagination(filterArrayImage, pagination_element, no_items);
  content = category;
  categoryVar = categoryType;
}

//Price Option
function priceFilter(price) {
  let filteredPrice = [];
  if (!categoryVar) {
    priceOnly(price, filteredPrice);
  } else {
    if (categoryVar == 0) {
      priceOnly(price, filteredPrice);
    } else {
      priceCategory(price, categoryVar, filteredPrice);
    }
  }
  filterImage(filteredPrice);
  displayList(filterArrayImage, list_element, no_items, current_page);
  setupPagination(filterArrayImage, pagination_element, no_items);
  content = filteredPrice;
  priceVar = price;
}

//content sections + pagination
//~~~~~~~~~~~~~~~~~~~~~~~
function filterImage(arr) {
  const imageArray = [];
  for (let product of arr) {
    if (product.productMedia[0] && product.productMedia[0].url) {
      const imgSrc = `https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}`;
      const urlParam = `./detail.html?prodID=${product.prodId}`;
      let imgSection = `
      <a href="${urlParam}">
        <div id="img-section">
          <img src="${imgSrc}">
        </div>
        <p id="title">Title: ${product.title}</p>
        <p id="price">Price: ${product.price}</p>
        <p id="stock">Stock: ${product.availableStock}</p>
      </a>
      `;
      imageArray.push(imgSection);
    }
  }
  filterArrayImage = imageArray;
}

function displayList(items, wrapper, no_per_page, page) {
  wrapper.innerHTML = "";
  page--; //array starts at 0

  let start = no_per_page * page;
  let end = start + no_per_page;
  let paginatedItems = items.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];

    let item_element = document.createElement("div");
    item_element.classList.add(`item`);
    item_element.innerHTML = item;

    wrapper.appendChild(item_element);
  }
}

function setupPagination(items, wrapper, no_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / no_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;
    displayList(items, list_element, no_items, current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

//~~~~~~~~~~~~~~~~~~~~~~~
//

//Filter section
//------------------------------------------------------------
//cateFilter
function cateOnly(categoryValue, arr) {
  for (let product of initArr) {
    if (categoryValue == 0) {
      arr.push(product);
    }
    if (product.categoryId == categoryValue && categoryValue != 0) {
      arr.push(product);
    }
  }
}

//priceFilter
function priceOnly(priceValue, arr) {
  for (let product of initArr) {
    if (priceValue == 0) {
      arr.push(product);
    }
    if (priceValue == 100 && product.price > 0 && product.price < 101) {
      arr.push(product);
    }
    if (priceValue == 500 && product.price > 100 && product.price < 501) {
      arr.push(product);
    }
    if (priceValue == 1000 && product.price > 500 && product.price < 1001) {
      arr.push(product);
    }
    if (priceValue == 1001 && product.price > 1000) {
      arr.push(product);
    }
  }
}

//price+cate
function priceCategory(priceValue, categoryValue, arr) {
  for (let product of initArr) {
    if (
      product.categoryId == categoryValue &&
      categoryValue != 0 &&
      priceValue == 0
    ) {
      arr.push(product);
    }
    if (
      product.categoryId == categoryValue &&
      categoryValue != 0 &&
      priceValue == 100 &&
      product.price > 0 &&
      product.price < 101
    ) {
      arr.push(product);
    }
    if (
      product.categoryId == categoryValue &&
      categoryValue != 0 &&
      priceValue == 500 &&
      product.price > 100 &&
      product.price < 501
    ) {
      arr.push(product);
    }
    if (
      product.categoryId == categoryValue &&
      categoryValue != 0 &&
      priceValue == 1000 &&
      product.price > 500 &&
      product.price < 1001
    ) {
      arr.push(product);
    }
    if (
      product.categoryId == categoryValue &&
      categoryValue != 0 &&
      priceValue == 1001 &&
      product.price > 1000
    ) {
      arr.push(product);
    }
  }
}

//Sort filter
function sortFilter(x) {
  no_items = x;
}
//------------------------------------------------------------
//Reset button
resetB.addEventListener("click", function () {
  //URLreset
  let url = new URL(window.location);
  window.history.pushState({ path: url.origin }, " ", url.pathname);
  categoryVar = undefined;
  priceVar = undefined;
  filterArrayImage = "";
  // //catereset
  for (let i = 0, l = cateOptions.length; i < l; i++) {
    cateOptions[i].selected = cateOptions[i].defaultSlected;
  }
  // //pricereset
  for (let i = 0, l = priceOptions.length; i < l; i++) {
    priceOptions[i].selected = priceOptions[i].defaultSlected;
  }
  filterImage(initArr);
  displayList(filterArrayImage, list_element, no_items, current_page);
  setupPagination(filterArrayImage, pagination_element, no_items);
});

//SET URL
function setUrlParam(name, value) {
  let url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.pushState({ path: url.href }, " ", url.href);
}

//Content after refresh
function refreshContent(url) {
  const queryStr = new URLSearchParams(url);
  const cateID = queryStr.get("category");
  const priceID = queryStr.get("price");
  const sortID = queryStr.get("sort");
  selectOption("categoryFilter", cateID);
  selectOption("priceFilter", priceID);
  selectOption("sortFilter", sortID);
  categoryVar = cateID;
  priceVar = priceID;
  no_items = sortID;
  if (cateID) {
    filterChange(cateID);
  } else {
    priceFilter(priceID);
  }
}

// //Option selected
function selectOption(element, valueToSelect) {
  let option = document.getElementById(element);
  option.value = valueToSelect;
}
