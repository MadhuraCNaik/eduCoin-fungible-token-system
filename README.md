# 🪙 EduCoin - Fungible Token System

A complete fungible token system with a beautiful web interface, featuring token transfers, minting capabilities, and a token explorer.

## ✨ Features

### 🔹 Core Token Features
- **Balance Checking**: View your own and others' token balances
- **Token Transfers**: Send tokens to other users with validation
- **Token Minting**: Admin-only feature to create new tokens
- **Total Supply Tracking**: Real-time display of total tokens in circulation

### 🔹 User Interface
- **Modern Design**: Beautiful gradient UI with glass-morphism effects
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **User Authentication**: Simple login system with User IDs
- **Token Explorer**: View all users and their token balances
- **Real-time Updates**: Automatic balance and supply updates
- **Admin Dashboard**: Special interface for token creators

### 🔹 Token Details
- **Name**: EduCoin
- **Symbol**: EDU
- **Initial Supply**: 1,000,000 tokens
- **Creator**: admin (has minting privileges)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd C:\Users\madhu\CascadeProjects\fungible-token-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 🎮 How to Use

### 1. **Login**
- Enter a User ID (e.g., `admin`, `user1`, `user2`)
- Use quick login buttons for convenience
- Admin users get access to minting features

### 2. **Check Balances**
- View your current token balance in the wallet section
- Use the balance checker to view any user's balance
- Browse the token explorer to see all users with tokens

### 3. **Transfer Tokens**
- Enter the receiver's User ID
- Specify the amount to transfer
- Click "Send Tokens" to complete the transfer
- System validates sufficient balance before transfer

### 4. **Mint Tokens (Admin Only)**
- Only available to the creator (`admin`)
- Enter recipient's User ID
- Specify amount to mint
- New tokens are added to total supply and recipient's balance

### 5. **Token Explorer**
- View all users with token balances
- Balances are sorted from highest to lowest
- Creator is highlighted with a crown icon

## 🏗️ Project Structure

```
fungible-token-project/
├── package.json          # Project dependencies and scripts
├── server.js             # Express server with API endpoints
├── tokenSystem.js        # Core token logic and functionality
├── README.md            # Project documentation
└── public/              # Frontend files
    ├── index.html       # Main HTML interface
    ├── styles.css       # Modern CSS styling
    └── app.js          # Frontend JavaScript functionality
```

## 🔧 API Endpoints

- `GET /api/token-info` - Get token information (name, symbol, total supply)
- `GET /api/balance/:userId` - Get balance for a specific user
- `GET /api/balances` - Get all users with their balances
- `POST /api/transfer` - Transfer tokens between users
- `POST /api/mint` - Mint new tokens (admin only)

## 🎨 Design Features

- **Glass-morphism UI**: Modern translucent design elements
- **Gradient Backgrounds**: Beautiful color transitions
- **Responsive Grid**: Adapts to different screen sizes
- **Interactive Animations**: Smooth hover effects and transitions
- **Icon Integration**: Font Awesome icons throughout the interface
- **Message System**: Real-time success/error notifications

## 🔒 Security Features

- **Admin Validation**: Only creator can mint tokens
- **Balance Validation**: Prevents transfers with insufficient funds
- **Input Validation**: Checks for valid amounts and user IDs
- **Error Handling**: Comprehensive error messages and validation

## 🚀 Development

### Start in Development Mode
```bash
npm run dev
```

This uses nodemon for automatic server restarts during development.

### Test Users
- `admin` - Token creator with minting privileges
- `user1`, `user2`, etc. - Regular users for testing transfers

## 📝 License

MIT License - Feel free to use and modify as needed!

---

**Built with ❤️ using Node.js, Express, and modern web technologies**
