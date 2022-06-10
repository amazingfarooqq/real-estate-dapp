const { expect } = require("chai");
const { ethers } = require("hardhat");
const { formatEther } = require("ethers/lib/utils");

function toWei(n) {
  return ethers.utils.parseUnits(n);
}

describe("Real Estate:", function () {
  let owner, a1, a2, a3, uSDT, real;

  it("Deploy :", async function () {
    const USDT = await ethers.getContractFactory("TetherToken");
    uSDT = await USDT.deploy(toWei("100000000"), "TetherToken", "USDT", 18);
    await uSDT.deployed();

    [owner, a1, a2, a3] = await ethers.getSigners();

    const Real = await ethers.getContractFactory("RealEstate");
    //(address payable _owner, address  _usdt, uint _transferPropertyFee,uint _addPropertyFee, uint _sellPropertyFee) // 1000                         // 5000
    real = await Real.deploy(owner.address, uSDT.address,"5000000000000000000000");
    await real.deployed();
  });

  // check constructor values

  it("check constructor values:", async () => {

    const check1 = await real.check();
    console.log(
      "ticketAmount:" + check1
    );
  });

  // permissions
  it("permissions:", async () => {
    // console.log('balance before', await uSDT.balanceOf(a1.address))    
    await uSDT.connect(owner).transfer(a1.address, toWei("10000000"));
    await uSDT.connect(owner).transfer(a2.address, toWei("10000000"));

  });

  // ADDING PROPERTY

  it("requestToAddProperty 1 :", async () => {
    let idd = 1;

    //  _fullName _phoneNumber,_price _houseAddress _Pictures,_isAgency _details
    await real.connect(a1).generateTicket();  

    console.log('owner of token 1' , await real.ownerOf(1));

    await real.connect(a1).approve(real.address, 1);
    console.log('isApprovedOrOwner 1 ' , await real.isApprovedOrOwner(a1.address,1));
    console.log('isApprovedOrOwner contract' , await real.isApprovedOrOwner(real.address,1));
    
  });
  it("checking 1 :", async () => {

      // console.log('properties 1' , await real.properties(1));
      // console.log('tokenEndingTime 1' , await real.tokenEndingTime(1));

  });
  it("buy ticket 1 :", async () => {

      // console.log('properties 1' , await real.properties(1));
      await uSDT.connect(a2).approve(real.address, "5000000000000000000000");
      await real.connect(a2).buyTicketForProperty(1);
      // console.log('tokenEndingTime 1' , await real.tokenEndingTime(1));

  });


});
