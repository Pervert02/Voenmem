document.addEventListener("DOMContentLoaded", function () {
    // Проверяем, авторизован ли пользователь
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn || loggedIn !== "true") {
        // Если пользователь не авторизован, показываем алерт и перенаправляем его на страницу login.html
        alert("Пользователь не авторизован.");
        window.location.href = "login.html";
    }
});