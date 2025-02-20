const { ethers } = require("ethers");
const fs = require("fs");
const prompt = require('prompt-sync')({ sigint: true }); // Enable Ctrl+C handling

// Ask for the filename of the keystore
const filename = prompt('Enter the filename of your keystore: ');

// Ask for destination address
const destination = prompt('Enter the destination address: ');

// Ask for amount of USDT
const amount = prompt('Enter the amount of USDT to send: ');

// Ask for a password
const passphrase = prompt('Enter your password: ', { echo: '' }); // Masks with '*'

ethers.Wallet.fromEncryptedJson(fs.readFileSync(filename), passphrase)
    .then((wallet) => {
    console.log(wallet.address);

    // Connect to Binance Smart Chain
    const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    //const provider = new ethers.providers.JsonRpcProvider("https://binance.llamarpc.com");
    const walletWithProvider = wallet.connect(provider);

    const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955";
    const usdtContractABI = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function transfer(address recipient, uint256 amount) external returns (bool)"
    ];
    //const usdtContract = new ethers.Contract(usdtContractAddress, usdtContractABI, provider);
    const usdtContract = new ethers.Contract(usdtContractAddress, usdtContractABI, walletWithProvider);
    //console.log(usdtContract);
    
    // Transfer USDT to the destination
    usdtContract.transfer(destination, ethers.parseUnits(amount, "ether")).then((tx) => {
        console.log(tx);
    });
    
    
    /*
    // Send BNB to the wallet
    walletWithProvider.sendTransaction({
        to: destination,
        value: ethers.utils.parseEther(amount)
    }).then((tx) => {
        console.log(tx);
    });
    */
});

