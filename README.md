# GetterSetter Ethereum Contract

This project demonstrates the deployment and interaction with an Ethereum smart contract named `GetterSetter`. The primary objective of the contract is to set and retrieve different types of values, including uint256, bytes32, and bytes.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Scripts Description](#scripts-description)
- [Testing](#testing)
- [Docker Deployment](#docker-deployment)

## Features
- Deploy a `GetterSetter` smart contract to the Ethereum network.
- Set uint256, bytes32, and bytes values in the contract.
- Retrieve the set values from the contract.
- Docker integration for deployment and interaction.

## Prerequisites
- Node.js v14 or above.
- [Hardhat](https://hardhat.org/getting-started/)
- Ethereum account with some test ether for the network you're deploying to.
- Private key for the Ethereum account.

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

## Usage 
To interact with the contract, you can run individual scripts or use the provided `runContractOps.sh` script for a streamlined process.

**Single Script Execution**:
This script will execute the deploy, set, and get operations in sequence. Ensure you've provided your Ethereum private key when prompted.
`./runContractOps.sh` 


 **Individual Script Execution**: 
 1.  **Deploy the Contract**: 
	 ```bash 
	 npx hardhat run scripts/deploy.js --network [NETWORK_NAME]
2. **Set Values**:
	```bash
	 npx hardhat run scripts/setValue.js --network [NETWORK_NAME]`
3. **Retrieve Values**:
	```bash
	npx hardhat run scripts/getValue.js --network [NETWORK_NAME]`

## Scripts Description

-   `deploy.js`: This script deploys the `GetterSetter` contract to the specified Ethereum network.
-   `setValue.js`: Interacts with the deployed contract to set uint256, bytes32, and bytes values.
-   `getValue.js`: Interacts with the deployed contract to retrieve and display the set values.
-   `checkBalance.js`: Checks the balance of the specified Ethereum account.
-   `runContractOps.sh`: A bash script that automates the deployment and interaction with the contract.

## Testing

Tests are included in the `test` directory. To run the tests, execute:
`npx hardhat test`

## Docker Deployment

A `Dockerfile` is provided to containerize the application. You can build and run the project in Docker. Please ensure you have Docker installed on your machine before proceeding.

1. Build the Docker Image
`docker build -t loviza_chohan-qa-assessment .`
2. Run the Docker Container
`docker run -e PRIVATE_KEY=[YOUR_PRIVATE_KEY] loviza_chohan-qa-assessment`

Note: Before running the docker container, ensure you've provided your Ethereum private key. INFRURA_PROJECT_ID and VALUE have been populated in the Dockerfile but if you wish to use your own, go ahead and provide it when running the docker container. 

