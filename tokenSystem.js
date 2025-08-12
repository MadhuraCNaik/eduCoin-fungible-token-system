class FungibleToken {
    constructor(name, symbol, initialSupply, creatorId) {
        this.name = name;
        this.symbol = symbol;
        this.totalSupply = initialSupply;
        this.creatorId = creatorId;
        this.balances = new Map();
        
        // Give all initial tokens to creator
        this.balances.set(creatorId, initialSupply);
        
        console.log(`Token ${name} (${symbol}) created with supply: ${initialSupply}`);
        console.log(`All tokens assigned to creator: ${creatorId}`);
    }

    // Check balance of a specific user
    balanceOf(userId) {
        return this.balances.get(userId) || 0;
    }

    // Get total supply
    getTotalSupply() {
        return this.totalSupply;
    }

    // Transfer tokens from one user to another
    transfer(fromUserId, toUserId, amount) {
        // Validate inputs
        if (amount <= 0) {
            return { success: false, message: "Amount must be greater than 0" };
        }

        const fromBalance = this.balanceOf(fromUserId);
        if (fromBalance < amount) {
            return { success: false, message: "Insufficient balance" };
        }

        // Perform transfer
        this.balances.set(fromUserId, fromBalance - amount);
        const toBalance = this.balanceOf(toUserId);
        this.balances.set(toUserId, toBalance + amount);

        return { 
            success: true, 
            message: `Successfully transferred ${amount} ${this.symbol} from ${fromUserId} to ${toUserId}` 
        };
    }

    // Mint new tokens (only creator can do this)
    mint(adminId, toUserId, amount) {
        // Check if the caller is the creator
        if (adminId !== this.creatorId) {
            return { success: false, message: "Only the creator can mint tokens" };
        }

        if (amount <= 0) {
            return { success: false, message: "Amount must be greater than 0" };
        }

        // Mint tokens
        this.totalSupply += amount;
        const currentBalance = this.balanceOf(toUserId);
        this.balances.set(toUserId, currentBalance + amount);

        return { 
            success: true, 
            message: `Successfully minted ${amount} ${this.symbol} to ${toUserId}` 
        };
    }

    // Get all users and their balances (for explorer functionality)
    getAllBalances() {
        const balanceArray = [];
        for (const [userId, balance] of this.balances.entries()) {
            if (balance > 0) {
                balanceArray.push({ userId, balance });
            }
        }
        return balanceArray.sort((a, b) => b.balance - a.balance);
    }

    // Get token info
    getTokenInfo() {
        return {
            name: this.name,
            symbol: this.symbol,
            totalSupply: this.totalSupply,
            creatorId: this.creatorId
        };
    }
}

module.exports = FungibleToken;
