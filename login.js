

        
const LOGIN_URL = "login.html";
const INTRO_URL = "intro.html";

var db_usuarios = {};
var usuarioCorrente = {};
function generateUUID() { 
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
const dadosIniciais = {
    usuarios: [
        { "id": generateUUID (), "login": "admin", "senha": "123", "email": "admin@abc.com", "nome": "", "altura" : ""},
        { "id": generateUUID (), "login": "user", "senha": "123", "email": "user@abc.com","nome": "", "altura" : ""},
    ]
};
function initLoginApp () {
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    var usuariosJSON = localStorage.getItem('db_usuarios');
    if (!usuariosJSON) {
        db_usuarios = dadosIniciais;
        localStorage.setItem('db_usuarios', JSON.stringify (dadosIniciais));
    }
    else  {
        db_usuarios = JSON.parse(usuariosJSON);    
    }
};
function loginUser (login, senha) {
    for (var i = 0; i < db_usuarios.usuarios.length; i++) {
        var usuario = db_usuarios.usuarios[i];
        if (login == usuario.login && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.login;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;
            usuarioCorrente.altura = usuario.altura;
            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
            return true;
        }
    }
    return false;
}
function logoutUser () {
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = LOGIN_URL;
}
function addUser (login, senha, email) {
    let newId = generateUUID ();
    let usuario = { "id": newId, "login": login, "senha": senha, "email": email, "nome":"","altura":""};
    db_usuarios.usuarios.push (usuario);
    localStorage.setItem('db_usuarios', JSON.stringify (db_usuarios));
}
function setUserPass () {
}
initLoginApp ();


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
    });
    document.getElementById("btn_salvar").style.display="none"; 
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "txt_login" && e.target.value.length > 0 && e.target.value.length < 3 || e.target.value.length > 16 ) {
                setInputError(inputElement, "O usuário deve ter entre 3 e 16 caracteres");
                document.getElementById("btn_salvar").style.display="none";
                
            }
            if (e.target.id === "txt_login" && e.target.value.length > 0 && e.target.value.length >= 3 && e.target.value.length <= 16) {
                
                document.getElementById("btn_salvar").style.display="inherit";
                
            }

            if (e.target.id === "txt_senha" && e.target.value.length > 0 && e.target.value.length < 5) {
                setInputError(inputElement, "A senha deve conter mais de 5 caracteres");
                document.getElementById("btn_salvar").style.display="none";
            }
            if (e.target.id === "txt_senha" && e.target.value.length > 0 && e.target.value.length >= 5) {
                
                document.getElementById("btn_salvar").style.display="inherit";
            }
            
        });
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

