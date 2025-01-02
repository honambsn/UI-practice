function validate(){
    let form = document.getElementById('form');
    let email = document.getElementById('email').value;
    let text = document.getElementById('text');
    let heading = document.getElementById('heading');
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{3}$/;

    if (email.match(pattern)){
        form.classList.add('valid');
        form.classList.remove('invalid');
        text.innerHTML = 'Your Email Address is Valid';
        text.style.color = '#0af04f';
        //h3.innerHTML = 'Thank you for subscribing!';
        heading.style.color = '#05b5f5';
        heading.innerHTML = '<i class="fas fa-smile"></i> Thank you for subscribing!';
        heading.style.fontSize = '1.5em';
        // document.getElementById('h3-id').innerHTML = '<i class="fa-light fa-face-smile"></i>';
    }
    else{
        form.classList.remove('valid');
        form.classList.add('invalid');
        text.innerHTML = 'Please Enter a Valid Email Address';
        text.style.color = '#f00';
        //h3.innerHTML = 'Invalid Email Address';
        //h3.style.color = '#f00';
        heading.innerHTML = '<i class="fas fa-angry"></i> Invalid Email';
        heading.style.color = '#f00';
        heading.style.fontSize = '1.5em';
        //document.getElementById('h3-id').innerHTML = '<i class="fa-light fa-face-sad-tear"></i>';
    }

    if (email == ""){
        form.classList.remove('valid');
        form.classList.remove('invalid');
        text.innerHTML = '';
        text.style.color = '#000';
    }

}