const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log(`Deploying contracts with the account: ${deployer.address}, balance: ${(await deployer.getBalance()).toString()}`);

    const WalletFactory = await hre.ethers.getContractFactory("WalletFactory");
    const walletFactory = await WalletFactory.deploy(deployer.address);
    await walletFactory.deployed();
    console.log('WalletFactory deployed to: ' + walletFactory.address);

    const Wallet = await hre.ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy([]);
    await wallet.deployed();
    console.log('Base Wallet deployed to: ' + wallet.address);

    const QuickAccManager = await hre.ethers.getContractFactory("QuickAccManager");
    const quickAccManager = await QuickAccManager.deploy();
    await quickAccManager.deployed();
    console.log('QuickAccManager deployed to: ' + quickAccManager.address);

    const Batcher = await hre.ethers.getContractFactory("Batcher");
    const batcher = await Batcher.deploy();
    await batcher.deployed();
    console.log('Batcher deployed to: ' + batcher.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
