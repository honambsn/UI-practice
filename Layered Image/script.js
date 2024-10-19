const container = document.querySelector('.container');

container.addEventListener('mouseenter', () => {
    document.body.style.backgroundColor = 'lightcoral';
});

container.addEventListener('mouseleave', () => {
    document.body.style.backgroundColor = '';
});
