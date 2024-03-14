
function showDetail(item) {
  document.documentElement.style.overflow = "hidden";
  var infor = item.childNodes; // thông tin sản phẩm
  var img = item.querySelector("img").src; // hình ảnh sản phẩm
  var name = infor[1].textContent; // tên sản phẩm
  var price = infor[2].textContent; // giá sản phẩm
// console.log(productId); // "1"
  for (var i = 0; i < productList.length; i++) {
    newurl1=productList[i].listimg[0].url
      // console.log(productList[i])
    if (name === productList[i].ten) {
      //phân loại sản phẩm
      var type;
      if (productList[i].theloai == 1) {
        type = "Mô hình lẻ";
      } else if (productList[i].theloai == 2) {
        type = "Mô hình mini";
      } else if (productList[i].theloai == 3) {
        type = "Mô hình theo bộ";
      } else {
        type = "Cosplay";
      }
      let s =
        '<div class="container1">' +
        '<div class="closebutton">' +
        '<div class="close-button">x</div>' +
        "</div>" +
        '<div class="wrapper-flex">' +
        '<div class="left-content">' +
        '<img  src="'+newurl1+'" alt="productList[i] detail"+ width="900px" height="700px" id="main-img" />' +
        '<div class="optionMenu">' +
        '<div class="imgOption">' +
        '<img src="' +
        newurl1 +
        '" alt="opt" class="imgOpt" />' +
        "</div>" +
        '<div class="imgOption">' +
        '<img src="' +
        newurl1 +
        '" alt="opt" class="imgOpt" />' +
        "</div>" +
        '<div class="imgOption">' +
        '<img src="' +
        newurl1 +
        '" alt="opt" class="imgOpt" />' +
        "</div>" +
        '<div class="imgOption">' +
        '<img src="' +
        newurl1 +
        '" alt="opt" class="imgOpt" />' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="right-content">' +
        '<h3 class="title"> ' +
        name +
        "</h3>" +
        '<div class="description">' +
        '<span class="header-detail">Thể loại:</span>' +
        '<span class="text"> ' +
        type +
        "</span>" +
        "</div>" +
        '<div class="price">' +
        '<span class="header-detail">Giá:</span>' +
        '<span class="value"> ' +
        productList[i].gia +
        "đ</span>" +
        "</div>" +
        '<div class="amount">' +
        '<p class="header-detail">Số Lượng:</p>' +
        '<div class="decrease">-</div>' +
        '<input type="text" disabled class="quantity" value="1" min="1" max="999"/>' +
        '<div class="increase">+</div>' +
        "</div>" +
        '<div class="cart-button">Thêm vào giỏ hàng</div>' +
        "</div>" +
        "</div>" +
        "</div>";
        let content = document.getElementsByClassName("itemdetail")[0];
        content.innerHTML = s;
        content.style.zIndex = 99;
        addCloseBehavior(content);
        addAmountChangeBehavior();
        addImgSelectBehavior();
        addCartButtonBehavior(productList[i].masanpham,name, price, img, content);
        console.log(productList[i].masanpham)
        break;
    }
  }
}
function showDetail2(item) {
  fetch('http://localhost:8080/findAllProduct')
.then(response => {
  if (!response.ok) {
    throw new Error('Yêu cầu không thành công');
  }
  return response.json(); // Trả về promise
})
.then(data => {
  productList=data;
  // console.log(productList);
  document.documentElement.style.overflow = "hidden";
  var img = item.querySelector(".product-img img").src;
  var name = item.querySelector(".product-content .name-product").textContent;
  var price = item.querySelector(".product-content .price-product").textContent;
  console.log(price);
  var productId = item.dataset.id;
  price = price.replace("Giá:", "");
  for (var i = 0; i < productList.length; i++) {
      // console.log(productList[i])
      newurl1=productList[i].listimg[0].url
    if (name === productList[i].ten) {
      console.log(1)
      //phân loại sản phẩm
      var type;
      if (productList[i].theloai == 1) {
        type = "Mô hình lẻ";
      } else if (productList[i].theloai == 2) {
        type = "Mô hình mini";
      } else if (productList[i].theloai == 3) {
        type = "Mô hình theo bộ";
      } else {
        type = "Cosplay";
      }
      let s =
        '<div class="container1">' +
        '<div class="closebutton">' +
        '<div class="close-button">x</div>' +
        "</div>" +
        '<div class="wrapper-flex">' +
        '<div class="left-content">' +
        '<img  src="' +
        newurl1 +
        '" alt="productList[i] detail"+ width="900px" height="700px" id="main-img" />' +
        '<div class="optionMenu">' +
        '<div class="imgOption">' +
        '<img src="' +
        newurl1 +
        '" alt="opt" class="imgOpt" />' +
        "</div>" +
        '<div class="imgOption">' +
        '<img src="' +
        newurl1 +
        '" alt="opt" class="imgOpt" />' +
        "</div>" +
        '<div class="imgOption">' +
        '<img src="' +
        newurl1 +
        '" alt="opt" class="imgOpt" />' +
        "</div>" +
        '<div class="imgOption">' +
        '<img src="' +
        newurl1 +
        '" alt="opt" class="imgOpt" />' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="right-content">' +
        '<h3 class="title">' +
        name +
        "</h3>" +
        '<div class="description">' +
        '<span class="header-detail">Thể loại:</span>' +
        '<span class="text">' +
        type +
        "</span>" +
        "</div>" +
        '<div class="price">' +
        '<span class="header-detail">Giá:</span>' +
        '<span class="value">' +
        price +
        "</span>" +
        "</div>" +
        '<div class="amount">' +
        '<p class="header-detail">Số Lượng:</p>' +
        '<div class="decrease">-</div>' +
        '<input type="text" disabled class="quantity" value="1" min="1" max="999"/>' +
        '<div class="increase">+</div>' +
        "</div>" +
        '<div class="cart-button">Thêm vào giỏ hàng</div>' +
        "</div>" +
        "</div>" +
        "</div>";
      let content = document.getElementsByClassName("itemdetail")[0];
      content.innerHTML = s;
      content.style.zIndex = 99;
      addCloseBehavior(content);
      addAmountChangeBehavior();
      addImgSelectBehavior();
      addCartButtonBehavior(productId,name, price, img, content);
      break;
    }}
})
.catch(error => {
  console.error('Lỗi:', error);
});
  // let positionClick = item.target;
  // let id_product = positionClick.parentElement.dataset.id;
  // console.log(item);
}

function addCloseBehavior(content) {
  document.documentElement.style.overflow = "none";
  let close = document.getElementsByClassName("close-button")[0];
  close.addEventListener("click", (e) => {
    e.preventDefault();
    content.children[0].classList.add("fade");
    document.documentElement.style.overflow = null;
    setTimeout(() => {
      content.innerHTML = "";
      content.style.zIndex = null;
    }, 490);
  });
  document.documentElement.style.overflow = "none";
}

function addImgSelectBehavior() {
  let imgOpt = document.getElementsByClassName("imgOpt");
  let imgSelect = document.getElementsByClassName("imgOption");
  imgSelect[0].classList.add("imgOptionSelect");
  for (let i = 0; i < imgOpt.length; ++i) {
    imgOpt[i].addEventListener("click", () => {
      let src = imgOpt[i].src;
      for (let j = 0; j < imgSelect.length; ++j) {
        imgSelect[j].classList.remove("imgOptionSelect");
      }
      imgSelect[i].classList.add("imgOptionSelect");
      document.getElementById("main-img").src = src;
    });
  }
}

function addAmountChangeBehavior() {
  let quantity = document.getElementsByClassName("quantity")[0];
  let increase = document.getElementsByClassName("increase")[0];
  let decrease = document.getElementsByClassName("decrease")[0];

  increase.addEventListener("click", (e) => {
    quantity.value = Math.min(parseInt(quantity.value) + 1, 999);
  });
  decrease.addEventListener("click", (e) => {
    quantity.value = Math.max(parseInt(quantity.value) - 1, 1);
  });

  quantity.addEventListener("change", () => {
    let val = parseInt(quantity.value);
    quantity.value = Math.max(1, Math.min(999, val));
  });
}

function addCartButtonBehavior(productId,name, price, img, content) {
  let quantity = document.getElementsByClassName("quantity")[0];
  let cartbtn = document.getElementsByClassName("cart-button")[0];
  cartbtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    cartbtn.style.filter = "brightness(0.5)";
    content.children[0].classList.add("fade");
    document.documentElement.style.overflow = null;
    setTimeout(() => {
      content.innerHTML = "";
      content.style.zIndex = null;
    }, 490);
    cartAdd(productId,name, price, parseInt(quantity.value), img); //thêm vào mảng của giỏ hàng
    for(var i=0;i<productList.length;i++)
    {
      if(productList[i].name === name) productList[i].count+=parseInt(quantity.value);
    }
    saveProductList();
    // console.log(productList);
  });
}
