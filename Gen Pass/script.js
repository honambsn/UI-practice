function estimatePasswordCost(password) {

    // const saltRounds = 12; // Salt rounds to determine the hashing cost

    // const startTime = Date.now();  // Start time for the hash computation

    // // Hash the password using bcrypt
    // bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
    //   if (err) {
    //     console.error('Error hashing the password:', err);
    //     return;
    //   }

    //   const endTime = Date.now();  // End time for the hash computation
    //   const timeTaken = endTime - startTime;

    //   // Display the result
    //   console.log(`Hashing the password took ${timeTaken} milliseconds.`);
    // //   document.getElementById('result').innerHTML = `
    // //     <p>Hashing the password took <strong>${timeTaken} milliseconds</strong>.</p>
    // //     <p>This is a rough estimate of the resource cost for this password.</p>
    // //   `;
    // });
    const startTime = Date.now();

    // Hash the password using SHA256 from CryptoJS
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    console.log(`Hashing the password took ${timeTaken} milliseconds.`);
  }

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
    //estimatePasswordCost("password");
    var pass_check = "3t@rQ>md;M_80P&P9cl]vdmR}Z?}OgeBD$8wLz7Kp4vXxQ!9cZ2jFhR1sW@M0dY2Hn^T6@Vh7!pZk3Qw2@Yt9x";
    estimatePasswordCost(pass_check);
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