const { ethers } = require("ethers");
const prompt = require('prompt-sync')({ sigint: true }); // Enable Ctrl+C handling

// Connect to the BSC mainnet
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
//const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.nariox.org");

// Function to get BNB balance
async function getBNBBalance(address) {
    try {
        const balance = await provider.getBalance(address);
        console.log(`Balance of ${address}: ${balance} Wei\n    ${ethers.formatEther(balance)} BNB`);
    } catch (error) {
        console.error(`Error fetching balance: ${error}`);
    }
}

// Replace with the address you want to query
//const address = "0xe062a7e63cc23f3e04a8654700756de373d4f075";
const address = prompt('Enter the address to query: ');
getBNBBalance(address);