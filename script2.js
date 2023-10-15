document.getElementById("login-button").addEventListener("click", function () {
    // Получите значения введенного логина и пароля
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Проверка на пустые поля
    if (username.trim() === "" && password.trim() === "") {
        alert("Пожалуйста, заполните оба поля логина и пароля.");
    }
    else if (username.trim() === "") {
        alert("Пожалуйста, заполните поле логина.");
    }
    else if (password.trim() === "") {
        alert("Пожалуйста, заполните поле пароля.");
    }
    else {
        // При успешной авторизации, перенаправьте пользователя на страницу "autoresetion.html"
        window.location.href = "autoresetion.html";
    }
});