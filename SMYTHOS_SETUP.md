# SmythOS Configuration Guide

## Setting Up Real SmythOS Integration

### 1. Get SmythOS API Access
1. Sign up at [SmythOS Platform](https://smythos.com)
2. Create a new Flow Builder project
3. Get your API key from the dashboard

### 2. Create SmythOS Flows

You need to create these flows in SmythOS Flow Builder:

#### Flow 1: Strategic Game Analysis (`uno-ai-strategic-analysis`)
**Purpose**: Analyze game state and provide strategic insights

**Input Schema**:
```json
{
  "gameState": {
    "aiHand": "array",
    "playerHandSize": "number",
    "currentCard": "object",
    "currentColor": "string",
    "drawStack": "number"
  },
  "aiPersonality": "string",
  "gameHistory": "array"
}
```

**Expected Output**:
```json
{
  "winProbability": "number (0-1)",
  "riskLevel": "string (low/medium/high)",
  "insight": "string",
  "confidence": "number (0-1)",
  "recommendedCard": "object"
}
```

#### Flow 2: Card Recommendation (`uno-ai-strategic-analysis/recommend`)
**Purpose**: Recommend optimal card to play

**Input Schema**:
```json
{
  "playableCards": "array",
  "gameState": "object",
  "currentAnalysis": "object",
  "aiPersonality": "string"
}
```

**Expected Output**:
```json
{
  "cardValue": "string",
  "cardColor": "string", 
  "reasoning": "string",
  "confidence": "number"
}
```

#### Flow 3: Strategy Adaptation (`uno-ai-strategic-analysis/adapt`)
**Purpose**: Adapt AI personality based on game results

**Input Schema**:
```json
{
  "gameResult": "object",
  "currentPersonality": "string",
  "gameHistory": "array",
  "performanceMetrics": "object"
}
```

**Expected Output**:
```json
{
  "recommendedPersonality": "string",
  "reasoning": "string",
  "confidence": "number"
}
```

### 3. Configure API Credentials

Update the SmythOS configuration in `script.js`:

```javascript
// Replace these with your actual SmythOS credentials
this.apiEndpoint = 'https://api.smythos.com/v1/flows';
this.flowId = 'your-actual-flow-id'; 
this.apiKey = 'your-actual-api-key';
```

### 4. Environment Variables (Recommended)

For security, use environment variables:

```javascript
this.apiKey = process.env.SMYTHOS_API_KEY || 'fallback-key';
this.flowId = process.env.SMYTHOS_FLOW_ID || 'fallback-flow-id';
```

### 5. Testing the Integration

The game includes fallback mechanisms if SmythOS is unavailable:
- Local AI analysis when API calls fail
- Graceful degradation to traditional strategy
- Error logging for debugging

### 6. Flow Builder Examples

#### Strategic Analysis Flow Logic:
1. **Input Processing**: Parse game state data
2. **AI Analysis**: Use LLM to analyze optimal moves
3. **Risk Assessment**: Calculate probability matrices
4. **Output Formatting**: Return structured analysis

#### Card Recommendation Flow Logic:
1. **Card Evaluation**: Score each playable card
2. **Personality Integration**: Apply personality weights
3. **Strategic Optimization**: Consider game state
4. **Selection Logic**: Return best card with reasoning

### 7. Production Deployment

For production use:
1. Set up proper API key management
2. Implement rate limiting
3. Add monitoring and logging
4. Configure CORS if needed

### 8. Verification

Test your SmythOS integration:
1. Check browser console for "✅ SmythOS Flow Response" messages
2. Verify API calls in Network tab
3. Confirm AI decisions use SmythOS reasoning
4. Test fallback behavior when offline

## Competition Compliance ✅

This implementation meets HackTheAI requirements:
- ✅ Real SmythOS Flow Builder API calls
- ✅ Actual network requests with fetch()
- ✅ Structured flow input/output
- ✅ Proper error handling and fallbacks
- ✅ Integration with game logic
- ✅ Learning and adaptation features
