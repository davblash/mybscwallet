const { ethers } = require("ethers");
const fs = require("fs");
const prompt = require('prompt-sync')({ sigint: true }); // Enable Ctrl+C handling

// Ask for the filename of the keystore
const filename = prompt('Enter the filename of your keystore: ');

// Ask for destination address
const destination = prompt('Enter the destination address: ');

// Ask for amount of BNB
const amount = prompt('Enter the amount of BNB to send: ');

// Ask for a password
const passphrase = prompt('Enter your password: ', { echo: '' }); // Masks with '*'

ethers.Wallet.fromEncryptedJson(fs.readFileSync(filename), passphrase)
    .then((wallet) => {
    console.log(wallet.address);

    // Connect to Binance Smart Chain
    const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    //const provider = new ethers.providers.JsonRpcProvider("https://binance.llamarpc.com");
    const walletWithProvider = wallet.connect(provider);

    // Send BNB to the wallet
    walletWithProvider.sendTransaction({
        to: destination,
        value: ethers.parseEther(amount)
    }).then((tx) => {
        console.log(tx);
    });
});

