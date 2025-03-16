        // Game variables
        let time = 0;
        let interval;
        let currentSpeed = 100;
        const gameSound = document.getElementById('gameSound');
        let isGamePlaying = false;

        // Updates the counter display
        function updateTime() {
            time++;
            document.getElementById('counter').textContent = time;
        }

        // Starts the game with specified speed
        function startGame(speed) {
            resetGame();
            clearInterval(interval);
            currentSpeed = speed;
            interval = setInterval(updateTime, speed);
            if (!isGamePlaying) {
                gameSound.play(); // Play background music only if not already playing
                isGamePlaying = true;
            }
        }

        // Resets the game state
        function resetGame() {
            time = 0;
            document.getElementById('counter').textContent = '0';
            document.getElementById('result').textContent = '';
            document.body.style.backgroundColor = '#FFFFFF';
            clearInterval(interval);
            // Stop and reset all audio
            const winSound = document.getElementById('winSound');
            winSound.pause();
            winSound.currentTime = 0;
            // Only reset game sound if game is over
            if (!isGamePlaying) {
                gameSound.pause();
                gameSound.currentTime = 0;
            }
        }

        // Event listeners for difficulty buttons
        document.getElementById('simple').addEventListener('click', () => startGame(120));
        document.getElementById('moderate').addEventListener('click', () => startGame(90)); 
        document.getElementById('difficult').addEventListener('click', () => startGame(70));

        // Stop button handler - checks if player won
        document.getElementById('stopBtn').addEventListener('click', function() {
            clearInterval(interval);
            isGamePlaying = false;
            gameSound.pause(); // Stop background music
            if (time === 30) {
                document.getElementById('result').textContent = 'You Win! 🎉';
                document.body.style.backgroundColor = '#90EE90';
                document.getElementById('winSound').play();
            } else {
                document.getElementById('result').textContent = 'Try Again!';
            }
        });

        // Reset button handler
        document.getElementById('resetBtn').addEventListener('click', function() {
            resetGame();
            startGame(currentSpeed);
        });