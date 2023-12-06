document.getElementById("login-button").addEventListener("click", function () {
    // Получите значения введенного логина и пароля
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

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
        const correctUsername = "UkratitelMax2004";
        const correctPassword = "12345678";

        const isCorrectCredentials = username === correctUsername && password === correctPassword;

        localStorage.setItem("loggedIn", isCorrectCredentials.toString());
        localStorage.setItem("username", username);

        localStorage.setItem("registrationSuccess", "true");
        
        window.location.href = "menedger.html";
        
    }
});