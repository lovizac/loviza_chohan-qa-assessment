# Use the official Node.js 14 image as a base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory in the container
COPY package*.json ./

# Install project dependencies inside the container
RUN npm install

# Copy the rest of the project's files into the container
COPY . .

# Set default environment variables. These can be overridden when running the container (need to enter private key)
ENV INFRURA_PROJECT_ID=4364d9593a0f4c708079bb69f285d4ab
ENV VALUE_UINT256=12345
ENV VALUE_BYTES32=DefaultString
ENV VALUE_BYTES=DefaultBytes

# Give execution permission to your Bash script
RUN chmod +x ./runContractOps.sh

# Specify the default command to run the script when the container starts
CMD ["./runContractOps.sh"]
