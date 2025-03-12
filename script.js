(function () {
  // Countdown functionality (for index.html)
  if (document.getElementById("countdown")) {
    var countDownDate = new Date("Mar 13, 2025 00:00:00").getTime();
    var countdownFunction = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(countdownFunction);
        window.location.href = "hbd.html";
      }
    }, 1000);
  }

  // Fireworks effect (for hbd.html)
  if (document.getElementById("fireworksCanvas")) {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = random(2, 4);
        this.color = color;
        this.speed = random(2, 5);
        this.angle = random(0, Math.PI * 2);
        this.friction = 0.98;
        this.gravity = 0.05;
        this.alpha = 1;
        this.decay = random(0.01, 0.03);
      }
      update() {
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    let particles = [];

    function createFirework(x, y) {
      const colors = ["#ff6e7f", "#bfe9ff", "#ffcc00", "#66ff66", "#ff66ff"];
      const color = colors[Math.floor(random(0, colors.length))];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    animate();

    setInterval(function () {
      const x = random(0, canvas.width);
      const y = random(0, canvas.height / 2);
      createFirework(x, y);
    }, 800);
  }
})();
