const { ethers } = require("ethers");
const fs = require("fs");
const prompt = require('prompt-sync')({ sigint: true }); // Enable Ctrl+C handling

wallet = ethers.Wallet.createRandom();
// Ask for a password
const passphrase = prompt('Enter your password: ', { echo: '' }); // Masks with '*'
// Ask for a password confirmation
const passphraseConfirm = prompt('Confirm your password: ', { echo: '' }); // Masks with '*'
if (passphrase !== passphraseConfirm) {
    console.error('Passwords do not match');
    return;
}
wallet.encrypt(passphrase).then((data) => {
    keystore = JSON.parse(data);
    // Stringify the keystore object with tab indentation
    data = JSON.stringify(keystore, null, 4);
    console.log(data);
    filename = keystore['x-ethers'].gethFilename;
    fs.writeFileSync(`keystore/${filename}`, data);
})