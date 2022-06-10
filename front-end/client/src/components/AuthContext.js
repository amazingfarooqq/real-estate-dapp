import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { RealEstateabi } from "../SmartContract/RealEstateabi";
import { TetherTokenabi } from "../SmartContract/TetherTokenabi";
import { formatEther } from "ethers/lib/utils";
import { Injected } from "./wallets/connectors";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { active, activate, deactivate, account, chainId } = useWeb3React();

  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userinfo"))
  );
  const [currentUser, setCurrentUser] = useState('')
  const [contractOwner, setContractOwner] = useState("");
  const [realEstateContract, setRealEstateContract] = useState({});
  const [tetherTokenContract, setTetherTokenContract] = useState({});

  // these are going to dashboard to fetch data from blockchain
  const [totalProperties, setTotalProperties] = useState([]);
  const [requestsObject, setRequestsObject] = useState([]);
  const [propertiesObject, setPropertiesObject] = useState([]);
  const [requestsSellPropertyObject, setRequestsSellPropertyObject] = useState([]);
  const [onSellpropertiesObject, setOnSellPropertiesObject] = useState([]);
  const [rejectedRequestPropertiesObject, setrejectedRequestPropertiesObject] = useState([]);
  const [rejectedOnSellRequestPropertiesObject, setRejectedOnSellRequestPropertiesObject] = useState([]);


  // fees
  const [addpropertyfee, setAddPropertyFee] = useState();
  const [putOnSellPropertyFee, setPutOnSellPropertyFee] = useState('')
  const [individualSellingChargesInPercentage, setIndividualSellingChargesInPercentage] = useState('')
  const [agencySellingChargesInPercentage, setAgencySellingChargesInPercentage] = useState('')


  // console.log('fees:' , addpropertyfee , putOnSellPropertyFee , agencySellingChargesInPercentage);
  // console.log('fees:' , addpropertyfee , putOnSellPropertyFee , agencySellingChargesInPercentage);

  useEffect(() => {
    fetchDataFunction()
  }, []);


  // FETCH DATA FROM
    
  const TetherTokenContractAddress = "0xcb13D2Fc4036b481068A79Fd1748a0Dc5d259e3F";
  const RealEstateContractAddress = "0xe0FE388e4FcF7eb747FC0E88A9297c23de431675";
    // Fetch DATA FROM BLOCKCHAIN =================
    async function fetchDataFunction() {
      
      try {

        await activate(Injected)
        
          // const ReadProvider = new ethers.providers.WebSocketProvider(window.ethereum).getSigner()
          const provider = new ethers.providers.Web3Provider(
            window.ethereum
          ).getSigner();
          // const signer = provider.getSigner()

          // const ReadRealEstateContract = new ethers.Contract(RealEstateContractAddress, RealEstateabi, signer);
          const RealEstateContract = new ethers.Contract(
            RealEstateContractAddress,
            RealEstateabi,
            provider
          );
          const TetherTokenContract = new ethers.Contract(
            TetherTokenContractAddress,
            TetherTokenabi,
            provider
            );
          
          const owner = await RealEstateContract.owner();
          setContractOwner(owner);
          
          
          setRealEstateContract(RealEstateContract);
          setTetherTokenContract(TetherTokenContract);

        const run = await RealEstateContract.AddedPropertyID();

        let num = parseInt(run, 16);
        let generateArray = await Array.from({ length: num }, (_, i) => i + 1);
    
        setTotalProperties(generateArray);

        let requestsarray = [];
        let propertiesarray = [];
    
        let requestsSellPropertyarray = [];
        let onsellpropertiesarray = [];

        let rejectedRequestPropertiesarray = [];
        let rejectedOnSellRequestPropertiesarray = [];
    
        await Promise.all(
          generateArray.map(async (number) => {
            const requestsData = await RealEstateContract.requests(number);
            const propertiesData = await RealEstateContract.properties(number);
    
            const requestsSellPropertyData =
              await RealEstateContract.requestsSellProperty(number);
              const onSellPropertiesData = await RealEstateContract.onSellProperties(number);

              const rejectedRequestPropertiesData = await RealEstateContract.rejectedPropertyRequests(number);
              const rejectedOnSellRequestPropertiesData = await RealEstateContract.rejectedOnSellPropertyRequests(number);

    
            requestsarray.push(requestsData);
            propertiesarray.push(propertiesData);
    
            requestsSellPropertyarray.push(requestsSellPropertyData);
            onsellpropertiesarray.push(onSellPropertiesData);

            rejectedRequestPropertiesarray.push(rejectedRequestPropertiesData);
            rejectedOnSellRequestPropertiesarray.push(rejectedOnSellRequestPropertiesData);
          })
        );

        setRequestsObject(requestsarray);
        setPropertiesObject(propertiesarray);
    
        setRequestsSellPropertyObject(requestsSellPropertyarray);
        setOnSellPropertiesObject(onsellpropertiesarray);

        setrejectedRequestPropertiesObject(rejectedRequestPropertiesarray)
        setRejectedOnSellRequestPropertiesObject(rejectedOnSellRequestPropertiesarray)
    
        await RealEstateContract.checkFeeValues().then((r) => {
          const [individualSellingChargesInPercentage , agencySellingChargesInPercentage , addPropertyFee, sellPropertyFee] = r;
          // console.log(addPropertyFee._hex);
          setAddPropertyFee(formatEther(addPropertyFee._hex));
          setPutOnSellPropertyFee(formatEther(sellPropertyFee._hex))
          setIndividualSellingChargesInPercentage(parseInt(individualSellingChargesInPercentage._hex))
          setAgencySellingChargesInPercentage(parseInt(agencySellingChargesInPercentage._hex))
        });


      } catch (error) {
        console.log('error in fetching')
      }
  }


  // const baseUrl = "https://santa-stella-backend.herokuapp.com";
  const baseUrl = 'http://localhost:5000'
  const values = {
    baseUrl,
    userInfo,
    setUserInfo,
    users,
    setUsers,
    active,
    activate,
    deactivate,
    account,
    chainId,
    realEstateContract,
    tetherTokenContract,
    contractOwner,
    totalProperties,
    setTotalProperties,
    requestsObject,
    setRequestsObject,
    propertiesObject,
    setPropertiesObject,
    requestsSellPropertyObject,
    setRequestsSellPropertyObject,
    onSellpropertiesObject,
    setOnSellPropertiesObject,
    rejectedRequestPropertiesObject,
    rejectedOnSellRequestPropertiesObject,
    fetchDataFunction,
    RealEstateContractAddress,
    // fees
    addpropertyfee,
    putOnSellPropertyFee,
    agencySellingChargesInPercentage,
    individualSellingChargesInPercentage

  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
