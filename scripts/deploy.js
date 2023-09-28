
async function main() {
    // deploy.js
    const fs = require('fs');

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Contract = await ethers.getContractFactory("GetterSetter");
    const contract = await Contract.deploy();

    console.log("Contract deployed to:", contract.address);

    // Save the contract address to a file
    fs.writeFileSync('contractAddress.txt', contract.address);

    console.log("contractAddress: ", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
