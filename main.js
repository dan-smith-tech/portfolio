// Section Transitions
function scrollToSection(elementToScrollTo) {
    elementToScrollTo.scrollIntoView({
        behavior: 'smooth',
    });
}


// Cycling Skills Animation
const skillDisplay = document.querySelector("#skill");
var currentSkillIndex;

const allSkills = [
  "Front-End Web Developer",
  "Full-Stack Web Developer",
  "Game Developer",
  "Machine Learning Enthusiast"
];

var availableSkills = [];

function changeDisplayedSkill() {
  var currentSkillIndex = generateRandomIndex(0, availableSkills.length - 1, [
    currentSkillIndex
  ]);

  if (availableSkills.length == 0) {
    for (i = 0; i < allSkills.length; i++) {
      availableSkills[i] = allSkills[i];
    }
  }

  skillDisplay.innerHTML = availableSkills[currentSkillIndex];
  availableSkills.splice(currentSkillIndex, 1);

  skillDisplay.classList.add("skill-fadein");
  skillDisplay.classList.remove("skill-fadeout");
  setTimeout(fadeSkillOut, 2000 - 350);
}

function fadeSkillOut() {
  skillDisplay.classList.add("skill-fadeout");
  skillDisplay.classList.remove("skill-fadein");
}

changeDisplayedSkill();
setInterval(changeDisplayedSkill, 2000);

function generateRandomIndex(min, max, ignore) {
  var index = Math.floor(Math.random() * (max - min + 1)) + min;
  return ignore.includes(index)
    ? generateRandomIndex(min, max, [currentPhraseIndex])
    : index;
}


// Canvas Animation
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const radius = 3.85;
const maxRadius = 8.5;
const speed = 0.35;
const maxConnectDistance = 85;
const proportionalNumberToSpawn = 30;

const colors = [
    "rgba(2, 149, 243, 1)"
];

var numberToSpawn = proportionalNumberToSpawn;
const distanceMagnitude = Math.sqrt(
    Math.pow(maxConnectDistance, 2) + Math.pow(maxConnectDistance, 2)
);

var nodes = [];
var connections = [];

var mouse = {
    x: undefined,
    y: undefined
};

function Node(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
            this.dx = -this.dx;

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
            this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        if (
            Math.sqrt(
                Math.pow(Math.abs(mouse.x - this.x), 2) +
                Math.pow(Math.abs(mouse.y - this.y), 2)
            ) <= distanceMagnitude &&
            this.radius < maxRadius
        ) {
            this.radius += 0.35;
        } else {
            if (this.radius > radius) {
                this.radius -= 0.35;
            }
        }

        this.draw();
    };
}

function Connection(sx, sy, ex, ey, thickness) {
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
    this.thickness = thickness;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function () {
        ctx.strokeStyle = this.color;

        var currentDistanceMagnitude = Math.sqrt(
            Math.pow(Math.abs(this.ex - this.sx), 2) +
            Math.pow(Math.abs(this.ey - this.sy), 2)
        );

        this.thickness = (1 - currentDistanceMagnitude / distanceMagnitude) * radius;

        ctx.lineWidth = this.thickness;
        ctx.beginPath();
        ctx.moveTo(this.sx, this.sy);
        ctx.lineTo(this.ex, this.ey);
        ctx.stroke();
    };

    this.update = function (sx, sy, ex, ey) {
        this.sx = sx;
        this.sy = sy;
        this.ex = ex;
        this.ey = ey;
        this.draw();
    };
}

function init() {
    nodes = [];

    numberToSpawn = Math.round(
        (((proportionalNumberToSpawn * canvas.height) / 500) * canvas.width) / 500
    );
    if (numberToSpawn < 2) numberToSpawn = 2;
    for (i = 0; i < numberToSpawn; i++) {
        connections.push(new Array(numberToSpawn));
    }

    for (i = 0; i < numberToSpawn; i++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * speed;
        var dy = (Math.random() - 0.5) * speed;
        nodes.push(new Node(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.fillStyle = "#1e2126";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < nodes.length; i++) {
        for (j = 0; j < nodes.length; j++) {
            if (
                Math.sqrt(
                    Math.pow(Math.abs(nodes[i].x - nodes[j].x), 2) +
                    Math.pow(Math.abs(nodes[i].y - nodes[j].y), 2)
                ) <= distanceMagnitude
            ) {
                if (connections[i][j]) {
                    connections[i][j].update(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                } else {
                    connections[i][j] = new Connection(
                        nodes[i].x,
                        nodes[i].y,
                        nodes[j].x,
                        nodes[j].y,
                        radius
                    );
                }
            }
        }
        nodes[i].update();
    }

    ctx.fillStyle = "rgba(30, 33, 38, 0.85)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

init();
animate();