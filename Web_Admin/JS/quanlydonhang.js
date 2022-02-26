const API_URL_ORDER = "https://61ce79727067f600179c5ef1.mockapi.io/order";

document.querySelector('.admin_right_bill').style.display = 'none';

function show_Bill() {
    document.querySelector('.admin_right_bill').style.display = 'block';
    document.querySelector('.admin_right_date').style.display = 'none';
    document.querySelector('.content-left-trang-chu').style.display = 'none';
    document.querySelector('.admin_right_user').style.display = 'none';
    document.querySelector('.admin_right').style.display = 'none';
}

function show_order(API_URL_ORDER) {
    axios.get(`${API_URL_ORDER}`).then((res) => {
        var data = res.data;
        for (var x in data) {
            document.getElementById('orders').innerHTML += `
            <tr>
            <td>${data[x].id}</td>
            <td>${data[x].order_date}</td>
            <td>${data[x].id_user}</td>
            <td>${data[x].cus_name}</td>
            <td><button onclick = "show_detail(${data[x].id})" class="btn btn_detail show_detail" >Xem chi tiết</button></td>
            <td>${data[x].total} VND</td>
            <td><button onclick="delete_order(${data[x].id})" class="btn btn_delete"><i class="fas fa-trash icons"></i></button></td>
            </tr>
            `
        }
    })
}
show_order(API_URL_ORDER);


function show_detail(id) {
    document.querySelector("#myModal").style.display = "block";
    axios.get(`${API_URL_ORDER}`).then((res) => {
        var STT = 0;
        var data = res.data;
        var rows = "";
        for (var x in data) {
            if ((data[x].id) == id) {
                for (var i in data[x].item_name) {
                    STT++;
                    rows += `
                    <tr>
                    <td>${STT}</td>
                    
                    <td>${data[x].item_name[i].items_name}</td>
                    <td>${data[x].item_name[i].items_quantity}</td>
                    <td>${data[x].item_name[i].items_price/data[x].item_name[i].items_quantity} VND</td>
                    <td>${data[x].item_name[i].items_price} VND</td>
                    </tr>
                    `;
                    // items_quantity*data[x].item_name[i].items_price
                }
                break;
            }
        }
        document.getElementById('detail_order').innerHTML = rows;
    })
}

function delete_order(id) {
    axios.delete(`${API_URL_ORDER}/${id}`).then(() => {
        alert("Thành công");
        location.reload()
    });

}