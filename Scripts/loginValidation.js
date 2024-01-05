
let element = document.getElementById("popupDiv");
const emailEle = document.getElementById('emailInput');
const pwdEle = document.getElementById('passwordInput');
const checkboxEle = document.getElementById('checkBoxInput');

let emailval = '';
let pwdval = '';
let checkboxval = false;

let emailErrorDivision = document.getElementById("emailErrDiv");
let passwordErrorDivision = document.getElementById("login_row_7");
let errorText  = document.getElementById("errorMsg");

emailEle.addEventListener('change',(event)=>{
    emailval = event.target.value;
});
pwdEle.addEventListener('change',(event)=>{
    pwdval = event.target.value;
});
checkboxEle.addEventListener("click",(event)=>{
    checkboxval=event.target.checked;
});
emailEle.addEventListener("keydown", (event) =>{
    emailErrorDivision.style.visibility="hidden";
});
pwdEle.addEventListener("keydown", (event) =>{
    errorText.innerText = "sugg";
    passwordErrorDivision.style.visibility="hidden";
});
document.getElementById("popupCloseDiv").addEventListener("click", (event) => {
    setTimeout(clear,0);
});

const suggestion = () =>{
    errorText.style="color:blue";
    errorText.innerText = "Example: Snow@123";
    passwordErrorDivision.style.visibility="visible";

}
const removesuggestion = () =>{
    errorText.innerText = "sugg";
    passwordErrorDivision.style.visibility="hidden";
}
displayPasswordError = (errorMessage) => {
    errorText.style.color="red";
    errorText.innerText = errorMessage;
    passwordErrorDivision.style.visibility="visible";
}
displayEmailError = (errorMessage) => {
    document.getElementById("emailErrMsg").innerText = errorMessage;
    emailErrorDivision.style.visibility="visible";
}

let passwordViewIcon = document.getElementById("eyeIcon");
function viewOrHide(){
    let eyeIconClassName = passwordViewIcon.className;
    if(eyeIconClassName=="fa-regular fa-eye"){
        passwordViewIcon.setAttribute("class","fa-regular fa-eye-slash");
        pwdEle.setAttribute("type","password");
    }
    else{
        passwordViewIcon.setAttribute("class","fa-regular fa-eye");
        pwdEle.setAttribute("type","text");
    }
}


function validate(){
    let validEmail = validUserName(emailval);  
    let validPwd =true;
    if(button.innerText=="REGISTER"){ 
        validPwd = validPassword(pwdval);
    }
    if(button.innerText=="LOGIN"){ 
        validPwd = validLoginPass(pwdval);
    }
    if(validEmail && validPwd){
        return true;
    }
    return false;
}

function validLoginPass(password){
    if(password.length<6){
        displayPasswordError("Invalid Password");
        return false;
    }
    return true;
}

function validUserName(email){
    if(email.length==0){
        displayEmailError("Enter an email ID")
        return false;
    }
    var regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (regEx.test(email) == false)
    {
        displayEmailError("Invalid EmailID");
        return false;
    }
    emailErrorDivision.style.visibility="hidden";
    return true;
}

function validPassword(password){
    if(password.length<6){
        displayPasswordError("Enter atleast six characters as password");
        return false;
    }
    if(/[a-z]/.test(password)==false){
        displayPasswordError("Password must have atleast one Lowercase letter");
        return false;
    }
    if(/[A-Z]/.test(password)==false){
        displayPasswordError("Password must have atleast one Uppercase letter");
        return false;
    }
    if(/[0-9]/.test(password)==false){
        displayPasswordError("Password must have atleast one Numeric value");
        return false;
    }
    if(/[~/!/@/#/$/%/^/&/+/-/*]/.test(password)==false){
        displayPasswordError("Password must have atleast one special character");
        return false;
    }
    passwordErrorDivision.style.visibility="hidden";
    return true;
}

let arr=[
    {
        "emailId":"rajasaravananmcsea@gmail.com",
        "password":"Snow@123",
        "remember":"true"
    }
];

let button = document.getElementById("loginButton");
let title = document.getElementById("loginH5");
let haveAccount = document.getElementById("haveAcc");
let signUpOrSignIn = document.getElementById("signUpText");
let orLoginWithTextRow = document.getElementById("login_row_10");
let loginWithButtonsRow = document.getElementById("login_row_11");
let forgotPwd = document.getElementById("forgotPasswordLink");

function check(){
    let isValid = validate();
    if(isValid){
        if(button.innerText=="LOGIN"){
            for(let user of arr){
                if(user.emailId==emailval){
                    if(user.password==pwdval){
                        success("Logged In Successfully");
                        window.location.href = "./expenseManagement.html";
                    }
                    else{
                        failure("Invalid Password");
                        pwdEle.value="";
                        pwdval = '';
                    }
                    return;
                }
            }
            failure("User not found! Register to continue");
            toRegister();
        }
        else if(button.innerText=="REGISTER"){
            let flag = 1;
            for(let user of arr){
                if(user.emailId==emailval){
                    flag=0;
                    failure("User already exists");
                    break;
                }
            }
            if(flag){
                arr.push({"emailId":emailval,"password":pwdval,"remember":checkboxval});
                success("Registered successfully");
            }
            toLogin();
        }
    }
}

function toRegister(){
    button.innerText="REGISTER";
    title.innerText = "REGISTER";
    setToDefault();
    haveAccount.innerText = "Already have an account?";
    signUpOrSignIn.innerText="Sign In";
    orLoginWithTextRow.style.display="none";
    loginWithButtonsRow.style.display="none";
    forgotPwd.style.display="none";
}

function toLogin(){
    haveAccount.innerText = "Doesn't have an account yet?";
    signUpOrSignIn.innerText="Sign Up";
    orLoginWithTextRow.style.display="flex";
    loginWithButtonsRow.style.display="flex";
    forgotPwd.style.display="inline";
    setToDefault();
    button.innerText="LOGIN";
    title.innerText = "Login";
}

function setToDefault(){
    emailEle.value="";
    pwdEle.value="";
    emailval = '';
    pwdval = '';
    passwordViewIcon.setAttribute("class","fa-regular fa-eye-slash");
    pwdEle.setAttribute("type","password");
    emailErrorDivision.style.visibility="hidden";
    passwordErrorDivision.style.visibility="hidden";
}

function signInOrSignUp(){
    let signUpOrSignInLink = document.getElementById("signUpText");
    if(signUpOrSignInLink.innerText=="Sign Up"){
        toRegister();
    }
    else{
        toLogin();
    }
}

function failure(errorMessage){
    document.getElementById("popupMsg").innerText=errorMessage;
    element.style.backgroundColor="#FF6666";
    element.style.display="grid";
    element.style.placeContent="center";
    setTimeout(clear,5000)
}

function success(successMessage){
    document.getElementById("popupMsg").innerText=successMessage;
    element.style.backgroundColor="#A8DF8E";
    element.style.display="grid";
    element.style.placeContent="center";
    setTimeout(clear,5000)
}

function clear() {
    element.style.display="none";
};
