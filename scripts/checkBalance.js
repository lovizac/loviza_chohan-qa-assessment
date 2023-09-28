const { ethers } = require("hardhat");
/**
 * This script checks the Ether balance of a specific Ethereum address.
 *
 * It connects to the Sepolia Ethereum testnet using the Alchemy API.
 * After establishing the connection, it queries the balance of the address "0x8EBb302CC7b1eE3Eb828cd59b08033C7B156194B".
 * The balance, once retrieved, is then converted from wei to ether and logged to the console.
 */

async function checkBalance() {
    const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/H8Oi7_gr2AV-rdkKA3Mmb-ShovtRBXJy");
    const balance = await provider.getBalance("0x8EBb302CC7b1eE3Eb828cd59b08033C7B156194B");
    console.log(ethers.utils.formatEther(balance), "ETH");
}

checkBalance();