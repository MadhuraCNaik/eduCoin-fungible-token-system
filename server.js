const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const FungibleToken = require('./tokenSystem');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize token system
// EduCoin with symbol EDU, 1,000,000 initial supply, creator is "admin"
const eduCoin = new FungibleToken("EduCoin", "EDU", 1000000, "admin");

// API Routes

// Get token information
app.get('/api/token-info', (req, res) => {
    res.json(eduCoin.getTokenInfo());
});

// Get balance of a specific user
app.get('/api/balance/:userId', (req, res) => {
    const { userId } = req.params;
    const balance = eduCoin.balanceOf(userId);
    res.json({ userId, balance });
});

// Get all balances (explorer)
app.get('/api/balances', (req, res) => {
    const balances = eduCoin.getAllBalances();
    res.json(balances);
});

// Transfer tokens
app.post('/api/transfer', (req, res) => {
    const { fromUserId, toUserId, amount } = req.body;
    
    if (!fromUserId || !toUserId || !amount) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required fields: fromUserId, toUserId, amount" 
        });
    }

    const result = eduCoin.transfer(fromUserId, toUserId, parseInt(amount));
    res.json(result);
});

// Mint tokens (admin only)
app.post('/api/mint', (req, res) => {
    const { adminId, toUserId, amount } = req.body;
    
    if (!adminId || !toUserId || !amount) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required fields: adminId, toUserId, amount" 
        });
    }

    const result = eduCoin.mint(adminId, toUserId, parseInt(amount));
    res.json(result);
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Fungible Token Server running on http://localhost:${PORT}`);
    console.log(`📊 Token: ${eduCoin.name} (${eduCoin.symbol})`);
    console.log(`💰 Total Supply: ${eduCoin.getTotalSupply().toLocaleString()}`);
    console.log(`👑 Creator: ${eduCoin.creatorId}`);
});
