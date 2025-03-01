let password = document.getElementById('password');
let toggleBtn = document.getElementById('toggleBtn');
let lowercase = document.getElementById('lower');
let uppercase = document.getElementById('upper');
let number = document.getElementById('number');
let special = document.getElementById('special');
let length = document.getElementById('length');

function checkPassword(data){
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const num = new RegExp('(?=.*[0-9])');
    const specialChar = new RegExp('(?=.*[!@#$%^&*])');
    const len = new RegExp('(?=.{8,})');
    if(lower.test(data)){
        lowercase.classList.add('valid');
    }
    else{
        lowercase.classList.remove('valid');
    }
    if(upper.test(data)){
        uppercase.classList.add('valid');
    }
    else{
        uppercase.classList.remove('valid');
    }
    if(num.test(data)){
        number.classList.add('valid');
    }
    else{
        number.classList.remove('valid');
    }
    if(specialChar.test(data)){
        special.classList.add('valid');
    }
    else{
        special.classList.remove('valid');
    }
    if(len.test(data)){
        length.classList.add('valid');
    }
    else{
        length.classList.remove('valid');
    }
}

//show hide pass
toggleBtn.onclick = function() {
    //addeventlistener
    if (password.type === 'password') {
        password.type = 'text';
        toggleBtn.classList.add('hide');
    }
    else{
        password.type = 'password';
        toggleBtn.classList.remove('hide');
    }

};