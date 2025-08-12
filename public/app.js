// Global variables
let currentUser = null;
let tokenInfo = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadTokenInfo();
});

// Load token information
async function loadTokenInfo() {
    try {
        const response = await fetch('/api/token-info');
        tokenInfo = await response.json();
        document.getElementById('totalSupply').textContent = tokenInfo.totalSupply.toLocaleString();
    } catch (error) {
        showMessage('Failed to load token information', 'error');
    }
}

// Login function
function login() {
    const userId = document.getElementById('userIdInput').value.trim();
    if (!userId) {
        showMessage('Please enter a User ID', 'error');
        return;
    }
    
    currentUser = userId;
    document.getElementById('currentUser').textContent = userId;
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    
    // Show admin section if user is admin
    if (userId === tokenInfo.creatorId) {
        document.getElementById('mintSection').style.display = 'block';
    } else {
        document.getElementById('mintSection').style.display = 'none';
    }
    
    loadUserBalance();
    loadExplorer();
    showMessage(`Welcome, ${userId}!`, 'success');
}

// Quick login function
function quickLogin(userId) {
    document.getElementById('userIdInput').value = userId;
    login();
}

// Logout function
function logout() {
    currentUser = null;
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('userIdInput').value = '';
    clearForms();
    showMessage('Logged out successfully', 'info');
}

// Load user balance
async function loadUserBalance() {
    if (!currentUser) return;
    
    try {
        const response = await fetch(`/api/balance/${currentUser}`);
        const data = await response.json();
        document.getElementById('userBalance').textContent = data.balance.toLocaleString();
    } catch (error) {
        showMessage('Failed to load balance', 'error');
    }
}

// Transfer tokens
async function transferTokens() {
    const receiverId = document.getElementById('receiverId').value.trim();
    const amount = parseInt(document.getElementById('transferAmount').value);
    
    if (!receiverId || !amount || amount <= 0) {
        showMessage('Please enter valid receiver ID and amount', 'error');
        return;
    }
    
    if (receiverId === currentUser) {
        showMessage('Cannot transfer to yourself', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromUserId: currentUser,
                toUserId: receiverId,
                amount: amount
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage(result.message, 'success');
            loadUserBalance();
            loadExplorer();
            clearTransferForm();
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('Transfer failed. Please try again.', 'error');
    }
}

// Mint tokens (admin only)
async function mintTokens() {
    const recipientId = document.getElementById('mintRecipient').value.trim();
    const amount = parseInt(document.getElementById('mintAmount').value);
    
    if (!recipientId || !amount || amount <= 0) {
        showMessage('Please enter valid recipient ID and amount', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/mint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adminId: currentUser,
                toUserId: recipientId,
                amount: amount
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage(result.message, 'success');
            loadTokenInfo(); // Refresh total supply
            loadUserBalance();
            loadExplorer();
            clearMintForm();
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('Mint failed. Please try again.', 'error');
    }
}

// Check balance of any user
async function checkBalance() {
    const userId = document.getElementById('checkUserId').value.trim();
    
    if (!userId) {
        showMessage('Please enter a User ID', 'error');
        return;
    }
    
    try {
        const response = await fetch(`/api/balance/${userId}`);
        const data = await response.json();
        
        const resultDiv = document.getElementById('balanceResult');
        resultDiv.innerHTML = `
            <div class="balance-check-result">
                <strong>${userId}</strong> has <strong>${data.balance.toLocaleString()}</strong> EDU tokens
            </div>
        `;
        
        document.getElementById('checkUserId').value = '';
    } catch (error) {
        showMessage('Failed to check balance', 'error');
    }
}

// Load token explorer
async function loadExplorer() {
    try {
        const response = await fetch('/api/balances');
        const balances = await response.json();
        
        const explorerDiv = document.getElementById('explorerResults');
        
        if (balances.length === 0) {
            explorerDiv.innerHTML = '<p>No users with token balances found.</p>';
            return;
        }
        
        let html = '';
        balances.forEach((item, index) => {
            const isAdmin = item.userId === tokenInfo.creatorId;
            html += `
                <div class="explorer-item ${isAdmin ? 'admin' : ''}">
                    <div class="explorer-user">
                        ${isAdmin ? '👑 ' : ''}${item.userId}
                        ${isAdmin ? ' (Creator)' : ''}
                    </div>
                    <div class="explorer-balance">
                        ${item.balance.toLocaleString()} EDU
                    </div>
                </div>
            `;
        });
        
        explorerDiv.innerHTML = html;
    } catch (error) {
        showMessage('Failed to load explorer data', 'error');
    }
}

// Clear forms
function clearForms() {
    clearTransferForm();
    clearMintForm();
    document.getElementById('checkUserId').value = '';
    document.getElementById('balanceResult').innerHTML = '';
}

function clearTransferForm() {
    document.getElementById('receiverId').value = '';
    document.getElementById('transferAmount').value = '';
}

function clearMintForm() {
    document.getElementById('mintRecipient').value = '';
    document.getElementById('mintAmount').value = '';
}

// Show message function
function showMessage(message, type = 'info') {
    const messageContainer = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    messageContainer.appendChild(messageDiv);
    
    // Auto remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// Add enter key support for forms
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        
        if (activeElement.id === 'userIdInput') {
            login();
        } else if (activeElement.id === 'receiverId' || activeElement.id === 'transferAmount') {
            transferTokens();
        } else if (activeElement.id === 'mintRecipient' || activeElement.id === 'mintAmount') {
            mintTokens();
        } else if (activeElement.id === 'checkUserId') {
            checkBalance();
        }
    }
});
