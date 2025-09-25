class NumberGuessingGame {
    constructor() {
        this.difficulties = {
            easy: { min: 1, max: 50, maxAttempts: 10, hints: 3 },
            medium: { min: 1, max: 100, maxAttempts: 12, hints: 2 },
            hard: { min: 1, max: 200, maxAttempts: 15, hints: 1 },
            expert: { min: 1, max: 500, maxAttempts: 20, hints: 0 }
        };
        
        this.currentDifficulty = 'easy';
        this.targetNumber = 0;
        this.attempts = 0;
        this.hintsUsed = 0;
        this.gameActive = true;
        this.rangeMin = 1;
        this.rangeMax = 50;
        
        this.stats = this.loadStats();
        this.gameHistory = this.loadHistory();
        
        this.initGame();
        this.updateDisplay();
    }

    loadStats() {
        const saved = localStorage.getItem('numberGameStats');
        return saved ? JSON.parse(saved) : {
            gamesPlayed: 0,
            gamesWon: 0,
            bestScores: { easy: null, medium: null, hard: null, expert: null },
            currentStreak: 0,
            maxStreak: 0
        };
    }

    loadHistory() {
        const saved = localStorage.getItem('numberGameHistory');
        return saved ? JSON.parse(saved) : [];
    }

    saveStats() {
        localStorage.setItem('numberGameStats', JSON.stringify(this.stats));
    }

    saveHistory() {
        localStorage.setItem('numberGameHistory', JSON.stringify(this.gameHistory));
    }

    initGame() {
        const config = this.difficulties[this.currentDifficulty];
        this.targetNumber = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
        this.attempts = 0;
        this.hintsUsed = 0;
        this.gameActive = true;
        this.rangeMin = config.min;
        this.rangeMax = config.max;
        
        document.getElementById('guessInput').max = config.max;
        document.getElementById('guessInput').min = config.min;
        document.getElementById('guessInput').value = '';
        document.getElementById('feedbackMessage').textContent = 'Make your first guess!';
        document.getElementById('feedbackHint').textContent = `I'm thinking of a number between ${config.min} and ${config.max}`;
        document.getElementById('hintDisplay').textContent = '';
        
        this.updateDisplay();
        this.resetHintButtons();
    }

    setDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        
        // Update active button
        document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update difficulty info
        const config = this.difficulties[difficulty];
        document.getElementById('difficultyInfo').innerHTML = `
            <strong>${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode</strong><br>
            Range: ${config.min}-${config.max}<br>
            Max Attempts: ${config.maxAttempts}<br>
            Hints: ${config.hints} available
        `;
        
        this.initGame();
    }

    makeGuess() {
        if (!this.gameActive) return;
        
        const input = document.getElementById('guessInput');
        const guess = parseInt(input.value);
        const config = this.difficulties[this.currentDifficulty];
        
        if (isNaN(guess) || guess < config.min || guess > config.max) {
            this.showFeedback(`Please enter a number between ${config.min} and ${config.max}`, 'error');
            this.addShakeEffect(input);
            return;
        }
        
        this.attempts++;
        this.updateDisplay();
        
        if (guess === this.targetNumber) {
            this.handleWin();
        } else if (this.attempts >= config.maxAttempts) {
            this.handleLoss();
        } else {
            this.handleIncorrectGuess(guess);
        }
        
        input.value = '';
    }

    handleWin() {
        this.gameActive = false;
        this.showFeedback(`🎉 Congratulations! You found ${this.targetNumber}!`, 'success');
        document.getElementById('feedbackHint').textContent = `Solved in ${this.attempts} attempts`;
        
        this.updateStats(true);
        this.addToHistory(true);
        this.showCelebration();
        
        setTimeout(() => {
            if (confirm('Great job! Play again?')) {
                this.initGame();
            }
        }, 2000);
    }

    handleLoss() {
        this.gameActive = false;
        this.showFeedback(`💔 Game Over! The number was ${this.targetNumber}`, 'error');
        document.getElementById('feedbackHint').textContent = `Better luck next time!`;
        
        this.updateStats(false);
        this.addToHistory(false);
        
        setTimeout(() => {
            if (confirm('Try again?')) {
                this.initGame();
            }
        }, 2000);
    }

    handleIncorrectGuess(guess) {
        const difference = Math.abs(guess - this.targetNumber);
        let feedback, hint;
        
        if (guess < this.targetNumber) {
            feedback = '📈 Too Low!';
            this.rangeMin = Math.max(this.rangeMin, guess + 1);
        } else {
            feedback = '📉 Too High!';
            this.rangeMax = Math.min(this.rangeMax, guess - 1);
        }
        
        // Proximity hints
        if (difference <= 5) {
            hint = '🔥 Very Hot!';
        } else if (difference <= 10) {
            hint = '🌡️ Hot!';
        } else if (difference <= 20) {
            hint = '🌤️ Warm';
        } else if (difference <= 50) {
            hint = '❄️ Cold';
        } else {
            hint = '🧊 Very Cold!';
        }
        
        this.showFeedback(feedback, 'info');
        document.getElementById('feedbackHint').textContent = hint;
        
        this.updateRangeDisplay();
    }

    useHint(type) {
        const config = this.difficulties[this.currentDifficulty];
        if (this.hintsUsed >= config.hints || !this.gameActive) return;
        
        this.hintsUsed++;
        let hintText = '';
        
        switch (type) {
            case 'range':
                const narrowRange = Math.floor((this.rangeMax - this.rangeMin) / 3);
                if (this.targetNumber <= this.rangeMin + narrowRange) {
                    hintText = `🎯 The number is in the lower third (${this.rangeMin}-${this.rangeMin + narrowRange})`;
                } else if (this.targetNumber >= this.rangeMax - narrowRange) {
                    hintText = `🎯 The number is in the upper third (${this.rangeMax - narrowRange}-${this.rangeMax})`;
                } else {
                    hintText = `🎯 The number is in the middle third`;
                }
                break;
            case 'parity':
                hintText = this.targetNumber % 2 === 0 ? '🎯 The number is EVEN' : '🎯 The number is ODD';
                break;
            case 'proximity':
                const lastGuess = parseInt(document.getElementById('guessInput').value) || Math.floor((this.rangeMin + this.rangeMax) / 2);
                const distance = Math.abs(lastGuess - this.targetNumber);
                if (distance < 10) hintText = '🎯 You\'re very close!';
                else if (distance < 25) hintText = '🎯 You\'re getting warmer!';
                else hintText = '🎯 You\'re still far away';
                break;
        }
        
        document.getElementById('hintDisplay').textContent = hintText;
        event.target.disabled = true;
        
        if (this.hintsUsed >= config.hints) {
            this.disableAllHints();
        }
    }

    showFeedback(message, type) {
        const feedbackEl = document.getElementById('feedbackMessage');
        feedbackEl.textContent = message;
        feedbackEl.className = `feedback-message ${type}`;
        
        if (type === 'success') {
            feedbackEl.style.color = 'var(--success)';
        } else if (type === 'error') {
            feedbackEl.style.color = 'var(--danger)';
        } else {
            feedbackEl.style.color = 'var(--text-primary)';
        }
    }

    updateDisplay() {
        document.getElementById('currentAttempts').textContent = this.attempts;
        document.getElementById('gamesPlayed').textContent = this.stats.gamesPlayed;
        document.getElementById('winRate').textContent = this.stats.gamesPlayed > 0 ? 
            Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) + '%' : '0%';
        document.getElementById('currentStreak').textContent = this.stats.currentStreak;
        
        const bestScore = this.stats.bestScores[this.currentDifficulty];
        document.getElementById('bestScore').textContent = bestScore || '-';
        
        const config = this.difficulties[this.currentDifficulty];
        const progress = (this.attempts / config.maxAttempts) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
        
        this.updateRangeDisplay();
    }

    updateRangeDisplay() {
        document.getElementById('rangeMin').textContent = this.rangeMin;
        document.getElementById('rangeMax').textContent = this.rangeMax;
    }

    updateStats(won) {
        this.stats.gamesPlayed++;
        if (won) {
            this.stats.gamesWon++;
            this.stats.currentStreak++;
            this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.currentStreak);
            
            const currentBest = this.stats.bestScores[this.currentDifficulty];
            if (!currentBest || this.attempts < currentBest) {
                this.stats.bestScores[this.currentDifficulty] = this.attempts;
            }
            
            this.saveToLeaderboard();
        } else {
            this.stats.currentStreak = 0;
        }
        this.saveStats();
    }

    saveToLeaderboard() {
        const playerName = localStorage.getItem('playerName') || 'Anonymous Player';
        const leaderboards = JSON.parse(localStorage.getItem('gameLeaderboards') || '{}');
        
        // Initialize difficulty leaderboard if it doesn't exist
        if (!leaderboards[this.currentDifficulty]) {
            leaderboards[this.currentDifficulty] = [];
        }
        
        const newEntry = {
            name: playerName,
            score: this.attempts,
            winRate: Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100),
            gamesPlayed: this.stats.gamesPlayed,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        // Add new entry
        leaderboards[this.currentDifficulty].push(newEntry);
        
        // Sort by score (lower is better), then by date
        leaderboards[this.currentDifficulty].sort((a, b) => {
            if (a.score === b.score) {
                return new Date(a.date) - new Date(b.date); // Earlier date wins for same score
            }
            return a.score - b.score;
        });
        
        // Keep only top 50 entries per difficulty
        leaderboards[this.currentDifficulty] = leaderboards[this.currentDifficulty].slice(0, 50);
        
        localStorage.setItem('gameLeaderboards', JSON.stringify(leaderboards));
    }

    addToHistory(won) {
        this.gameHistory.unshift({
            difficulty: this.currentDifficulty,
            attempts: this.attempts,
            won: won,
            date: new Date().toLocaleDateString()
        });
        
        if (this.gameHistory.length > 10) {
            this.gameHistory = this.gameHistory.slice(0, 10);
        }
        
        this.saveHistory();
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyEl = document.getElementById('gameHistory');
        historyEl.innerHTML = this.gameHistory.map((game, index) => `
            <div class="leaderboard-item">
                <span>${game.difficulty} ${game.won ? '✅' : '❌'}</span>
                <span>${game.attempts} attempts</span>
            </div>
        `).join('');
    }

    showCelebration() {
        const celebration = document.getElementById('celebration');
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--success)'][Math.floor(Math.random() * 4)];
            celebration.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    addShakeEffect(element) {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
    }

    resetHintButtons() {
        document.querySelectorAll('.hint-btn').forEach(btn => {
            btn.disabled = false;
        });
    }

    disableAllHints() {
        document.querySelectorAll('.hint-btn').forEach(btn => {
            btn.disabled = true;
        });
    }
}

// Global functions for HTML onclick events
let game;

function initializeGame() {
    game = new NumberGuessingGame();
    initializeTheme();
}

function makeGuess() {
    game.makeGuess();
}

function setDifficulty(difficulty) {
    game.setDifficulty(difficulty);
}

function useHint(type) {
    game.useHint(type);
}

function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update toggle button icon
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const root = document.documentElement;
    root.setAttribute('data-theme', savedTheme);
    
    // Update toggle button icon
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initializeGame);

// Allow Enter key to make guess
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        makeGuess();
    }
});