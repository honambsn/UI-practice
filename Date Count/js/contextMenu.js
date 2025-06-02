export function handleHoverTimeout(element, delay) {
    const contextMenu = document.getElementById('context-menu');
    let hoverTimeout;

    element.addEventListener('mouseenter', (e) => {
        hoverTimeout = setTimeout(() => {
            element.classList.add('active');
            alert("Bạn đã di chuột trong 1 giây!");
            console.log("Bạn đã di chuột trong 1 giây!");

            const mouseX = e.pageX;
            const mouseY = e.pageY;
            contextMenu.style.left = `${mouseX}px`;
            contextMenu.style.top = `${mouseY}px`;
            contextMenu.style.display = 'block';
        }, delay);
    });

    element.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
    });

    contextMenu.addEventListener('mouseleave', () => {
        contextMenu.style.display = 'none';
        element.classList.remove('active');
    });

    contextMenu.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
    });
}

export function setupContextMenu() {
    const hoverBoxes = document.querySelectorAll('.calendar-day-date');
    hoverBoxes.forEach(hoverBox => {
        handleHoverTimeout(hoverBox, 1000);
    });

    document.addEventListener('click', (e) => {
        const contextMenu = document.getElementById('context-menu');
        if (!contextMenu.contains(e.target) && !Array.from(hoverBoxes).includes(e.target)) {
            contextMenu.style.display = 'none';
            hoverBoxes.forEach(hoverBox => hoverBox.classList.remove('active'));
        }
    });
}
