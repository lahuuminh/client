// localStorage.removeItem("orderList");
let host = 'http://localhost:8080';
// let userList = localStorage.getItem('userList')
//   ? JSON.parse(localStorage.getItem('userList'))
//   : [];
let userList;
// fetch data user list
let content = document.getElementById('mngContent');
async function fetchUser() {
  const response = await fetch(host + '/user/all'); // Thay thế URL bằng URL thực tế của server bạn muốn lấy dữ liệu từ
  userList = await response.json();
  console.log(userList);
  userList = userList.filter((u) => {
    return u.role != 'admin';
  });
  return userList;
}
fetchUser();

window.onload = () => {
  let hamburgerbtn = document.getElementById('hamburger-open');
  hamburgerbtn.addEventListener('click', () => {
    let leftMenu = document.getElementById('left-menu');
    if (window.getComputedStyle(hamburgerbtn).display != 'none') {
      leftMenu.style.display =
        window.getComputedStyle(leftMenu).display == 'block' ? 'none' : 'block';
    }
  });

  let qlTaiKhoan = document.getElementById('userManagement');
  qlTaiKhoan.addEventListener('click', () => {
    console.log(1);
    displayUserManagement(userList);
  });
};

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
      ' <select class="custom-select">' +
      '<option value="nguoiquanly">Người quản lý</option>' +
      '<option value="nguoimua" selected="true">Người mua</option>' +
      '<option value="nguoiban">người bán</option>' +
      '<option value="nguoiquanlykho">người quản lý kho</option>' +
      '</select>' +
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
        ' <select class="custom-select-update">' +
        '<option value="nguoiquanly">Người quản lý</option>' +
        '<option value="nguoimua">Người mua</option>' +
        '<option value="nguoiban">người bán</option>' +
        '<option value="nguoiquanlykho">người quản lý kho</option>' +
        '</select>' +
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
      const selectElement = document.getElementsByClassName(
        'custom-select-update'
      )[0];
      console.log(selectElement);
      const optionValue = user.role;
      const selectedOption = getOptionByValue(optionValue, selectElement);
      function getOptionByValue(value, selectElement) {
        const options = selectElement.querySelectorAll('option');
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === value) {
            options[i].selected = true;
          }
        }
      }
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
    const selectElement = document.getElementsByClassName(
      'custom-select-update'
    )[0];
    const selectedValue = selectElement.value;
    console.log(selectedValue);
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
        role: selectedValue,
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
    const selectElement = document.getElementsByClassName('custom-select')[0];
    const selectedValue = selectElement.value;
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
    console.log(loginNameVal);
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
        role: selectedValue,
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
