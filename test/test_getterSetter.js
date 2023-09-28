const { expect } = require("chai");

describe("GetterSetter Contract", function() {
    let GetterSetter, getterSetter, owner, addr1;

    beforeEach(async () => {
        GetterSetter = await ethers.getContractFactory("GetterSetter");
        getterSetter = await GetterSetter.deploy();
        [owner, addr1] = await ethers.getSigners();
    });

    describe("Uint256 Tests", function() {

        it("Should set and get uint256 value", async function() {
            await getterSetter.setUint256(123);
            expect(await getterSetter.getUint256()).to.equal(123);
        });

        it("Should emit SetUint256 event when uint256 value is set", async function() {
            await expect(getterSetter.setUint256(123))
                .to.emit(getterSetter, "SetUint256")
                .withArgs(owner.address, 123);
        });

        it("Should handle uint256 boundary conditions", async function() {
            const maxUint256 = ethers.constants.MaxUint256;
            await getterSetter.setUint256(maxUint256);
            expect(await getterSetter.getUint256()).to.equal(maxUint256);
        });

        it("Should handle multiple set and get operations for uint256", async function() {
            await getterSetter.setUint256(123);
            expect(await getterSetter.getUint256()).to.equal(123);

            await getterSetter.setUint256(456);
            expect(await getterSetter.getUint256()).to.equal(456);
        });

    });

    describe("Bytes32 Tests", function() {

        it("Should set and get bytes32 value", async function() {
            const value = ethers.utils.formatBytes32String("TestBytes32");
            await getterSetter.setBytes32(value);
            expect(await getterSetter.getBytes32()).to.equal(value);
        });

        it("Should emit SetBytes32 event when bytes32 value is set", async function() {
            const value = ethers.utils.formatBytes32String("TestBytes32");
            await expect(getterSetter.setBytes32(value))
                .to.emit(getterSetter, "SetBytes32")
                .withArgs(owner.address, value);
        });

        it("Should handle multiple set and get operations for bytes32", async function() {
            const value1 = ethers.utils.formatBytes32String("FirstTest");
            const value2 = ethers.utils.formatBytes32String("SecondTest");

            await getterSetter.setBytes32(value1);
            expect(await getterSetter.getBytes32()).to.equal(value1);

            await getterSetter.setBytes32(value2);
            expect(await getterSetter.getBytes32()).to.equal(value2);
        });

    });

    describe("Bytes Tests", function() {

        it("Should set and get bytes value", async function() {
            const value = ethers.utils.toUtf8Bytes("TestBytes");
            await getterSetter.setBytes(value);

            const retrievedBytes = await getterSetter.getBytes();
            const retrievedString = ethers.utils.toUtf8String(retrievedBytes);
            expect(retrievedString).to.equal("TestBytes");
        });

        it("Should emit SetBytes event when bytes value is set", async function() {
            const value = ethers.utils.toUtf8Bytes("TestBytes");
            const hexValue = ethers.utils.hexlify(value);
            await expect(getterSetter.setBytes(value))
                .to.emit(getterSetter, "SetBytes")
                .withArgs(owner.address, hexValue);
        });

        it("Should handle multiple set and get operations for bytes", async function() {
            const value1 = ethers.utils.toUtf8Bytes("FirstBytes");
            const value2 = ethers.utils.toUtf8Bytes("SecondBytes");

            await getterSetter.setBytes(value1);
            let retrievedBytes = await getterSetter.getBytes();
            let retrievedString = ethers.utils.toUtf8String(retrievedBytes);
            expect(retrievedString).to.equal("FirstBytes");

            await getterSetter.setBytes(value2);
            retrievedBytes = await getterSetter.getBytes();
            retrievedString = ethers.utils.toUtf8String(retrievedBytes);
            expect(retrievedString).to.equal("SecondBytes");
        });

    });

    describe("Potential Errors", function() {

        it("Should allow any user to set values (including non-owners)", async function() {
            const newValue = 789;
            await getterSetter.connect(addr1).setUint256(newValue);
            expect(await getterSetter.getUint256()).to.equal(newValue);
        });

        it("Should handle short bytes inputs", async function() {
            const value = ethers.utils.toUtf8Bytes("Short");
            await getterSetter.setBytes(value);
            const retrievedBytes = await getterSetter.getBytes();
            const retrievedString = ethers.utils.toUtf8String(retrievedBytes);
            expect(retrievedString).to.equal("Short");
        });

    });
});