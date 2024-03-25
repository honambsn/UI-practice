document.addEventListener('DOMContentLoaded', function(){
    const inputText = document.getElementById('inputText');
    const hashAlgorithm = document.getElementById('hashAlgorithm');
    const hashButton = document.getElementById('hashButton');
    const hashedOutput = document.getElementById('hashedOutput');
    const resetButton = document.getElementById('resetButton');


    hashButton.addEventListener('click', function() {
        const text = inputText.value.trim();
        const algorithm = hashAlgorithm.value.trim();

        if (text) {
            const hashedText = hashText(text,algorithm);
            hashedOutput.value= hashedText;
        }
        else {
            hashedOutput.value = "Please enter text"
        }
    });

    resetButton.addEventListener('click', function(){
        inputText.value = '';
        hashedOutput.value = '';
    });

    function hashText(text, algorithm) {
        const hashFunction = CryptoJS[algorithm];
        if(!hashFunction){

            // throw new Error("Invalid hash algorithm");  
            const alertMessage = `
            <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.alert {
  padding: 20px;    
  position:fixed;
  border-radius:15px;
  top:7px;
  right:7px;
  background-color: #f44336;
  color: white;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>
</head>
<body>

<div class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  <strong>Sorry!</strong> Algorithm not implemented yet.
</div>

</body>
</html>`;
        document.body.insertAdjacentHTML('beforeend', alertMessage);
        throw new Error("Invalid hash algorithm");  
        }

        const hashedText = hashFunction(text).toString(CryptoJS.enc.Hex);
        const alertMessage =`
        <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.alert {
border-radius: 15px;
padding: 20px;    
position:fixed;
top:7px;
right:7px;
background-color: #22BB33;
color: white;
}

.closebtn {
margin-left: 15px;
color: white;
font-weight: bold;
float: right;
font-size: 22px;
line-height: 20px;
cursor: pointer;
transition: 0.3s;
}

.closebtn:hover {
color: black;
}
</style>
</head>
<body>

<div class="alert">
<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
<strong>Success!</strong>  Text hashed successfully
</div>

</body>
</html>`
        document.body.insertAdjacentHTML('beforeend', alertMessage);
        return hashedText;

    }
});