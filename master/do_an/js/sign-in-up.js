const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('#sign-up-in_btn');
const Iconclose = document.querySelector('.icon-close');
const errorSpan = document.querySelector('#error');
const btn_yes = document.querySelector('.btn_yes');
var userList;

let login = document.getElementsByClassName('dangnhap')[0];
let signup = document.getElementsByClassName('dangki')[0];

//thông tin tài khoản: lựa chọn đăng nhập đăng ký hoặc đăng nhập để sử dụng giỏ hàng
var optionBox = document.getElementById('option_box');
function openOption() {
  optionBox.style.animation = 'box-in 2s forwards';
}

function closeOption() {
  optionBox.style.animation = 'box-out 2s';
}

registerLink.addEventListener('click', () => {
  login.style.display = 'none';
  signup.style.display = 'block';
});

loginLink.addEventListener('click', () => {
  signup.style.display = 'none';
  login.style.display = 'block';
});

btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
  // wrapper.style.animation = "wrapper-in 2s forwards";
});

btn_yes.addEventListener('click', () => {
  optionBox.style.animation = 'box-out 2s';
  // wrapper.style.animation = "wrapper-in 2s forwards";
  wrapper.classList.add('active-popup');
});

Iconclose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
});

// kiểm tra nhập tên
function checkInputLength(input) {
  if (input.value.length > 10) {
    input.value = input.value.slice(0, 10);
  }
}

//kiểm tra mật khẩu đăng ký
const userNameInput = document.querySelector('#checkusername');
const userNameError = document.querySelector('#username-error');

const accountNameInput = document.querySelector('#checkaccount');
const accountnameIput = document.querySelector('#checkaccount');

const passWordInput = document.querySelectorAll('.checkpasswords');
const passErrorSpan = document.querySelectorAll('.pass-error');

const phoneNumber = document.getElementById('checkphonenumber');
const phoneNumberErrorSpan = document.querySelector('#phonenumber-error');

const checkMail = document.querySelector('#email');
const mailError = document.querySelector('#email-error');

const checkAddress = document.querySelector('#checkaddress');
const addressError = document.querySelector('#erroraddress');

//kiểm tra tên người dùng trong lúc nhập
userNameInput.addEventListener('input', () => {
  var userName = userNameInput.value;
  const regex3 = /([a-z]|[A-Z]){1,128}$/;
  if (userName.match(regex3) && userName.length <= 4) {
    userNameError.textContent = 'Tên không hợp lệ';
  } else {
    userNameError.textContent = '';
  }
});

//kiểm tra mật khẩu trong lúc nhập
passWordInput[0].addEventListener('input', () => {
  var passWord = passWordInput[0].value;
  if (passWord.length < 8 && passWord.length >= 1) {
    passErrorSpan[0].textContent = 'mật khẩu cần ít nhẩt 8 kí tự';
  } else {
    passErrorSpan[0].textContent = '';
  }
});

//kiểm tra mật khẩu được nhập lại
passWordInput[1].addEventListener('input', () => {
  var rewritePassWord = passWordInput[1].value;
  var passWord = passWordInput[0].value;
  if (rewritePassWord === passWord) {
    passErrorSpan[1].textContent = '';
  } else {
    passErrorSpan[1].textContent = 'mật khẩu không trùng khớp';
  }
});

//kiểm tra số điện thoại đăng ký
phoneNumber.addEventListener('input', () => {
  var number = phoneNumber.value;
  var regex = /(84|0[35789])[0-9]{8}$/;
  if (number.match(regex)) {
    phoneNumberErrorSpan.textContent = '';
  } else {
    phoneNumberErrorSpan.textContent = 'số điện thoại không hợp lệ';
    if (number.length <= 10) {
      phoneNumberErrorSpan.textContent = '';
    }
  }
});

//kiểm tra địa chỉ đăng ký
checkAddress.addEventListener('input', () => {
  var address = checkAddress.value;
  if (address.length) {
    addressError.textContent = 'Địa chỉ không hợp lệ';
  } else {
    addressError.textContent = '';
  }
});

//kiểm tra tên đăng nhập
accountNameInput.addEventListener('input', (event) => {
  // Lấy giá trị của input
  const accountName = event.target.value;
  // Cắt bỏ giá trị nếu vượt quá 8 ký tự
  if (accountName.length > 9) {
    event.target.value = accountName.substring(0, 9);
    errorSpan.textContent = 'Tên đăng nhập không vượt qua 10 ký tự';
  } else {
    // Xóa nội dung của thẻ span
    errorSpan.textContent = '';
  }
});

//check mail
checkMail.addEventListener('input', () => {
  var mail = checkMail.value;
  const regex = /([a-z]|[A-Z]|[0-9]){1,64}@([a-z]|[A-Z]|[0-9]|.){1,255}$/;
  if (!mail.match(regex)) {
    mailError.textContent = 'mail không hợp lệ';
  } else {
    mailError.textContent = '';
  }
});

// hàm lưu danh sách người dùng
function saveUserList() {
  localStorage.setItem('userList', JSON.stringify(userList));
}

// hàm lấy danh sách người dùng
function getUserList() {
  userList = JSON.parse(localStorage.getItem('userList'));
}
//hàm chạy save user 1 lần
// function runSaveUserList(){
//   var userHasRun = localStorage.getItem('userHasRun');
//   if (!userHasRun) {
//     saveUserList();
//     localStorage.setItem('userHasRun', true);
//   }
// }
getUserList();
//thêm user
function addUser(userName, accountname, passWord, email, phoneNumber, address) {
  var newUser = {
    userName: userName,
    accountName: accountname,
    password: passWord,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    status: false, // trạng thái đăng nhập
  };
  userList.push(newUser);
  saveUserList();
  getUserList();
}
// if(userList == null){
//   userList = [];
//   addUser(
//   "Group 2",
//   "admin",
//   "admin",
//   "wibustore@gmail.com",
//   "123456789",
//   "tphcm"
//   );

//tài khoản user
//   addUser(
//     "Tống Thành Đạt",
//     "dat",
//     "12345678",
//     "a@gmail.com",
//     "0395632027",
//     "tphcm"
//   );
//   addUser(
//     "Tống Thành Đạt",
//     "dat2",
//     "12345678",
//     "a@gmail.com",
//     "0395632027",
//     "tphcm"
//   );
//   getUserList();
// }

// console.log(userList);
// runSaveUserList();

// LIÊN QUAN TỚI ĐĂNG KÝ TÀI KHOẢN
// bấm submit đăng ký
var register = document.querySelector('#register');
register.addEventListener('click', async function (e) {
  e.preventDefault();
  var userName = userNameInput.value;
  var accountName = accountNameInput.value;
  var passWord = passWordInput[0].value;
  var rewritePassWord = passWordInput[1].value;
  var mail = checkMail.value;
  var number = phoneNumber.value;
  var address = checkAddress.value;
  var check = true;
  const regex1 = /([a-z]|[A-Z]|[0-9]){1,64}@([a-z]|[A-Z]|[0-9]|.){1,255}$/; //biểu thức chính quy mail
  const regex2 = /(84|0[35789])[0-9]{8}$/; //biểu thức chính quy số điện thoại
  const regex3 = /([a-z]|[A-Z]){1,128}$/;
  //check mật khẩu đăng ký
  if (passWord.length < 8 && passWord.length >= 1) {
    check = false;
    if (!check) {
      alert('Mật khẩu không hợp lệ');
    }
  }

  // check mật khẩu được nhập lại
  else if (rewritePassWord !== passWord) {
    check = false;
    if (!check) {
      alert('Mật khẩu không trùng khớp');
    }
  }

  // check mail
  else if (!mail.match(regex1)) {
    check = false;
    if (!check) {
      alert('Mail không hợp lệ');
    }
  }

  //check số điện thoại
  else if (!number.match(regex2)) {
    check = false;
    if (!check) {
      alert('Số điện thoại không hợp lệ');
    }
  }

  //check tên người dùng
  else if (userName.match(regex3) && userName.length <= 4) {
    check = false;
    if (!check) {
      alert('Họ và tên không hợp lệ');
    }
  }

  //check địa chỉ
  else if (address.length > 256) {
    check = false;
    if (!check) {
      alert('Địa chỉ không hợp lệ');
    }
  }

  //check tài khoản
  // else{
  //   for(var i=0; i<userList.length;i++){
  //     if(accountName===userList[i].accountName){
  //       alert("Tên đăng nhập đã tồn tại");
  //       check=false;
  //       accountNameInput.value="";
  //       break;
  //     }
  //   }
  // }
  if (check) {
    let newuser = {
      username: userName,
      accountname: accountName,
      password: passWord,
      email: mail,
      phone: number,
      address: address,
      status: '', // trạng thái đăng nhập
    };
    try {
      let response = await fetch('http://localhost:8080' + '/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Adjust content type if needed
        },
        body: JSON.stringify(newuser),
      });

      if (!response.ok) {
        let data = response.json();
        throw new Error(data.message);
      }

      var alertCustom = document.querySelector('#customalert');
      alertCustom.style.animation = 'complete 10s';
      userNameInput.value = '';
      accountNameInput.value = '';
      passWordInput[0].value = '';
      passWordInput[1].value = '';
      checkMail.value = '';
      phoneNumber.value = '';
      checkAddress.value = '';

      accountNameInput.value = '';
    } catch (error) {
      alert(error.message);
    }
    // addUser(userName, accountName, passWord, mail, number, address);
    // xóa thông tin đã nhập lúc đăng ký thành công
  }
});
// getUserList();
// console.log(userList);

// console.log(userList);
//LIÊN QUAN TỚI ĐĂNG NHẬP/ ĐĂNG XUẤT:

// nút đăng xuất
const logoutButton = document.querySelector('#logout');

// nút xác nhận đăng nhập
const loginButton = document.querySelector('#login');
console.log(loginButton);
//nút admin
const adminButton = document.querySelector('#admin');
const adminButton1 = document.querySelector('#admin1');
//nút xem thông tin tài khoản
const userInforButton = document.querySelector('#infor_user');

//mật khẩu tài khoản đăng nhập
const accountNameLogin = document.querySelector('#account-login');
const passWordLogin = document.querySelector('#password-login');

//thông báo nếu lỗi thông tin
const userLoginError = document.querySelector('#username-login-error');
const passwordError = document.querySelector('#password-login-error');

//nút thanh toán giỏ hàng
const payButton = document.querySelector('#pay button');

// Khi người dùng click vào nút đăng xuất
logoutButton.addEventListener('click', (e) => {
  e.preventDefault;
  // for (var i = 0; i < userList.length; i++) {
  //   if (currentUserLogged.accountName === userList[i].accountName) {
  //     // console.log(currentUserLogged);
  //      setCurrentUser(
  //       userList[i].userName,
  //       userList[i].accountName,
  //       userList[i].password,
  //       userList[i].email,
  //       userList[i].phonenumber,
  //       false
  //     );
  //   }
  // }
  localStorage.removeItem('currentUser');
  btnPopup.style.display = 'initial';
  optionBox.style.display = 'initial';
  loginLink.style.display = 'initial';
  wrapper.style.display = 'initial';
  logoutButton.style.display = 'none';
  adminButton.style.display = 'none';
  userInforButton.setAttribute('onclick', 'openOption()');
  if (window.location.pathname === '/master/do_an/html/cart.html') {
    payButton.removeAttribute('onclick');
    payButton.setAttribute('onclick', 'openOption()');
  }
  deleteAll();
});
//lưu thông tin người đăng nhập hiện tại
function setCurrentUser(
  username,
  accountname,
  password,
  email,
  phonenumber,
  address,
  status,
  role,
  user_id
) {
  var currentUser = {
    userName: username,
    accountName: accountname,
    password: password,
    email: email,
    phoneNumber: phonenumber,
    address: address,
    status: status,
    role: role,
    user_id: user_id,
  };
  console.log(currentUser);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}
// setCurrentUser("","","","","","",true);
loginButton.addEventListener('click', async (e) => {
  // e.preventDefault();
  // var check = false;
  let currentUser;
  let username = accountNameLogin.value;

  try {
    let response = await fetch('http://localhost:8080' + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Adjust content type if needed
      },
      body: JSON.stringify({ accountname: username }),
    });

    if (!response.ok) {
      let data = await response.json();
      console.log(data);
      throw new Error(data.message);
    }

    currentUser = await response.json();
    console.log(currentUser);
    if (currentUser.password == passWordLogin.value) {
      console.log(currentUser.role);
      setCurrentUser(
        currentUser.username,
        currentUser.accountname,
        currentUser.password,
        currentUser.email,
        currentUser.phone,
        currentUser.address,
        currentUser.status,
        currentUser.role,
        currentUser.user_id
      );
      // onLoginSuccess(JSON.parse(localStorage.getItem('currentUser')));
      console.log(1);
      // location.reload();
      checklogin();
      accountNameLogin.value = '';
      passWordLogin.value = '';
    } else {
      throw new Error('Mật khẩu không đúng');
    }
  } catch (error) {
    alert(error);
    console.log(error);
    // alert(error);
  }

  // for (i = 0; i < userList.length; i++) {
  //   if (accountNameLogin.value === userList[i].accountName) {
  //     // console.log("đã tìm thấy tài khoản");
  //     if (userList[i].password === passWordLogin.value) {
  //       check = true;
  //       // console.log("đã tìm thấy mật khẩu");
  //       setCurrentUser(
  //         userList[i].userName,
  //         userList[i].accountName,
  //         userList[i].password,
  //         userList[i].email,
  //         userList[i].phoneNumber,
  //         userList[i].address,
  //         true
  //       );
  //       console.log(userList[i]);

  //     }
  //   }
  // }
  // if (!check) {
  //   alert('vui lòng kiểm tra tài khoản hoặc mật khẩu');
  // }
});
// Khi đăng nhập thành công

function checklogin() {
  let currentUserLogged = localStorage.getItem('currentUser');
  if (currentUserLogged) {
    onLoginSuccess(currentUserLogged);
  }
}
checklogin();
function onLoginSuccess(user) {
  user = JSON.parse(user);

  if (user) {
    console.log(1);
    changeOnLoginSuccess();
    if (
      user.role === 'nguoiquanlykho' ||
      user.role === 'nguoiban' ||
      user.role === 'nguoiquanly'
    ) {
      console.log('admin');
      adminButton.style.display = 'initial';
    }
    if (user.role === 'admin') {
      console.log('admin_1');
      adminButton1.style.display = 'initial';
    }
  }
}

// thay đổi css khi đăng nhập
function changeOnLoginSuccess() {
  if (window.location.pathname === '/master/do_an/html/cart.html') {
    payButton.setAttribute('onclick', 'payAll()');
  }
  userInforButton.setAttribute('onclick', 'openInforTb()');
  logoutButton.style.display = 'initial';
  btnPopup.style.display = 'none';
  optionBox.style.display = 'none';
  loginLink.style.display = 'none';
  wrapper.style.display = 'none';
}
