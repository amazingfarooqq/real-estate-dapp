const hre = require("hardhat");
const { ethers } = require("hardhat");

function toWei(n) {
  return ethers.utils.parseUnits(n);
}
async function main() {

    const USDT = await ethers.getContractFactory("TetherToken");
    // 100000000
    const uSDT = await USDT.deploy("100000000000000000000000000",  "TetherToken", "USDT", 18 );
    await uSDT.deployed();


    const Real = await ethers.getContractFactory("RealEstate");
    //(address payable _owner, address  _usdt, uint _transferPropertyFee,uint _addPropertyFee, uint _sellPropertyFee)

    // const real = await Real.deploy(process.env.MY_ADD, uSDT.address,  6,3,"1000000000000000000000", "1000000000000000000000");
    const real = await Real.deploy();
    // 1000
    await real.deployed();
    
    console.log(uSDT.address , real.address);
    
  // 0xE6AA50000D24F0ba9f4f115ea486C0E93496b7ED 0x7D6E85E00b74AB91FfD50c1BD173b568B6eA3012
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
