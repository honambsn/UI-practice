let c = document.getElementById('c');
let ctx = c.getContext('2d');
c.height = window.innerHeight;
c.width = window.innerWidth;
let matrix = "QWERTYUIOPASDFGHJKLMNOPQRSTUVWXYZ<!@#$%^&*()_+=-0987654321";
matrix = matrix.split("");
let font_size = 20;
let columns = c.width/font_size;
let drops = [];
for (var i = 0; i < columns; i++)
    drops[i] = 50;

function draw(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0f0";
    ctx.font = font_size + "px arial";

    for (var i = 0; i < drops.length; i++){
        let text = matrix[Math.floor(Math.random() * matrix.length)];

        ctx.fillText(text, i * font_size, drops[i] * font_size);
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;
        drops[i]++;
    }
}

setInterval(draw, 50);