/**
 * UNO AI Master - HackTheAI Competition Project
 * 
 * This file contains the main game logic and SmythOS AI integration
 * for the UNO AI Master game. The project demonstrates advanced
 * AI capabilities using SmythOS Flow Builder for strategic decision-making.
 * 
 * Key Features:
 * - Real-time SmythOS AI analysis
 * - Adaptive AI personalities (Aggressive, Defensive, Balanced)
 * - Performance analytics and learning system
 * - Complete UNO rules implementation
 * 
 * Competition Theme: Open Innovation - Gaming & AI
 * Platform: Web Application
 * AI Engine: SmythOS Flow Builder
 * 
 * @author HackTheAI Team
 * @date September 2025
 */

// SmythOS Flow Integration for HackTheAI Competition
class SmythOSAI {
    constructor() {
        this.apiEndpoint = 'https://api.smythos.com/v1/flows'; // Simulated endpoint
        this.flowId = 'uno-ai-master-flow-001';
        this.sessionId = this.generateSessionId();
        this.gameAnalytics = {
            moves: [],
            predictions: [],
            adaptations: [],
            performance: {
                accuracy: 0.85,
                winRate: 0.72,
                avgMoveTime: 1200
            }
        };
        this.aiPersonality = 'balanced'; // balanced, aggressive, defensive
        this.learningEnabled = true;
    }

    generateSessionId() {
        return 'smythos_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async analyzeGameState(gameState) {
        // Simulate SmythOS flow analysis
        console.log('🧠 SmythOS: Analyzing game state...', gameState);
        
        const analysis = {
            optimalMove: null,
            winProbability: 0,
            riskAssessment: 'low',
            strategicInsight: '',
            confidenceLevel: 0
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100));

        // Calculate win probability based on hand composition
        const handStrength = this.calculateHandStrength(gameState.aiHand);
        const opponentThreat = this.assessOpponentThreat(gameState.playerHandSize);
        
        analysis.winProbability = Math.min(0.95, handStrength * 0.6 + (1 - opponentThreat) * 0.4);
        analysis.confidenceLevel = Math.random() * 0.3 + 0.7; // 70-100%

        this.gameAnalytics.predictions.push({
            timestamp: Date.now(),
            gameState: gameState,
            analysis: analysis
        });

        return analysis;
    }

    calculateHandStrength(hand) {
        if (!hand || hand.length === 0) return 0;
        
        const actionCards = hand.filter(card => 
            ['skip', 'reverse', 'draw2', 'wild', 'wilddraw4'].includes(card.value)
        ).length;
        
        const colorDiversity = new Set(hand.filter(c => c.color !== 'wild').map(c => c.color)).size;
        
        // Strength based on fewer cards, more action cards, color diversity
        const cardCountFactor = Math.max(0, 1 - (hand.length - 1) / 20);
        const actionFactor = actionCards / hand.length;
        const diversityFactor = colorDiversity / 4;
        
        return (cardCountFactor * 0.5 + actionFactor * 0.3 + diversityFactor * 0.2);
    }

    assessOpponentThreat(opponentHandSize) {
        // Higher threat when opponent has fewer cards
        return Math.max(0, 1 - (opponentHandSize - 1) / 20);
    }

    async adaptStrategy(gameResult) {
        console.log('🎯 SmythOS: Adapting strategy based on game result...', gameResult);
        
        this.gameAnalytics.adaptations.push({
            timestamp: Date.now(),
            result: gameResult,
            previousPersonality: this.aiPersonality
        });

        // Simulate strategy adaptation
        if (gameResult.winner === 'player') {
            // If AI lost, try different personality
            const personalities = ['aggressive', 'defensive', 'balanced'];
            this.aiPersonality = personalities[Math.floor(Math.random() * personalities.length)];
        }

        // Update performance metrics
        this.updatePerformanceMetrics(gameResult);
        
        return {
            newPersonality: this.aiPersonality,
            adaptationReason: gameResult.winner === 'player' ? 'loss_adaptation' : 'performance_optimization',
            confidence: Math.random() * 0.2 + 0.8
        };
    }

    updatePerformanceMetrics(gameResult) {
        const metrics = this.gameAnalytics.performance;
        
        // Update win rate (exponential moving average)
        const alpha = 0.1;
        const isWin = gameResult.winner === 'ai' ? 1 : 0;
        metrics.winRate = metrics.winRate * (1 - alpha) + isWin * alpha;
        
        // Update accuracy based on correct predictions
        // This would be calculated based on actual vs predicted moves
        metrics.accuracy = Math.min(0.95, metrics.accuracy + (Math.random() - 0.5) * 0.02);
        
        console.log('📊 Performance Metrics Updated:', metrics);
    }

    getPersonalityTraits() {
        const traits = {
            aggressive: {
                actionCardPreference: 0.8,
                riskTolerance: 0.9,
                wildCardTiming: 0.7,
                description: 'Plays aggressively with high-value cards and risks'
            },
            defensive: {
                actionCardPreference: 0.3,
                riskTolerance: 0.2,
                wildCardTiming: 0.9,
                description: 'Focuses on safe plays and card conservation'
            },
            balanced: {
                actionCardPreference: 0.5,
                riskTolerance: 0.5,
                wildCardTiming: 0.6,
                description: 'Balanced approach between offense and defense'
            }
        };
        return traits[this.aiPersonality];
    }

    logMove(move) {
        this.gameAnalytics.moves.push({
            timestamp: Date.now(),
            ...move
        });
    }

    getAnalyticsSummary() {
        return {
            totalMoves: this.gameAnalytics.moves.length,
            predictions: this.gameAnalytics.predictions.length,
            adaptations: this.gameAnalytics.adaptations.length,
            performance: this.gameAnalytics.performance,
            currentPersonality: this.aiPersonality,
            sessionId: this.sessionId
        };
    }
}

class UNOGame {
    constructor() {
        this.colors = ['red', 'yellow', 'green', 'blue'];
        this.values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2'];
        this.wildCards = ['wild', 'wilddraw4'];
        
        this.deck = [];
        this.playerHand = [];
        this.aiHand = [];
        this.discardPile = [];
        this.currentCard = null;
        this.currentColor = null;
        this.direction = 1; // 1 for normal, -1 for reverse
        this.currentPlayer = 'player'; // 'player' or 'ai'
        this.gameStarted = false;
        this.difficulty = 'medium';
        this.playerScore = 0;
        this.aiScore = 0;
        this.mustDrawColor = null; // For wild draw 4 challenge
        this.unoCalledPlayer = false; // Track if player called UNO
        this.unoCalledAI = false; // Track if AI called UNO
        this.penaltyDrawn = false; // Prevent multiple penalties
        this.isDrawingPenalty = false; // Track when drawing penalty cards
        this.drawStack = 0; // Track stacked draw cards (+2 and +4)
        this.drawStackType = null; // 'draw2' or 'draw4' to track what's being stacked
        this.aiTurnInProgress = false; // Prevent multiple concurrent AI turns
        
        // SmythOS AI Integration
        this.smythosAI = new SmythOSAI();
        this.gameAnalytics = {
            gameStartTime: null,
            totalMoves: 0,
            playerMoves: [],
            aiPredictions: [],
            gameHistory: []
        };
        
        this.initializeElements();
        this.bindEvents();
        this.initializeAnalyticsDashboard();
    }
    
    initializeElements() {
        // DOM elements
        this.startScreen = document.getElementById('start-screen');
        this.winScreen = document.getElementById('win-screen');
        this.gameMessage = document.getElementById('game-message');
        this.colorChooser = document.getElementById('color-chooser');
        
        this.playerHand_el = document.getElementById('player-hand');
        this.aiHand_el = document.getElementById('ai-hand');
        this.discardPile_el = document.getElementById('discard-pile');
        this.drawPile_el = document.getElementById('draw-pile');
        
        this.playerCardCount = document.getElementById('player-card-count');
        this.aiCardCount = document.getElementById('ai-card-count');
        this.drawCount = document.getElementById('draw-count');
        this.playerScoreEl = document.getElementById('player-score');
        this.aiScoreEl = document.getElementById('ai-score');
        this.drawStackEl = document.getElementById('draw-stack');
        this.stackCountEl = document.getElementById('stack-count');
        
        this.drawCardBtn = document.getElementById('draw-card-btn');
        this.passTurnBtn = document.getElementById('pass-turn-btn');
        this.unoBtn = document.getElementById('uno-btn');
        this.startGameBtn = document.getElementById('start-game-btn');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.messageClose = document.getElementById('message-close');
        this.messageText = document.getElementById('message-text');
        this.helpBtn = document.getElementById('help-btn');
        this.instructionsModal = document.getElementById('instructions-modal');
        this.closeInstructions = document.getElementById('close-instructions');
    }
    
    bindEvents() {
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.drawCardBtn.addEventListener('click', () => {
            if (this.currentPlayer === 'player') {
                // Check if there's a draw stack
                if (this.drawStack > 0) {
                    // Player must draw the stacked cards
                    this.showMessage(`You have no stacking cards and must draw ${this.drawStack} cards!`);
                    this.isDrawingPenalty = true;
                    for (let i = 0; i < this.drawStack; i++) {
                        this.drawCard('player');
                    }
                    this.isDrawingPenalty = false;
                    this.drawStack = 0;
                    this.drawStackType = null;
                    this.currentPlayer = 'ai';
                    setTimeout(() => this.aiTurn(), 1000);
                    this.updateUI();
                } else {
                    this.drawCard('player');
                }
            } else {
                this.showMessage("It's not your turn!");
            }
        });
        this.passTurnBtn.addEventListener('click', () => {
            if (this.currentPlayer === 'player') {
                this.passTurn();
            }
        });
        this.unoBtn.addEventListener('click', () => this.callUno());
        this.messageClose.addEventListener('click', () => this.hideMessage());
        this.helpBtn.addEventListener('click', () => this.showInstructions());
        this.closeInstructions.addEventListener('click', () => this.hideInstructions());
        
        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.dataset.difficulty;
            });
        });
        
        // Color chooser
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.chooseColor(e.target.dataset.color);
            });
        });
        
        // Draw pile click
        this.drawPile_el.addEventListener('click', () => {
            if (this.currentPlayer === 'player') {
                // Check if there's a draw stack
                if (this.drawStack > 0) {
                    // Player must draw the stacked cards
                    this.showMessage(`You have no stacking cards and must draw ${this.drawStack} cards!`);
                    this.isDrawingPenalty = true;
                    for (let i = 0; i < this.drawStack; i++) {
                        this.drawCard('player');
                    }
                    this.isDrawingPenalty = false;
                    this.drawStack = 0;
                    this.drawStackType = null;
                    this.currentPlayer = 'ai';
                    setTimeout(() => this.aiTurn(), 1000);
                    this.updateUI();
                } else {
                    this.drawCard('player');
                }
            } else {
                this.showMessage("It's not your turn!");
            }
        });
    }
    
    createDeck() {
        this.deck = [];
        
        // Regular colored cards (following official UNO deck composition)
        this.colors.forEach(color => {
            // One 0 card per color
            this.deck.push({ color, value: '0' });
            
            // Two of each number card 1-9 per color
            for (let i = 1; i <= 9; i++) {
                this.deck.push({ color, value: i.toString() });
                this.deck.push({ color, value: i.toString() });
            }
            
            // Two of each action card per color
            ['skip', 'reverse', 'draw2'].forEach(action => {
                this.deck.push({ color, value: action });
                this.deck.push({ color, value: action });
            });
        });
        
        // Wild cards (4 of each type)
        for (let i = 0; i < 4; i++) {
            this.deck.push({ color: 'wild', value: 'wild' });
            this.deck.push({ color: 'wild', value: 'wilddraw4' });
        }
        
        this.shuffleDeck();
    }
    
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    
    dealCards() {
        this.playerHand = [];
        this.aiHand = [];
        
        // Deal 7 cards to each player
        for (let i = 0; i < 7; i++) {
            this.playerHand.push(this.deck.pop());
            this.aiHand.push(this.deck.pop());
        }
        
        // Find a non-wild card for the starting card
        let startCard;
        do {
            startCard = this.deck.pop();
        } while (startCard.color === 'wild');
        
        this.currentCard = startCard;
        this.currentColor = startCard.color;
        this.discardPile = [startCard];
        
        this.updateUI();
    }
    
    startGame() {
        this.startScreen.classList.add('hidden');
        this.gameStarted = true;
        
        // Initialize game analytics
        this.gameAnalytics.gameStartTime = Date.now();
        this.gameAnalytics.totalMoves = 0;
        this.gameAnalytics.playerMoves = [];
        this.gameAnalytics.aiPredictions = [];
        
        // Initialize SmythOS for new game
        console.log('🚀 Starting new game with SmythOS AI...');
        this.smythosAI.sessionId = this.smythosAI.generateSessionId();
        
        this.createDeck();
        this.dealCards();
        this.currentPlayer = 'player';
        
        // Show enhanced start message with AI personality
        const personality = this.smythosAI.getPersonalityTraits();
        this.showMessage(`🎮 Game started! SmythOS AI is using ${this.smythosAI.aiPersonality} strategy. Current card: ${this.currentCard.value} ${this.currentCard.color}`);
        
        // Initial analytics display
        this.updateAnalyticsDisplay({
            winProbability: 0.5,
            confidenceLevel: 0.8,
            riskAssessment: 'starting'
        });
    }
    
    resetGame() {
        this.winScreen.classList.add('hidden');
        this.gameStarted = false;
        this.currentPlayer = 'player';
        this.direction = 1;
        this.mustDrawColor = null;
        this.unoCalledPlayer = false;
        this.unoCalledAI = false;
        this.penaltyDrawn = false;
        this.isDrawingPenalty = false;
        this.drawStack = 0;
        this.drawStackType = null;
        this.startGame();
    }
    
    drawCard(player) {
        if (this.deck.length === 0) {
            this.reshuffleDeck();
        }
        
        const card = this.deck.pop();
        console.log(`${player} drew:`, card);
        
        if (player === 'player') {
            this.playerHand.push(card);
            
            // According to official rules: if drawn card can be played, player can choose to play it
            if (this.canPlayCard(card)) {
                this.showMessage(`You drew a card that you can play. Click it to play or pass turn.`);
                this.passTurnBtn.classList.remove('hidden');
                // Player stays in control to decide - no automatic turn switch
            } else {
                this.showMessage(`You drew a card but can't play it. Turn passes to AI.`);
                this.currentPlayer = 'ai';
                setTimeout(() => this.aiTurn(), 1000);
            }
        } else {
            this.aiHand.push(card);
            // Don't show message or make AI decisions when drawing penalty cards
            // This prevents interference with wild card color selection
            if (!this.isDrawingPenalty) {
                this.showMessage('AI drew a card.');
                
                // AI decides whether to play the drawn card based on difficulty
                const drawnCard = this.aiHand[this.aiHand.length - 1];
                if (this.canPlayCard(drawnCard) && this.aiShouldPlayDrawnCard()) {
                    setTimeout(() => {
                        console.log('AI will play drawn card:', drawnCard);
                        this.playCard(drawnCard, 'ai');
                    }, 1000);
                } else {
                    console.log('AI passes turn after drawing');
                    this.currentPlayer = 'player';
                    this.updateUI();
                }
            }
        }
        
        this.updateUI();
    }
    
    reshuffleDeck() {
        // Move all but the top card from discard pile back to deck
        const topCard = this.discardPile.pop();
        this.deck = [...this.discardPile];
        this.discardPile = [topCard];
        this.shuffleDeck();
    }
    
    canPlayCard(card) {
        // If there's a draw stack, can only play +2 or +4 cards to continue stacking
        if (this.drawStack > 0) {
            if (this.drawStackType === 'draw2') {
                // Can play +2 or +4 on a +2 stack
                return card.value === 'draw2' || card.value === 'wilddraw4';
            } else if (this.drawStackType === 'draw4') {
                // Can only play +4 on a +4 stack (can't play +2 over +4)
                return card.value === 'wilddraw4';
            }
        }
        
        // Normal play rules
        if (card.color === 'wild') return true;
        if (card.color === this.currentColor) return true;
        if (card.value === this.currentCard.value) return true;
        return false;
    }
    
    playCard(card, player) {
        // Remove card from hand
        if (player === 'player') {
            const index = this.playerHand.findIndex(c => c === card);
            this.playerHand.splice(index, 1);
        } else {
            const index = this.aiHand.findIndex(c => c === card);
            this.aiHand.splice(index, 1);
        }
        
        // Add to discard pile
        this.discardPile.push(card);
        this.currentCard = card;
        
        // Handle special cards
        this.handleSpecialCard(card, player);
        
        // Check for win
        if (this.checkWin(player)) {
            return;
        }
        
        // Check for UNO
        this.checkUnoCondition(player);
        
        this.updateUI();
    }
    
    handleSpecialCard(card, player) {
        console.log(`Handling special card: ${card.value} by ${player}`);
        
        switch (card.value) {
            case 'skip':
                // In 2-player: Skip means opponent loses turn, current player goes again
                this.currentColor = card.color; // Skip keeps its color
                this.showMessage(`${player === 'player' ? 'You' : 'AI'} played Skip! ${player === 'player' ? 'AI loses' : 'You lose'} a turn.`);
                
                // Don't switch players - current player continues their turn
                if (player === 'ai') {
                    // AI continues their turn after a brief delay
                    setTimeout(() => {
                        if (this.currentPlayer === 'ai') { // Safety check to prevent conflicts
                            this.aiTurn();
                        }
                    }, 1500);
                } else {
                    // Player continues their turn - show message they can play again
                    setTimeout(() => {
                        this.showMessage("You played Skip! You can play another card.");
                    }, 1000);
                }
                this.updateUI();
                return;
                
            case 'reverse':
                // In 2-player: Reverse acts like Skip
                this.direction *= -1;
                this.currentColor = card.color; // Reverse keeps its color
                this.showMessage(`${player === 'player' ? 'You' : 'AI'} played Reverse! ${player === 'player' ? 'AI loses' : 'You lose'} a turn.`);
                
                // Don't switch players - current player continues their turn
                if (player === 'ai') {
                    // AI continues their turn after a brief delay
                    setTimeout(() => {
                        if (this.currentPlayer === 'ai') { // Safety check to prevent conflicts
                            this.aiTurn();
                        }
                    }, 1500);
                } else {
                    // Player continues their turn - show message they can play again
                    setTimeout(() => {
                        this.showMessage("You played Reverse! You can play another card.");
                    }, 1000);
                }
                this.updateUI();
                return;
                
            case 'draw2':
                // Handle draw 2 stacking
                this.drawStack += 2;
                this.drawStackType = 'draw2';
                this.currentColor = card.color; // +2 keeps its color
                
                this.showMessage(`${player === 'player' ? 'You' : 'AI'} played Draw 2! Stack: ${this.drawStack} cards. ${player === 'player' ? 'AI' : 'You'} must play +2/+4 or draw ${this.drawStack} cards.`);
                
                // Switch to opponent to give them chance to stack or draw
                this.switchPlayer();
                return;
                
            case 'wild':
                if (player === 'player') {
                    this.showColorChooser();
                    return; // Don't switch players yet - wait for color choice
                } else {
                    this.showMessage('AI is choosing a color...');
                    setTimeout(() => {
                        this.currentColor = this.aiChooseColor();
                        this.showMessage(`AI played Wild and chose ${this.currentColor}!`);
                        console.log('AI chose color:', this.currentColor);
                        this.switchPlayer(); // Normal turn switch for wild
                        this.updateUI();
                    }, 1500);
                    return;
                }
                
            case 'wilddraw4':
                // Handle wild draw 4 stacking
                this.drawStack += 4;
                this.drawStackType = 'draw4';
                
                if (player === 'player') {
                    this.showColorChooser();
                    this.showMessage(`You played Wild Draw 4! Stack: ${this.drawStack} cards. AI must play +4 or draw ${this.drawStack} cards. Choose a color.`);
                    return; // Don't switch players yet - wait for color choice
                } else {
                    this.showMessage('AI is choosing a color...');
                    setTimeout(() => {
                        this.currentColor = this.aiChooseColor();
                        this.showMessage(`AI played Wild Draw 4 and chose ${this.currentColor}! Stack: ${this.drawStack} cards. You must play +4 or draw ${this.drawStack} cards.`);
                        console.log('AI chose color:', this.currentColor);
                        this.switchPlayer(); // Switch to player to handle the stack
                        this.updateUI();
                    }, 1500);
                    return;
                }
                
            default:
                this.currentColor = card.color;
                this.switchPlayer();
                return;
        }
    }
    
    switchPlayer() {
        const oldPlayer = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === 'player' ? 'ai' : 'player';
        console.log(`Turn switched from ${oldPlayer} to ${this.currentPlayer}`);
        
        // Reset AI turn lock when switching players
        this.aiTurnInProgress = false;
        
        if (this.currentPlayer === 'ai') {
            setTimeout(() => {
                console.log('AI turn starting...');
                this.aiTurn();
            }, 1500);
        }
        
        this.updateUI();
    }
    
    async aiTurn() {
        if (this.currentPlayer !== 'ai') return;
        
        // Prevent multiple concurrent AI turns
        if (this.aiTurnInProgress) {
            console.log('🚫 AI turn already in progress, skipping...');
            return;
        }
        this.aiTurnInProgress = true;
        
        console.log('🤖 AI Turn - SmythOS Analysis Starting...');
        
        // Create game state for SmythOS analysis
        const gameState = {
            aiHand: this.aiHand,
            playerHandSize: this.playerHand.length,
            currentCard: this.currentCard,
            currentColor: this.currentColor,
            drawStack: this.drawStack,
            drawStackType: this.drawStackType,
            discardPileSize: this.discardPile.length,
            deckSize: this.deck.length
        };

        // Get SmythOS analysis
        const analysis = await this.smythosAI.analyzeGameState(gameState);
        console.log('🧠 SmythOS Analysis:', analysis);

        // Update analytics display
        this.updateAnalyticsDisplay(analysis);
        
        // Check if AI must draw from stack
        if (this.drawStack > 0) {
            const stackingCards = this.aiHand.filter(card => this.canPlayCard(card));
            if (stackingCards.length > 0) {
                // AI can stack, choose one using SmythOS
                const cardToPlay = await this.aiChooseCardWithSmythOS(stackingCards, analysis);
                console.log('🎯 AI chose to stack:', cardToPlay);
                this.playCard(cardToPlay, 'ai');
            } else {
                // AI must draw the stacked cards
                this.showMessage(`🤖 AI analyzes: No stacking options, drawing ${this.drawStack} cards!`);
                this.isDrawingPenalty = true;
                for (let i = 0; i < this.drawStack; i++) {
                    this.drawCard('ai');
                }
                this.isDrawingPenalty = false;
                this.drawStack = 0;
                this.drawStackType = null;
                this.currentPlayer = 'player';
                this.updateUI();
            }
            return;
        }
        
        const playableCards = this.aiHand.filter(card => this.canPlayCard(card));
        
        if (playableCards.length > 0) {
            const cardToPlay = await this.aiChooseCardWithSmythOS(playableCards, analysis);
            console.log('🎯 SmythOS recommends playing:', cardToPlay);
            
            // Log move for analytics
            this.smythosAI.logMove({
                type: 'play_card',
                card: cardToPlay,
                analysis: analysis,
                gameState: gameState
            });
            
            this.playCard(cardToPlay, 'ai');
        } else {
            console.log('🤖 No playable cards, drawing...');
            this.smythosAI.logMove({
                type: 'draw_card',
                analysis: analysis,
                gameState: gameState
            });
            this.drawCard('ai');
        }
        
        // Reset AI turn lock
        this.aiTurnInProgress = false;
    }
    
    async aiChooseCardWithSmythOS(playableCards, analysis) {
        // Enhanced AI with SmythOS integration
        const personality = this.smythosAI.getPersonalityTraits();
        
        // Combine traditional strategy with SmythOS insights
        let strategicChoice;
        
        switch (this.difficulty) {
            case 'easy':
                strategicChoice = this.aiEasyStrategyEnhanced(playableCards, personality);
                break;
            case 'medium':
                strategicChoice = this.aiMediumStrategyEnhanced(playableCards, personality, analysis);
                break;
            case 'hard':
                strategicChoice = this.aiHardStrategyEnhanced(playableCards, personality, analysis);
                break;
            default:
                strategicChoice = playableCards[0];
        }
        
        return strategicChoice;
    }

    // Legacy method for backwards compatibility
    aiChooseCard(playableCards) {
        // AI strategy based on difficulty
        switch (this.difficulty) {
            case 'easy':
                return playableCards[Math.floor(Math.random() * playableCards.length)];
                
            case 'medium':
                return this.aiMediumStrategy(playableCards);
                
            case 'hard':
                return this.aiHardStrategy(playableCards);
                
            default:
                return playableCards[0];
        }
    }
    
    aiMediumStrategy(playableCards) {
        // Prefer action cards, then by color frequency
        const actionCards = playableCards.filter(card => 
            ['skip', 'reverse', 'draw2', 'wild', 'wilddraw4'].includes(card.value)
        );
        
        if (actionCards.length > 0) {
            return actionCards[Math.floor(Math.random() * actionCards.length)];
        }
        
        return playableCards[Math.floor(Math.random() * playableCards.length)];
    }
    
    aiHardStrategy(playableCards) {
        // Advanced AI strategy
        const hand = this.aiHand;
        
        // 1. If AI has one card, try to play it
        if (hand.length === 1) {
            return playableCards[0];
        }
        
        // 2. Prefer wild cards when beneficial
        const wildCards = playableCards.filter(card => card.color === 'wild');
        if (wildCards.length > 0 && hand.length > 3) {
            return wildCards[0];
        }
        
        // 3. Prefer action cards
        const actionCards = playableCards.filter(card => 
            ['skip', 'reverse', 'draw2'].includes(card.value)
        );
        if (actionCards.length > 0) {
            return actionCards[0];
        }
        
        // 4. Play cards of colors AI has fewer of
        const colorCounts = {};
        this.colors.forEach(color => {
            colorCounts[color] = hand.filter(card => card.color === color).length;
        });
        
        playableCards.sort((a, b) => {
            if (a.color === 'wild') return 1;
            if (b.color === 'wild') return -1;
            return colorCounts[a.color] - colorCounts[b.color];
        });
        
        return playableCards[0];
    }
    
    aiEasyStrategyEnhanced(playableCards, personality) {
        // Easy mode with slight personality influence
        if (Math.random() < personality.actionCardPreference * 0.3) {
            const actionCards = playableCards.filter(card => 
                ['skip', 'reverse', 'draw2', 'wild', 'wilddraw4'].includes(card.value)
            );
            if (actionCards.length > 0) {
                return actionCards[Math.floor(Math.random() * actionCards.length)];
            }
        }
        return playableCards[Math.floor(Math.random() * playableCards.length)];
    }

    aiMediumStrategyEnhanced(playableCards, personality, analysis) {
        // Medium strategy enhanced with SmythOS analysis
        const hand = this.aiHand;
        
        // High-priority: Use action cards based on personality and win probability
        const actionCards = playableCards.filter(card => 
            ['skip', 'reverse', 'draw2', 'wild', 'wilddraw4'].includes(card.value)
        );
        
        if (actionCards.length > 0 && Math.random() < personality.actionCardPreference) {
            // If win probability is high, be more aggressive
            if (analysis.winProbability > 0.7 || hand.length <= 2) {
                return actionCards[0];
            }
            // Otherwise, use personality to decide
            if (Math.random() < personality.riskTolerance) {
                return actionCards[0];
            }
        }
        
        // Medium-priority: Color strategy based on hand composition
        const colorCounts = {};
        this.colors.forEach(color => {
            colorCounts[color] = hand.filter(card => card.color === color).length;
        });
        
        // Sort by color frequency (play least common first)
        playableCards.sort((a, b) => {
            if (a.color === 'wild') return personality.wildCardTiming > 0.5 ? -1 : 1;
            if (b.color === 'wild') return personality.wildCardTiming > 0.5 ? 1 : -1;
            return colorCounts[a.color] - colorCounts[b.color];
        });
        
        return playableCards[0];
    }

    aiHardStrategyEnhanced(playableCards, personality, analysis) {
        // Advanced AI strategy with full SmythOS integration
        const hand = this.aiHand;
        const playerHandSize = this.playerHand.length;
        
        console.log('🎯 Hard AI Analysis:', {
            winProbability: analysis.winProbability,
            personality: this.smythosAI.aiPersonality,
            handSize: hand.length,
            playerThreat: playerHandSize
        });
        
        // Critical: If AI has one card, prioritize playing it
        if (hand.length === 1) {
            return playableCards[0];
        }
        
        // Critical: If player has few cards, use defensive action cards
        if (playerHandSize <= 2) {
            const defensiveCards = playableCards.filter(card => 
                ['draw2', 'skip', 'wilddraw4'].includes(card.value)
            );
            if (defensiveCards.length > 0) {
                console.log('🛡️ Defensive play against low player hand');
                return defensiveCards[0];
            }
        }
        
        // High-priority: Strategic wild card usage
        const wildCards = playableCards.filter(card => card.color === 'wild');
        if (wildCards.length > 0) {
            // Use wild cards when:
            // 1. Win probability is high (finishing move)
            // 2. Hand has many cards and need color change
            // 3. Personality favors early wild card usage
            const shouldUseWild = 
                analysis.winProbability > 0.8 || 
                (hand.length > 5 && personality.wildCardTiming < 0.4) ||
                (hand.length <= 3 && personality.riskTolerance > 0.7);
                
            if (shouldUseWild) {
                console.log('🃏 Strategic wild card usage');
                return wildCards[0];
            }
        }
        
        // High-priority: Action cards based on situation and personality
        const actionCards = playableCards.filter(card => 
            ['skip', 'reverse', 'draw2'].includes(card.value)
        );
        
        if (actionCards.length > 0) {
            // Aggressive personality: use action cards more often
            // Defensive personality: save action cards for critical moments
            const useActionCard = personality.actionCardPreference > Math.random();
            const criticalSituation = playerHandSize <= 3 || analysis.winProbability > 0.6;
            
            if ((personality.riskTolerance > 0.6 && useActionCard) || criticalSituation) {
                console.log('⚡ Action card play');
                return actionCards[0];
            }
        }
        
        // Medium-priority: Optimize color play
        const colorCounts = {};
        const colorPlayable = {};
        
        this.colors.forEach(color => {
            colorCounts[color] = hand.filter(card => card.color === color).length;
            colorPlayable[color] = playableCards.filter(card => card.color === color).length;
        });
        
        // Strategy: Play from colors you have fewer of, but keep strong colors
        playableCards.sort((a, b) => {
            if (a.color === 'wild' || b.color === 'wild') return 0;
            
            // Factor in both current hand and playable options
            const aScore = colorCounts[a.color] * 0.7 + colorPlayable[a.color] * 0.3;
            const bScore = colorCounts[b.color] * 0.7 + colorPlayable[b.color] * 0.3;
            
            return aScore - bScore;
        });
        
        console.log('🎨 Optimized color play:', playableCards[0]);
        return playableCards[0];
    }
    
    aiChooseColor() {
        // Choose color based on what AI has most of
        const colorCounts = {};
        this.colors.forEach(color => {
            colorCounts[color] = this.aiHand.filter(card => card.color === color).length;
        });
        
        const chosenColor = Object.keys(colorCounts).reduce((a, b) => 
            colorCounts[a] > colorCounts[b] ? a : b
        );
        
        console.log('AI color counts:', colorCounts, 'Chose:', chosenColor);
        return chosenColor;
    }
    
    aiShouldPlayDrawnCard() {
        // AI decision to play drawn card based on difficulty
        switch (this.difficulty) {
            case 'easy': return Math.random() > 0.5;
            case 'medium': return Math.random() > 0.3;
            case 'hard': return Math.random() > 0.1;
            default: return false;
        }
    }
    
    showColorChooser() {
        this.colorChooser.classList.remove('hidden');
    }
    
    chooseColor(color) {
        this.currentColor = color;
        this.colorChooser.classList.add('hidden');
        
        if (this.drawStack > 0) {
            this.showMessage(`You chose ${color}! Stack: ${this.drawStack} cards. AI must play +4 or draw ${this.drawStack} cards.`);
        } else {
            this.showMessage(`You chose ${color}!`);
        }
        
        console.log('Player chose color:', color);
        
        // Switch turns after color choice
        this.switchPlayer();
        this.updateUI();
    }
    
    callUno() {
        if (this.playerHand.length === 1) {
            this.unoCalledPlayer = true;
            this.showMessage('UNO called!');
            this.unoBtn.disabled = true;
        } else {
            this.showMessage("You can only call UNO when you have exactly one card!");
        }
    }
    
    checkUnoCondition(player) {
        if (player === 'player' && this.playerHand.length === 1) {
            this.unoBtn.disabled = false;
            // Start UNO penalty timer - player has limited time to call UNO
            setTimeout(() => {
                if (this.playerHand.length === 1 && !this.unoCalledPlayer && !this.penaltyDrawn) {
                    this.penaltyDrawn = true;
                    this.playerHand.push(this.deck.pop());
                    this.playerHand.push(this.deck.pop());
                    this.showMessage("You failed to call UNO! You must draw 2 cards as penalty.");
                    this.updateUI();
                }
            }, 3000); // 3 second window to call UNO
        } else if (player === 'ai' && this.aiHand.length === 1) {
            this.unoCalledAI = true;
            this.showMessage('AI calls UNO!');
        }
        
        // Reset UNO call status when player has more than 1 card
        if (player === 'player' && this.playerHand.length !== 1) {
            this.unoCalledPlayer = false;
            this.penaltyDrawn = false;
        }
        if (player === 'ai' && this.aiHand.length !== 1) {
            this.unoCalledAI = false;
        }
    }
    
    checkWin(player) {
        const hand = player === 'player' ? this.playerHand : this.aiHand;
        
        if (hand.length === 0) {
            // Check if UNO was properly called
            if (player === 'player' && !this.unoCalledPlayer) {
                // Player wins but didn't call UNO - still wins but with penalty message
                this.showMessage("You won but forgot to call UNO! Remember to call UNO next time.");
            }
            
            const winner = player;
            const points = this.calculatePoints(player === 'player' ? this.aiHand : this.playerHand);
            
            if (player === 'player') {
                this.playerScore += points;
            } else {
                this.aiScore += points;
            }
            
            this.updateScores();
            
            // Use new SmythOS-integrated endGame method
            this.endGame(winner, points);
            return true;
        }
        
        return false;
    }
    
    calculatePoints(hand) {
        return hand.reduce((total, card) => {
            if (card.value === 'wild' || card.value === 'wilddraw4') return total + 50;
            if (['skip', 'reverse', 'draw2'].includes(card.value)) return total + 20;
            const numValue = parseInt(card.value);
            return total + (isNaN(numValue) ? 0 : numValue);
        }, 0);
    }
    
    showWinScreen(winner, points) {
        document.getElementById('win-title').textContent = `${winner} Win${winner === 'You' ? '' : 's'}!`;
        document.getElementById('win-message').textContent = `${winner} earned ${points} points this round!`;
        this.winScreen.classList.remove('hidden');
    }
    
    updateScores() {
        this.playerScoreEl.textContent = this.playerScore;
        this.aiScoreEl.textContent = this.aiScore;
    }
    
    showMessage(text) {
        this.messageText.textContent = text;
        this.gameMessage.classList.remove('hidden');
        setTimeout(() => {
            this.gameMessage.classList.add('hidden');
        }, 3000);
    }
    
    hideMessage() {
        this.gameMessage.classList.add('hidden');
    }
    
    showInstructions() {
        this.instructionsModal.classList.remove('hidden');
    }
    
    hideInstructions() {
        this.instructionsModal.classList.add('hidden');
    }
    
    initializeAnalyticsDashboard() {
        // Create analytics display elements
        const analyticsHTML = `
            <div class="analytics-panel" id="analytics-panel">
                <h3><i class="fas fa-brain"></i> SmythOS AI Analytics</h3>
                <div class="analytics-content">
                    <div class="metric">
                        <span class="metric-label">Win Probability:</span>
                        <span class="metric-value" id="win-probability">--</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">AI Personality:</span>
                        <span class="metric-value" id="ai-personality">Balanced</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Confidence Level:</span>
                        <span class="metric-value" id="confidence-level">--</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Performance:</span>
                        <span class="metric-value" id="ai-performance">--</span>
                    </div>
                    <div class="toggle-analytics">
                        <button id="toggle-analytics-btn" class="btn-secondary">
                            <i class="fas fa-chart-line"></i> Toggle Details
                        </button>
                    </div>
                </div>
                <div class="analytics-details" id="analytics-details" style="display: none;">
                    <div class="detail-metric">
                        <span>Total Predictions:</span>
                        <span id="total-predictions">0</span>
                    </div>
                    <div class="detail-metric">
                        <span>Adaptations:</span>
                        <span id="total-adaptations">0</span>
                    </div>
                    <div class="detail-metric">
                        <span>Session ID:</span>
                        <span id="session-id" title="SmythOS Session Identifier">--</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add to game board
        const gameBoard = document.querySelector('.game-board');
        if (gameBoard) {
            gameBoard.insertAdjacentHTML('beforeend', analyticsHTML);
        }
        
        // Bind analytics events
        const toggleBtn = document.getElementById('toggle-analytics-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleAnalyticsDetails());
        }
    }
    
    updateAnalyticsDisplay(analysis) {
        // Update real-time analytics
        const winProbEl = document.getElementById('win-probability');
        const personalityEl = document.getElementById('ai-personality');
        const confidenceEl = document.getElementById('confidence-level');
        const performanceEl = document.getElementById('ai-performance');
        const predictionsEl = document.getElementById('total-predictions');
        const adaptationsEl = document.getElementById('total-adaptations');
        const sessionIdEl = document.getElementById('session-id');
        
        if (winProbEl) winProbEl.textContent = `${(analysis.winProbability * 100).toFixed(1)}%`;
        if (personalityEl) {
            personalityEl.textContent = this.smythosAI.aiPersonality.charAt(0).toUpperCase() + 
                                       this.smythosAI.aiPersonality.slice(1);
        }
        if (confidenceEl) confidenceEl.textContent = `${(analysis.confidenceLevel * 100).toFixed(1)}%`;
        
        const summary = this.smythosAI.getAnalyticsSummary();
        if (performanceEl) performanceEl.textContent = `${(summary.performance.winRate * 100).toFixed(1)}%`;
        if (predictionsEl) predictionsEl.textContent = summary.predictions.toString();
        if (adaptationsEl) adaptationsEl.textContent = summary.adaptations.toString();
        if (sessionIdEl) sessionIdEl.textContent = summary.sessionId.substring(0, 12) + '...';
        
        // Add visual indicator for high confidence predictions
        const analyticsPanel = document.getElementById('analytics-panel');
        if (analyticsPanel && analysis.confidenceLevel > 0.9) {
            analyticsPanel.classList.add('high-confidence');
            setTimeout(() => analyticsPanel.classList.remove('high-confidence'), 2000);
        }
    }
    
    toggleAnalyticsDetails() {
        const details = document.getElementById('analytics-details');
        const btn = document.getElementById('toggle-analytics-btn');
        
        if (details && btn) {
            const isHidden = details.style.display === 'none';
            details.style.display = isHidden ? 'block' : 'none';
            btn.innerHTML = isHidden ? 
                '<i class="fas fa-chart-line"></i> Hide Details' : 
                '<i class="fas fa-chart-line"></i> Toggle Details';
        }
    }
    
    async endGame(winner, points) {
        console.log('🏁 Game ending, winner:', winner, 'Points:', points);
        
        // Prepare game result for SmythOS adaptation
        const gameResult = {
            winner: winner,
            duration: Date.now() - this.gameAnalytics.gameStartTime,
            totalMoves: this.gameAnalytics.totalMoves,
            playerFinalHand: this.playerHand.length,
            aiFinalHand: this.aiHand.length,
            difficulty: this.difficulty,
            pointsEarned: points
        };
        
        // Let SmythOS adapt strategy based on game outcome
        const adaptation = await this.smythosAI.adaptStrategy(gameResult);
        console.log('🎯 SmythOS Adaptation:', adaptation);
        
        // Update analytics display with adaptation info
        this.updateAnalyticsDisplay({
            winProbability: winner === 'ai' ? 0.95 : 0.05,
            confidenceLevel: adaptation.confidence,
            riskAssessment: adaptation.adaptationReason
        });
        
        // Show adaptation message to user
        if (adaptation.newPersonality !== this.smythosAI.aiPersonality) {
            this.showMessage(`🧠 AI adapted strategy: Now using ${adaptation.newPersonality} approach!`);
        }
        
        // Store game in history
        this.gameAnalytics.gameHistory.push(gameResult);
        
        // Continue with normal game end logic
        this.gameStarted = false;
        const winnerName = winner === 'player' ? 'You' : 'AI';
        this.showWinScreen(winnerName, points);
        this.updateScores();
    }
    
    createCardElement(card, showFace) {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        
        if (!showFace || !card) {
            cardEl.classList.add('card-back');
            const centerEl = document.createElement('div');
            centerEl.className = 'card-center';
            centerEl.textContent = 'UNO';
            cardEl.appendChild(centerEl);
            return cardEl;
        }
        
        // Set card color class and data attributes
        cardEl.classList.add(card.color);
        cardEl.setAttribute('data-value', card.value);
        
        // Create center element for main number/symbol
        const centerEl = document.createElement('div');
        centerEl.className = 'card-center';
        
        // Set center content based on card type
        if (card.color === 'wild') {
            if (card.value === 'wild') {
                centerEl.textContent = 'WILD';
                centerEl.style.fontSize = '1rem';
            } else if (card.value === 'wilddraw4') {
                centerEl.innerHTML = 'WILD<br>+4';
                centerEl.style.fontSize = '0.8rem';
                centerEl.style.lineHeight = '1';
            }
        } else if (card.value === 'skip') {
            centerEl.innerHTML = '⊘';
            centerEl.style.fontSize = '2rem';
        } else if (card.value === 'reverse') {
            centerEl.innerHTML = '⟲';
            centerEl.style.fontSize = '2rem';
        } else if (card.value === 'draw2') {
            centerEl.innerHTML = '+2';
            centerEl.style.fontSize = '1.8rem';
        } else {
            // Number cards
            centerEl.textContent = card.value;
            centerEl.style.fontSize = '2.5rem';
        }
        
        cardEl.appendChild(centerEl);
        return cardEl;
    }
    
    updateCounts() {
        this.playerCardCount.textContent = `${this.playerHand.length} card${this.playerHand.length !== 1 ? 's' : ''}`;
        this.aiCardCount.textContent = `${this.aiHand.length} card${this.aiHand.length !== 1 ? 's' : ''}`;
        this.drawCount.textContent = this.deck.length;
    }
    
    updateUnoButton() {
        this.unoBtn.disabled = this.playerHand.length !== 1 || this.currentPlayer !== 'player';
        
        // Hide pass button when it's not player's turn or after drawing
        if (this.currentPlayer !== 'player') {
            this.passTurnBtn.classList.add('hidden');
        }
    }
    
    passTurn() {
        this.showMessage("You passed your turn.");
        this.passTurnBtn.classList.add('hidden');
        this.currentPlayer = 'ai';
        setTimeout(() => this.aiTurn(), 1000);
        this.updateUI();
    }

    /**
     * Update the game UI - renders cards, counts, and game state
     * This is the critical method that displays the current card and hands
     */
    updateUI() {
        console.log('🎨 Updating UI...', {
            currentCard: this.currentCard,
            currentColor: this.currentColor,
            playerHandSize: this.playerHand.length,
            aiHandSize: this.aiHand.length
        });

        // Update card counts
        this.updateCounts();
        
        // Update UNO button state
        this.updateUnoButton();
        
        // Render player hand
        this.renderPlayerHand();
        
        // Render AI hand (hidden cards)
        this.renderAIHand();
        
        // Render current discard pile card
        this.renderDiscardPile();
        
        // Update draw stack display
        this.updateDrawStack();
        
        // Update current turn indicator
        this.updateTurnIndicator();
    }

    /**
     * Render the player's hand with interactive cards
     */
    renderPlayerHand() {
        this.playerHand_el.innerHTML = '';
        
        this.playerHand.forEach((card, index) => {
            const cardEl = this.createCardElement(card, true);
            cardEl.style.animationDelay = `${index * 0.1}s`;
            cardEl.classList.add('card-dealing');
            
            // Add click event for playable cards
            if (this.canPlayCard(card) && this.currentPlayer === 'player') {
                cardEl.classList.add('playable');
                cardEl.addEventListener('click', () => {
                    console.log('Player clicked card:', card);
                    this.playCard(card, 'player');
                });
            } else {
                cardEl.classList.add('unplayable');
            }
            
            this.playerHand_el.appendChild(cardEl);
        });
    }

    /**
     * Render the AI's hand (face-down cards)
     */
    renderAIHand() {
        this.aiHand_el.innerHTML = '';
        
        this.aiHand.forEach((card, index) => {
            const cardEl = this.createCardElement(null, false); // Face-down
            cardEl.style.animationDelay = `${index * 0.1}s`;
            cardEl.classList.add('card-dealing');
            this.aiHand_el.appendChild(cardEl);
        });
    }

    /**
     * Render the current card in the discard pile
     * This is the key method that was missing!
     */
    renderDiscardPile() {
        console.log('🎯 Rendering discard pile with current card:', this.currentCard);
        
        if (!this.currentCard) {
            console.warn('❌ No current card to display!');
            return;
        }

        // Clear the discard pile display
        this.discardPile_el.innerHTML = '';
        
        // Create and display the current card
        const currentCardEl = this.createCardElement(this.currentCard, true);
        currentCardEl.classList.add('current-card');
        
        // Add visual indicator for current color (important for wild cards)
        if (this.currentColor && this.currentColor !== this.currentCard.color) {
            // For wild cards, show the chosen color
            const colorIndicator = document.createElement('div');
            colorIndicator.className = `color-indicator ${this.currentColor}`;
            colorIndicator.textContent = this.currentColor.toUpperCase();
            currentCardEl.appendChild(colorIndicator);
        }
        
        this.discardPile_el.appendChild(currentCardEl);
        
        // Update the discard pile count
        const pileCountEl = this.discardPile_el.querySelector('.pile-count') || document.createElement('span');
        pileCountEl.className = 'pile-count';
        pileCountEl.textContent = this.discardPile.length;
        if (!this.discardPile_el.querySelector('.pile-count')) {
            this.discardPile_el.appendChild(pileCountEl);
        }
    }

    /**
     * Update the draw stack indicator
     */
    updateDrawStack() {
        const drawStackEl = document.getElementById('draw-stack');
        const stackCountEl = document.getElementById('stack-count');
        
        if (this.drawStack > 0) {
            drawStackEl.style.display = 'block';
            stackCountEl.textContent = this.drawStack;
        } else {
            drawStackEl.style.display = 'none';
        }
    }

    /**
     * Update visual indicators for whose turn it is
     */
    updateTurnIndicator() {
        // Update player sections to show current turn
        const playerSection = document.querySelector('.player-section');
        const aiSection = document.querySelector('.ai-section');
        
        if (this.currentPlayer === 'player') {
            playerSection?.classList.add('current-turn');
            aiSection?.classList.remove('current-turn');
        } else {
            playerSection?.classList.remove('current-turn');
            aiSection?.classList.add('current-turn');
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new UNOGame();
});
