const SA_INFORR = "https://61bc10bed8542f0017824524.mockapi.io/saveif";

document.querySelector('.content-left-trang-chu').style.display = 'none';

function show_Home_Page() {
    document.querySelector('.admin_right_user').style.display = 'none';
    document.querySelector('.admin_right').style.display = 'none';
    document.querySelector('.admin_right_date').style.display = 'none';
    document.querySelector('.content-left-trang-chu').style.display = 'block';
    document.querySelector('.admin_right_bill').style.display = 'none';
}

function getdata() {
    axios.get(`${SA_INFORR}`)
        .then((res) => {
            var tong = res.data.length
            document.getElementById('show').innerHTML = tong
        })
}
getdata();
const SA_QUANTITY = "https://61bc10c4d8542f0017824541.mockapi.io/products";

function getdataproduct() {
    axios.get(`${SA_QUANTITY}`)
        .then((res) => {
            var quantity = res.data.length
            document.getElementById('show2').innerHTML = quantity
        })
}
getdataproduct();
const SA_BYING = "https://61ce79727067f600179c5ef1.mockapi.io/order";

function getdatabuying() {
    axios.get(`${ SA_BYING }`)
        .then((res) => {
            var buyings = res.data.length
            document.getElementById('buying').innerHTML = buyings
        })
}
getdatabuying();
dem = 0;

function show_date_pr() {
    axios.get(`${ SA_BYING }`)
        .then((res) => {
            for (var T in res.data) {
                var x = res.data[T].order_date;
                // console.log(x);
                var date = new Date(document.getElementById('date_product').value.toString());
                var dates = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                // console.log(dates);
                if (dates == x) {
                    dem++
                }
            }
            document.getElementById('date_bills').innerHTML = "Ngày " + dates + " bán được " + dem + " sản phẩm";
            dem = 0;
        })
}


const SA_Date = "https://61bc10c4d8542f0017824541.mockapi.io/date";

function getdataDate() {
    axios.get(`${SA_Date}`)
        .then((res) => {
            var dates = res.data.length
            document.getElementById('date').innerHTML = dates;
        })
}
getdataDate();