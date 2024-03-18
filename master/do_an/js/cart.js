var total = 0;
var table = document.querySelector('#cart_container table');
var totalCash = document.querySelector('#total p');
let orderList =
  localStorage.getItem('orderList') != null
    ? JSON.parse(localStorage.getItem('orderList'))
    : [];
var productAdded = [];
var chitiethoadon = JSON.parse(localStorage.getItem('chitiethoadon')) || [];
//phương thức thêm sản phẩm vào giỏ hàng
function cartAdd(productId, name, price, amount, img) {
  var product = {
    productId: productId,
    name: name,
    price: price,
    amount: amount,
    img: img,
    status: 'chưa xử lý',
  };

  if (!productAdded) productAdded = [product];
  else if ((res = productAdded.find((item) => item.name == product.name))) {
    //xét theo tên sản phẩm nếu trùng thị tăng thêm số lượng
    res.amount += parseFloat(amount);
  } else {
    productAdded.push(product);
  }
  saveProductAdded();
}

//lưu mảng productAdded vào local storage
function saveProductAdded() {
  var jsonStr = JSON.stringify(productAdded);
  localStorage.setItem('productAdded', jsonStr);
}

//lấy giá trị mảng productAdded từ storage
var storedData = localStorage.getItem('productAdded');
if (storedData) {
  productAdded = JSON.parse(storedData);
}

// cập nhật giá trị tiền + sản phẩm
function updateTotal() {
  table.innerHTML = '';
  cartDisplay(); //hiển thị sản phẩm
  totalProduct(); //hiển thị tổng tiền
}

//xóa tất cả sản phẩm trong giỏ hàng
function deleteAll() {
  productAdded = [];
  if (localStorage.getItem('productAdded') !== null) {
    localStorage.removeItem('productAdded');
  }
  updateTotal();
  saveProductAdded();
  location.reload();
}

//phương thức cần chạy sau khi tải trang
document.addEventListener('DOMContentLoaded', function () {
  updateTotal();
});

//phương thức hiển thị sản phẩm
function cartDisplay() {
  if (productAdded.length === 0) {
    var cart = table.insertRow(-1);
    var a = cart.insertCell(0);
    a.innerHTML =
      '<p style="font-size:25px"><strong>hiện đang không có sản phẩm nào</strong></p>';
    a.colSpan = '5';
    return;
  }
  for (var i = 0; i < productAdded.length; i++) {
    var cartRow = table.insertRow(-1); //thêm dòng vào bảng cart
    var deleteIcon, cartPrice, cartName, cartAmount, cartProduct, billStatus;
    deleteIcon = cartRow.insertCell(0);
    deleteIcon.innerHTML =
      '<div class="delete_icon" onclick="deleteProduct(this)"><img src="../asset/icon/delete.png" alt="delete_icon"></div>';
    cartAmount = cartRow.insertCell(0);
    cartAmount.innerHTML =
      '<div class="product-amount">' +
      '<div class="sub-cart">' +
      '<button onclick="decrement(this)">-</button>' +
      '</div>' +
      '<div class="amount">' +
      '<input class="quantity-cart" disabled type="text" value="' +
      productAdded[i].amount +
      '" name="amount" onchange="updateQuantity(this)">' +
      '</div>' +
      '<div class="add-cart">' +
      '<button onclick="increment(this)">+</button>' +
      '</div>' +
      '</div>';
    cartPrice = cartRow.insertCell(0);
    cartPrice.innerHTML =
      '<div class="product-price">' + productAdded[i].price + '</div>';

    cartName = cartRow.insertCell(0);
    cartName.innerHTML =
      '<div class="product-name">' + productAdded[i].name + '</div>';

    cartProduct = cartRow.insertCell(0);
    cartProduct.innerHTML =
      '<div class="product-img">' +
      '<img src="' +
      productAdded[i].img +
      '"alt="product-img">' +
      '</div>';
  }
}
var listTKSP = JSON.parse(localStorage.getItem('listTKSP'));
if (!listTKSP) listTKSP = [];
//thanh toán
// function payAll() {
//   console.log(1);

//   for(var i = 0;i < productAdded.length;i++)
//   {
//     var a = {};
//     var currentDate = new Date();
//     a.name = productAdded[i].name;
//     a.amount = productAdded[i].amount;
//     a.date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
//     listTKSP.push(a);
//   }
//   console.log(listTKSP);
//   localStorage.setItem("listTKSP",JSON.stringify(listTKSP));
//   var currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   if (!productAdded.length) {
//     alert("Bạn chưa mua gì cả :(");
//     return;
//   }
//   if (!confirm("Bạn có chắc chắn muốn mua hàng?")) return;

//   let madon =
//     "WB" +
//     new Date().getDate() +
//     "-" +
//     new Date().getMonth() +
//     (parseInt(new Date().getTime()) % 1e8);
//   let khachhang = currentUser.userName;
//   let sp = "";
//   const url2 = 'http://localhost:8080/hoadon/add';
//   // productAdded.map((x) => {
//   //   x['mahoadon'] = madon;
//   //   chitiethoadon.push(x);
//   // });
//   let date = new Date().toLocaleDateString();
//   let order = {
//     mahoadon: madon,
//     trangthaihoadon: "Wating",
//     ngaymua: date,
//     tongtien: total,
//     user_id: 1
//   };
// fetch(url2, {
//   method: 'POST', // Specify POST method for adding product
//   body: JSON.stringify(order), // Convert product object to JSON string
//   headers: { // Optional headers, can be used for authentication etc.
//     'Content-Type': 'application/json' // Specify content type as JSON
//   }
// })
// .then(response => {
//   if (response.ok) {
//     console.log('hoadon added successfully!');
//     saveProductAdded();
//   productAdded.length = 0;
//   deleteAll();
//   saveProductAdded();
// orderList.push(order);
// localStorage.setItem("orderList", JSON.stringify(orderList));
//   } else {
//     console.error('Error adding hoadon:', response.statusText);
//   }
// })
// .catch(error => {
//   console.error('Error:', error);
// });
//   productAdded.forEach((item) => {
//     sp += item.name + "[" + item.amount + "]</br>";
//       // item['mahoadon'] = madon;
//       // chitiethoadon.push(item);
//       // const price1=item.price
//       // const price_double = parseDouble(price1.slice(0, -1)); // 16000
//       // console.log(price_double)
//       chitiethoadon={
//         mahoadon: madon,
//         masanpham: item.productId,
//         gia: item.price,
//         soluong: item.amount,
//       }
//       const url1 = 'http://localhost:8080/chitiethoadon/add';
//       console.log(chitiethoadon)
//     fetch(url1, {
//       method: 'POST', // Specify POST method for adding product
//       body: JSON.stringify(chitiethoadon), // Convert product object to JSON string
//       headers: { // Optional headers, can be used for authentication etc.
//         'Content-Type': 'application/json' // Specify content type as JSON
//       }
//     })
//     .then(response => {
//       if (response.ok) {
//         console.log('Chitiethoadon added successfully!');
//       } else {
//         console.error('Error adding chitiethoadon:', response.statusText);
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//         localStorage.setItem('chitiethoadon', JSON.stringify(chitiethoadon));
//   });
// }

async function payAll() {
  console.log(1);
  //tongtien
  // for (var i = 0; i < productAdded.length; i++) {
  //   var productPrice = productAdded[i].price
  //   var amount = parseFloat(productAdded[i].amount);
  //   total += parseFloat(productPrice) * amount;
  // }
  for (var i = 0; i < productAdded.length; i++) {
    var a = {};
    var currentDate = new Date();
    a.name = productAdded[i].name;
    a.amount = productAdded[i].amount;
    a.date =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();
    listTKSP.push(a);
  }
  console.log(listTKSP);
  localStorage.setItem('listTKSP', JSON.stringify(listTKSP));
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!productAdded.length) {
    alert('Bạn chưa mua gì cả :(');
    return;
  }
  if (!confirm('Bạn có chắc chắn muốn mua hàng?')) return;

  let madon =
    'WB' +
    new Date().getDate() +
    '-' +
    new Date().getMonth() +
    (parseInt(new Date().getTime()) % 1e8);
  let khachhang = currentUser.userName;
  let sp = '';
  const url2 = 'http://localhost:8080/hoadon/add';
  let date = new Date();
  console.log(currentUser.user_id);
  let order = {
    mahoadon: madon,
    trangthaihoadon: 'Wating',
    ngaymua: date,
    tongtien: total,
    user_id: currentUser.user_id,
  };
  localStorage.setItem('hoadon', JSON.stringify(order));
  // localStorage.setItem('hoadon', JSON.stringify(order));
  try {
    // Gửi yêu cầu hóa đơn trước
    let response = await fetch(url2, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      let data = await response.json();
      console.log(data.message);
      console.log('bug');
      return;
    }

    console.log('Hóa đơn đã được thêm thành công!');
    // ... mã lưu hóa đơn ...

    // Gửi yêu cầu chi tiết hóa đơn cho từng sản phẩm
    //   productAdded.forEach((item) => {
    //     sp += item.name + "[" + item.amount + "]</br>";
    //       // item['mahoadon'] = madon;
    //       // chitiethoadon.push(item);
    //       // const price1=item.price
    //       // const price_double = parseDouble(price1.slice(0, -1)); // 16000
    //       // console.log(price_double)
    //       chitiethoadon={
    //         mahoadon: madon,
    //         masanpham: item.productId,
    //         gia: item.price,
    //         soluong: item.amount,
    //       }
    //       const url1 = 'http://localhost:8080/chitiethoadon/add';
    //       console.log(chitiethoadon)
    //     fetch(url1, {
    //       method: 'POST', // Specify POST method for adding product
    //       body: JSON.stringify(chitiethoadon), // Convert product object to JSON string
    //       headers: { // Optional headers, can be used for authentication etc.
    //         'Content-Type': 'application/json' // Specify content type as JSON
    //       }
    //     })
    productAdded.forEach(async (item) => {
      sp += item.name + '[' + item.amount + ']</br>';
      // item['mahoadon'] = madon;
      // chitiethoadon.push(item);
      // const price1=item.price
      // const price_double = parseDouble(price1.slice(0, -1)); // 16000
      // console.log(price_double)
      chitiethoadon = {
        mahoadon: madon,
        masanpham: item.productId,
        gia: item.price,
        soluong: item.amount,
      };
      console.log(chitiethoadon);
      const url1 = 'http://localhost:8080/chitiethoadon/add';
      await fetch(url1, {
        method: 'POST',
        body: JSON.stringify(chitiethoadon),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    saveProductAdded();
    productAdded.length = 0;
    deleteAll();
    saveProductAdded();
    localStorage.setItem('chitiethoadon', JSON.stringify(chitiethoadon));
  } catch (error) {
    console.error('Lỗi:', error);
    // Xử lý lỗi phù hợp
  }
}
//tongtien
function totalProduct() {
  total = 0;
  for (var i = 0; i < productAdded.length; i++) {
    var productPrice = productAdded[i].price;
    var amount = parseFloat(productAdded[i].amount);
    total += parseFloat(productPrice) * amount;
  }
  totalCash.innerText = 'tổng: ' + total + '';
}
// phương thức xóa sản phẩm
function deleteProduct(button) {
  var row = button.parentNode.parentNode; //lấy chỉ số hàng trong bảng quản lý
  var table = row.parentNode; //lấy hàng từ bảng quản lý
  var cell = row.cells; //lấy ô từ hàng trong bảng quản lý
  table.deleteRow(row.rowIndex); //xóa hàng trong bảng quản lý
  var copy = productAdded;
  for (var i = 0; i < productAdded.length; i++) {
    if (cell[1].textContent === copy[i].name) {
      copy.splice(i, 1);
      break;
    }
  }
  productAdded = copy;
  saveProductAdded();
  updateTotal();
}

//phương thức tăng số lượng sản phẩm
function increment(e) {
  var amount = e.parentNode.parentNode.querySelector('.amount input');
  var a = document.querySelectorAll('.product-amount .amount input');
  var count = 1;
  var quantity = parseFloat(amount.value);
  quantity += count;
  amount.value = quantity.toString();
  updateQuantity(a);
}

//phương thức giảm số lượng sản phẩm
function decrement(e) {
  var amount = e.parentNode.parentNode.querySelector('.amount input');
  var a = document.querySelectorAll('.product-amount .amount input');
  var count = 1;
  var quantity = parseFloat(amount.value);
  quantity -= count;
  if (quantity <= 0) quantity = 1;
  amount.value = quantity.toString();
  updateQuantity(a);
}
//cập nhật số lượng sản phẩm
function updateQuantity(a) {
  for (var i = 0; i < productAdded.length; i++) {
    productAdded[i].amount = parseFloat(a[i].value);
  }
  saveProductAdded();
  totalProduct();
}
