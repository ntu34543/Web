const API_URL_USER = "https://61bc10bed8542f0017824524.mockapi.io/saveif";
document.querySelector('.admin_right_user').style.display = 'none';

function GetData() {
    document.querySelector('.admin_right_user').style.display = 'block';
    document.querySelector('.admin_right').style.display = 'none';
    document.querySelector('.admin_right_date').style.display = 'none';
    document.querySelector('.content-left-trang-chu').style.display = 'none';
    document.querySelector('.admin_right_bill').style.display = 'none';
    axios.get(`${API_URL_USER}`)
        .then((res) => {
            console.log(1);
            show_user(res)
        })
}

function show_user(arr) {
    var row_user = "";
    for (let i = 0; i < arr.data.length; i++) {
        row_user += `
        <tr>
            <td>${i+1}</td>
            <td>${arr.data[i].fullname}</td>
            <td>${arr.data[i].phonenumber}</td>
            <td>${arr.data[i].mail}</td>
            <td>${arr.data[i].password}</td>
            <td><button onclick = "show_history_Users(${arr.data[i].id})" class="btn btn_detail show_history" >Xem lịch sử</button></td>
            <td><button id="JS_delete" onclick="deleteUser(${arr.data[i].id})"><i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `
    }
    document.getElementById('user').innerHTML = row_user;
}
// THAO NGUYEN
const URL_ORDER = "https://61ce79727067f600179c5ef1.mockapi.io/order";

function closeQLKH() {
    document.querySelector("#myModal_History").style.display = "none";
}

function show_history_Users(id) {
    document.querySelector("#myModal_History").style.display = "block";
    axios.get(`${URL_ORDER}`).then((res) => {
        var STT = 0;
        var data = res.data;
        var row = "";
        for (var x in data) {
            if (data[x].id_user == id) {
                for (var i in data[x].item_name) {
                    STT++;
                    row += `
                    <tr>
                    <td>${STT}</td>
                    <td>${data[x].order_date}</td>
                    <td>${data[x].item_name[i].items_name}</td>
                    <td>${data[x].item_name[i].items_quantity}</td>
                    <td>${data[x].item_name[i].items_price}</td>
                    <td>${data[x].total}</td>
                    <td>${data[x].recieve_date}</td>
                    </tr>
                    `
                }
            }
        }
        document.getElementById('history_order_Users').innerHTML = row;

    })
}
var modal = document.getElementById("myModal_History");

// Get the button that opens the modal
var btn = document.getElementsByClassName("show_history");


// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function deleteUser(id) {
    axios.get(`${API_URL_USER}/${id}`)
    axios.delete(`${API_URL_USER}/${id}`).then(() => { GetData() })
}