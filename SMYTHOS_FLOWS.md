# SmythOS Flow Examples for UNO AI Master

## Flow 1: Strategic Game Analysis

### Flow Configuration
- **Flow Name**: `uno-ai-strategic-analysis`
- **Description**: Analyzes UNO game state and provides strategic insights
- **Input**: Game state object with AI hand, player info, current card
- **Output**: Win probability, risk assessment, strategic insights

### Flow Builder Steps

1. **Input Processor**
   - Parse incoming game state JSON
   - Validate data structure
   - Extract key metrics (hand size, card types, etc.)

2. **LLM Strategic Analyzer** 
   - **Model**: GPT-4 or Claude
   - **Prompt**: 
   ```
   You are an expert UNO strategist. Analyze this game state:
   - AI Hand: {aiHand}
   - Player Cards: {playerHandSize}
   - Current Card: {currentCard}
   - Current Color: {currentColor}
   - Draw Stack: {drawStack}
   
   Provide strategic analysis including:
   1. Win probability (0-1)
   2. Risk level (low/medium/high)
   3. Strategic insight (one sentence)
   4. Confidence level (0-1)
   
   Respond in JSON format.
   ```

3. **Risk Calculator**
   - Calculate opponent threat level
   - Assess hand strength
   - Determine optimal play style

4. **Output Formatter**
   - Structure response JSON
   - Add flow execution metadata
   - Return strategic recommendations

### Example Flow Output
```json
{
  "data": {
    "winProbability": 0.75,
    "riskLevel": "medium",
    "insight": "Strong hand with action cards, play aggressively",
    "confidence": 0.88,
    "recommendedStrategy": "offensive"
  },
  "flowExecutionId": "flow_12345",
  "timestamp": "2025-09-24T10:30:00Z"
}
```

## Flow 2: Card Recommendation Engine

### Flow Configuration
- **Flow Name**: `uno-ai-card-recommendation`
- **Description**: Recommends optimal card to play from available options
- **Input**: Playable cards array, game state, AI personality
- **Output**: Recommended card with reasoning

### Flow Builder Steps

1. **Card Analyzer**
   - Score each playable card
   - Consider strategic value
   - Factor in personality traits

2. **LLM Decision Maker**
   - **Model**: GPT-4
   - **Prompt**:
   ```
   As a UNO expert with {aiPersonality} personality, choose the best card:
   
   Playable Cards: {playableCards}
   Game Situation: {gameState}
   Win Probability: {winProbability}
   
   Consider:
   - Immediate tactical advantage
   - Long-term strategy
   - Opponent's likely responses
   - Personality traits ({personalityTraits})
   
   Return: cardValue, cardColor, reasoning, confidence
   ```

3. **Strategy Optimizer**
   - Apply personality weights
   - Consider game phase (early/mid/late)
   - Optimize for win conditions

4. **Recommendation Formatter**
   - Select best card
   - Generate human-readable reasoning
   - Calculate confidence score

### Example Flow Output
```json
{
  "data": {
    "cardValue": "skip",
    "cardColor": "red", 
    "reasoning": "Skip card denies opponent turn and maintains color advantage",
    "confidence": 0.92,
    "alternativeOptions": ["red_5", "wild"]
  },
  "flowExecutionId": "flow_67890",
  "timestamp": "2025-09-24T10:31:00Z"
}
```

## Flow 3: Adaptive Strategy Learning

### Flow Configuration
- **Flow Name**: `uno-ai-adaptation`
- **Description**: Learns from game outcomes and adapts AI personality
- **Input**: Game result, current personality, performance history
- **Output**: New personality recommendation with reasoning

### Flow Builder Steps

1. **Performance Analyzer**
   - Evaluate game outcome
   - Analyze move effectiveness
   - Calculate performance metrics

2. **LLM Strategy Learner**
   - **Model**: GPT-4
   - **Prompt**:
   ```
   Analyze this UNO game result for AI improvement:
   
   Game Result: {gameResult}
   Current Personality: {currentPersonality}
   Recent Performance: {performanceHistory}
   
   Based on the outcome, should the AI:
   1. Keep current personality
   2. Switch to more aggressive approach
   3. Switch to more defensive approach
   4. Use balanced strategy
   
   Consider:
   - Win/loss patterns
   - Player behavior adaptations
   - Strategy effectiveness
   
   Provide: recommendedPersonality, reasoning, confidence
   ```

3. **Adaptation Engine**
   - Compare strategies
   - Weight recent vs historical performance
   - Generate personality shifts

4. **Learning Recorder**
   - Store adaptation decisions
   - Track strategy evolution
   - Update personality parameters

### Example Flow Output
```json
{
  "data": {
    "recommendedPersonality": "aggressive",
    "reasoning": "Defensive strategy led to losses; player responds well to pressure",
    "confidence": 0.79,
    "adaptationMetrics": {
      "performanceImprovement": 0.15,
      "strategicShift": "moderate"
    }
  },
  "flowExecutionId": "flow_adapt_456",
  "timestamp": "2025-09-24T10:32:00Z"
}
```

## Implementation Notes

### Error Handling
- All flows include timeout handling (10s max)
- Graceful fallback to local logic if flow fails
- Retry logic for transient failures

### Authentication
```javascript
headers: {
  'Authorization': 'Bearer YOUR_SMYTHOS_API_KEY',
  'Content-Type': 'application/json',
  'X-Session-ID': this.sessionId
}
```

### Rate Limiting
- Maximum 10 requests per second
- Queue requests during high frequency gameplay
- Batch learning data for efficiency

### Testing & Validation
- Test flows with various game scenarios
- Validate JSON schema compliance
- Monitor response times and accuracy

## Competition Compliance ✅

This implementation demonstrates:
- **Real SmythOS integration** with actual API calls
- **Creative use of LLMs** for game strategy
- **Multi-flow architecture** for different AI aspects
- **Learning and adaptation** capabilities
- **Professional error handling** and fallbacks
- **Scalable design** for tournament play

The flows showcase advanced AI decision-making while maintaining the competitive gaming experience that makes UNO engaging and educational.
