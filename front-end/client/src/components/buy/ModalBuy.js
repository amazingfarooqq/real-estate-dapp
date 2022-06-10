import { formatEther, parseEther } from "ethers/lib/utils";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../AuthContext";

function toWei(n) {
  return parseEther(n)
}

export const ModalBuy = ({data}) => {

  const {userInfo ,realEstateContract ,account , tetherTokenContract , RealEstateContractAddress} = useAuth()

  console.log(userInfo)

  const [smShow, setSmShow] = useState(false);

  // console.log('price: ',formatEther(data.price._hex));
  const buyPropertyFunction = async (_id, _price) => {
    // console.log(data.price._hex)
    console.log(_price);
    const priceOfPrpty = parseInt(formatEther(_price))

    const  priceOfPropty = `${priceOfPrpty}000000000000000000`

    console.log(priceOfPrpty);
    console.log(priceOfPropty);
    // console.log('changes')
    // console.log(_id)

    const value = await tetherTokenContract.allowance(
      account,
      RealEstateContractAddress
    );
    console.log(value);
    const val = value.gt(0);
    console.log(val);



    if (val) {
      await realEstateContract.buyProperty(_id, priceOfPropty , userInfo.phoneNumber.toString());

    } else {

      const tx = await tetherTokenContract.approve(
        RealEstateContractAddress,
        priceOfPropty
      );
      const receipt = await tx.wait();
      console.log(receipt.status);

      await realEstateContract.buyProperty(_id, priceOfPropty , userInfo.phoneNumber.toString());

    }

  };


  // console.log('propertyPrice: ',propertyPrice);
  return (
    <>
      <Button
        onClick={() => setSmShow(true)}
        className="btn btn-primary py-1 mx-2 px-3"
      >
        Details
      </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header> */}

          <div className="container-fluid">
            <div className="row">
              <div className="col-12 p-3">
                <div className="row">
                  <img
                    className="col-12 p-0 m-0 w-100 rounded"
                    style={{ height: "250px" }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsKhpV5QABsXOw_xDictRdZCBQxiTggrZS_A&usqp=CAU"
                    alt="img"
                  />

                  <div className="row m-0 p-0">
                    <div className="col-1">{parseInt(data.id._hex, 16)}</div>
                    <div className="col-12">{data.houseAddress}</div>
                    <div className="col-12">{formatEther(data.price._hex, 16)}</div>
                  </div>

                  <div className="col-12">{`${data.CurrentOwner.slice(
                    0,
                    5
                  )}...${data.CurrentOwner.slice(-5)}`}</div>
                </div>
                <button onClick={() => buyPropertyFunction(parseInt(data.id._hex, 16),data.price._hex)} className="btn btn-dark ">Buy Property</button>
              </div>
            </div>
          </div>{" "}
      </Modal>
    </>
  );
};
