const hre = require("hardhat");

async function main() {
  const IdeaOwnership = await hre.ethers.getContractFactory("IdeaOwnership");
  const contract = await IdeaOwnership.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("IdeaOwnership contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
