#!/bin/bash

echo "Please enter your private key:"
read PRIVATE_KEY

# Export the private key as an environment variable
export PRIVATE_KEY=$PRIVATE_KEY
# Deploy the contract
DEPLOY_OUTPUT=$(npx hardhat run scripts/deploy.js --network sepolia)

#Wait for contract to be deployed
sleep 20

# Extract the contract address from the output
CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep "Contract deployed to:" | cut -d' ' -f4)

# Set the values
npx hardhat run scripts/setValue.js --network sepolia

# Get the values
GET_OUTPUT=$(npx hardhat run scripts/getValue.js --network sepolia)

# Extract the values from the output
UINT256_VALUE=$(echo "$GET_OUTPUT" | grep "Retrieved uint256 value:" | cut -d' ' -f4)
BYTES32_VALUE=$(echo "$GET_OUTPUT" | grep "Retrieved bytes32 value:" | cut -d' ' -f4)
BYTES_VALUE=$(echo "$GET_OUTPUT" | grep "Retrieved bytes value:" | cut -d' ' -f4)

# Write the data to output.json
echo "{
  \"contractAddress\": \"$CONTRACT_ADDRESS\",
  \"uint256Value\": $UINT256_VALUE,
  \"bytes32Value\": \"$BYTES32_VALUE\",
  \"bytesValue\": \"$BYTES_VALUE\"
}" > output.json

# Display the content of output.json
cat output.json

exit 0