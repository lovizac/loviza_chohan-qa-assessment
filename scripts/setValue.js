const { ethers } = require("hardhat");

async function main() {
    // Get deployer account
    const [deployer] = await ethers.getSigners();

    // Read the contract address from the file
    const fs = require('fs');
    const CONTRACT_ADDRESS = fs.readFileSync('contractAddress.txt', 'utf8');

    // Attach to the deployed contract
    const Contract = await ethers.getContractFactory("GetterSetter");
    const contractInstance = await Contract.attach(CONTRACT_ADDRESS);

    // Set and log the uint256 value
    const uint256Value = 5;
    const txUint256 = await contractInstance.setUint256(uint256Value);
    const receiptUint256 = await txUint256.wait();
    console.log(`Uint256 value set to: ${uint256Value} in block: ${receiptUint256.blockNumber}`);

    // Set and log the bytes32 value
    const bytes32Value = "TestString";
    const txBytes32 = await contractInstance.setBytes32(ethers.utils.formatBytes32String(bytes32Value));
    const receiptBytes32 = await txBytes32.wait();
    console.log(`Bytes32 value set to: ${bytes32Value} in block: ${receiptBytes32.blockNumber}`);

    // Set and log bytes value
    const bytesValue = "TestBytes";
    const txBytes = await contractInstance.setBytes(ethers.utils.toUtf8Bytes(bytesValue));
    const receiptBytes = await txBytes.wait();
    console.log(`Bytes value set to: ${bytesValue} in block: ${receiptBytes.blockNumber}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("Error encountered:", error);
        process.exit(1);
    });
