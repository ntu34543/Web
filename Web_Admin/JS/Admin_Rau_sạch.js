const API_URL = "https://61bc10c4d8542f0017824541.mockapi.io/products";
document.querySelector('.admin_right').style.display = 'none';

function getData() {
    document.querySelector('.admin_right').style.display = 'block';
    document.querySelector('.admin_right_user').style.display = 'none';
    document.querySelector('.admin_right_date').style.display = 'none';
    document.querySelector('.content-left-trang-chu').style.display = 'none';
    document.querySelector('.admin_right_bill').style.display = 'none';
    axios.get(`${API_URL}`)
        .then((res) => {
            console.log(1);
            show(res)
        })
}


function show(arr) {
    var row_product = "";
    for (let i = 0; i < arr.data.length; i++) {
        row_product += `
        <tr>
            <td>${i+1}</td>
            <td>${arr.data[i].category}</td>
            <td><img id ='img-border' src="${arr.data[i].img}"alt=""></td>
            <td>${arr.data[i].Name}</td>
            <td>${arr.data[i].quantity}</td>
            <td id="JS_price">${arr.data[i].price} VND</td>
            <td>${arr.data[i].note}</td>
            <td><button id="JS_edit" onclick="getdatafromtable(${arr.data[i].id});topPr()"><i class="fas fa-edit"></i></button></td>
            <td><button id="JS_delete" onclick="deleteproduct(${arr.data[i].id})"><i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `
    }
    document.getElementById('product').innerHTML = row_product;
}

function reset() {
    document.getElementById('categoryProduct').value = '';
    document.getElementById('imgProduct').value = '';
    document.getElementById('nameProduct').value = '';
    document.getElementById('quantityProduct').value = '';
    document.getElementById('priceProduct').value = '';
    document.getElementById('noteProduct').value = '';
    document.getElementById('update').style.display = 'none';
    document.getElementById('add').style.display = 'block';
}

function add() {
    var add_category = document.getElementById('categoryProduct').value;
    var add_img = document.getElementById('imgProduct').value;
    var add_name = document.getElementById('nameProduct').value;
    var add_quantity = document.getElementById('quantityProduct').value;
    var add_price = document.getElementById('priceProduct').value;
    var add_note = document.getElementById('noteProduct').value;
    var data = {
        category: add_category,
        img: add_img,
        Name: add_name,
        quantity: add_quantity,
        price: add_price,
        note: add_note,
    }
    axios.post(`${API_URL}`, data)
        .then(() => { getData() })
    reset()
}

function getdatafromtable(id) {
    axios.get(`${API_URL}/${id}`)
        .then(function(res) {
            console.log(res);
            document.getElementById('categoryProduct').value = res.data.category;
            document.getElementById('imgProduct').value = res.data.img;
            document.getElementById('nameProduct').value = res.data.Name;
            document.getElementById('quantityProduct').value = res.data.quantity;
            document.getElementById('priceProduct').value = res.data.price;
            document.getElementById('noteProduct').value = res.data.note;
            // 
            document.getElementById('add').style.display = 'none';
            document.getElementById('update').style.display = 'block';
            document.getElementById('update').value = res.data.id;
        })
}

function update(id) {
    var ud_category = document.getElementById('categoryProduct').value;
    var ud_img = document.getElementById('imgProduct').value;
    var ud_name = document.getElementById('nameProduct').value;
    var ud_quantity = document.getElementById('quantityProduct').value;
    var ud_price = document.getElementById('priceProduct').value;
    var ud_note = document.getElementById('noteProduct').value;
    var data = {
        category: ud_category,
        img: ud_img,
        Name: ud_name,
        quantity: ud_quantity,
        price: ud_price,
        note: ud_note,
    }
    axios.put(`${API_URL}/${id}`, data).then(() => { getData() });
    reset();
}

function deleteproduct(id) {
    axios.get(`${API_URL}/${id}`)
    axios.delete(`${API_URL}/${id}`).then(() => { getData() })
}
// getData();


// getData();
// <!-- admin_right_user,admin_right -->