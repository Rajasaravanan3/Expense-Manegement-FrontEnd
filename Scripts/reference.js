
let updatedText='';
let col_index;
let obj=[];
let text = ``;
let tableBody = document.getElementById("tableBody");
let avatar = document.getElementsByClassName("avatar");
function apiCall(){
    let tableBody = document.getElementById("tableBody");
    let localStorage_obj = JSON.parse(localStorage.getItem("user_array"));
    if(!localStorage_obj){
        let http = new XMLHttpRequest();
        http.open("GET", "https://reqres.in/api/users?page=2", true);
        http.send();
        http.onload = function() {
            localStorage.setItem("user_array",this.responseText);
            obj = (JSON.parse(localStorage.getItem("user_array"))).data;
            loadDetails();
        }
    }
    else{
        obj = (JSON.parse(localStorage.getItem("user_array"))).data;
        loadDetails();
    }
    document.getElementById("clear").addEventListener("click",(event) => {
            localStorage.clear();
            obj = {};
            loadDetails();
    });
    document.getElementById("logoutButton").addEventListener('click', (event) => {
        window.location="index.html";
        localStorage.clear();
        localStorage_obj={};
    });
}
    tableBody.addEventListener("click", (event) => {
        if(event.target.classList.contains("edit")){
            event.target.innerHTML="Save";
            event.target.classList.add("save");
            event.target.classList.remove("edit");
            event.target.nextSibling.innerText="Cancel";
            event.target.nextSibling.classList.add("cancel");
            event.target.nextSibling.classList.remove("delete");
            let target_row = event.target.closest("tr");
            target_row.children[1].setAttribute("contenteditable",true);
            target_row.children[2].setAttribute("contenteditable",true);
            target_row.children[3].setAttribute("contenteditable",true);
        }
        else if(event.target.classList.contains("save")){
            event.target.innerHTML="Edit";
            event.target.classList.add("edit");
            event.target.classList.remove("save");
            event.target.nextSibling.innerText="Delete";
            event.target.nextSibling.classList.add("delete");
            event.target.nextSibling.classList.remove("cancel");
            let target_row = event.target.closest("tr");
            target_row.children[1].removeAttribute("contenteditable");
            target_row.children[2].removeAttribute("contenteditable");
            target_row.children[3].removeAttribute("contenteditable");
            let row_index = Array.from(tableBody.children).indexOf(target_row);
            obj[row_index].first_name = target_row.children[1].innerHTML;
            obj[row_index].last_name = target_row.children[2].innerHTML;
            obj[row_index].email = target_row.children[3].innerHTML;
            let temp_object = JSON.parse(localStorage.getItem("user_array"));
            temp_object.data=obj;
            localStorage.setItem("user_array",JSON.stringify(temp_object));
        }
        else if(event.target.classList.contains("cancel")){
            event.target.innerHTML="Delete";
            event.target.classList.add("delete");
            event.target.classList.remove("cancel");
            event.target.previousSibling.innerText="Edit";
            event.target.previousSibling.classList.add("edit");
            event.target.previousSibling.classList.remove("save");
            let target_row = event.target.closest("tr");
            target_row.children[1].removeAttribute("contenteditable");
            target_row.children[2].removeAttribute("contenteditable");
            target_row.children[3].removeAttribute("contenteditable");
            loadDetails();
        }
        else if(event.target.classList.contains("delete")){
            let target_row = event.target.closest("tr");
            let row_index = Array.from(tableBody.children).indexOf(target_row);
            obj = (JSON.parse(localStorage.getItem("user_array")));
            let temp_object = obj.data;
            temp_object.splice(row_index,1);
            obj.data = temp_object;
            localStorage.setItem("user_array",JSON.stringify(obj));
            if(!obj.data.length){
                localStorage.clear();
                obj={};
                loadDetails();
            }
            else{
                apiCall();
            }
        }
    });

function loadDetails(){
    text = ``;
    for(let index=0;index<obj.length;index++){
        text+=`<tr><td><img class="avatar" src=${obj[index].avatar} alt="avatar"></td>`;
        text+=`<td class="user">${obj[index].first_name}</td>`;
        text+=`<td class="user">${obj[index].last_name}</td>`;
        text+=`<td class="user">${obj[index].email}</td>`;
        text+=`<td class="change"><button class="edit">Edit</button><button class="delete">Delete</button></td></tr>`;
    }
    tableBody.innerHTML = text;
    if(!obj.length){
        records_count.innerHTML ="0";
        tableBody.innerHTML = `<tr><td colspan="5"><img class="nodata_image" src="../svg images/no-data-found.svg" alt="No record found" width="70%"></td></tr>`;
    }
    else{
        records_count.innerHTML = obj.length;
    }
}

window.onload = apiCall();