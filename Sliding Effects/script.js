document.getElementById('btn').addEventListener('click', function() {
    const notice = document.getElementById('notice');
    notice.style.display = 'block';
    setTimeout(() => {
        notice.style.display = 'none';
    }, 3000); // Notice disappears after 3 seconds
});