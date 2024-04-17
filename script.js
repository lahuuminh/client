const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".login");
const Iconclose = document.querySelector(".icon-close");
const usernameIput = document.querySelector("#checkaccount");
const errorSpan = document.querySelector("#error");

let login = document.getElementsByClassName("dangnhap")[0];
let signup = document.getElementsByClassName("dangki")[0];

registerLink.addEventListener("click", () => {
    login.style.display = "none";
    signup.style.display = "block";
});

loginLink.addEventListener("click", () => {
    signup.style.display = "none";
    login.style.display = "block";
});

btnPopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
});

Iconclose.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
});

function checkInputLength(input) {
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}

const usernameInput = document.querySelector("#checkaccount");

usernameInput.addEventListener("input", (event) => {
    // Lấy giá trị của input
    const username = event.target.value;

    // Cắt bỏ giá trị nếu vượt quá 8 ký tự
    if (username.length > 9) {
        event.target.value = username.substring(0, 9);
        errorSpan.textContent = "Tên đăng nhập không vượt qua 10 ký tự";
    } else {
        // Xóa nội dung của thẻ span
        errorSpan.textContent = "";
    }
});

const isLoggedIn = false;

// Khi đăng nhập thành công
function onLoginSuccess() {
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", isLoggedIn);
}

// Tạo nút đăng xuất
const logoutButton = document.querySelector("#logout");

// Khi người dùng click vào nút đăng xuất
logoutButton.addEventListener("click", () => {
    isLoggedIn = false;
    localStorage.setItem("isLoggedIn", isLoggedIn);
});
