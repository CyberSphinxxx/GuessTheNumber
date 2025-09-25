let currentDifficulty = 'easy';

function getLeaderboards() {
    const stored = localStorage.getItem('gameLeaderboards');
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Return empty leaderboards if none exist
    return {
        easy: [],
        medium: [],
        hard: [],
        expert: []
    };
}

function switchDifficulty(difficulty) {
    currentDifficulty = difficulty;
    
    // Update active tab
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update leaderboard
    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboards = getLeaderboards();
    const leaderboard = leaderboards[currentDifficulty] || [];
    const leaderboardList = document.getElementById('leaderboardList');
    const leaderboardTitle = document.getElementById('leaderboardTitle');
    
    leaderboardTitle.textContent = `${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Mode Champions`;
    
    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🏆</div>
                <h3>No champions yet!</h3>
                <p>Be the first to claim the top spot in ${currentDifficulty} mode.</p>
            </div>
        `;
        return;
    }
    
    leaderboardList.innerHTML = leaderboard.map((player, index) => {
        const rank = index + 1;
        let rankClass = '';
        let rankIcon = '';
        
        if (rank === 1) {
            rankClass = 'first';
            rankIcon = '🥇';
        } else if (rank === 2) {
            rankClass = 'second';
            rankIcon = '🥈';
        } else if (rank === 3) {
            rankClass = 'third';
            rankIcon = '🥉';
        } else {
            rankIcon = `#${rank}`;
        }
        
        const gameDate = new Date(player.date).toLocaleDateString();
        
        return `
            <div class="leaderboard-item">
                <div class="rank ${rankClass}">${rankIcon}</div>
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                    <div class="player-stats">${player.gamesPlayed} games • ${player.winRate}% win rate • ${gameDate}</div>
                </div>
                <div class="score">${player.score}</div>
            </div>
        `;
    }).join('');
    
    updateYourRank();
}

function updateYourRank() {
    const stats = JSON.parse(localStorage.getItem('numberGameStats') || '{}');
    const leaderboards = getLeaderboards();
    const currentLeaderboard = leaderboards[currentDifficulty] || [];
    const playerName = localStorage.getItem('playerName') || 'Anonymous Player';
    
    const bestScore = stats.bestScores?.[currentDifficulty];
    const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
    
    document.getElementById('yourBestScore').textContent = `Best Score: ${bestScore || '-'}`;
    document.getElementById('yourWinRate').textContent = `Win Rate: ${winRate}%`;
    
    if (bestScore && currentLeaderboard.length > 0) {
        // Find player's best position in current difficulty
        const playerEntries = currentLeaderboard.filter(entry => entry.name === playerName);
        if (playerEntries.length > 0) {
            const bestPlayerEntry = playerEntries.reduce((best, current) => 
                current.score < best.score ? current : best
            );
            const rank = currentLeaderboard.findIndex(entry => 
                entry.name === bestPlayerEntry.name && 
                entry.score === bestPlayerEntry.score && 
                entry.timestamp === bestPlayerEntry.timestamp
            ) + 1;
            document.getElementById('yourRank').textContent = rank;
        } else {
            // Player not in leaderboard yet, calculate hypothetical rank
            let rank = currentLeaderboard.findIndex(player => player.score > bestScore) + 1;
            if (rank === 0) rank = currentLeaderboard.length + 1;
            document.getElementById('yourRank').textContent = `~${rank}`;
        }
    } else {
        document.getElementById('yourRank').textContent = '-';
    }
}

function clearLeaderboards() {
    if (confirm('Are you sure you want to clear all leaderboard data? This cannot be undone.')) {
        localStorage.removeItem('gameLeaderboards');
        updateLeaderboard();
    }
}

function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const root = document.documentElement;
    root.setAttribute('data-theme', savedTheme);
    
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    updateLeaderboard();
});