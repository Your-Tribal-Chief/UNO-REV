# 🧠 UNO AI Master - HackTheAI Competition Project

A revolutionary AI-powered UNO card game featuring **SmythOS Flow Builder** integration for advanced strategic gameplay. Experience the future of AI gaming with adaptive intelligence, real-time analytics, and evolving gameplay strategies.

## 🏆 Competition Project - HackTheAI 2025
**Theme**: Open Innovation - Gaming & AI  
**Platform**: Web Application  
**AI Engine**: SmythOS Flow Builder  
**Innovation**: First adaptive AI personality system in UNO gaming

## 🧠 SmythOS AI Features

### Real-time Strategic Analysis
- **Game State Evaluation**: Continuous analysis of board position
- **Win Probability Calculation**: Dynamic success rate prediction  
- **Risk Assessment**: Strategic move evaluation
- **Confidence Scoring**: Decision certainty metrics

### Adaptive AI Personalities
- **Aggressive**: High-risk, offensive strategy focus
- **Defensive**: Conservative, card-preservation approach
- **Balanced**: Optimal mix of offense and defense strategies

### Learning & Evolution System
- **Performance Tracking**: Win rate and accuracy monitoring
- **Strategy Adaptation**: AI behavior modification based on outcomes
- **Session Analytics**: Comprehensive game data collection

## 🎮 Enhanced Game Features
- **Classic UNO Rules**: Complete implementation of traditional UNO card game rules
- **AI Opponent**: Play against intelligent AI with 3 difficulty levels (Easy, Medium, Hard)
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Score Tracking**: Keep track of your wins and points across multiple rounds
- **Full UNO Experience**: All special cards included (Skip, Reverse, Draw 2, Wild, Wild Draw 4)

### 🎯 Gameplay
- **7 Starting Cards**: Both you and AI start with 7 cards
- **Turn-Based Play**: Take turns playing cards that match color or number
- **Special Cards**: 
  - Skip: Skip opponent's turn
  - Reverse: Change direction of play
  - Draw 2: Opponent draws 2 cards and loses turn
  - Wild: Choose any color
  - Wild Draw 4: Choose color and opponent draws 4 cards
- **UNO Call**: Click "UNO!" when you have one card left
- **Winning**: First to play all cards wins and earns points

### 🤖 AI Difficulty Levels
1. **Easy**: Random card selection, basic strategy
2. **Medium**: Prefers action cards, moderate strategy
3. **Hard**: Advanced strategy considering hand composition and game state

### 🎨 UI Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Card dealing, playing, and hover effects
- **Color Chooser**: Interactive wild card color selection
- **Game Messages**: Clear feedback for all game events
- **Score Display**: Real-time score tracking in header

## How to Play

1. **Start Game**: Choose difficulty level and click "Start Game"
2. **Play Cards**: Click on cards in your hand that match the current card's color or number
3. **Draw Cards**: Click the deck or "Draw Card" button if you can't play
4. **Wild Cards**: Choose a color when playing wild cards
5. **UNO**: Click "UNO!" when you have one card left
6. **Win**: Play all your cards to win the round

## Technical Details

### Files Structure
```
UNO/
├── index.html      # Main HTML structure
├── styles.css      # Beautiful CSS styling and animations
├── script.js       # Complete game logic and AI
└── README.md       # This file
```

### Technologies Used
- **HTML5**: Semantic structure and game layout
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: Complete game logic, AI implementation, and DOM manipulation
- **Font Awesome**: Icons for better UX
- **Google Fonts**: Poppins font for modern typography

## Setup Instructions

1. **Download**: Clone or download all files to a folder
2. **Open**: Open `index.html` in any modern web browser
3. **Play**: No installation required - it's a pure web application!

### For Development
If you want to modify the game:

1. Edit `script.js` for game logic changes
2. Edit `styles.css` for visual changes
3. Edit `index.html` for structure changes
4. Refresh browser to see changes

## Game Rules (UNO Basics)

### Objective
Be the first player to play all cards from your hand.

### Card Types
- **Number Cards (0-9)**: Play on matching color or number
- **Skip**: Skip next player's turn
- **Reverse**: Reverse direction of play (in 2-player, acts like Skip)
- **Draw 2**: Next player draws 2 cards and loses turn
- **Wild**: Play anytime, choose next color
- **Wild Draw 4**: Play anytime, choose color, next player draws 4 cards

### Special Rules
- **UNO Call**: Must call "UNO" when playing second-to-last card
- **Going Out**: Play last card to win the round
- **Points**: Winner scores points based on cards left in opponent's hand
  - Number cards: Face value (0-9 points)
  - Action cards: 20 points each
  - Wild cards: 50 points each

## Customization

The game is designed to be easily customizable:

### Difficulty Adjustment
Modify the AI strategies in `script.js`:
- `aiEasyStrategy()`: Simple random selection
- `aiMediumStrategy()`: Prefers action cards
- `aiHardStrategy()`: Advanced multi-factor decision making

### Visual Customization
Edit `styles.css` to change:
- Color schemes
- Card designs
- Animations
- Layout and spacing

### Game Rules
Modify `script.js` to adjust:
- Starting hand size
- Point values
- Special card effects
- Win conditions

## Credits

Created with ❤️ for UNO enthusiasts who want to practice against AI opponents.

Enjoy playing UNO! 🎮

## 🚀 Competition Features

### SmythOS Integration
```javascript
// Real-time AI analysis
const analysis = await this.smythosAI.analyzeGameState(gameState);
console.log('Win Probability:', analysis.winProbability);
console.log('AI Confidence:', analysis.confidenceLevel);
```

### Analytics Dashboard
- **Live Performance Metrics**: Real-time AI statistics
- **Win Probability Tracking**: Dynamic success predictions
- **Strategy Adaptation**: AI personality evolution
- **Session Analytics**: Comprehensive game data

### Innovation Highlights
1. **First SmythOS-powered UNO game**: Unique AI integration approach
2. **Adaptive AI personalities**: Dynamic behavior modification
3. **Real-time analytics**: Live performance monitoring
4. **Educational transparency**: Visible AI decision-making process

## 🛠️ Installation & Setup

### Quick Start
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd UNO
   ```

2. Open `index.html` in a modern web browser:
   ```bash
   # Using Python (if available)
   python -m http.server 8000
   
   # Using Node.js (if available)  
   npx http-server
   
   # Or simply open index.html directly in your browser
   ```

3. Start playing against the SmythOS AI!

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📊 Competition Scoring Alignment

### UI/UX Design (20 points)
- Modern glassmorphism interface
- Responsive mobile-friendly design
- Intuitive one-click controls
- Real-time visual feedback

### Features (20 points)
- SmythOS AI integration
- Analytics dashboard
- Adaptive personalities  
- Official UNO rules implementation

### Innovation (20 points)
- First SmythOS UNO game
- AI transparency and education
- Adaptive learning system
- Real-time strategy analysis

### Code Quality (5 points)
- Clean, modular architecture
- Comprehensive documentation
- Error handling and logging
- Performance optimization

### SmythOS Usage (5 points)
- Strategic decision-making
- Real-time game analysis
- Performance adaptation
- Creative AI integration

## 🏆 HackTheAI Competition Details

### Project Requirements ✅
- [x] AI-based solution using SmythOS Flow Builder
- [x] Open innovation in gaming domain
- [x] Web platform implementation
- [x] Creative and unique approach
- [x] Well-documented codebase

### Judging Criteria Alignment
1. **UI/UX Prototype**: Modern, intuitive design with live demo
2. **ER Diagram**: Comprehensive database design (see DATABASE_DESIGN.md)
3. **Activity Diagram**: Clear workflow representation
4. **Feature Implementation**: Advanced AI integration
5. **Innovation & Uniqueness**: First-of-its-kind SmythOS gaming application

### Repository Access
Project shared with competition organizers:
- [@Ataullha](https://github.com/Ataullha)
- [@nurulhudaapon](https://github.com/nurulhudaapon)
- [@idontbyte69](https://github.com/idontbyte69)

## 📁 Project Structure
```
UNO/
├── index.html              # Main game interface
├── styles.css              # UI styles and animations
├── script.js               # Game logic and SmythOS integration
├── README.md               # Project documentation
├── README_COMPETITION.md   # Competition-specific details
├── DATABASE_DESIGN.md      # Database schema and ER diagram
└── HACKTHEAI_DOCUMENTATION.md # Comprehensive tech docs
```

## 🎯 Future Roadmap

### Phase 1 (Competition Ready)
- [x] SmythOS AI integration
- [x] Analytics dashboard
- [x] Adaptive personalities
- [x] Competition documentation

### Phase 2 (Post-Competition)
- [ ] Multiplayer support with AI analysis
- [ ] Tournament mode
- [ ] Advanced statistics
- [ ] AI coaching system

### Phase 3 (Long-term Vision)
- [ ] VR/AR integration
- [ ] Professional esports features
- [ ] Global competition platform
- [ ] Machine learning model improvements

---

**UNO AI Master** - Where Classic Gaming Meets Artificial Intelligence Innovation 🧠🎮
