window.onload = function() {
    const calculatorContainer = document.querySelector('.buttons');
    const valueElement = document.getElementById('value');
    let toggleBtn = document.querySelector('.toggleBtn');
    let body = document.querySelector('body');

    // Define the button values
    const buttonValues = [
        'Clear', '/', '*', '7', '8', '9', '-', 
        '4', '5', '6', '+', 
        '1', '2', '3', '0', '00', '.', '='
    ];

    // Create a button for each value in the array
    buttonValues.forEach(valueText => {
        const button = document.createElement('span');
        button.textContent = valueText;

        // Add specific ids for '+' and '=' buttons
        if (valueText === '+') {
            button.id = 'plus';
        }
        if (valueText === '=') {
            button.id = 'equal';
        }
        if (valueText === 'Clear') {
            button.id = 'clear';
        }

        // Add click event for each button
        button.addEventListener('click', function() {
            if (button.textContent === "=") {
                // Evaluate the expression when "=" is clicked
                try {
                    valueElement.textContent = eval(valueElement.textContent); // Simple evaluation
                } catch (e) {
                    valueElement.textContent = 'Error';
                }
            } else if (button.textContent === 'Clear') {
                // Clear the display when 'Clear' is clicked
                valueElement.textContent = '';
            } else {
                // Append the value to the display
                // If the value is 0, replace it with the current button's value
                if (valueElement.textContent === '000') {
                    valueElement.textContent = button.textContent;
                } else {
                    valueElement.textContent += button.textContent;
                }
            }
        });

        // Append each button to the container
        calculatorContainer.appendChild(button);
    });

    // Toggle the theme
    toggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark');
    }); 
};
