// localStorage.removeItem("orderList");
let host = 'http://localhost:8080';
// let userList = localStorage.getItem('userList')
//   ? JSON.parse(localStorage.getItem('userList'))
//   : [];
let userList;
let nccList;
let thongkeList = [];
let receiveList = [];
let baocaoList = [];
// fetch data user list
let user = JSON.parse(localStorage.getItem('currentUser'));
async function fetchUser() {
  const response = await fetch(host + '/user/all'); // Thay thế URL bằng URL thực tế của server bạn muốn lấy dữ liệu từ
  userList = await response.json();
  console.log(userList);
  userList = userList.filter((u) => {
    return u.role === 'nguoimua';
  });
  console.log(userList);
  return userList;
}
fetchUser();
async function fetchPN() {
  const response = await fetch(host + '/phieunhap/all'); // Thay thế URL bằng URL thực tế của server bạn muốn lấy dữ liệu từ
  receiveList = await response.json();
  console.log(receiveList);

  return receiveList;
}
fetchPN();
async function fetchTKBH() {
  const response = await fetch(host + '/phieunhap/banhang'); // Thay thế URL bằng URL thực tế của server bạn muốn lấy dữ liệu từ
  thongkeList = await response.json();
  console.log(thongkeList);
  return thongkeList;
}
fetchTKBH();
console.log(userList);
async function fetchNCC() {
  const response = await fetch(host + '/nhacungcap/all'); // Thay thế URL bằng URL thực tế của server bạn muốn lấy dữ liệu từ
  nccList = await response.json();
  console.log(nccList);
  return nccList;
}

fetchNCC();
let orderList;
// let orderList = localStorage.getItem('orderList')
//   ? JSON.parse(localStorage.getItem('orderList'))
//   : [];
async function fetchOrderList() {
  const response = await fetch(host + '/hoadon/user'); // Thay thế URL bằng URL thực tế của server bạn muốn lấy dữ liệu từ
  orderList = await response.json();
  console.log(orderList);
}

var productList;
async function fetchSP() {
  const response = await fetch(host + '/findAllProduct'); // Thay thế URL bằng URL thực tế của server bạn muốn lấy dữ liệu từ
  productList = await response.json();
  console.log(productList);
  return productList;
}
fetchSP();
var listTKSP = JSON.parse(localStorage.getItem('listTKSP'));
console.log(productList);
let content = document.getElementById('mngContent');
// console.log(listTKSP);
// let display_product = document.getElementsByClassName("display-product")[0];
// let tkSanPham = document.getElementById("tkSanPham");
// tkSanPham.addEventListener("click", () => {
//   content.style.display = "none";
//   // display_product.style.display = "block";
// });

//MARK: UPDATE ONLOAD
window.onload = () => {
  let hamburgerbtn = document.getElementById('hamburger-open');
  hamburgerbtn.addEventListener('click', () => {
    let leftMenu = document.getElementById('left-menu');
    if (window.getComputedStyle(hamburgerbtn).display != 'none') {
      leftMenu.style.display =
        window.getComputedStyle(leftMenu).display == 'block' ? 'none' : 'block';
    }
  });
  function checkRole(user, role) {
    if (role === 'nguoiquanly') {
      if (user.role === 'nguoiquanly') {
        return true;
      }
    } else if (role === 'nguoiban') {
      if (user.role === 'nguoiquanly' || user.role === 'nguoiban') {
        return true;
      }
    } else if (role === 'nguoiquanlykho') {
      if (user.role === 'nguoiquanly' || user.role === 'nguoiquanlykho') {
        return true;
      }
    }
    return false;
  }
  let tkDonHang = document.getElementById('tkDonHang');
  tkDonHang.addEventListener('click', async () => {
    if (checkRole(user, 'nguoiban')) {
      await fetchOrderList();
      displayOrderManagement(orderList);
    } else {
      alert('Người dùng không có quyền này');
    }
  });

  let qlTaiKhoan = document.getElementById('userManagement');
  qlTaiKhoan.addEventListener('click', () => {
    if (checkRole(user, 'nguoiban')) {
      displayUserManagement(userList);
    } else {
      alert('Người dùng không có quyền này');
    }
  });

  let QLSP = document.getElementById('QLSP');
  QLSP.addEventListener('click', () => {
    if (checkRole(user, 'nguoiquanlykho')) {
      displayQLSP(productList);
    } else {
      alert('Người dùng không có quyền này');
    }
  });
  let QLNCC = document.getElementById('QLNCC');
  QLNCC.addEventListener('click', () => {
    if (checkRole(user, 'nguoiquanlykho')) {
      displayQLNCC(nccList);
    } else {
      alert('Người dùng không có quyền này');
    }
  });
  let TKSP = document.getElementById('TKSP');
  TKSP.addEventListener('click', () => {
    if (listTKSP === null) listTKSP = [];
    for (var i = 0; i < productList.length; i++) productList[i].count = 0;
    for (var i = 0; i < productList.length; i++)
      for (var j = 0; j < listTKSP.length; j++)
        if (productList[i].name === listTKSP[j].name)
          productList[i].count += listTKSP[j].amount;
    displayTKSP(productList);
  });
  let qlPhieuNhap = document.getElementById('qlPhieuNhap');
  qlPhieuNhap.addEventListener('click', () => {
    if (checkRole(user, 'nguoiquanlykho')) {
      displayReceivedNote(receiveList);
    } else {
      alert('Người dùng không có quyền này');
    }
  });

  let qlThongke = document.getElementById('qlThongke');
  qlThongke.addEventListener('click', () => {
    if (checkRole(user, 'nguoiban')) {
      displayTKNote(thongkeList);
    } else {
      alert('Người dùng không có quyền này');
    }
  });

  let qlBaocao = document.getElementById('qlBaocao');
  qlBaocao.addEventListener('click', () => {
    if (checkRole(user, 'nguoiquanlykho')) {
      displayBCNote(baocaoList);
    } else {
      alert('Người dùng không có quyền này');
    }
  });
};

function closeTKNC() {
  var c = document.getElementById('TKNCkhung');
  c.innerHTML = '';
}
function searchTKNC() {
  var name = document.getElementById('inputNameTKNC').value.toLowerCase();
  var type = document.getElementById('inputTypeTKNC').value;
  var min = document.getElementById('inputMinTKNC').value;
  var max = document.getElementById('inputMaxTKNC').value;
  if (min !== '') {
    if (!typeof min == 'number') {
      window.alert('Sai min');
      return;
    }
  } else {
    min = 1.0;
  }
  if (max !== '') {
    if (!typeof max == 'number') {
      window.alert('Sai max');
      return;
    }
  } else {
    max = 100000000;
  }
  min = parseFloat(min);
  max = parseFloat(max);
  type = parseInt(type);

  console.log(type);

  // kq= [];
  // if(type!=0)
  // {
  //     for(var i = 0;i<productList.length;i++)
  //     {
  //         if(productList[i].ten.toLowerCase().indexOf(name)>-1&&productList[i].gia>=min&&productList[i].gia<=max&&productList[i].theloai == type)
  //         kq.push(productList[i]);
  //     }
  // }
  // else
  // {
  //     for(var i = 0;i<productList.length;i++)
  //     {
  //         if(productList[i].ten.toLowerCase().indexOf(name)>-1&&productList[i].gia>=min&&productList[i].gia<=max)
  //         kq.push(productList[i]);
  //     }
  // }

  const apiUrl = 'http://localhost:8080/getsanpham';
  const queryParams = { ten: name, giamin: min, giamax: max, loai: type };

  // Xây dựng URL với các query parameters
  const urlWithParams = new URL(apiUrl);
  Object.keys(queryParams).forEach((key) =>
    urlWithParams.searchParams.append(key, queryParams[key])
  );
  console.log(urlWithParams);
  // Gửi yêu cầu GET
  fetch(urlWithParams)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Xử lý dữ liệu nhận được từ API
      displayQLSP(data);
      console.log(data);
    })
    .catch((error) => {
      console.error('There was a problem with your fetch operation:', error);
    });

  // console.log(kq);
  // phanTrang(1);
  // closeTKNC();
}
function searchTKNCNCC() {
  var name = document.getElementById('inputNameTKNC').value.toLowerCase();
  var email = document.getElementById('inputEmailTKNC').value.toLowerCase();
  var diachi = document.getElementById('inputDiaChiTKNC').value.toLowerCase();
  console.log(name, email, diachi);
  if (name == '' && email == '' && diachi == '') {
    alert('nhập ít nhất một thông tin muốn tìm kiếm');
    return;
  }
  // kq= [];
  // if(type!=0)
  // {
  //     for(var i = 0;i<productList.length;i++)
  //     {
  //         if(productList[i].ten.toLowerCase().indexOf(name)>-1&&productList[i].gia>=min&&productList[i].gia<=max&&productList[i].theloai == type)
  //         kq.push(productList[i]);
  //     }
  // }
  // else
  // {
  //     for(var i = 0;i<productList.length;i++)
  //     {
  //         if(productList[i].ten.toLowerCase().indexOf(name)>-1&&productList[i].gia>=min&&productList[i].gia<=max)
  //         kq.push(productList[i]);
  //     }
  // }

  const apiUrl = 'http://localhost:8080/nhacungcap/getnhacungcap';
  const queryParams = { ten: name, email: email, diachi: diachi };

  // Xây dựng URL với các query parameters
  const urlWithParams = new URL(apiUrl);
  Object.keys(queryParams).forEach((key) =>
    urlWithParams.searchParams.append(key, queryParams[key])
  );
  console.log(urlWithParams);
  // Gửi yêu cầu GET
  fetch(urlWithParams)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Xử lý dữ liệu nhận được từ API
      displayQLNCC(data);
      console.log(data);
    })
    .catch((error) => {
      console.error('There was a problem with your fetch operation:', error);
    });

  // console.log(kq);
  // phanTrang(1);
  // closeTKNC();
}

function openTKNC() {
  var c = document.getElementById('mngContent');

  let div = document.createElement('div');
  div.id = 'TKNCkhung';
  var b = document.createElement('div');
  b.id = 'TKNC';
  b.innerHTML = `<h2 style="text-align: center;">Tìm kiếm nâng cao</h2>
  <div style="display: flex;">
      <div style="display: block;">
          <h3 class="h3TKNC">Tên sản phẩm</h3>
          <input id="inputNameTKNC" style="margin-left: 20px;" type="text" name="" id=""><br>
      </div>
      <div style="display: block; margin-left: 80px;">
          <h3 class="h3TKNC">Loại sản phẩm</h3>
          <select id="inputTypeTKNC" style="margin-left: 20px;">
          <option value="0">Tất cả</option>
          <option value="1">Mô hình lẻ</option>
          <option value="2">Mô hình chibi</option>
          <option value="3">Bộ mô hình</option>
          <option value="4">Cosplay</option>
          </select>
      </div>
  </div>
  <br>
  <div style="display: flex; margin-left: 20px;">
      <h4>Từ</h4> <input id="inputMinTKNC" type="text" placeholder="VNĐ">
      <h4>Đến</h4> <input id="inputMaxTKNC" style="margin-right: 20px" type="text"placeholder="VNĐ">
  </div>
  <br>
  <button onclick="searchTKNC()" style="float: right;">Tìm kiếm</button>
  <button onclick="closeTKNC()" style="float: right;">Hủy</button>`;
  div.appendChild(b);
  c.appendChild(div);
}
function openTKNCNCC() {
  var c = document.getElementById('mngContent');

  let div = document.createElement('div');
  div.id = 'TKNCkhung';
  var b = document.createElement('div');
  b.id = 'TKNC';
  b.style = 'padding:0 20px';
  b.innerHTML = `<h2 style="text-align: center; margin-bottom:10px">Tìm kiếm nâng cao</h2>
  <div style="display: flex;">
      <div style="display: block;">
          <h3 class="h3TKNC">Tên nhà cung cấp</h3>
          <input id="inputNameTKNC" style="margin-left: 20px;" type="text" name="" id=""><br>
          <h3 class="h3TKNC">Email nhà cung cấp</h3>
          <input id="inputEmailTKNC" style="margin-left: 20px;" type="text" name="" id=""><br>
          <h3 class="h3TKNC">Địa chỉ  nhà cung cấp</h3>
          <input id="inputDiaChiTKNC" style="margin-left: 20px;" type="text" name="" id=""><br>
      </div>
  </div>
  <br>
  
  <br>
  <button onclick="searchTKNCNCC()" style="float: right; margin-left:5px">Tìm kiếm</button>
  <button onclick="closeTKNC()" style="float: right;">Hủy</button>`;
  div.appendChild(b);
  c.appendChild(div);
}
function closeOrderManagement() {
  content.style.display = 'none';
  location.reload();
}
function displayOrderManagement(orderList) {
  console.log(orderList);
  content.innerHTML =
    '<ul id="dsDonHang" class="dsDonHang">' +
    '<li class="donHang">' +
    '<div class="STT">STT</div>' +
    '<div class="MaDon">Mã Đơn</div>' +
    '<div class="Khach">Khách</div>' +
    // '<div class="SanPham">Sản phẩm</div>' +
    '<div class="TongTien">Tổng tiền</div>' +
    '<div class="Ngaygio">Ngày giờ</div>' +
    '<div class="Trangthai">Trạng thái</div>' +
    '<div class="HanhDong">Hành động</div>' +
    '</li>' +
    '</ul>' +
    '<div class="searchBar">' +
    '<form action="" id="dateSearch" class="dateSearch">' +
    '<label for="fromDate">Từ cuối ngày</label>' +
    '<input type="date" name="ngayXaNhat" id="fromDate"' +
    '<label for="toDate">Đến cuối ngày</label>' +
    '<input type="date" name="ngayXaNhat" id="toDate">' +
    '<button class="applySearch" id="dateSearchBtn">Search</button>' +
    '</form>' +
    // '<form action="" id="otherSearch" class="otherSearch">' +
    // '<select name="searchyype" id="searchType">' +
    // '<option value="1">Tìm theo mã đơn</option>' +
    // '<option value="2">Tìm theo tên khách hàng</option>' +
    // '<option value="3">Tim theo trạng thái</option>' +
    // '</select>' +
    // '<input type="text" id="inputValue">' +
    // '<button class="applySearch" id="typeSearchBtn">Search</button>' +
    // '</form>' +
    '</div>' +
    '</div>';
  let searchBtn = document.getElementsByClassName('applySearch');
  let orderElm = document.getElementById('dsDonHang');
  console.log(orderElm);
  loadOrderList(orderElm, orderList);

  searchBtn[0].addEventListener('click', (e) => {
    e.preventDefault();
    let list = [];
    list = conditionSearchOrder('Date');
    console.log(orderElm.children.length);
    // if (i === 1) list = conditionSearch('Value');
    // if (list.length == 0)
    //   loadOrderList(orderElm, JSON.parse(localStorage.getItem('orderList')));
    loadOrderList(orderElm, list);
  });
}
//Load hoa don len web
function loadOrderList(orderElm, orderList) {
  let orderChild = orderElm.childNodes;
  for (let i = orderChild.length - 1; i > 0; i--) {
    orderChild[i].parentNode.removeChild(orderChild[i]);
  }

  for (let i = 0; i < orderList.length; ++i) {
    orderList[i].ngaymua = orderList[i].ngaymua.substring(0, 10);
    let li = document.createElement('li');
    li.setAttribute('class', 'donHang');
    li.innerHTML =
      '<div class="STT">' +
      i +
      '</div>' +
      '<div class="MaDon">' +
      orderList[i].mahoadon +
      '</div>' +
      '<div class="Khach">' +
      orderList[i].user_id +
      '</div>' +
      // '<div class="SanPham">' +
      // orderList[i].masanPham +
      // '</div>' +
      '<div class="TongTien">' +
      orderList[i].tongtien +
      '</div>' +
      '<div class="Ngaygio">' +
      orderList[i].ngaymua +
      '</div>' +
      '<div class="Trangthai">' +
      orderList[i].trangthaihoadon +
      '</div>' +
      '<div class="HanhDong">' +
      '<div class="accept">Y</div>' +
      '<div class="deny">X</div>' +
      '<div class="in">In</div>' +
      '</div>';
    orderElm.appendChild(li);
    let accept = li.getElementsByClassName('accept')[0];
    let deny = li.getElementsByClassName('deny')[0];
    let status = li.getElementsByClassName('Trangthai')[0];
    let In = li.getElementsByClassName('in')[0];

    In.addEventListener('click', () => {
      if (status.innerHTML.localeCompare('Wating') === 0) {
        alert('Không thể in hóa đơn của đơn hàng đang chờ ');
        return;
      }
      if (status.innerHTML.localeCompare('Da Huy') === 0) {
        alert('khong the in don hang da huy');
        return;
      }
      // Chuyển hướng người dùng sang một URL mới
      window.location.href = `http://127.0.0.1:5501/master/do_an/html/hoadon.html?ma=${orderList[i].mahoadon}`;
    });
    accept.addEventListener('click', async () => {
      if (status.innerHTML.localeCompare('Da Giao Hang') === 0) {
        return;
      }
      if (status.innerHTML.localeCompare('Da Huy') === 0) {
        alert('khong the giao don hang da huy');
        return;
      }
      let ans = confirm('Bạn chắc chắn muốn giao hàng ?');
      if (ans == 1) {
        try {
          const response = await fetch(
            'http://localhost:8080/hoadon/accept/' + orderList[i].mahoadon,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            let data = await response.json();
            throw new Error(data.message);
          }
          if (response.status === 202) {
            const result = await response.json();
            console.log(result);
            console.log('dcm');
            status.innerHTML = 'Da Giao Hang';
            setOrderStatus(orderList[i].maDon, 'Da Giao Hang');
          } else {
            alert('1 số mặt hàng đã hết vui lòng đợi ');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });

    deny.addEventListener('click', async () => {
      if (status.innerHTML.localeCompare('Da Huy') === 0) return;
      if (status.innerHTML.localeCompare('Da Giao Hang') === 0)
        return alert('Khong the huy don hang da giao');
      let ans = confirm('Bạn chắc chắn muốn hủy,thao tác không thể hoàn tác!?');
      if (ans == 1) {
        try {
          const response = await fetch(
            'http://localhost:8080/hoadon/deny/' + orderList[i].mahoadon,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            let data = await response.json();
            throw new Error(data.message);
          }
          const result = await response.json();
          console.log(result);
          status.innerHTML = 'Da Huy';
          setOrderStatus(orderList[i].maDon, 'Da Huy');
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  }
}

//MARK: CHO NAY UPDATE NUA NE
function openaddPN() {
  var pa = document.getElementsByClassName('addEditReceived')[0];
  pa.innerHTML = '';
  var form = document.createElement('div');
  form.id = 'formAddQLSP';
  form.innerHTML =
    '<h3 style="text-align: center;">Thêm phieu nhap</h3>' +
    '<label for="nameSP">Tên sản phẩm</label><br>' +
    '<input id="nameSP" type="text"><br>' +
    '<label for="">Cong ty</label><br>' +
    '<input id="CongTy" type="text"><br>' +
    '<label for="">So luong</label><br>' +
    '<input id="SoLuong" type="text"><br>' +
    '<label for="">Ngay nhap</label><br>' +
    '<input id="NgayNhap" type="date"><br>' +
    '<label for="">Loại</label><br>' +
    `<div style="display: flex;">` +
    '<input type="radio" name="type" value="1">1<br>' +
    '<input type="radio" name="type" value="2">2<br>' +
    '<input type="radio" name="type" value="3">3<br>' +
    '<input type="radio" name="type" value="4">4<br>' +
    '</div>' +
    '<label for="">Giá nhập</label><br>' +
    '<input id="pricePN" type="text"><br>' +
    '<button onclick="addPN()" style="float: right;" >Submit</button>' +
    '<button onclick="closeAddQLSP()" style="float: right;" >Cancel</button>';
  pa.appendChild(form);
}
//MARK: CHO NAY UPDATW
function displayReceivedNote(receiveList) {
  content.innerHTML =
    '<div class="addEditReceived">' +
    '</div>' +
    '<ul id="dsPhieuNhap" class="dsPhieuNhap">' +
    '<li class="phieuNhap">' +
    '<div class="STT">STT</div>' +
    '<div class="MaPhieuNhap">Mã Phieu Nhap</div>' +
    '<div class="CongTy">Cong ty</div>' +
    '<div class="SanPham">Sản phẩm</div>' +
    '<div class="Loai">Loai</div>' +
    '<div class="SoLuong">So luong</div>' +
    '<div class="NgayNhap">Ngày Nhap</div>' +
    '<div class="TongCong">Tong cong</div>' +
    '</li>' +
    '</ul>' +
    '<div class="searchBar">' +
    '<form action="" id="dateSearch" class="dateSearch">' +
    '<label for="fromDate">Từ cuối ngày</label>' +
    '<input type="date" name="ngayXaNhat" id="fromDate"' +
    '<label for="toDate">Đến cuối ngày</label>' +
    '<input type="date" name="ngayXaNhat" id="toDate">' +
    '<button class="applySearch" id="dateSearchBtn">Search</button>' +
    '<a href="#" id="addRecieveNote" style="padding-left:20px" onclick="openaddPN()">+THEM SAN PHAM</a>';
  '</form>' +
    // '<form action="" id="otherSearch" class="otherSearch">' +
    // '<select name="searchyype" id="searchType">' +
    // '<option value="1">Tìm theo mã đơn</option>' +
    // '<option value="2">Tìm theo tên khách hàng</option>' +
    // '<option value="3">Tim theo trạng thái</option>' +
    // '</select>' +
    // '<input type="text" id="inputValue">' +
    // '<button class="applySearch" id="typeSearchBtn">Search</button>' +
    // '</form>' +
    '</div>' +
    '</div>';
  let searchBtn = document.getElementsByClassName('applySearch');
  let receiveElm = document.getElementById('dsPhieuNhap');
  console.log(receiveElm);
  loadReceivedList(receiveElm, receiveList);

  searchBtn[0].addEventListener('click', (e) => {
    e.preventDefault();
    let list = [];
    list = conditionSearchPN('Date', receiveList);
    console.log(receiveElm.children.length);
    // if (i === 1) list = conditionSearch('Value');
    // if (list.length == 0)
    //   loadOrderList(orderElm, JSON.parse(localStorage.getItem('orderList')));
    loadReceivedList(receiveElm, list);
  });
}

function loadReceivedList(receiveElm, receiveList) {
  let receiveChild = receiveElm.childNodes;
  for (let i = receiveChild.length - 1; i > 0; i--) {
    receiveChild[i].parentNode.removeChild(receiveChild[i]);
  }

  for (let i = 0; i < receiveList.length; ++i) {
    let li = document.createElement('li');
    li.setAttribute('class', 'phieuNhap');
    li.innerHTML =
      '<div class="STT">' +
      i +
      '</div>' +
      '<div class="MaPhieuNhap">' +
      receiveList[i].maphieunhap +
      '</div>' +
      '<div class="Khach">' +
      receiveList[i].congty +
      '</div>' +
      '<div class="SanPham">' +
      receiveList[i].masanpham +
      '</div>' +
      '<div class="Loai">' +
      receiveList[i].loai +
      '</div>' +
      '<div class="TongTien">' +
      receiveList[i].soluong +
      '</div>' +
      '<div class="Ngaygio">' +
      receiveList[i].ngaynhap +
      '</div>' +
      '<div class="TongCOng">' +
      receiveList[i].tongtiennhap;
    receiveElm.appendChild(li);
  }
}
/*thong ke*/
function displayTKNote(thongkeList) {
  content.innerHTML =
    '<ul id="dsthongke" class="dsthongke">' +
    '<li class="thongke">' +
    '<div class="sothutu">STT</div>' +
    '<div class="congty">Mã sản phẩm</div>' +
    '<div class="soluong">Số lượng bán</div>' +
    '<div class="tongcong">Doanh thu</div>' +
    '</li>' +
    '</ul>' +
    '<div class="searchBar">' +
    '<form action="" id="dateSearch" class="dateSearch">' +
    '<label for="fromDate">Từ cuối ngày</label>' +
    '<input type="date" name="ngayXaNhat" id="fromDate"' +
    '<label for="toDate">Đến cuối ngày</label>' +
    '<input type="date" name="ngayXaNhat" id="toDate">' +
    '<button class="applySearch" id="dateSearchBtn">Search</button>' +
    // "</form>" +
    // '<form action="" id="otherSearch" class="otherSearch">' +
    // '<select name="searchyype" id="searchType">' +
    // '<option value="1">Tìm theo mã đơn</option>' +
    // '<option value="2">Tìm theo tên khách hàng</option>' +
    // '<option value="3">Tim theo trạng thái</option>' +
    // '</select>' +
    // '<input type="text" id="inputValue">' +
    // '<button class="applySearch" id="typeSearchBtn">Search</button>' +
    // '</form>' +
    '</div>' +
    '</div>';
  let searchBtn = document.getElementsByClassName('applySearch');
  let TKElm = document.getElementById('dsthongke');
  console.log(TKElm);
  loadTKList(TKElm, thongkeList);

  searchBtn[0].addEventListener('click', (e) => {
    e.preventDefault();
    let list = [];
    list = conditionSearch('Date', thongkeList);
    console.log(TKElm.children.length);
    // if (i === 1) list = conditionSearch('Value');
    // if (list.length == 0)
    //   loadOrderList(orderElm, JSON.parse(localStorage.getItem('orderList')));
    loadTKList(TKElm, list);
  });
}
//MARK: CHO Nay update
function loadTKList(TKElm, TKList) {
  let TKChild = TKElm.childNodes;
  for (let i = TKChild.length - 1; i > 0; i--) {
    TKChild[i].parentNode.removeChild(TKChild[i]);
  }

  for (let i = 0; i < TKList.length; ++i) {
    let li = document.createElement('li');
    li.setAttribute('class', 'thongke');
    li.innerHTML =
      '<div class="STT">' +
      i +
      '</div>' +
      '<div class="congty">' +
      thongkeList[i].masanpham +
      '</div>' +
      '<div class="soluong">' +
      thongkeList[i].soluong +
      '</div>' +
      '<div class="tongcong">' +
      thongkeList[i].tongtien;
    TKElm.appendChild(li);
  }
}
/*-----*/

/*baocao*/
function displayBCNote(baocaoList) {
  content.innerHTML =
    '<ul id="dsbaocao" class="dsbaocao">' +
    '<li class="baocao">' +
    '<div class="Sothutu">STT</div>' +
    '<div class="madonhang">Công ty</div>' +
    '<div class="Sanpham">Số lượng</div>' +
    '<div class="Ngayban">Tổng tiền nhập</div>' +
    '</li>' +
    '</ul>' +
    '<div class="searchBar">' +
    '<form action="" id="dateSearch" class="dateSearch">' +
    '<label for="fromDate">Từ cuối ngày</label>' +
    '<input type="date" name="ngayXaNhat" id="fromDate"' +
    '<label for="toDate">Đến cuối ngày</label>' +
    '<input type="date" name="ngayXaNhat" id="toDate">' +
    '<button class="applySearch" id="dateSearchBtn">Search</button>' +
    // "</form>" +
    // '<form action="" id="otherSearch" class="otherSearch">' +
    // '<select name="searchyype" id="searchType">' +
    // '<option value="1">Tìm theo mã đơn</option>' +
    // '<option value="2">Tìm theo tên khách hàng</option>' +
    // '<option value="3">Tim theo trạng thái</option>' +
    // '</select>' +
    // '<input type="text" id="inputValue">' +
    // '<button class="applySearch" id="typeSearchBtn">Search</button>' +
    // '</form>' +
    '</div>' +
    '</div>';
  let searchBtn = document.getElementsByClassName('applySearch');
  let BCElm = document.getElementById('dsbaocao');
  console.log(BCElm);
  console.log(baocaoList);
  loadBCList(BCElm, baocaoList);

  searchBtn[0].addEventListener('click', async (e) => {
    e.preventDefault();
    let list = [];
    let fromDateInput = document.getElementById('fromDate').value;
    let toDateInput = document.getElementById('toDate').value;
    fromDateInput = new Date(fromDateInput);
    toDateInput = new Date(toDateInput);
    const response = await fetch(
      host + '/phieunhap/nhaphang/' + fromDateInput + '/' + toDateInput
    ); // Thay thế URL bằng URL thực tế của server bạn muốn lấy dữ liệu từ
    list = await response.json();
    console.log(list);
    // if (i === 1) list = conditionSearch('Value');
    // if (list.length == 0)
    //   loadOrderList(orderElm, JSON.parse(localStorage.getItem('orderList')));
    loadBCList(BCElm, list);
  });
}

function loadBCList(BCElm, baocaoList) {
  let BCChild = BCElm.childNodes;
  for (let i = BCChild.length - 1; i > 0; i--) {
    BCChild[i].parentNode.removeChild(BCChild[i]);
  }
  console.log(baocaoList);
  for (let i = 0; i < baocaoList.length; ++i) {
    let li = document.createElement('li');
    li.setAttribute('class', 'baocao');
    li.innerHTML =
      '<div class="STT">' +
      i +
      '</div>' +
      '<div class="madonhang">' +
      baocaoList[i].congty +
      '</div>' +
      '<div class="Sanpham">' +
      baocaoList[i].soluong +
      '</div>' +
      '<div class="Tongcong">' +
      baocaoList[i].tongtiennhap;
    BCElm.appendChild(li);
  }
}
/*-----*/
function setOrderStatus(Ma, status) {
  let res = orderList.find((item) => item.maDon == Ma);
  if (res) res.trangThai = status;
  localStorage.setItem('orderList', JSON.stringify(orderList));
}

function conditionSearchOrder(condition) {
  let searchOrderList = [];
  if (condition.localeCompare('Date') == 0) {
    let fromDateInput = document.getElementById('fromDate').valueAsDate;
    let toDateInput = document.getElementById('toDate').valueAsDate;
    console.log(fromDateInput);
    console.log(toDateInput);
    Array.from(orderList).forEach((element) => {
      let d = new Date(element.ngaymua);
      console.log(d);
      if (d >= fromDateInput && d <= toDateInput) searchOrderList.push(element);
      console.log(searchOrderList);
    });
  }
  // if (condition.localeCompare('Value') == 0) {
  //   let Opt = document.getElementById('searchType');
  //   let inputVal = document.getElementById('inputValue').value;
  //   let value = Opt.value;
  //   console.log(inputVal);
  //   switch (value) {
  //     case '1':
  //       Array.from(orderList).forEach((element) => {
  //         if (element.mahoadon == inputVal) searchOrderList.push(element);
  //       });
  //       break;
  //     case '2':
  //       Array.from(orderList).forEach((element) => {
  //         if (element.user_id == inputVal) searchOrderList.push(element);
  //       });
  //       break;
  //     case '3':
  //       Array.from(orderList).forEach((element) => {
  //         if (element.trangthaihoadon == inputVal)
  //           searchOrderList.push(element);
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // if (condition.localeCompare('User') == 0) {
  //   let userSearchType = document.getElementById('userSearchType').value;
  //   let inputVal = document.getElementById('userSearchValue').value;
  //   userList.forEach((user) => {
  //     switch (userSearchType) {
  //       case '1':
  //         if (user.accountname.localeCompare(inputVal) == 0)
  //           searchOrderList.push(user);
  //         break;
  //       case '2':
  //         if (user.username.localeCompare(inputVal) == 0)
  //           searchOrderList.push(user);
  //         break;
  //       case '3':
  //         if (user.email.localStorage(inputVal) == 0)
  //           searchOrderList.push(user);
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // }
  return searchOrderList;
}

function conditionSearch(condition, list) {
  let searchList = [];
  if (condition.localeCompare('Date') == 0) {
    let fromDateInput = document.getElementById('fromDate').valueAsDate;
    let toDateInput = document.getElementById('toDate').valueAsDate;
    console.log(fromDateInput);
    console.log(toDateInput);
    Array.from(list).forEach((element) => {
      let d = new Date(element.ngaymua);
      console.log(d);
      if (d >= fromDateInput && d <= toDateInput) searchList.push(element);
      console.log(searchList);
    });
  }
  return searchList;
}

function conditionSearchPN(condition, list) {
  let searchList = [];
  if (condition.localeCompare('Date') == 0) {
    let fromDateInput = document.getElementById('fromDate').valueAsDate;
    let toDateInput = document.getElementById('toDate').valueAsDate;
    console.log(fromDateInput);
    console.log(toDateInput);
    Array.from(list).forEach((element) => {
      let d = new Date(element.ngaynhap);
      console.log(d);
      if (d >= fromDateInput && d <= toDateInput) searchList.push(element);
      console.log(searchList);
    });
  }
  return searchList;
}

// DO DU LIEU CUA NGUOI DUNG
function displayUserManagement(userList) {
  content.innerHTML =
    '<ul class="userList">' +
    '<li class="user">' +
    '<div class="STT">STT' +
    '</div>' +
    '<div class="HoTen">Họ tên</div>' +
    '<div class="Email">Email</div>' +
    '<div class="TenDangNhap">Tên đăng nhập</div>' +
    '<div class="matKhau">Mật khẩu</div>' +
    '<div class="hanhDong">Hành động</div>' +
    '</li>' +
    '</ul>' +
    '<div class="searchBar flex-start"' +
    '<form action="" id="userSearch">' +
    '<select name="userSeach" id="userSearchType">' +
    '<option value="1">Tìm theo tên đăng nhập</option>' +
    '<option value="2">Tìm theo họ tên</option>' +
    '<option value="3">Tìm theo email</option>' +
    '</select>' +
    '<input type="text" placeholder="Tìm kiếm thông tin..." id="userSearchValue">' +
    '</form>' +
    '<label class="addAccount">' +
    '<div class="addUsrBtn">+</div>' +
    '<div id="addUsrTitle">Tạo Tài Khoản</div>' +
    '</label>' +
    '</div>';

  let userElm = document.getElementsByClassName('userList')[0];
  let searchBar = document.getElementById('userSearchValue');
  let addUserBtn = document.getElementsByClassName('addAccount')[0];

  searchBar.addEventListener('keypress', (e) => {
    if (e.key != 'Enter') return;
    let list = [];
    list = conditionSearch('User');
    // if (list.length == 0) {
    //   loadUserList(userElm, JSON.parse(localStorage.getItem('userList')));
    //   return;
    // }
    loadUserList(userElm, list);
  });

  addUserBtn.addEventListener('click', () => {
    if (document.getElementById('createAccountBox') != null) return;
    let form = document.createElement('form');
    form.setAttribute('id', 'createAccountBox');
    form.innerHTML =
      '<div class="closeBtn">X</div>' +
      '<label for="name">Ho ten</label>' +
      '<label for="name" id="nameErr" style="color:red">Ho ten khong chua ky tu dac biet va toi da 128 ky tu</label>' +
      '<input type="text" id="name" placeholder="Ho va ten">' +
      '<label for="loginName">Ten dang nhap</label>' +
      '<label for="loginName" id="loginNameErr" style="color:red">Ten dang nhap khong toi da 8 ky tu va khong chua ky' +
      'tu dac biet</label>' +
      '<input type="text" id="loginName" placeholder="Ten dang nhap">' +
      '<label for="loginPassword">Mat Khau</label>' +
      '<label for="loginPassword" id="loginPasswordErr" style="color:red">Mat khau toi da 8 ky tu khong chua ky tu dac' +
      'biet</label>' +
      '<input type="password" id="loginPassword" placeholder="mat khau">' +
      '<label for="email">Email</label>' +
      '<label for="email" id="emailErr" style="color:red">Email phai tuan thu abc@email.com</label>' +
      '<input type="email" id="email" placeholder="Email">' +
      '<label for="address">Address</label>' +
      '<label for="address" id="addressErr" style="color:red">Address không được để trống</label>' +
      '<input type="text" id="address" placeholder="Address">' +
      '<label for="phone">Phone</label>' +
      '<label for="phone" id="phoneErr" style="color:red">Phone phải có 10 số </label>' +
      '<input type="text" id="phone" placeholder="Phone">' +
      '<div class="btnWrapper">' +
      '<button type="submit" class="submitBtn">Submit</button>' +
      '<button type="reset" >reset</button>' +
      '</div>';
    content.appendChild(form);
    createAccountFunc();
    addCloseBehavior(content, form);
  });

  loadUserList(userElm, userList);
}

function loadUserList(userElm, userList) {
  let userChild = userElm.children;
  Array.from(userChild).forEach((child, index) => {
    if (index != 0) child.parentNode.removeChild(child);
  });
  userList.forEach((user, index) => {
    let li = document.createElement('li');
    li.setAttribute('class', 'user');
    li.innerHTML =
      '<div class="STT">' +
      user.user_id +
      '</div>' +
      '<div class="HoTen">' +
      user.username +
      '</div>' +
      '<div class="Email">' +
      user.email +
      '</div>' +
      '<div class="TenDangNhap">' +
      user.accountname +
      '</div>' +
      '<div class="matKhau">' +
      user.password +
      '</div>' +
      '<div class="hanhDong">' +
      '<div class="delete">X</div>' +
      '<div class="update">Sửa</div>';
    ('</div>');
    userElm.appendChild(li);
    li.getElementsByClassName('delete')[0].addEventListener(
      'click',
      async () => {
        let ans = confirm(
          'Ban chac chan muon xoa tai khoan nay? Viec xoa tai khoan se xoa toan bo thong tin ve don hang va thong tin khach hang?'
        );
        if (ans == 1) {
          console.log(user.user_id);
          let response = await fetch(host + '/user/' + user.user_id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json', // Adjust content type if needed
              // Add any other headers if needed
            },
          });
          if (response.ok) {
            let data = await response.json();
            let list = await fetchUser();
            displayUserManagement(list);
          }
        }
      }
    );
    li.getElementsByClassName('update')[0].addEventListener('click', () => {
      if (document.getElementById('createAccountBox') != null) return;
      let form = document.createElement('form');
      form.setAttribute('id', 'createAccountBox');
      form.innerHTML =
        '<div class="closeBtn">X</div>' +
        '<label for="name">Ho ten</label>' +
        '<label for="name" id="nameErr" style="color:red">Ho ten khong chua ky tu dac biet va toi da 128 ky tu</label>' +
        '<input type="text" id="name">' +
        '<label for="loginPassword">Mat Khau</label>' +
        '<label for="loginPassword" id="loginPasswordErr" style="color:red">Mat khau toi da 8 ky tu khong chua ky tu dac' +
        'biet</label>' +
        '<input type="text" id="loginPassword">' +
        '<label for="email">Email</label>' +
        '<label for="email" id="emailErr" style="color:red">Email phai tuan thu abc@email.com</label>' +
        '<input type="email" id="email">' +
        '<label for="phone">Phone</label>' +
        '<label for="phone" id="phoneErr" style="color:red">Phone phải có 10 số</label>' +
        '<input type="text" id="phone">' +
        '<label for="address">Address</label>' +
        '<label for="address" id="addressErr" style="color:red">Address không được trống</label>' +
        '<input type="text" id="address">' +
        '<div class="btnWrapper">' +
        '<button type="submit" class="submitBtn">Update</button>' +
        '<button type="reset" >reset</button>' +
        '</div>';
      console.log(user);
      content.appendChild(form);
      document.getElementById('name').value = user.username;
      document.getElementById('loginPassword').value = user.password;
      document.getElementById('email').value = user.email;
      document.getElementById('address').value = user.address;
      document.getElementById('phone').value = user.phone;
      updateAccount(user.user_id, user.accountname);
      addCloseBehavior(content, form);
    });
    console.log(li);
  });
}
// fetch post api user

function updateAccount(type, a) {
  let createAccountForm = document.getElementById('createAccountBox');

  let name = document.getElementById('name');
  let loginPass = document.getElementById('loginPassword');
  let email = document.getElementById('email');
  let address = document.getElementById('address');
  let phone = document.getElementById('phone');
  const nameReg = /[a-zA-Z]{3,}$/;
  const loginPassReg = /[a-zA-Z0-9]{8,}$/;
  const emailReg = /([a-z]|[A-Z]|[0-9]){1,64}@([a-z]|[A-Z]|[0-9]|.){1,255}$/;
  const phoneReg = /(84|0[35789])[0-9]{8}$/;
  const addressReg = /.{1}/;

  let nameErr = document.getElementById('nameErr');

  let loginPassErr = document.getElementById('loginPasswordErr');
  let emailErr = document.getElementById('emailErr');
  let phoneErr = document.getElementById('phoneErr');
  let addressErr = document.getElementById('addressErr');

  nameErr.style.display = 'none';

  loginPassErr.style.display = 'none';
  emailErr.style.display = 'none';
  phoneErr.style.display = 'none';
  addressErr.style.display = 'none';
  createAccountForm.addEventListener('submit', (e) => {
    nameErr.style.display = 'none';

    loginPassErr.style.display = 'none';
    emailErr.style.display = 'none';
    phoneErr.style.display = 'none';
    addressErr.style.display = 'none';

    name.style.borderColor = 'black';

    loginPass.style.borderColor = 'black';
    email.style.borderColor = 'black';
    phoneErr.style.display = 'black';
    addressErr.style.display = 'black';

    e.preventDefault();

    let nameVal = name.value;

    let loginPassVal = loginPass.value;
    let emailVal = email.value;
    let phoneVal = phone.value;
    let addressVal = address.value;
    if (!addressReg.test(addressVal)) {
      addressErr.style.display = 'block';
      address.style.borderColor = 'red';
      address.focus();
    }
    if (!phoneReg.test(phoneVal)) {
      phoneErr.style.display = 'block';
      phone.style.borderColor = 'red';
      phone.focus();
    }
    if (!emailReg.test(emailVal)) {
      emailErr.style.display = 'block';
      email.style.borderColor = 'red';
      email.focus();
    }
    if (!loginPassReg.test(loginPassVal)) {
      loginPassErr.style.display = 'block';
      loginPass.style.borderColor = 'red';
      loginPass.focus();
    }

    if (!nameReg.test(nameVal)) {
      nameErr.style.display = 'block';
      name.style.borderColor = 'red';
      name.focus();
    }
    if (
      nameReg.test(nameVal) &&
      loginPassReg.test(loginPassVal) &&
      emailReg.test(emailVal) &&
      phoneReg.test(phoneVal) &&
      addressReg.test(addressVal)
    ) {
      let newuser = {
        username: nameVal,
        password: loginPassVal,
        email: emailVal,
        phone: phoneVal,
        address: addressVal,
        status: 'active', // trạng thái đăng nhập
        role: 'nguoimua',
        user_id: type,
        accountname: a,
      };

      console.log(newuser);
      let requestOptions = {
        method: 'PUT', // hoặc 'PATCH' nếu server hỗ trợ
        headers: {
          'Content-Type': 'application/json',
          // Thêm các header khác nếu cần thiết
        },
        body: JSON.stringify(newuser), // Chuyển đổi object thành chuỗi JSON để gửi đi
      };
      fetch(host + '/user', requestOptions)
        .then(async (response) => {
          if (!response.ok) {
            let data = await response.json();
            throw new Error(data.message);
          }
          // Xử lý phản hồi nếu cần thiết
          if (response.status === 202) {
            console.log('Update successful!');
            return response.json();
          } else {
            alert('Tên người dùng đã tồn tại ');
            throw new Error('User da ton tai');
          }
        })
        .then((data) => {
          console.log('Dữ liệu được trả về từ server:', data);
          fetchUser()
            .then(() => {
              displayUserManagement(userList);
            })
            .catch(() => {
              console.log(e);
            });
        })
        .catch((error) => {
          console.error(
            'There was a problem with your fetch operation:',
            error
          );
        });

      // var newUser = {
      //   userName: nameVal,
      //   accountName: loginNameVal,
      //   password: loginPassVal,
      //   email: emailVal,
      //   phoneNumber: 'none',
      //   address: 'none',
      //   status: false, // trạng thái đăng nhập
      // };
      // localStorage.setItem('userList', JSON.stringify(userList));
    }
    return false;
  });
}
function createAccountFunc() {
  let createAccountForm = document.getElementById('createAccountBox');

  let name = document.getElementById('name');
  let loginName = document.getElementById('loginName');
  let loginPass = document.getElementById('loginPassword');
  let email = document.getElementById('email');
  let address = document.getElementById('address');
  let phone = document.getElementById('phone');
  const nameReg = /[a-zA-Z]{3,}$/;
  const loginNameReg = /[a-zA-Z0-9]{1,128}$/;
  const loginPassReg = /[a-zA-Z0-9]{8,}$/;
  const emailReg = /([a-z]|[A-Z]|[0-9]){1,64}@([a-z]|[A-Z]|[0-9]|.){1,255}$/;
  const phoneReg = /(84|0[35789])[0-9]{8}$/;
  const addressReg = /.{1}/;

  let nameErr = document.getElementById('nameErr');
  let loginNameErr = document.getElementById('loginNameErr');
  let loginPassErr = document.getElementById('loginPasswordErr');
  let emailErr = document.getElementById('emailErr');
  let phoneErr = document.getElementById('phoneErr');
  let addressErr = document.getElementById('addressErr');

  nameErr.style.display = 'none';
  loginNameErr.style.display = 'none';
  loginPassErr.style.display = 'none';
  emailErr.style.display = 'none';
  phoneErr.style.display = 'none';
  addressErr.style.display = 'none';
  createAccountForm.addEventListener('submit', async (e) => {
    nameErr.style.display = 'none';
    loginNameErr.style.display = 'none';
    loginPassErr.style.display = 'none';
    emailErr.style.display = 'none';
    phoneErr.style.display = 'none';
    addressErr.style.display = 'none';

    name.style.borderColor = 'black';
    loginName.style.borderColor = 'black';
    loginPass.style.borderColor = 'black';
    email.style.borderColor = 'black';
    phoneErr.style.border = 'black';
    addressErr.style.border = 'black';

    e.preventDefault();

    let nameVal = name.value;
    let loginNameVal = loginName.value;
    let loginPassVal = loginPass.value;
    let emailVal = email.value;
    let phoneVal = phone.value;
    let addressVal = address.value;
    if (!emailReg.test(emailVal)) {
      emailErr.style.display = 'block';
      email.style.borderColor = 'red';
      email.focus();
    }
    if (!loginPassReg.test(loginPassVal)) {
      loginPassErr.style.display = 'block';
      loginPass.style.borderColor = 'red';
      loginPass.focus();
    }
    if (!phoneReg.test(phoneVal)) {
      phoneErr.style.display = 'block';
      phone.style.borderColor = 'red';
      phone.focus();
    }
    if (!addressReg.test(addressVal)) {
      addressErr.style.display = 'block';
      address.style.borderColor = 'red';
      address.focus();
    }
    if (!loginNameReg.test(loginNameVal)) {
      loginNameErr.style.display = 'block';
      loginName.style.borderColor = 'red';
      loginName.focus();
    }
    if (!nameReg.test(nameVal)) {
      nameErr.style.display = 'block';
      name.style.borderColor = 'red';
      name.focus();
    }
    console.log('create');
    if (
      nameReg.test(nameVal) &&
      loginNameReg.test(loginNameVal) &&
      loginPassReg.test(loginPassVal) &&
      emailReg.test(emailVal) &&
      phoneReg.test(phoneVal) &&
      addressReg.test(addressVal)
    ) {
      console.log('begin');
      let newuser = {
        username: nameVal,
        accountname: loginNameVal,
        password: loginPassVal,
        email: emailVal,
        phone: phoneVal,
        address: addressVal,
        status: '', // trạng thái đăng nhập
      };
      console.log(newuser);
      // Sử dụng hàm postData
      try {
        let response = await fetch(host + '/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Adjust content type if needed
          },
          body: JSON.stringify(newuser),
        });

        if (!response.ok) {
          let data = await response.json();
          throw new Error(data.message);
        }
        const responseData = await response.json();
        if (response.status === 201) {
          console.log(responseData);
          await fetchUser();
          displayUserManagement(userList);
          return responseData; // Return the response data
        } else {
          alert(responseData.message);
        }
      } catch (error) {
        alert(error);
        console.error('Xảy ra lỗi khi gửi yêu cầu:', error);
        throw error; // Re-throw the error for further handling (optional)
      }

      // var newUser = {
      //   userName: nameVal,
      //   accountName: loginNameVal,
      //   password: loginPassVal,
      //   email: emailVal,
      //   phoneNumber: 'none',
      //   address: 'none',
      //   status: false, // trạng thái đăng nhập
      // };
      // localStorage.setItem('userList', JSON.stringify(userList));
    }
    return false;
  });
}

function addCloseBehavior(content, form) {
  let closeBtn = form.getElementsByClassName('closeBtn')[0];
  closeBtn.addEventListener('click', () => {
    form.style.animation = 'show-out 400ms ease';
    setTimeout(() => {
      content.removeChild(form);
    }, 390);
  });
}
var productPerPage = 10;
var currentPage = 1;
var productListHai = productList;

function searchQLSP() {
  console.log(productList);
  var input1 = document
    .getElementById('input-searchByName-QLSP')
    .value.toLowerCase();
  var input2 = document.getElementById('search-type-QPSP').value;
  productListHai = [];
  if (input2 == 0) {
    for (var i = 0; i < productList.length; i++)
      if (productList[i].name.toLowerCase().indexOf(input1) > -1)
        productListHai.push(productList[i]);
  } else {
    for (var i = 0; i < productList.length; i++)
      if (
        productList[i].name.toLowerCase().indexOf(input1) > -1 &&
        productList[i].type == input2
      )
        productListHai.push(productList[i]);
  }
  displayQLSP(productListHai);
}

async function deleteQLSP(id) {
  let ans = confirm('Ban chac chan muon xoa nha cung cap?');
  if (ans == 1) {
    console.log(user.user_id);
    let response = await fetch(host + '/sanpham/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Adjust content type if needed
        // Add any other headers if needed
      },
    });
    if (response.ok) {
      let data = await response.json();
      let list = await fetchSP();
      displayQLSP(list);
    }
  }
}

function closeEditQLSP() {
  var close = document.getElementById('formEditQLSP');
  if (close) close.style.display = 'none';
}

const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};
const resize = (datas, wantedWidth, wantedHeight) => {
  var img = document.createElement('img');

  img.src = datas;
  // When the event "onload" is triggered we can resize the image.
  return new Promise((resolve) => {
    img.onload = () => {
      // We create a canvas and get its context.
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      // We set the dimensions at the wanted size.
      canvas.width = wantedWidth;
      canvas.height = wantedHeight;

      // We resize the image with the canvas method drawImage();
      ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);

      var dataURI = canvas.toDataURL();
      resolve(dataURI);
    };
  });
  // We put the Data URI in the image's src attribute
};
function init() {
  closeEditQLSP();
  localStorage.setItem('productList', JSON.stringify(productList));
  displayQLSP(productListHai);
}

function editQLSP(id) {
  var name = document.getElementById('nameQLSP').value;

  var typeinput = document.getElementsByName('type');
  var type;
  for (var i = 0; i < typeinput.length; i++)
    if (typeinput[i].value !== '') type = typeinput[i].value;
  var soluong = document.getElementById('soluong').value;
  var price = document.getElementById('priceQLSP').value;
  let newsp = {
    ten: name,
    theloai: type,
    gia: price,
    soluong: soluong,
    masanpham: id,
  };
  console.log(newsp);
  let requestOptions = {
    method: 'PUT', // hoặc 'PATCH' nếu server hỗ trợ
    headers: {
      'Content-Type': 'application/json',
      // Thêm các header khác nếu cần thiết
    },
    body: JSON.stringify(newsp), // Chuyển đổi object thành chuỗi JSON để gửi đi
  };
  fetch(host + '/sanpham', requestOptions)
    .then(async (response) => {
      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // Xử lý phản hồi nếu cần thiết
      return data;
    })
    .then((data) => {
      console.log('Dữ liệu được trả về từ server:', data);
      fetchSP()
        .then(() => {
          displayQLSP(productList);
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((error) => {
      console.error('There was a problem with your fetch operation:', error);
    });
  // var name = document.getElementById('nameQLSP').value;

  // var typeinput = document.getElementsByName('type');
  // var type;
  // var flag = 0;
  // for (var i = 0; i < typeinput.length; i++)
  //   if (typeinput[i].checked) {
  //     type = typeinput[i].value;
  //     flag = 1;
  //     break;
  //   }
  // if (flag == 0) type = '';
  // var price = document.getElementById('priceQLSP').value;
  // var img = document.getElementById('imgQLSP');
  // var img2 = document.getElementById('img2QLSP');
  // var img3 = document.getElementById('img3QLSP');
  // var img4 = document.getElementById('img4QLSP');
  // var imgg = document.getElementById('imgQLSP').value;
  // var imgg2 = document.getElementById('img2QLSP').value;
  // var imgg3 = document.getElementById('img3QLSP').value;
  // var imgg4 = document.getElementById('img4QLSP').value;

  // var checkPrice = /^[0-9]{1,15}$/;
  // if (price !== '')
  //   if (!checkPrice.test(price)) {
  //     window.alert('Sai giá');
  //     return;
  //   }

  // let k = 0;
  // for (var i = 0; i < productList.length; i++) {
  //   if (productList[i].id == id) {
  //     if (name !== '') productList[i].name = name;
  //     if (type !== '') productList[i].type = type;
  //     if (price !== '') productList[i].price = price;
  //     k = i;
  //     break;
  //   }
  // }
  // var promises = [];

  // if (imgg !== '' && img.files[0])
  //   promises.push(
  //     blobToBase64(img.files[0]).then((res) => {
  //       return resize(res, 500, 300).then((res2) => {
  //         img = res2;
  //         productList[k].img = res2;
  //       });
  //     })
  //   );

  // if (imgg2 !== '' && img2.files[0])
  //   promises.push(
  //     blobToBase64(img2.files[0]).then((res) => {
  //       return resize(res, 500, 300).then((res2) => {
  //         img2 = res2;
  //         productList[k].img2 = res2;
  //       });
  //     })
  //   );

  // if (imgg3 !== '' && img3.files[0])
  //   promises.push(
  //     blobToBase64(img3.files[0]).then((res) => {
  //       return resize(res, 500, 300).then((res2) => {
  //         img3 = res2;
  //         productList[k].img3 = res2;
  //       });
  //     })
  //   );

  // if (imgg4 !== '' && img4.files[0])
  //   promises.push(
  //     blobToBase64(img4.files[0]).then((res) => {
  //       return resize(res, 500, 300).then((res2) => {
  //         img4 = res2;
  //         productList[k].img4 = res2;
  //       });
  //     })
  //   );

  // // Chờ tất cả các promises hoàn thành
  // Promise.all(promises)
  //   .then(() => {
  //     // Sau khi tất cả đã hoàn thành, lưu vào localStorage
  //     saveProductList();
  //     productListHai = productList;
  //     displayQLSP(productList);
  //     closeEditQLSP();
  //   })
  //   .catch((error) => {
  //     console.error('Error during image processing:', error);
  //   });
}
async function openEditQLSP(id) {
  const response = await fetch(host + '/sanpham/' + id);
  let sanpham;
  if (response.ok) {
    sanpham = await response.json();
  }
  console.log(sanpham);
  var pa = document.getElementsByClassName('addEditQLSP')[0];
  pa.innerHTML = '';
  var form = document.createElement('div');
  form.id = 'formEditQLSP';
  form.innerHTML =
    '<h3 style="text-align: center;">Sửa sản phẩm</h3>' +
    '<label for="">Tên sản phẩm</label><br>' +
    '<input id="nameQLSP" type="text"><br>' +
    '<p class="ghiLai" id="oldName"></p>' +
    '<label for="">Số lượng sản phẩm</label><br>' +
    '<input id="soluong" type="number"><br>' +
    '<label for="">Loại</label><br>' +
    `<div style="display: flex;">` +
    '<input type="radio" name="type" value="1">1<br>' +
    '<input type="radio" name="type" value="2">2<br>' +
    '<input type="radio" name="type" value="3">3<br>' +
    '<input type="radio" name="type" value="4">4<br>' +
    '</div>' +
    '<p class="ghiLai" id="oldType"></p>' +
    '<label for="">Giá</label><br>' +
    '<input id="priceQLSP" type="text"><br>' +
    '<p class="ghiLai" id="oldPrice"></p>' +
    '<label for="">Ảnh</label><br>' +
    '<input id="imgQLSP" type="file"><br>' +
    '<input id="img2QLSP" type="file"><br>' +
    '<input id="img3QLSP" type="file"><br>' +
    '<input id="img4QLSP" type="file"><br>' +
    '<div style="display:flex">' +
    '<img id="oldImg" style="width: 42px">' +
    '<img id="oldImg2" style="width: 42px">' +
    '<img id="oldImg3" style="width: 42px">' +
    '<img id="oldImg4" style="width: 42px">' +
    '</div>' +
    '<button onclick="editQLSP(' +
    id +
    ')" style="float: right;" >Submit</button>' +
    '<button onclick="closeEditQLSP()" style="float: right;" >Cancel</button>';
  pa.appendChild(form);

  var oldName = document.getElementById('oldName');
  var oldType = document.getElementById('oldType');
  var oldPrice = document.getElementById('oldPrice');
  var oldImg = document.getElementById('oldImg');
  var oldImg2 = document.getElementById('oldImg2');
  var oldImg3 = document.getElementById('oldImg3');
  var oldImg4 = document.getElementById('oldImg4');
  var ten = document.getElementById('nameQLSP');
  ten.value = sanpham.ten;
  var soluong = document.getElementById('soluong');
  soluong.value = sanpham.soluong;
  var typeinput = document.getElementsByName('type');
  var type;
  for (var i = 0; i < typeinput.length; i++)
    if (typeinput[i].value == sanpham.theloai) typeinput[i].checked = true;
  var gia = document.getElementById('priceQLSP');
  gia.value = sanpham.gia;

  // oldName.innerHTML = 'Tên cũ: ' + productList[i].ten;
  // oldType.innerHTML = 'Loại cũ: ' + productList[i].theloai;
  // oldPrice.innerHTML = 'Giá cũ: ' + productList[i].gia;
  // oldImg.src = sanpham.listimg[0] ? sanpham.listimg[0].url : '';
  // oldImg2.src = sanpham.listimg[1] ? sanpham.listimg[1].url : '';
  // oldImg3.src = sanpham.listimg[2] ? sanpham.listimg[2].url : '';
  // oldImg4.src = sanpham.listimg[3] ? sanpham.listimg[3].url : '';
}
async function openEditQLNCC(id) {
  const response = await fetch(host + '/nhacungcap/' + id);
  let ncc;
  if (response.ok) {
    ncc = await response.json();
  }

  var pa = document.getElementsByClassName('addEditQLSP')[0];
  pa.innerHTML = '';
  var form = document.createElement('div');
  form.id = 'formEditQLSP';
  form.innerHTML =
    '<h3 style="text-align: center;">Sửa nhà cung cấp</h3>' +
    '<label for="">Tên nhà cung cấp</label><br>' +
    '<input id="ten" type="text"><br>' +
    '<label for="">Địa chỉ nhà cung cấp</label><br>' +
    '<input id="diachi" type="text"><br>' +
    '<label for="">Email nhà cung cấp</label><br>' +
    '<input id="email" type="text"><br>' +
    '<label for="">Số điện thoại nhà cung cấp</label><br>' +
    '<input id="sodienthoai" type="text"><br>' +
    '<button onclick="editQLNCC(' +
    ncc.manhacungcap +
    ')" style="float: right;" >Submit</button>' +
    '<button onclick="closeEditQLSP()" style="float: right;" >Cancel</button>';
  pa.appendChild(form);
  let ten = document.getElementById('ten');
  ten.value = ncc.ten;
  let diachi = document.getElementById('diachi');
  diachi.value = ncc.diaChi;
  let email = document.getElementById('email');
  email.value = ncc.email;
  let sodienthoai = document.getElementById('sodienthoai');
  sodienthoai.value = ncc.soDienThoai;
}
async function editQLNCC(id) {
  let ten = document.getElementById('ten').value;

  let diachi = document.getElementById('diachi').value;

  let email = document.getElementById('email').value;

  let sodienthoai = document.getElementById('sodienthoai').value;
  let newncc = {
    ten: ten,
    email: email,
    diaChi: diachi,
    soDienThoai: sodienthoai,
    manhacungcap: id,
  };
  console.log(newncc);
  let requestOptions = {
    method: 'PUT', // hoặc 'PATCH' nếu server hỗ trợ
    headers: {
      'Content-Type': 'application/json',
      // Thêm các header khác nếu cần thiết
    },
    body: JSON.stringify(newncc), // Chuyển đổi object thành chuỗi JSON để gửi đi
  };
  fetch(host + '/nhacungcap', requestOptions)
    .then(async (response) => {
      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // Xử lý phản hồi nếu cần thiết
      return data;
    })
    .then((data) => {
      console.log('Dữ liệu được trả về từ server:', data);
      fetchNCC()
        .then(() => {
          displayQLNCC(nccList);
        })
        .catch(() => {
          console.log(e);
        });
    })
    .catch((error) => {
      console.error('There was a problem with your fetch operation:', error);
    });
}
function closeAddQLSP() {
  var close = document.getElementById('formAddQLSP');
  if (close) close.style.display = 'none';
}

function init(product) {
  productList.push(product);
  productListHai = productList;
  localStorage.setItem('productList', JSON.stringify(productList));
  displayQLSP(productListHai);
  closeAddQLSP();
}

async function addPN() {
  let name = document.getElementById('nameSP').value;
  let congty = document.getElementById('CongTy').value;
  let soluong = document.getElementById('SoLuong').value;
  let ngaynhap = document.getElementById('NgayNhap').value;
  let loai = document.getElementsByName('type');
  let price = document.getElementById('pricePN').value;
  var type;
  for (var i = 0; i < loai.length; i++)
    if (loai[i].checked) {
      type = loai[i].value;
    }
  type = type == '' ? '' : type;

  let newPN = {
    maphieunhap: Math.floor(Math.random() * 999999 + 1),
    congty: congty,
    ten: name,
    loai: type,
    soluong: soluong,
    ngaynhap: ngaynhap,
    gianhap: price,
  };
  console.log(newPN);

  try {
    let response = await fetch(host + '/phieunhap/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Adjust content type if needed
      },
      body: JSON.stringify(newPN),
    });

    if (!response.ok) {
      let responseData = await response.json();
      throw new Error(responseData.message);
    }

    const responseData = await response.json();
    await fetchPN();
    displayReceivedNote(receiveList);
    return responseData; // Return the response data
  } catch (error) {
    alert(error);
  }
}

async function addQLSP() {
  var product = {};
  // if (productList.length == 0) {
  //   product.id = 1;
  // } else product.id = productList[productList.length - 1].id + 1;
  // product.count = 0;
  var name = document.getElementById('nameQLSP').value;

  var typeinput = document.getElementsByName('type');
  var type;
  for (var i = 0; i < typeinput.length; i++)
    if (typeinput[i].value !== '') type = typeinput[i].value;
  var soluong = document.getElementById('soluong').value;
  var price = document.getElementById('priceQLSP').value;
  var imgg = document.getElementById('imgQLSP').value;
  var imgg2 = document.getElementById('img2QLSP').value;
  var imgg3 = document.getElementById('img3QLSP').value;
  var imgg4 = document.getElementById('img4QLSP').value;

  var img = document.getElementById('imgQLSP');
  var img2 = document.getElementById('img2QLSP');
  var img3 = document.getElementById('img3QLSP');
  var img4 = document.getElementById('img4QLSP');
  var checkPrice = /^[0-9]{1,15}$/;
  console.log(soluong, name, type, price, img, img2, img3, img4);
  if (price !== '')
    if (!checkPrice.test(price)) {
      window.alert('Sai giá');
      return;
    }
  soluong = parseInt(soluong);
  console.log(typeof soluong);
  if (
    typeof soluong === 'number' &&
    name !== '' &&
    type !== '' &&
    price !== ''
    // (imgg !== '' || imgg2 !== '' || imgg3 !== '' || imgg4 !== '')
  ) {
    product.name = name;
    product.type = type;
    product.price = price;
    let count = 0;
    let l = [];
    if (img.files[0])
      await blobToBase64(img.files[0]).then((res) => {
        resize(res, 500, 300).then((res2) => {
          img = res2;
          product.img = res2;
          let test = {
            url: res2,
          };
          l.push(test);
          // if (++count == 4) init(product);
        });
      });
    else count++;

    if (img2.files[0])
      await blobToBase64(img2.files[0]).then((res) => {
        resize(res, 500, 300).then((res2) => {
          img2 = res2;

          product.img2 = img2;

          let test = {
            url: res2,
          };
          l.push(test);
          // if (++count == 4) init(product);
        });
      });
    else count++;
    if (img3.files[0])
      await blobToBase64(img3.files[0]).then((res) => {
        resize(res, 500, 300).then((res2) => {
          img3 = res2;
          product.img3 = img3;
          let test = {
            url: res2,
          };
          l.push(test);
          // if (++count == 4) init(product);
        });
      });
    else count++;

    if (img4.files[0])
      await blobToBase64(img4.files[0]).then((res) => {
        resize(res, 500, 300).then((res2) => {
          img4 = res2;
          product.img4 = img4;
          let test = {
            url: res2,
          };
          l.push(test);
          // if (++count == 4) init(product);
        });
      });
    else count++;
    price = parseFloat(price);
    console.log(l);
    let newproduct = {
      ten: name,
      theloai: type,
      gia: price,
      soluong: soluong,
      listimg: l,
    };

    console.log(newproduct);

    try {
      let response = await fetch(host + '/sanpham/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Adjust content type if needed
        },
        body: JSON.stringify(newproduct),
      });

      if (!response.ok) {
        let data = await response.json();
        throw new Error(data.message);
      }
      const responseData = await response.json();

      console.log(responseData);
      await fetchSP().then((data) => {
        displayQLSP(productList);
      });
    } catch (error) {
      alert(error);
      console.error('Xảy ra lỗi khi gửi yêu cầu:', error);
      throw error; // Re-throw the error for further handling (optional)
    }
  } else {
    window.alert('Thiếu thông tin');
    return;
  }
  // saveProductList();
}
async function addQLNCC() {
  let ten = document.getElementById('ten').value;
  console.log(ten);
  let diachi = document.getElementById('diachi').value;
  let email = document.getElementById('email').value;
  let sodienthoai = document.getElementById('sodienthoai').value;
  let newncc = {
    ten: ten,
    diaChi: diachi,
    soDienThoai: sodienthoai,
    email: email,
  };
  console.log(newncc);

  try {
    let response = await fetch(host + '/nhacungcap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Adjust content type if needed
      },
      body: JSON.stringify(newncc),
    });

    if (!response.ok) {
      let data = await response.json();
      throw new Error(data.message);
    }
    const responseData = await response.json();

    console.log(responseData);
    await fetchNCC();
    displayQLNCC(nccList);
    return responseData; // Return the response data
  } catch (error) {
    alert(error);
    console.error('Xảy ra lỗi khi gửi yêu cầu:', error);
    throw error; // Re-throw the error for further handling (optional)
  }
}
function openAddQLSP() {
  var pa = document.getElementsByClassName('addEditQLSP')[0];
  pa.innerHTML = '';
  var form = document.createElement('div');
  form.id = 'formAddQLSP';
  form.innerHTML =
    '<h3 style="text-align: center;">Thêm sản phẩm</h3>' +
    '<label for="">Tên sản phẩm</label><br>' +
    '<input id="nameQLSP" type="text"><br>' +
    '<label for="">Loại</label><br>' +
    `<div style="display: flex;">` +
    '<input type="radio" name="type" value="1">1<br>' +
    '<input type="radio" name="type" value="2">2<br>' +
    '<input type="radio" name="type" value="3">3<br>' +
    '<input type="radio" name="type" value="4">4<br>' +
    '</div>' +
    '<label for="">Giá</label><br>' +
    '<input id="priceQLSP" type="text"><br>' +
    '<label for="">Ảnh</label><br>' +
    '<label for="">Số lượng</label><br>' +
    '<input id="soluong" type="number" value=1><br>' +
    '<label for="">Ảnh</label><br>' +
    '<input id="imgQLSP" type="file"><br>' +
    '<input id="img2QLSP" type="file"><br>' +
    '<input id="img3QLSP" type="file"><br>' +
    '<input id="img4QLSP" type="file"><br>' +
    '<button onclick="addQLSP()" style="float: right;" >Submit</button>' +
    '<button onclick="closeAddQLSP()" style="float: right;" >Cancel</button>';
  pa.appendChild(form);
}
function openAddQLNCC() {
  var pa = document.getElementsByClassName('addEditQLSP')[0];
  pa.innerHTML = '';
  var form = document.createElement('div');
  form.id = 'formAddQLSP';
  form.style = 'padding:5px 10px';
  form.innerHTML =
    '<h3 style="text-align: center;">Thêm nhà cung cấp</h3>' +
    '<label for="">Tên nhà cung cấp</label><br>' +
    '<input id="ten" type="text"><br>' +
    '<label for="">Địa chỉ nhà cung cấp</label><br>' +
    '<input id="diachi" type="text"><br>' +
    '<label for="">Email nhà cung cấp</label><br>' +
    '<input id="email" type="text"><br>' +
    '<label for="">Số điện thoại nhà cung cấp</label><br>' +
    '<input id="sodienthoai" type="text" style="margin-bottom:10px"><br>' +
    '<button onclick="addQLNCC()" style="float: right;margin-left:5px" >Submit</button>' +
    '<button onclick="closeAddQLSP()" style="float: right;margin-bottom:10px" >Cancel</button>';
  pa.appendChild(form);
}

function displayQLSP(List) {
  console.log(List);
  content.innerHTML = '';
  var khung = document.createElement('div');
  khung.id = 'admin-QLSP';
  khung.innerHTML = `<table border="1px" bordercolor="red" id="table-QLSP">
  <tr style="background-color: #7b517b;">
    <td>ID</td>
    <td>Ảnh</td>
    <td>Tên</td>
    <td>Loại</td>
    <td>Giá</td>
    <td>Số lượng</td>
    <td>Chỉnh sửa</td>
    <td>Xóa</td>
  </tr>
  </table>`;
  var table = khung.querySelector('table');
  for (var i = 0; i < List.length; i++) {
    let anh = List[i].listimg;
    let img;
    if (anh[0]) {
      img = anh[0].url;
    } else {
      img = '../asset/anh/chibi figure/24 4.jpg';
    }
    let element = document.createElement('tr');
    element.innerHTML =
      '<td>' +
      List[i].masanpham +
      '</td>' +
      '<td><img class="config" src="' +
      img +
      '" alt=""></td>' +
      '<td>' +
      List[i].ten +
      '</td>' +
      '<td>' +
      List[i].theloai +
      '</td>' +
      '<td>' +
      List[i].gia +
      'đ</td>' +
      '<td>' +
      List[i].soluong +
      '</td>' +
      '<td align="center"><img onclick="openEditQLSP(' +
      List[i].masanpham +
      ')" class="config" src="../asset/icon/edit.png" alt=""></td>' +
      '<td align="center"><img onclick="deleteQLSP(' +
      List[i].masanpham +
      ')" class="config" src="../asset/icon/delete.png" alt=""></td>';
    table.appendChild(element);
  }

  let element = document.createElement('div');
  element.id = 'searchBar2';
  element.innerHTML = `<div id="searchQLSP">
          <p>Sắp xếp theo:</p>
          <select id="order_product">
          <option value="ten asc">Tăng dần theo tên</option>
          <option value="ten desc">Giảm dần theo tên</option>
          <option value="gia asc">Tăng dần theo giá</option>
          <option value="gia desc">Giảm dần theo giá</option>
          <option value="masanpham asc">Tăng dần theo mã sản phẩm</option>
          <option value="masanpham desc">giảm dần theo mã sản phẩm</option>
          </select>
          <h3 onclick="openTKNC()" id="TKNCp" class="darkMode">Tìm kiếm nâng cao</h3>
        </div>
        <div id="addProductQLSP">
          <a href="#"><p onclick="openAddQLSP()">+ Thêm sản phẩm</p></a>
        </div>`;
  let form = document.createElement('div');
  form.className = 'addEditQLSP';
  content.appendChild(form);
  content.appendChild(element);
  content.appendChild(khung);
  document
    .getElementById('order_product')
    .addEventListener('change', function () {
      var selectedOption = this.value;
      console.log('Đã chọn: ' + selectedOption);

      async function getData(url) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          displayQLSP(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
      getData(host + '/sanphamorder/' + selectedOption);
    });
  // let searchTypeElm = document.getElementById("search-type-QPSP");
  // searchTypeElm.value = searchType;
  // let searchValueElm = document.getElementById("input-searchByName-QLSP");
  // searchValueElm.value = searchVal;
}
function displayQLNCC(List) {
  content.innerHTML = '';
  var khung = document.createElement('div');
  khung.id = 'admin-QLSP';
  khung.innerHTML = `<table border="1px" bordercolor="red" id="table-QLSP">
  <tr style="background-color: #7b517b;">
    <td>ID</td>
    <td>Tên</td>
    <td>Địa chỉ</td>
    <td>Email</td>
    <td>Số điện thoại</td>
    <td>Chỉnh sửa</td>
    <td>Xóa</td>
  </tr>
  </table>`;
  var table = khung.querySelector('table');
  for (var i = 0; i < List.length; i++) {
    let element = document.createElement('tr');
    element.innerHTML =
      '<td>' +
      List[i].manhacungcap +
      '</td>' +
      '<td>' +
      List[i].ten +
      '</td>' +
      '<td>' +
      List[i].diaChi +
      '</td>' +
      '<td>' +
      List[i].email +
      '</td>' +
      '<td>' +
      List[i].soDienThoai +
      '</td>' +
      '<td align="center"><img onclick="openEditQLNCC(' +
      List[i].manhacungcap +
      ')" class="config" src="../asset/icon/edit.png" alt=""></td>' +
      '<td align="center"><img onclick="deleteQLNCC(' +
      List[i].manhacungcap +
      ')" class="config" src="../asset/icon/delete.png" alt=""></td>';
    table.appendChild(element);
  }

  let element = document.createElement('div');
  element.id = 'searchBar2';
  element.innerHTML = `<div id="searchQLSP">
          <p>Sắp xếp theo:</p>
          <select id="nhacungcap_order">
          <option value="ten asc">Tăng dần theo tên</option>
          <option value="ten desc">Giảm dần theo tên</option>
          <option value="manhacungcap asc">Tăng dần theo mã nhà cung cấp</option>
          <option value="manhacungcap desc">Giảm dần theo mã nhà cung cấp</option>
          </select>
          <h3 onclick="openTKNCNCC()" id="TKNCp" class="darkMode">Tìm kiếm nâng cao</h3>
        </div>
        <div id="addProductQLSP">
          <a href="#"><p onclick="openAddQLNCC()">+ Thêm nhà cung cấp</p></a>
        </div>`;
  let form = document.createElement('div');
  form.className = 'addEditQLSP';
  content.appendChild(form);
  content.appendChild(element);
  content.appendChild(khung);
  document
    .getElementById('nhacungcap_order')
    .addEventListener('change', async function () {
      var selectedOption = this.value;
      console.log('Đã chọn: ' + selectedOption);

      async function getData(url) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          displayQLNCC(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
      getData(host + '/nhacungcap/nhacungcaporder/' + selectedOption);
    });
  // let searchTypeElm = document.getElementById("search-type-QPSP");
  // searchTypeElm.value = searchType;
  // let searchValueElm = document.getElementById("input-searchByName-QLSP");
  // searchValueElm.value = searchVal;
}
async function deleteQLNCC(id) {
  let ans = confirm('Ban chac chan muon xoa nha cung cap?');
  if (ans == 1) {
    console.log(user.user_id);
    let response = await fetch(host + '/nhacungcap/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Adjust content type if needed
        // Add any other headers if needed
      },
    });
    if (response.ok) {
      let data = await response.json();
      let list = await fetchNCC();
      displayQLNCC(list);
    }
  }
}

function searchTKSP() {
  productListHai = productList;
  var first = document.getElementById('firstDayTKSP').value;
  var last = document.getElementById('lastDayTKSP').value;
  if (first === '') {
    first = new Date(0);
  }
  if (last === '') {
    last = new Date('9999-12-31');
  }
  first = new Date(first);
  last = new Date(last);
  for (var i = 0; i < productListHai.length; i++) productListHai[i].count = 0;
  for (var i = 0; i < productListHai.length; i++) {
    for (var j = 0; j < listTKSP.length; j++) {
      var d = new Date(listTKSP[j].date);
      if (
        productListHai[i].name === listTKSP[j].name &&
        d >= first &&
        d <= last
      )
        productListHai[i].count += listTKSP[j].amount;
    }
  }
  console.log(listTKSP);
  displayTKSP(productListHai);
}
function displayTKSP(list) {
  content.innerHTML = '';
  var khung = document.createElement('div');
  khung.id = 'admin-TKSP';
  var table = document.createElement('table');
  table.id = 'tableTKSP';
  table.innerHTML = `<tr>
  <td style="background-color : var(--accent-color) ;">Loại</td>
  <td style="background-color : var(--accent-color) ;">Đã bán</td>
  <td style="background-color : var(--accent-color) ;">Doanh thu</td>
  </tr>`;
  content.appendChild(khung);
  khung.appendChild(table);
  var search = document.createElement('div');
  search.id = 'searchBarTKSP';
  search.innerHTML = `<p>Từ ngày:</p>
  <input id="firstDayTKSP" type="date">
  <p>Đến ngày:</p>
  <input id="lastDayTKSP" type="date">
  <button onclick="searchTKSP()" >Tìm kiếm</button>`;
  content.appendChild(search);
  var tongLoai1 = 0,
    tongLoai2 = 0,
    tongLoai3 = 0,
    tongLoai4 = 0,
    daban1 = 0,
    daban2 = 0,
    daban3 = 0,
    daban4 = 0;
  for (var i = 0; i < list.length; i++) {
    if (list[i].type == 1) {
      daban1 += list[i].count;
      tongLoai1 += list[i].count * list[i].price;
    }
    if (list[i].type == 2) {
      daban2 += list[i].count;
      tongLoai2 += list[i].count * list[i].price;
    }
    if (list[i].type == 3) {
      daban3 += list[i].count;
      tongLoai3 += list[i].count * list[i].price;
    }
    if (list[i].type == 4) {
      daban4 += list[i].count;
      tongLoai4 += list[i].count * list[i].price;
    }
  }
  var hang1 = document.createElement('tr');
  hang1.innerHTML =
    '<td>1</td>' + '<td>' + daban1 + '</td>' + '<td>' + tongLoai1 + '</td>';
  table.appendChild(hang1);

  var hang2 = document.createElement('tr');
  hang2.innerHTML =
    '<td>2</td>' + '<td>' + daban2 + '</td>' + '<td>' + tongLoai2 + '</td>';
  table.appendChild(hang2);

  var hang3 = document.createElement('tr');
  hang3.innerHTML =
    '<td>3</td>' + '<td>' + daban3 + '</td>' + '<td>' + tongLoai3 + '</td>';
  table.appendChild(hang3);

  var hang4 = document.createElement('tr');
  hang4.innerHTML =
    '<td>4</td>' + '<td>' + daban4 + '</td>' + '<td>' + tongLoai4 + '</td>';
  table.appendChild(hang4);
}
