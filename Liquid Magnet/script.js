function genCircles(num){
    const container = document.getElementById('circle-container');

    container.style.position = 'relative';

    // Function to generate random position within container with collision check
    function getRandomPosition(container, circles) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Random x and y positions within the container's dimensions
        let x, y, isColliding;

        do {
            x = Math.floor(Math.random() * containerWidth);
            y = Math.floor(Math.random() * containerHeight);
            y = y+100;
            isColliding = false;

            // Check for collision with existing circles
            for (let i = 0; i < circles.length; i++) {
                const otherCircle = circles[i];
                const distance = Math.sqrt(Math.pow(x - otherCircle.x, 2) + Math.pow(y - otherCircle.y, 2));
                const minDistance = (otherCircle.size / 2) + (otherCircle.size / 2); // Minimum distance for no collision

                if (distance < minDistance) {
                    isColliding = true;
                    break;
                }
            }
        } while (isColliding); // Repeat if there's a collision

        return { x, y };
    }
    // Function to generate a random hex color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const circles = [];

    for (let i = 1; i <= num; i++){
        const circle = document.createElement('div');
        circle.classList.add('circle', `circle${i}`);

        const color1 = getRandomColor();
        const color2 = getRandomColor();

        // Apply the gradient
        const gradient = `linear-gradient(45deg, ${color1}, ${color2})`;
        circle.style.background = gradient;

        
        
        // Get a random position without collision
        const { x, y } = getRandomPosition(container, circles);
    
        // Apply random position to circle
        circle.style.position = 'absolute';
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        container.appendChild(circle);
    }
}

genCircles(5);

$(function(){
    $(".container .circle").draggable();
});