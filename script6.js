document.getElementById("login-button").addEventListener("click", function () {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

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

document.getElementById("home-button").addEventListener("click", function () {
    window.location.href = "index.html";
});