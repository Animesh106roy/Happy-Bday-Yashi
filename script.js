document.addEventListener("DOMContentLoaded", () => {

  // Countdown to 15 August
  const countdownElem = document.getElementById("countdown");
  if(countdownElem){
    function updateCountdown(){
      const now = new Date();
      let year = now.getFullYear();
      let target = new Date(`${year}-08-15T00:00:00`);
      if(now > target){ target = new Date(`${year+1}-08-15T00:00:00`); }
      const diff = target - now;
      if(diff <= 0){
        countdownElem.textContent = "🎂 It's her Birthday today! 🎉";
        return;
      }
      const days = Math.floor(diff / (1000*60*60*24));
      const hrs = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
      const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
      const secs = Math.floor((diff % (1000*60)) / 1000);
      countdownElem.textContent = `⏳ Birthday in: ${days}d ${hrs}h ${mins}m ${secs}s`;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  // Floating hearts (only on Home)
  const heartContainer = document.getElementById("hearts-container");
  if(heartContainer){
    setInterval(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.background = getRandomPink();
      heart.style.animationDuration = (Math.random()*3 + 3) + "s";
      heartContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, 400);

    function getRandomPink(){
      const colors = ["#ff99b2","#ffb6c1","#ffc2e0","#ffe4e1"];
      return colors[Math.floor(Math.random()*colors.length)];
    }
  }

  // Gallery Preview
  const photoUpload = document.getElementById("photoUpload");
  const preview = document.getElementById("preview");
  if(photoUpload && preview){
    photoUpload.addEventListener("change", (e) => {
      preview.innerHTML = "";
      Array.from(e.target.files).forEach(file => {
        if(file.type.startsWith('image/')){
          const reader = new FileReader();
          reader.onload = (ev) => {
            const img = document.createElement("img");
            img.src = ev.target.result;
            preview.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }

  // Birthday Cake Catch Game
  const startBtn = document.getElementById("startGameBtn");
  const gameArea = document.getElementById("game-area");
  const scoreDisplay = document.getElementById("score");
  if(startBtn && gameArea && scoreDisplay){
    let score = 0;
    let gameInterval;
    let cakes = [];

   function createCake() {
  const cake = document.createElement("div");
  cake.classList.add("cake");
  cake.style.left = Math.random() * (gameArea.clientWidth - 40) + "px";
  cake.style.top = "-40px";
  cake.textContent = "🎂";  // Cake emoji as content
  gameArea.appendChild(cake);

  let fallSpeed = 1 + Math.random() * 2;
  cakes.push({ element: cake, speed: fallSpeed });

  cake.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    cake.remove();
    cakes = cakes.filter(c => c.element !== cake);
  });
}

    function updateCakes() {
      for (let i = cakes.length - 1; i >= 0; i--) {
        let cObj = cakes[i];
        let top = parseFloat(cObj.element.style.top);
        top += cObj.speed;
        if (top > gameArea.clientHeight) {
          cObj.element.remove();
          cakes.splice(i, 1);
        } else {
          cObj.element.style.top = top + "px";
        }
      }
    }

    function startGame() {
      score = 0;
      scoreDisplay.textContent = score;
      cakes.forEach(c => c.element.remove());
      cakes = [];

      clearInterval(gameInterval);
      gameInterval = setInterval(() => {
        if (Math.random() < 0.05) createCake();
        updateCakes();
      }, 20);

      startBtn.disabled = true;
      startBtn.textContent = "Game in Progress...";
      setTimeout(() => {
        clearInterval(gameInterval);
        startBtn.disabled = false;
        startBtn.textContent = "Start Game";
      }, 20000);
    }

    startBtn.addEventListener("click", startGame);
  }
});
