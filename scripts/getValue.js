const { ethers } = require("hardhat");

async function main() {
    // getValue.js (and similarly for setValue.js)
    const fs = require('fs');

    // Read the contract address from the file
    const CONTRACT_ADDRESS = fs.readFileSync('contractAddress.txt', 'utf8');

    const [deployer] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("GetterSetter");
    const contractInstance = await Contract.attach(CONTRACT_ADDRESS);

    // Get the uint256 value
    const retrievedUint256 = await contractInstance.getUint256();
    console.log("Retrieved uint256 value:", retrievedUint256.toString());

    // Get the bytes32 value
    const retrievedBytes32 = await contractInstance.getBytes32();
    console.log("Retrieved bytes32 value:", ethers.utils.parseBytes32String(retrievedBytes32));

    // Get bytes value
    const retrievedBytes = await contractInstance.getBytes();
    console.log("Retrieved bytes value:", ethers.utils.toUtf8String(retrievedBytes));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("Error encountered:", error);
        process.exit(1);
    });
