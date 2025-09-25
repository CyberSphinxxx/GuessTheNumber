let settings = {
    soundEffects: true,
    animations: true,
    autoFocus: true,
    defaultDifficulty: 'easy',
    theme: 'dark',
    reducedMotion: false,
    fontSize: 16,
    saveStats: true,
    saveHistory: true,
    displayName: 'NumberMind Player'
};

function loadSettings() {
    const saved = localStorage.getItem('gameSettings');
    if (saved) {
        settings = { ...settings, ...JSON.parse(saved) };
    }
    
    // Apply loaded settings to UI
    document.getElementById('displayName').value = settings.displayName;
    document.getElementById('defaultDifficulty').value = settings.defaultDifficulty;
    document.getElementById('themeSelect').value = settings.theme;
    document.getElementById('fontSize').value = settings.fontSize;
    document.getElementById('fontSizeValue').textContent = settings.fontSize + 'px';
    
    // Update toggle switches
    updateToggleUI('soundEffects', settings.soundEffects);
    updateToggleUI('animations', settings.animations);
    updateToggleUI('autoFocus', settings.autoFocus);
    updateToggleUI('reducedMotion', settings.reducedMotion);
    updateToggleUI('saveStats', settings.saveStats);
    updateToggleUI('saveHistory', settings.saveHistory);
    
    // Update profile
    updateProfile();
}

function saveSettings() {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
}

function toggleSetting(element, settingName) {
    const isActive = element.classList.contains('active');
    settings[settingName] = !isActive;
    
    if (isActive) {
        element.classList.remove('active');
    } else {
        element.classList.add('active');
    }
    
    saveSettings();
}

function updateToggleUI(settingName, value) {
    const toggles = document.querySelectorAll('.toggle-switch');
    // This is a simplified approach - in a real app, you'd have better element identification
}

function updateSetting(settingName, value) {
    settings[settingName] = value;
    saveSettings();
}

function changeTheme(theme) {
    settings.theme = theme;
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
    
    localStorage.setItem('theme', theme);
    saveSettings();
}

function updateFontSize(size) {
    settings.fontSize = parseInt(size);
    document.getElementById('fontSizeValue').textContent = size + 'px';
    document.documentElement.style.fontSize = size + 'px';
    saveSettings();
}

function updateProfile() {
    const stats = JSON.parse(localStorage.getItem('numberGameStats') || '{}');
    const name = settings.displayName || 'NumberMind Player';
    
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileAvatar').textContent = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    
    const gamesPlayed = stats.gamesPlayed || 0;
    const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
    document.getElementById('profileStats').textContent = `${gamesPlayed} games played • ${winRate}% win rate`;
}

function exportData() {
    const data = {
        settings: settings,
        stats: JSON.parse(localStorage.getItem('numberGameStats') || '{}'),
        history: JSON.parse(localStorage.getItem('numberGameHistory') || '[]')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'numbermind-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.settings) {
                        settings = { ...settings, ...data.settings };
                        localStorage.setItem('gameSettings', JSON.stringify(settings));
                    }
                    if (data.stats) {
                        localStorage.setItem('numberGameStats', JSON.stringify(data.stats));
                    }
                    if (data.history) {
                        localStorage.setItem('numberGameHistory', JSON.stringify(data.history));
                    }
                    alert('Data imported successfully!');
                    loadSettings();
                } catch (error) {
                    alert('Error importing data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        localStorage.removeItem('gameSettings');
        localStorage.removeItem('numberGameStats');
        localStorage.removeItem('numberGameHistory');
        localStorage.removeItem('theme');
        alert('All data has been cleared!');
        location.reload();
    }
}

function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
    document.getElementById('themeSelect').value = newTheme;
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || settings.theme;
    const root = document.documentElement;
    root.setAttribute('data-theme', savedTheme);
    
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

// Update display name when changed
document.getElementById('displayName').addEventListener('input', function(e) {
    settings.displayName = e.target.value;
    saveSettings();
    updateProfile();
});

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadSettings();
});