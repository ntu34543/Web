const API_DATE = "https://61bc10c4d8542f0017824541.mockapi.io/date";

function run_Date() {
    show_Date();
}
document.querySelector('.admin_right_date').style.display = 'none';

function show_Date() {
    document.querySelector('.admin_right_date').style.display = 'block';
    document.querySelector('.content-left-trang-chu').style.display = 'none';
    document.querySelector('.admin_right_user').style.display = 'none';
    document.querySelector('.admin_right').style.display = 'none';
    document.querySelector('.admin_right_bill').style.display = 'none';
}

function save_Date() {
    var get_status = document.getElementById('typeDate').value;
    var get_date = document.getElementById('dates').value;
    // var stus = get_status.options[get_status.selectedIndex].value;
    var data = {
        bookingDate: get_date,
        status: get_status,
    }
    axios.post(`${API_DATE}`, data)
        .then(() => {
            // location.reload();
            getDate();
            reset_Date()
        })
}
getDate();


function getDate() {
    axios.get(`${API_DATE}`)
        .then((res) => {
            // console.log(22);
            showDate(res)
        })
}

function showDate(arrDate) {
    var rowDate = "";
    for (let i = 0; i < arrDate.data.length; i++) {
        rowDate += `
        <tr>
            <td>${i+1}</td>
            <td>${arrDate.data[i].bookingDate}</td>
            <td>${arrDate.data[i].status}</td>
            <td><button id="JS_delete" onclick="delete_Date(${arrDate.data[i].id})" class="btn"><i class="fa fa-trash-alt"></i></button></td>
        </tr>
        `
    }
    document.getElementById('addDate').innerHTML = rowDate;
}

function delete_Date(id) {
    axios.get(`${API_DATE}/${id}`);
    axios.delete(`${API_DATE}/${id}`).then(() => {
        getDate();
    })
}

function reset_Date() {
    document.getElementById('typeDate').value = '';
    document.getElementById('dates').value = '';
}