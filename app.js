let section = document.querySelector('section');
let canvas = document.querySelector('canvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const ctx = canvas.getContext('2d');
console.log(ctx);
const dots = [];
const colors = ['#3ad69f', '#3ad69f', '#d63a9a', '#d63a9a', '#d63d3a'];

for (let i = 0; i < 50; i++) {
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: colors[Math.floor(Math.random() * 5)]
    });
}

const drawDots = _ => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
}
drawDots();

section.addEventListener('mousemove', (event) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();

    let mouse = {
        x: event.pageX - section.getBoundingClientRect().left,
        y: event.pageY - section.getBoundingClientRect().top
    };

    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);

        if (distance < 300) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
});

section.addEventListener('mouseout', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
});

window.addEventListener('resize', _ => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();

    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;

    dots = [];
    for (let i = 0; i < 50; i++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Map.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: colors[Math.floor(Math.random() * 5)]
        });
    }
});