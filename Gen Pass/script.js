var alertBox = document.querySelector('.alertBox');

function getPassword() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
    var passwordLength = 16;
    var password = "";

    for (var i = 0; i < passwordLength; i++){
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    document.getElementById("password").value = password;
    //alertBox.innerHTML = "New password copied to clipboard!" + "<br>" + password;
}


function copyPassword() {
    var copiedText = document.getElementById("password");

    if (navigator.clipboard) {
        navigator.clipboard.writeText(copiedText.value)
          .then(function() {
            alertBox.innerHTML = "New password copied to clipboard!";
          })
          .catch(function(err) {
            copiedText.select();
            
            try {
                document.execCommand('copy');
                alertBox.innerHTML = "New password copied to clipboard";
            }
            catch (err) {
                alertBox.innerHTML = "Oops, unable to copy!";
            }
          });
        } else {
            alertBox.innerHTML = "Clipboard API not supported!";
      }
    
    alertBox.classList.add('active');
    
    setTimeout(function() {
        alertBox.classList.remove('active');
    }, 1000);
    
    document.addEventListener('keydown', function(event) {
        if (event.key == 'Escape') {
            alertBox.classList.remove('active');
        }
    });
}