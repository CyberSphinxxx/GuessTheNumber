function loadStatistics() {
    const stats = JSON.parse(localStorage.getItem('numberGameStats') || '{}');
    const history = JSON.parse(localStorage.getItem('numberGameHistory') || '[]');

    // Update main stats
    document.getElementById('totalGames').textContent = stats.gamesPlayed || 0;
    document.getElementById('totalWins').textContent = stats.gamesWon || 0;
    document.getElementById('winRate').textContent = stats.gamesPlayed > 0 ? 
        Math.round((stats.gamesWon / stats.gamesPlayed) * 100) + '%' : '0%';
    document.getElementById('currentStreak').textContent = stats.currentStreak || 0;
    document.getElementById('maxStreak').textContent = stats.maxStreak || 0;

    // Calculate average attempts
    const totalAttempts = history.reduce((sum, game) => sum + game.attempts, 0);
    const avgAttempts = history.length > 0 ? Math.round(totalAttempts / history.length) : 0;
    document.getElementById('avgAttempts').textContent = avgAttempts;

    // Update difficulty best scores
    const bestScores = stats.bestScores || {};
    document.getElementById('easyBest').textContent = bestScores.easy || '-';
    document.getElementById('mediumBest').textContent = bestScores.medium || '-';
    document.getElementById('hardBest').textContent = bestScores.hard || '-';
    document.getElementById('expertBest').textContent = bestScores.expert || '-';

    // Update performance bars
    const winRate = stats.gamesPlayed > 0 ? (stats.gamesWon / stats.gamesPlayed) * 100 : 0;
    const efficiency = avgAttempts > 0 ? Math.max(0, 100 - (avgAttempts * 5)) : 0;
    const consistency = stats.currentStreak > 0 ? Math.min(100, stats.currentStreak * 20) : 0;

    updateProgressBar('accuracyBar', 'accuracyValue', winRate);
    updateProgressBar('efficiencyBar', 'efficiencyValue', efficiency);
    updateProgressBar('consistencyBar', 'consistencyValue', consistency);

    // Update recent games table
    updateRecentGamesTable(history);
}

function updateProgressBar(barId, valueId, percentage) {
    document.getElementById(barId).style.width = percentage + '%';
    document.getElementById(valueId).textContent = Math.round(percentage) + '%';
}

function updateRecentGamesTable(history) {
    const tableBody = document.getElementById('recentGamesTable');
    
    if (history.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--text-muted);">
                    No games played yet. <a href="index.html" style="color: var(--primary);">Start playing!</a>
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = history.slice(0, 10).map(game => `
        <tr>
            <td>${game.date}</td>
            <td style="text-transform: capitalize;">${game.difficulty}</td>
            <td>${game.attempts}</td>
            <td>
                <span class="game-result ${game.won ? 'won' : 'lost'}">
                    ${game.won ? 'Won' : 'Lost'}
                </span>
            </td>
            <td>${game.won ? game.attempts : '-'}</td>
        </tr>
    `).join('');
}

function resetStats() {
    if (confirm('Are you sure you want to reset all statistics? This action cannot be undone.')) {
        localStorage.removeItem('numberGameStats');
        localStorage.removeItem('numberGameHistory');
        loadStatistics();
        alert('Statistics have been reset!');
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
    loadStatistics();
});