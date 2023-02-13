const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input"); 
const generateBtn = document.querySelector(".generate-btn");
const copyIcon = document.querySelector(".input-box span");
const passIndicator = document.querySelector(".pass-indicator");
const passwordInput = document.querySelector(".input-box input");
const characters = {
    uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase:"abcdefghijklmnopqrstuvwxyz",
    numbers:"0123456789",
    symbols:"~!@#$%^&*()_+"
}
const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    duplicated = false;
    passLength = lengthSlider.value;
  
    options.forEach(option => { 
        if(option.checked) {
            if(option.id !== "duplicated" && option.id !== "spaces"){
                staticPassword += characters[option.id];
            }
            else if(option.id === "spaces") {
                staticPassword += ` ${staticPassword} `;
            }
            else {
                duplicated = true;
            }
        }
        else {
            return;
        }
    });

ischecked = false;
options.forEach(option => { 
    if(option.checked) {
        ischecked = true;
    }});

    if (ischecked) {
        for (let i=0; i< passLength; i++){
            let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
            if(duplicated) {
                !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
            }
            else {
                randomPassword += randomChar;
            }
        }
    }
    passwordInput.value = randomPassword; 
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "COPIED";
    setTimeout(() => {
        copyIcon.innerText = "COPY";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);