const API_URL = "https://61bc10c4d8542f0017824541.mockapi.io/products";

function getData() {
    axios.get(`${API_URL}`)
        .then((res) => {
            console.log(1);
            show(res)
        })
}
//Hiển thị sản phẩm ra dạng menu
function show(arr) {
    document.getElementById('product').innerHTML = '';
    for (let i = 0; i < arr.data.length; i++) {
        var row = `
        <div style="margin-bottom: 2%;" class="item"; text-align:"center">
            <img class="card-img-top style="width: 50%; height: 50%;" id ='img-border' src="${arr.data[i].img}"alt="">
            <div class="card-body">
                <p class="card-title">${arr.data[i].Name}</p>
                <p class="card-text"><b>${arr.data[i].price} VND</b></p>
                <button type="button" id ="button1" onclick="getItem(${arr.data[i].id})">Đặt mua</button>
            </div>
        </div>`
        var display = document.getElementById('product');
        display.innerHTML += row;
    }
}
getData();

document.getElementById('cart-pr').className = 'show';
document.getElementById('gio_hang').className = 'hide';
document.getElementById('thanh_toan').className = 'hide';
document.getElementById('logo').className = 'show';
document.getElementById('customer_bill').className = 'hide';

function moveCart() {
    document.getElementById('gio_hang').className = 'show';
    document.getElementById('cart-pr').className = 'hide';
    document.getElementById('thanh_toan').className = 'hide';
    document.getElementById('logo').className = 'hide';
    // document.getElementById('myCart').className = 'hide';
    document.getElementById('customer_bill').className = 'hide';
}

function moveHome() {
    document.getElementById('cart-pr').className = 'show';
    document.getElementById('gio_hang').className = 'hide';
    document.getElementById('thanh_toan').className = 'hide';
    document.getElementById('logo').className = 'show';
    // document.getElementById('myCart').className = 'show';
    document.getElementById('customer_bill').className = 'hide';
}
// Quay lại trang chủ
function moveHomePage() {
    document.getElementById('cart-pr').className = 'show';
    document.getElementById('gio_hang').className = 'hide';
    document.getElementById('thanh_toan').className = 'hide';
    document.getElementById('logo').className = 'show';
    // document.getElementById('myCart').className = 'show';
    document.getElementById('customer_bill').className = 'hide';
    location.reload();
}
// Quay lại trang chủ

function pay() {
    document.getElementById('cart-pr').className = 'hide';
    document.getElementById('gio_hang').className = 'hide';
    document.getElementById('thanh_toan').className = 'show';
    document.getElementById('logo').className = 'hide';
    document.getElementById('customer_bill').className = 'hide';
}

function cartFunction() {
    moveCart();
}

function moveBill() {
    document.getElementById('cart-pr').className = 'hide';
    document.getElementById('gio_hang').className = 'hide';
    document.getElementById('thanh_toan').className = 'hide';
    document.getElementById('logo').className = 'hide';
    document.getElementById('customer_bill').className = 'show';
}
var ID = 0;
var total = 0;
var order_item = [];
var or_date = new Date();
console.log(or_date);
//Thêm vào giỏ hàng
function getItem(id) {
    alert('Một sản phẩm mới vừa được thêm vào giỏ hàng thành công!')
    var dates = or_date.getFullYear() + '-' + (or_date.getMonth() + 1) + '-' + or_date.getDate();
    axios.get(`${API_URL}`)
        .then(function(res) {
            var or_data = {
                or_img: res.data[id - 1].img,
                or_name: res.data[id - 1].Name,
                or_price: res.data[id - 1].price,
                or_dates: dates
            };
            order_item.push(or_data);
            console.log(order_item);
            var i = order_item.length - 1;
            var html = `
                <tr id='pro_row${i+1}'>
                <td id="idCart">${i+1}</td>
                <td id="idImg"><img id="Img" src="${order_item[i].or_img}"></td>
                <td id="nameCart">${order_item[i].or_name}</td>
                <td><input style="width: 90%;" type="number" value="1" min="1" id="quantity${i+1}" oninput="updatetotal(${i+1})"></td>
                <td id="priceCart">${order_item[i].or_price} VND</td>
                <td id="ngay_dat">${order_item[i].or_dates}</td>
                <td id="tol${i+1}" class="totalCart">${order_item[i].or_price} VND</td>
                <td><button type="button" id ="button3" onclick="deleteProduct(${i+1})"><i class="fas fa-trash"></i></button></td>
            </tr>
            `;
            var displayy = document.getElementById('table1');
            displayy.innerHTML += html;
        })
};

//Cập nhật tổng giá trị sản phẩm sau khi số lượng thay đổi
function updatetotal(i) {
    var qty = document.getElementById("quantity" + i).value;
    total = qty * order_item[i - 1].or_price;
    document.getElementById("tol" + i).innerHTML = total + ' VND';
    document.getElementById("quantity" + i).setAttribute('value', qty);
};

//Xóa sản phẩm trong giỏ hàng
function deleteProduct(id) {
    document.getElementById(`pro_row${id}`).remove();
    order_item.splice(id - 1, 1);
    for (var i = id; i < order_item.length; i++) {
        document.getElementById(`pro_row${i+1}`).id = `pro_row${i}`;
    }
    updateTable();
};

//cập nhật bảng sau khi đã xóa sản phẩm
function updateTable() {
    var table1 = document.getElementById('table1');
    table1.innerHTML = '';
    for (var i = 0; i < order_item.length; i++) {
        table1.innerHTML +=
            `<tr id='pro_row${i+1}'>
        <td id="idCart">${i+1}</td>
        <td id="idImg"><img id="Img" src="${order_item[i].or_img}"></td>
        <td id="nameCart">${order_item[i].or_name}</td>
        <td><input style="width: 90%;" type="number" value="1" min="1" id="quantity${i+1}" oninput="updatetotal(${i+1})"></td>
        <td id="priceCart">${order_item[i].or_price} VND</td>
        <td id="ngay_dat">${order_item[i].or_dates}</td>
        <td id="tol${i+1}" class="totalCart">${total} VND</td>
        <td><button type="button" id ="button3" onclick="deleteProduct(${i+1})"><i class="fas fa-trash"></i></button></td>
    </tr>
    `;
    }
}
// show ra xác định thanh toán
var add_order = [];
var all_payment = 0;
var a = 1;

//Check quantity of item
function checkQuantity() {
    for (let x = 0; x < order_item.length; x++) {
        var sl = document.getElementById("quantity" + a).value;
        a++;
        if (sl == 0) {
            alert('Vui lòng chọn số lượng sản phẩm để thanh toán.');
            return false;
        }

    }
    //  pay();
    xdThanhtoan();
};

function xdThanhtoan() {
    pay();
    for (var x = 0; x < order_item.length; x++) {
        var soluong = document.getElementById("quantity" + a).value;
        a++;
        var money = order_item[x].or_price * soluong;
        all_payment += money;
        var row_order = `
            <tr>
                <td><img id="Img" src="${order_item[x].or_img}"></td>
                <td>${order_item[x].or_name}</td>
                <td>${order_item[x].or_price} VND</td>
                <td>${soluong}</td>
                <td>${order_item[x].or_dates}</td>
                <td>${money} VND</td>
            </tr>
            `;
        document.getElementById('table2').innerHTML += row_order;
        var add_products = {
            anh_sp: order_item[x].or_img,
            ten_sp: order_item[x].or_name,
            don_gia: order_item[x].or_price,
            sl_sp: soluong,
            tong_sp: money,
            ngay_dat: order_item[x].or_dates
        };
        add_order.push(add_products);
    }
    var all_pay = `<p>Tổng thanh toán: ${all_payment} VND</p>`;
    document.querySelector('#sum_payment').innerHTML += all_pay;
    putInformation();
}

//Put thông tin khách hàng vào đơn hàng
function putInformation() {
    var user_name = localStorage.getItem("u_name");
    var user_phone = localStorage.getItem("u_phone");
    var user_mail = localStorage.getItem("u_email");
    document.getElementById('cus_name').value = user_name;
    document.getElementById('cus_phone').value = user_phone;
    document.getElementById('cus_email').value = user_mail;
};

//Mock API để thêm vào giỏ hàng
const API_URL_ORDER = "https://61ce79727067f600179c5ef1.mockapi.io/order";

//Xác nhận thanh toán 
var add_date = new Date();
var add_sp = [];

function payment() {
    var customer_name = document.getElementById('cus_name').value;
    var customer_phone = document.getElementById('cus_phone').value;
    var customer_city = document.getElementById('city').value;
    var customer_address = document.getElementById('cus_address').value;
    var customer_note = document.getElementById('cus_note').value;
    // tu
    var PDFUser = `
            <tr>
                <td>${customer_name}</td>
                <td>${customer_phone} VND</td>
                <td>${customer_address +' '+ customer_city}</td>
            </tr>
            `;
    document.getElementById('PDF-inf-user').innerHTML += PDFUser;
    // tu
    for (let i = 0; i < add_order.length; i++) {
        var row_order = `
            <tr>
                <td>${add_order[i].ten_sp}</td>
                <td>${add_order[i].don_gia}</td>
                <td>${add_order[i].sl_sp}</td>
                <td>${add_order[i].tong_sp} VND</td>
            </tr>
            `;
        document.getElementById('table4').innerHTML += row_order;
        var items_data = {
            items_img: add_order[i].anh_sp,
            items_name: add_order[i].ten_sp,
            items_quantity: add_order[i].sl_sp,
            items_price: add_order[i].tong_sp
        };
        add_sp.push(items_data);
        add_date = add_order[i].ngay_dat;
    }
    document.querySelector('#date_orders').innerHTML += `<p>Ngày đặt hàng: ${add_date}</p>`;
    var date_recieves = new Date();
    if (customer_city == 'Đà Nẵng' || customer_city == 'Quảng Nam' || customer_city == 'Huế') {
        date_recieves.setDate(or_date.getDate() + 3);
        date_recieves = date_recieves.getFullYear() + '-' + (date_recieves.getMonth() + 1) + '-' + date_recieves.getDate();
    } else {
        date_recieves.setDate(or_date.getDate() + 5);
        date_recieves = date_recieves.getFullYear() + '-' + (date_recieves.getMonth() + 1) + '-' + date_recieves.getDate();
    }

    document.querySelector('#date_recieve').innerHTML += `<p>Ngày nhận hàng: ${date_recieves} </p>`;
    var comments = `<p>Vui lòng thanh toán: ${all_payment +35000} VND</p>`;
    document.querySelector('#comment').innerHTML += comments;
    var method = document.getElementById('payment').value;
    document.querySelector('#payment_method').innerHTML += `<p>Phương thức thanh toán: ${method}</p>`;
    document.querySelector('#discounts').innerHTML += `<p>Phí vận chuyển: 35000 VND (áp dụng trên toàn quốc)</p>`;
    document.querySelector('#bill_payment').innerHTML += `<p>Tổng thanh toán: ${all_payment+35000} VND</p>`;
    var add_data = {
        id_user: localStorage.getItem("user"),
        cus_name: customer_name,
        cus_phone: customer_phone,
        cus_city: customer_city,
        cus_address: customer_address,
        cus_note: customer_note,
        total: all_payment,
        item_name: add_sp,
        order_date: add_date,
        recieve_date: date_recieves
    };
    // alert(add_data.item_name);
    axios.post(`${API_URL_ORDER}`, add_data)
        .then(() => {
            sendbill(all_payment, add_sp, add_date)
        })
}

function sendbill(all_payment, add_sp, add_date) {

    var user_name = localStorage.getItem("u_name");
    var user_phone = localStorage.getItem("u_phone");
    var user_mail = localStorage.getItem("u_email");
    console.log(user_name, user_phone, user_mail, all_payment, add_sp, add_date)
    console.log(all_payment);
    var temptParmass = {
        customer_city: document.getElementById('city').value,
        customer_address: document.getElementById('cus_address').value,
        method_payment: document.getElementById('payment').value,
        to_name: user_name,
        user_phone: user_phone,
        user_mail: user_mail,
        all_payment: all_payment,
        add_sp: add_sp,
        add_date: add_date
    };
    emailjs.send('service_m3cyjf7', 'template_fkbt47v', temptParmass)
    console.log("132");
}

//Xác nhận thông tin khách hàng trước khi thanh toán
function checkInformation() {
    var valid_address = document.getElementById('cus_address').value;
    var payment_method = document.getElementById('payment').value;
    var cus_city = document.getElementById('city').value;
    if (payment_method == "") {
        alert("Vui lòng chọn phương thức thanh toán");
        return false;
    }
    if (cus_city == "") {
        alert("Vui lòng chọn thành phố/tỉnh thành bạn đang sống");
        return false;
    }
    if (valid_address == "") {
        alert("Vui lòng nhập địa chỉ của bạn");
        return false;
    }
    // alert("All datas are valid!, send it to the server!")
    // payment();
    moveBill();
    payment();
    alert("Bạn đặt thành công rùi nha! Cảm ơn bạn đã mua hàng!");
    // location.reload();
}
//hiển thị theo loại rau củ
function showItem() {
    document.getElementById('product').innerHTML = '';
    var type_items = document.getElementById('type_item').value;
    axios.get(`${API_URL}`).then((res) => {
        for (let index = 0; index < res.data.length; index++) {
            if (res.data[index].category == type_items) {
                document.getElementById('product').innerHTML += `
                <div style="margin-bottom: 2%;" class="item"; text-align:"center">
            <img class="card-img-top style="width: 50%; height: 50%;" id ='img-border' src="${res.data[index].img}"alt="">
            <div class="card-body">
                <p class="card-title">${res.data[index].Name}</p>
                <p class="card-text">${res.data[index].price} VND</p>
                <button type="button" id ="button1" onclick="getItem(${res.data[index].id})">Đặt mua</button>
            </div>
        </div>
                `;
            }
        }
    })
}

// Modal history Tngun
function show_order_history() {
    document.querySelector("#myModal").style.display = "block"
    axios.get(`${API_URL_ORDER}`).then((res) => {
        var STT = 0;
        var data = res.data
        var rows = "";
        for (var x in data) {
            if (data[x].id_user == localStorage.getItem("user")) {
                for (var i in data[x].item_name) {
                    STT++;
                    rows += `
                    <tr>
                    <td>${STT}</td>
                    <td>${data[x].order_date}</td>
                    <td><img class ="img-history" src="${data[x].item_name[i].items_img}" alt=""></td>
                    <td>${data[x].item_name[i].items_name}</td>
                    <td>${data[x].item_name[i].items_quantity}</td>
                    <td>${data[x].item_name[i].items_price} VND</td>
                    <td>${data[x].total} VND</td>
                    <td>${data[x].recieve_date}</td>
                    </tr>
                    `
                }
            }
        }
        document.getElementById('history_order').innerHTML = rows;
    })

}
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("show_detail");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function reloadLogOut() {
    location.reload();
}