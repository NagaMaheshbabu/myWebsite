let ftname = document.querySelector("#First");
let lsname = document.querySelector("#Last");

const email = document.querySelector("#email");
const p = document.createElement("p");
p.classList.add("para");
email.after(p);
email.addEventListener("input", () => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.value) {
    if (email.value.match(regex)) {
      p.innerText = "valid email Address";
      p.style.color = "green";
    } else {
      p.innerText = "Invalid email Address";
      p.style.color = "red";
    }
  } else {
    p.remove();
  }
});
window.addEventListener("click", () => {
  p.innerText = "";
});

//password
const pswd = document.querySelector("#pswd");
const eye = document.querySelector(".eye");
eye.addEventListener("click", () => {
  if (eye.classList.toggle(true)) {
    pswd.type = "text";
    eye.innerHTML = "lock_open_right";
  } else {
    pswd.type = "password";
    eye.innerHTML = "lock";
  }
});

let inputText = document.getElementById("pswd");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let len = document.getElementById("length");

inputText.onfocus = function () {
  document.getElementById("message").style.transition = "all 700ms 700ms ease";
  document.querySelector(".user").remove();
};
inputText.onblur = function () {
  document.getElementById("message").style.display = "none";
};
let lowercaseletters = /[a-z]/g;
var uppercaseletters = /[A-Z]/g;
var numbers = /[0-9]/g;
//whenever we type text in the input
inputText.onkeyup = function () {
  if (inputText.value.match(lowercaseletters)) {
    letter.classList.add("valid");
    letter.classList.remove("invalid");
  } else {
    letter.classList.add("invalid");
    letter.classList.remove("valid");
  }

  if (inputText.value.match(uppercaseletters)) {
    capital.classList.add("valid");
    capital.classList.remove("invalid");
  } else {
    capital.classList.add("invalid");
    capital.classList.remove("valid");
  }

  if (inputText.value.match(numbers)) {
    number.classList.add("valid");
    number.classList.remove("invalid");
  } else {
    number.classList.add("invalid");
    number.classList.remove("valid");
  }

  if (inputText.value.length >= 8) {
    len.classList.add("valid");
    len.classList.remove("invalid");
  } else {
    len.classList.add("invalid");
    len.classList.remove("valid");
  }
};
document.querySelector("#pswd").addEventListener("focus", () => {
  if (
    !(
      pswd.value.match(lowercaseletters) &&
      pswd.value.match(uppercaseletters) &&
      pswd.value.match(numbers) &&
      pswd.value.length >= 8
    )
  ) {
    document.querySelector("#btn").disabled = true;
    document.querySelector("#btn").style.cursor = "no-drop";
    document.querySelector("#message").style.display = "block";

    document.querySelector("#formdata").style.height = "500px";
  } else {
    document.querySelector("#message").style.display = "none";
    document.querySelector("#btn").disabled = false;
    document.querySelector("#btn").style.cursor = "pointer";
  }
});

document.querySelector("#pswd").addEventListener("blur", () => {
  document.querySelector("form").style.height = "470px";
});

const form = document.querySelector("#formdata");
form.classList.add("form-ani");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch("http://localhost:3000/", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  const span = document.createElement("span");
  span.classList.add("exist");
  var count = 0;
  if (data === "Email already exists!") {
    span.innerHTML = data;
    form.after(span);

    setTimeout(() => {
      document.querySelector("#email").value = "";
      span.remove();
    }, 5000);
  }
  var user = document.createElement("span");
  user.classList.add("user");
  if (data === "User registered successfully!") {
    user.innerHTML = data;
    form.after(user);
    setTimeout(() => {
      document.querySelector("#email").value = "";
      user.remove();
    }, 5000);
  }
  if (
    data === "Email already exists!" ||
    data === "User registered successfully!"
  ) {
    document.querySelector("#First").value = "";
    document.querySelector("#Last").value = "";
    document.querySelector("#pswd").value = "";
    letter.classList.remove("valid");
    capital.classList.remove("valid");
    number.classList.remove("valid");
    len.classList.remove("valid");
  }
});
