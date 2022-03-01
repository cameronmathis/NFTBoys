const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTBoys", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const NFTBoys = await ethers.getContractFactory("NFTBoys");
    const nftboys = await NFTBoys.deploy();
    await nftboys.deployed();

    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const metadataURI = "cid/test.png";

    let balance = await nftboys.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await nftboys.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await nftboys.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await nftboys.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await nftboys.payToMint(recipient, "foo", {
      value: ethers.utils.parseEther("0.05"),
    });
  });
});
