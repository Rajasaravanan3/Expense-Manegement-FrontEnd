
let responseData = document.getElementById("responseData");
let userDetails = document.getElementById("userDetails");
let userSubmit_button = document.getElementById("user_submit");
let headerRight = document.getElementById("header_right");
let username_input = document.getElementById("username_input");
let password_input = document.getElementById("password_input");
let fullName_input = document.getElementById("fullname_input");
let email_input = document.getElementById("email_input");

let user = {
    "userId": 0,
    "username": "",
    "password": "",
    "fullName": "",
    "email": ""
}


function fetchData(method, path, header, body) {
    let options = {
        method : method,
        headers : header != null ? header : {},
        body : body != null ? JSON.stringify(body) : undefined
    }

    let fetchRes = fetch(path, options);
    return fetchRes.then(res => res.json());
}




function fetchUserId() {
    let email = "jane.smith@email.com";
    fetchData("GET", `http://localhost:8080/Users/email/${email}`, {}, undefined, true)
        .then(userId => {
            console.log(userId);

        if(responseData) {
            user.userId = userId;
            responseData.innerText = userId;
        }
        else {
            responseData.innerText = `User not found`;
        }
        })
        .catch(error => {
            console.error("Error fetching user ID:", error);
        });
}

userSubmit_button.addEventListener("click", (event) => {
    let user = {
        "userId": userId,
        "username": username_input.innerText,
        "password": password_input.innerText,
        "fullName": fullName_input.innerText,
        "email": email_input.innerText
    }
    fetchData("PUT", `http://localhost:8080/Users`, {}, user)
    .then((response) => {

    })
    .catch(error => {
            console.error("Error updating user :", error);
    });
});

headerRight.addEventListener("click",(event) => {

    if(userDetails.style.display === "flex") {
        userDetails.style.display = "none";
    }
    else {
        userDetails.style.display = "flex";
        // fetchData()
        username_input.setAttribute("placeholder", user.username);
        password_input.setAttribute("placeholder", user.password);
        fullName_input.setAttribute("placeholder", user.fullName);
        email_input.setAttribute("placeholder", user.email);
    }
});


// user = {
//     "name": "Geeks for Geeks",
//     "age": "23"
// }
// let options = {
//     method: 'POST',
//     headers: {
//         'Content-Type':
//             'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(user)
// }

// let fetchRes = fetch(
//     "http://localhost:8080/",
//     options);
// fetchRes.then(res =>
//     res.json()).then(d => {
//         console.log(d)
//     })