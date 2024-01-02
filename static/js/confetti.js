var confetti = {
    maxCount: 150,		// set max confetti count
    speed: 2,			// set the particle animation speed
    frameInterval: 15,	// the confetti animation frame interval in milliseconds
    gradient: false,	// whether to use gradients for the confetti particles
    start: null,		// call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
    stop: null,			// call to stop adding confetti
    toggle: null,		// call to start or stop the confetti animation depending on whether it's already running
    togglePause: null,	// call to toggle whether the confetti animation is paused
};

var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
var colors = ["rgb(30,144,255)", "rgb(107,142,35)", "rgb(255,215,0)", "rgb(255,192,203)", "rgb(106,90,205)", "rgb(173,216,230)", "rgb(238,130,238)", "rgb(152,251,152)", "rgb(70,130,180)", "rgb(244,164,96)", "rgb(210,105,30)", "rgb(220,20,60)"];
var streamingConfetti = false;
var animationTimer = null;
var pause = false;
var lastFrameTime = Date.now();
var particles = [];
var waveAngle = 0;
var context = null;
const week = 1000 * 60 * 60 * 24 * 6; // value of a week in TimeStamp


function setupAnimationConfetti() {
    confetti.start = startConfetti;
    confetti.stop = stopConfetti;	

}

function resetParticle(particle, width, height) {
    particle.color = colors[(Math.random() * colors.length) | 0];
    particle.color2 = colors[(Math.random() * colors.length) | 0];
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = Math.random() * Math.PI;
    return particle;
}

function runAnimation() {
    if (pause)
        return;
    else if (particles.length === 0) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        animationTimer = null;
    } else {
        var now = Date.now();
        var delta = now - lastFrameTime;
        if (!supportsAnimationFrame || delta > confetti.frameInterval) {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            updateParticles();
            drawParticles(context);
            lastFrameTime = now - (delta % confetti.frameInterval);
        }
        animationTimer = requestAnimationFrame(runAnimation);
    }
}

function startConfetti(timeout, min, max) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, confetti.frameInterval);
            };
    })();
    var canvas = document.getElementById("confetti-canvas");
    if (canvas === null) {
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "confetti-canvas");
        canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
        document.body.prepend(canvas);
        canvas.width = width;
        canvas.height = height;
        window.addEventListener("resize", function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, true);
        context = canvas.getContext("2d");
    } else if (context === null)
        context = canvas.getContext("2d");
    var count = confetti.maxCount;
    if (min) {
        if (max) {
            if (min == max)
                count = particles.length + max;
            else {
                if (min > max) {
                    var temp = min;
                    min = max;
                    max = temp;
                }
                count = particles.length + ((Math.random() * (max - min) + min) | 0);
            }
        } else
            count = particles.length + min;
    } else if (max)
        count = particles.length + max;
    while (particles.length < count)
        particles.push(resetParticle({}, width, height));
    streamingConfetti = true;
    pause = false;
    runAnimation();
    if (timeout) {
        window.setTimeout(stopConfetti, timeout);
    }
}

function stopConfetti() {
    streamingConfetti = false;
}

function drawParticles(context) {
    var particle;
    var x, y, x2, y2;
    for (var i = 0; i < particles.length; i++) {
        particle = particles[i];
        context.beginPath();
        context.lineWidth = particle.diameter;
        x2 = particle.x + particle.tilt;
        x = x2 + particle.diameter / 2;
        y2 = particle.y + particle.tilt + particle.diameter / 2;
        if (confetti.gradient) {
            var gradient = context.createLinearGradient(x, particle.y, x2, y2);
            gradient.addColorStop("0", particle.color);
            gradient.addColorStop("1.0", particle.color2);
            context.strokeStyle = gradient;
        } else
            context.strokeStyle = particle.color;
        context.moveTo(x, particle.y);
        context.lineTo(x2, y2);
        context.stroke();
    }
}

function updateParticles() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var particle;
    waveAngle += 0.01;
    for (var i = 0; i < particles.length; i++) {
        particle = particles[i];
        if (!streamingConfetti && particle.y < -15)
            particle.y = height + 100;
        else {
            particle.tiltAngle += particle.tiltAngleIncrement;
            particle.x += Math.sin(waveAngle) - 0.5;
            particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
            particle.tilt = Math.sin(particle.tiltAngle) * 15;
        }
        if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
            if (streamingConfetti && particles.length <= confetti.maxCount)
                resetParticle(particle, width, height);
            else {
                particles.splice(i, 1);
                i--;
            }
        }
    }
}

function playAnimationConfetti(countdown, duration) {
    
    if ( new Date() - localStorage.getItem('date_co') < week) { // check if it is not from an other stage
        if (localStorage.getItem('finished_section') == 'true') {
            localStorage.removeItem('finished_section');
            const start = () => {
                setTimeout(function() {
                    confetti.start();
                }, countdown * 1000);
            };
    
            const stop = () => {
                setTimeout(function() {
                    confetti.stop();
                }, duration * 1000);
            };
            start();
            stop();
        }
    }
    else {
        localStorage.setItem('date_co', new Date().getTime());
        localStorage.removeItem('finished_section');
    }
}


setupAnimationConfetti();

playAnimationConfetti(1,5);