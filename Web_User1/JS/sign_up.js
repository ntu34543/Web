const SA_INFOR = "https://61bc10bed8542f0017824524.mockapi.io/saveif";

function addinfor() {
    addinfors()
    var add_name = document.getElementById('login-name').value;
    var add_phonenumber = document.getElementById('loginphonenumber').value;
    var add_mail = document.getElementById('login-mail').value;
    var add_password = document.getElementById('login-password').value;
    var data = {
        fullname: add_name,
        phonenumber: add_phonenumber,
        mail: add_mail,
        password: add_password,
    }
    axios.post(`${SA_INFOR}`, data)
        .then(() => {
            location.reload()
        })

}


// // sending the vertifition code  for customers
function addinfors() {
    var temptParmas = {
        from_name: document.getElementById("login-name").value,
        to_name: document.getElementById("login-mail").value,
        message_name: document.getElementById("login-password").value,
        phone: document.getElementById("loginphonenumber").value,
    };
    emailjs.send('minh', 'template_orh4xgc', temptParmas)


}

// // to check something that the customer enter the data

function addinforss() {
    var userName = document.getElementById('login-name').value;
    var pwdUser = document.getElementById('login-password').value;
    var phoneNumber = document.getElementById('loginphonenumber').value;
    var mail = document.getElementById('login-mail').value;

    if (!checkPhone() + !checkUserName() + !checkPassword() + !checkmail()) return
    callAPI(tblAccounts, "GET", null).then((res) => {
        var accountArr = res.data;
        for (var account of accountArr) {
            if (phoneNumber == account.phone) {
                alert("Phone number is already exist!");
            } else if (userName == account.userName) {
                alert("Password is already exist!");
                return;
            }
        }
        var anAccount = {
            fullname: userName,
            password: pwdUser,
            phonenumber: phoneNumber,

        }
        callAPI(tblAccounts, "SA_INFOR", anAccount);
        alert("Sign up success!");
        document.getElementById('login-name').value = "";
        document.getElementById('login-password').value = "";
        document.getElementById('loginphonenumber').value = "";

    })
}


// Validation sign up data
function checkUserName() {
    var userName = document.getElementById("login-name").value
    if (userName == '') {
        alert("User name must be filled out!");
        return false
    }
    return true
}

function checkPassword() {
    var password = document.getElementById("login-password").value
    if (password == '') {
        alert("Password must be filled out!");
        return false;
    }
    if (password.length < 4) {
        alert("Password must have more 4 charscters!");
        return false
    }
    return true
}

function checkPhone() {
    var phone = document.getElementById("loginphonenumber").value
    if (phone == '') {
        alert("User name must be filled out!");
        return false
    }
    if (isNaN(phone)) {
        alert("Phone number must be digital");
        return false
    }
    alert("Successful")
    return true

}

function checkmail() {
    var maill = document.getElementById("login-mail").value
    if (maill != null && mail.contains("@") && !mail.contains(" ")) {
        return true
    } else {
        alert("The format was wrong ...!@@");
        return false;
    }
}
console.log("hgjhghj")





// function addinfors() {
//     var temptParmas = {
//         from_name: document.getElementById("login-name").value,
//         to_name: document.getElementById("login-mail").value,
//         message_name: document.getElementById("login-password").value,
//         phone: document.getElementById("loginphonenumber").value,
//     };
//     emailjs.send('minh', 'template_orh4xgc', temptParmas)


// }



// function addinforsss() {
//     axios.get(`${SA_INFOR}`)
//         .then((res) => {
//             getdata(res.data)
//         })
// }

// function getdata(data) {
//     var nhap1 = document.getElementById('login-password').value;
//     var nhap2 = document.getElementById('loginphonenumber').value;
//     for (var i = 0; i < data.length; i++) {
//         if ((nhap1 == data[i].phonenumber && nhap2 == data[i].password)) {
//             alert("Both of us is existed")
//         }

//     }
//     window.location = "Đen/home.html";
//     return

// }