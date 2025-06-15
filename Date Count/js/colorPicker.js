window.appState = window.appState || {};
//window.appState.tempSelectedColor = "#1a73e8";


export function initColorPicker() {
    const colorOptions = document.querySelector('.color-options');
    const hiddenColors = document.querySelector('.hidden-colors');
    const colorDefault = document.querySelector('.color-default');

    document.getElementById("toggle-colors").addEventListener("click", function () {
        hiddenColors.style.display = hiddenColors.style.display === 'none' || hiddenColors.style.display === '' ? 'block' : 'none';
    });

    colorOptions.addEventListener('click', function (event) {
        event.stopPropagation();
        hiddenColors.style.display = hiddenColors.style.display === 'none' || hiddenColors.style.display === '' ? 'block' : 'none';
    });

    document.addEventListener('click', function (event) {
        if (!colorOptions.contains(event.target)) {
            hiddenColors.style.display = 'none';
        }
    });

    colorOptions.addEventListener('mouseleave', function () {
        hiddenColors.style.display = 'none';
    });

    const colorChoices = document.querySelectorAll('.hidden-colors .color-option');
    colorChoices.forEach(function (color) {
        color.addEventListener('click', function () {
            const selectedColor = color.getAttribute('data-color');
            colorOptions.style.backgroundColor = selectedColor;
            colorDefault.style.backgroundColor = selectedColor;

            window.appState.tempSelectedColor = selectedColor;
            //localStorage.setItem('savedColor', selectedColor);
            console.log('Selected color:', selectedColor);

            document.querySelectorAll('.color-option').forEach(function (item) {
                item.classList.remove('selected');
            });

            color.classList.add('selected');
            hiddenColors.style.display = 'none';

        });
    });
}
