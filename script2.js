document.getElementById("login-button").addEventListener("click", function () {
    // Получите значения введенного логина и пароля
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Реализуйте логику проверки логина и пароля
    if (username === "О723Б11" && password === "jz7RATkc") {
        // При успешной авторизации, перенаправьте пользователя на страницу "autoresetion.html"
        window.location.href = "autoresetion.html";
    } else {
        // Если авторизация не удалась, вы можете вывести сообщение об ошибке или выполнить другие действия
        alert("Ошибка авторизации. Пожалуйста, проверьте введенные данные.");
    }
});