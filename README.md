# NumberMind 🧠

**The Ultimate Number Guessing Game Experience**

NumberMind is a sophisticated, feature-rich number guessing game that combines strategy, logic, and intuition in an engaging web-based experience. More than just a simple guessing game, NumberMind offers multiple difficulty levels, intelligent hints, comprehensive statistics tracking, and a beautiful modern interface.

<img width="1864" height="695" alt="image" src="https://github.com/user-attachments/assets/bd5e0e07-d862-4a0b-8fcc-ebd5f0de2a1f" />


## 🎮 Features

### Core Gameplay
- **Multiple Difficulty Levels**: Choose from Easy (1-50), Medium (1-100), Hard (1-200), or Expert (1-500)
- **Smart Hint System**: Strategic hints including range narrowing, parity clues, and proximity feedback
- **Adaptive Feedback**: Real-time visual and textual feedback with hot/cold proximity indicators
- **Progress Tracking**: Visual progress bars and attempt counters

### Advanced Features
- **Comprehensive Statistics**: Track games played, win rates, best scores, and winning streaks
- **Local Leaderboards**: Compete against your own records with persistent localStorage rankings
- **Achievement System**: Unlock achievements and track personal milestones
- **Game History**: Review your last 10 games with detailed performance data
- **Theme Support**: Beautiful dark and light themes with smooth transitions

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Interface**: Clean, professional design with smooth animations
- **Celebration Effects**: Confetti animations and visual feedback for victories
- **Keyboard Support**: Play using Enter key for quick gameplay
- **Persistent Data**: All progress and settings saved locally

## 🚀 Getting Started

### Quick Start
1. Open `index.html` to see the landing page and features overview
2. Click "Start Playing" or navigate to `game.html` to begin playing
3. Choose your difficulty level and start guessing!

### File Structure
\`\`\`
NumberMind/
├── game.html          # Main game interface
├── index.html           # Landing page with features showcase
├── statistics.html     # Detailed statistics dashboard
├── leaderboard.html    # Rankings and leaderboards
├── settings.html       # Game settings and preferences
└── README.md          # This file
\`\`\`

## 🎯 How to Play

1. **Choose Difficulty**: Select from Easy, Medium, Hard, or Expert modes
2. **Make Your Guess**: Enter a number within the specified range
3. **Use Hints Wisely**: Each difficulty provides limited strategic hints:
   - **Range Hint**: Narrows down the search area
   - **Parity Hint**: Reveals if the number is even or odd
   - **Proximity Hint**: Indicates how close your last guess was
4. **Track Progress**: Monitor your attempts and remaining chances
5. **Celebrate Victory**: Enjoy the celebration effects when you win!

## 📊 Game Modes

| Difficulty | Range | Max Attempts | Hints Available |
|------------|-------|--------------|-----------------|
| Easy       | 1-50  | 10           | 3               |
| Medium     | 1-100 | 12           | 2               |
| Hard       | 1-200 | 15           | 1               |
| Expert     | 1-500 | 20           | 0               |

## 🏆 Statistics & Achievements

### Tracked Statistics
- **Games Played**: Total number of games completed
- **Win Rate**: Percentage of games won
- **Best Scores**: Lowest attempts needed per difficulty
- **Current Streak**: Consecutive wins
- **Game History**: Last 10 games with detailed results

### Leaderboard System
- **Local Rankings**: Compete against your own records
- **Difficulty-Based**: Separate leaderboards for each difficulty level
- **Performance Metrics**: Ranked by attempts, with win rate as tiebreaker
- **Persistent Storage**: All data saved locally using localStorage

## 🎨 Themes & Customization

### Available Themes
- **Dark Theme**: Modern dark interface with gradient backgrounds
- **Light Theme**: Clean light interface for daytime play
- **Auto-Save**: Theme preference automatically saved

### Visual Features
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Polished hover effects and transitions
- **Responsive Layout**: Adapts to any screen size
- **Celebration Effects**: Confetti animations for victories

## 💾 Data Storage

NumberMind uses browser localStorage to persist:
- Game statistics and performance metrics
- Leaderboard rankings and personal bests
- Theme preferences and settings
- Game history and achievement progress

**Note**: Data is stored locally in your browser and is not shared externally.

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No external dependencies, pure ES6+ code
- **localStorage API**: Client-side data persistence
- **Responsive Design**: Mobile-first approach with CSS Grid

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- **Lightweight**: No external libraries or frameworks
- **Fast Loading**: Optimized CSS and JavaScript
- **Smooth Animations**: Hardware-accelerated transitions
- **Efficient Storage**: Minimal localStorage usage

## 🎮 Game Strategy Tips

### For Beginners
1. Start with Easy mode to learn the mechanics
2. Use the binary search strategy (guess the middle number)
3. Pay attention to the hot/cold feedback
4. Save hints for when you're really stuck

### For Advanced Players
1. Try Expert mode for the ultimate challenge
2. Aim for single-digit attempt counts
3. Track your improvement over time
4. Compete for the top leaderboard positions

## 🔧 Customization

### Adding New Difficulty Levels
The game is designed to be easily extensible. To add new difficulty levels:

1. Update the `difficulties` object in the JavaScript
2. Add corresponding UI elements
3. Update the statistics tracking system

### Modifying Hint System
The hint system can be expanded with new hint types by:
1. Adding new hint functions
2. Updating the UI to display new hint options
3. Modifying the hint usage tracking

## 📱 Mobile Experience

NumberMind is fully optimized for mobile devices:
- **Touch-Friendly**: Large buttons and input areas
- **Responsive Layout**: Adapts to portrait and landscape orientations
- **Optimized Performance**: Smooth animations on mobile devices
- **Accessible**: Proper contrast ratios and readable text sizes

## 🎯 Future Enhancements

Potential features for future versions:
- **Multiplayer Mode**: Compete against friends in real-time
- **Daily Challenges**: Special game modes with unique rules
- **Sound Effects**: Audio feedback for actions and victories
- **Export Statistics**: Share your achievements and progress
- **Custom Ranges**: Player-defined difficulty levels

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs or suggest features
- Improve the user interface
- Add new game modes or features
- Optimize performance

## 📞 Support

If you encounter any issues or have questions:
1. Check the game settings for troubleshooting options
2. Clear your browser's localStorage to reset all data
3. Ensure JavaScript is enabled in your browser

---

**Enjoy playing NumberMind!** 🎮✨

*Challenge your mind, track your progress, and master the art of number guessing.*
