const { ethers } = require("ethers");
const fs = require("fs");
const prompt = require('prompt-sync')({ sigint: true }); // Enable Ctrl+C handling

// Ask for the filename of the keystore
const filename = prompt('Enter the filename of your keystore: ');

// Ask for a password
const passphrase = prompt('Enter your password: ', { echo: '' }); // Masks with '*'

ethers.Wallet.fromEncryptedJson(fs.readFileSync(filename), passphrase)
    .then((wallet) => {
    console.log(wallet.address);

    // Connect to Binance Smart Chain
    const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    const walletWithProvider = wallet.connect(provider);

    // Query USDT balance
    const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955";
    const usdtContractABI = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)"
    ];
    const usdtContract = new ethers.Contract(usdtContractAddress, usdtContractABI, provider);
    usdtContract.balanceOf(wallet.address).then((balance) => {
        console.log(balance);
        // print balance in USDT
        console.log(ethers.formatEther(balance));
    });
});

