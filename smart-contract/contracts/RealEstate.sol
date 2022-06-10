//SPDX-License-Identifier: Corecis
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract RealEstate is ERC721 {
    // variables
    string public baseURI;
    address public owner;
    uint256 public AddedPropertyID = 1;
    uint256 public addPropertyFee;
    uint256 public sellPropertyFee;

    uint256 public individualSellingChargesInPercentage;
    uint256 public agencySellingChargesInPercentage;
    
    IERC20 public USDT;

        // constructor
    constructor(
        address _owner,
        address _usdt,
        uint256 _individualSellingChargesInPercentage,
        uint256 _agencySellingChargesInPercentage,
        uint256 _addPropertyFee,
        uint256 _sellPropertyFee
    ) ERC721("Santa Stella Token", "SST") {
        owner = _owner;
        USDT = IERC20(_usdt);
        individualSellingChargesInPercentage = _individualSellingChargesInPercentage;
        agencySellingChargesInPercentage = _agencySellingChargesInPercentage;
        addPropertyFee = _addPropertyFee;
        sellPropertyFee = _sellPropertyFee;
    }

    // modifier

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    // struct
    struct Property {
        uint256 id;
        string title;
        string phoneNumber;
        uint256 price;
        address CurrentOwner;
        string details;
        string houseAddress;
        string Pictures;
        bool isAgency;
    }
    struct PropertyRejected {
        uint256 id;
        string title;
        string phoneNumber;
        uint256 price;
        address CurrentOwner;
        string details;
        string houseAddress;
        string Pictures;
        bool isAgency;
        string reasonOfRejection;
    }


    // mappings
    mapping(uint256 => Property) public properties;
    mapping(uint256 => Property) public requests;

    mapping(uint256 => PropertyRejected) public rejectedPropertyRequests;
    mapping(uint256 => PropertyRejected) public rejectedOnSellPropertyRequests;


    mapping(uint256 => Property) public requestsSellProperty;
    mapping(uint256 => Property) public onSellProperties;

    mapping (uint256 => string) public propertyURI;


    // On Sell

    mapping(uint256 => address) public ownerOfProperty;

    function checkFeeValues() public view returns (uint256,uint256,uint256,uint256) {
        return (individualSellingChargesInPercentage,agencySellingChargesInPercentage, addPropertyFee, sellPropertyFee);
    }



    receive() external payable {}

    fallback() external {}

    // Read functions

    function getOwner() public view returns (address) {
        return owner;
    }

    function getCurrentId() public view returns (uint256) {
        return AddedPropertyID;
    }


    function getOwnerOfProperty(uint256 _propertyNo)
        public
        view
        returns (address)
    {
        return ownerOfProperty[_propertyNo];
    }

    // Request to add property function


    function requestToAddProperty(
        string memory _title,
        uint256 _price,
        string memory _phoneNumber,
        string memory _details,
        string memory _houseAddress,
        string memory _picture,
        bool _isAgency,
        string memory _baseURI
    ) public {

        USDT.transferFrom(msg.sender, owner, addPropertyFee);

        propertyURI[AddedPropertyID] = _baseURI;

        requests[AddedPropertyID] = Property(
            AddedPropertyID,
            _title,
            _phoneNumber,
            _price,
            msg.sender,
            _details,
            _houseAddress,
            _picture,
            _isAgency
        );
        AddedPropertyID++;
    }

    // request to sell property function

    function requestToSellProperty(uint256 _propertyId , uint256 _payment) public {

        require(properties[_propertyId].id != 0, "property does not exist");
        require(
            properties[_propertyId].CurrentOwner == msg.sender,
            "you are not the owner of this property"
        );


        USDT.transferFrom(properties[_propertyId].CurrentOwner, owner, sellPropertyFee);

        requestsSellProperty[properties[_propertyId].id] = Property(
            properties[_propertyId].id,
            properties[_propertyId].title,
            properties[_propertyId].phoneNumber,
            _payment,
            properties[_propertyId].CurrentOwner,
            properties[_propertyId].details,
            properties[_propertyId].houseAddress,
            properties[_propertyId].Pictures,
            properties[_propertyId].isAgency
        );


    }


    function updateAddingProperty(
        uint256 _id,
        string memory _title,
        uint256 _price,
        string memory _phoneNumber,
        address _CurrentOwner,
        string memory _details,
        string memory _houseAddress,
        string memory _picture
    ) public {
         USDT.transferFrom(_CurrentOwner, owner, addPropertyFee);

         require(rejectedPropertyRequests[_id].id == _id , "Property does not exist");

        requests[_id] = Property(
            _id,
            _title,
            _phoneNumber,
            _price,
            _CurrentOwner,
            _details,
            _houseAddress,
            _picture,
            rejectedPropertyRequests[_id].isAgency
        );


        rejectedPropertyRequests[_id] = PropertyRejected(0,"","",0,address(0),"","","",false,"");
        delete rejectedPropertyRequests[_id];
    }

    function updateSellingProperty(
        uint256 _id,
        string memory _title,
        uint256 _price,
        string memory _phoneNumber,
        address _CurrentOwner,
        string memory _details,
        string memory _houseAddress,
        string memory _picture
    ) public {
        require(properties[_id].id != 0, "property does not exist");
        require(
            properties[_id].CurrentOwner == msg.sender,
            "you are not the owner of this property"
        );


        USDT.transferFrom(properties[_id].CurrentOwner, owner, sellPropertyFee);
        requestsSellProperty[_id] = Property(
            _id,
            _title,
            _phoneNumber,
            _price,
            _CurrentOwner,
            _details,
            _houseAddress,
            _picture,
            rejectedOnSellPropertyRequests[_id].isAgency
        );

        rejectedOnSellPropertyRequests[_id] = PropertyRejected(0,"","",0,address(0),"","","",false,"");

        delete rejectedOnSellPropertyRequests[_id];



    }


    // buy property function
    function buyProperty(uint256 _propertyId, uint256 _payment , string memory _phoneNumber) public {
        require(
            onSellProperties[_propertyId].id == _propertyId,
            "property is not on sell"
        );
        require(onSellProperties[_propertyId].price == _payment, "please Add Valid Amount");


        if(onSellProperties[_propertyId].isAgency == true){
                                        // 3
            uint256 fee = ((_payment * agencySellingChargesInPercentage)/100 );
            uint256 payment = _payment - fee;
            USDT.transferFrom(msg.sender, owner, fee);
            USDT.transferFrom(
            msg.sender,
            onSellProperties[_propertyId].CurrentOwner,
            payment
        );

        } else if (onSellProperties[_propertyId].isAgency == false) {
            uint256 fee = ( (_payment *individualSellingChargesInPercentage) /100);
            uint256 payment = _payment - fee;
            USDT.transferFrom(msg.sender, owner, fee);
            USDT.transferFrom(
            msg.sender,
            onSellProperties[_propertyId].CurrentOwner,
            payment
        );
        }
        
        properties[onSellProperties[_propertyId].id] = Property(
            onSellProperties[_propertyId].id,
            onSellProperties[_propertyId].title,
            _phoneNumber,
            onSellProperties[_propertyId].price,
            msg.sender,
            onSellProperties[_propertyId].details,
            onSellProperties[_propertyId].houseAddress,
            onSellProperties[_propertyId].Pictures,
            onSellProperties[_propertyId].isAgency
        );

        onSellProperties[_propertyId] = Property(0, "" , "" , 0 , address(0), "", "","",false);

        delete onSellProperties[_propertyId];

        ownerOfProperty[_propertyId] = msg.sender;
    }

    // only Owner
    function ApproveRequestToAddProperty(uint256 _ID, bool _approval , string memory _rejectedReason)
        public
        onlyOwner
    {
        require(requests[_ID].id != 0, "No requested property");
        if (_approval == true) {
            ownerOfProperty[_ID] = requests[_ID].CurrentOwner;
            properties[requests[_ID].id] = Property(
                requests[_ID].id,
                requests[_ID].title,
                requests[_ID].phoneNumber,
                requests[_ID].price,
                requests[_ID].CurrentOwner,
                requests[_ID].details,
                requests[_ID].houseAddress,
                requests[_ID].Pictures,
                requests[_ID].isAgency
            );
            requests[_ID] = Property(0, "" ,"" ,0 , address(0),"","", "",false);
            delete requests[_ID];
        } else if (_approval == false) {

            rejectedPropertyRequests[requests[_ID].id] = PropertyRejected(
                requests[_ID].id,
                requests[_ID].title,
                requests[_ID].phoneNumber,
                requests[_ID].price,
                requests[_ID].CurrentOwner,
                requests[_ID].details,
                requests[_ID].houseAddress,
                requests[_ID].Pictures,
                requests[_ID].isAgency,
                _rejectedReason
            );
            requests[_ID] = Property(0,"","" ,0, address(0), "","","",false);
            delete requests[_ID];
        }
    }



    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }


    // ======== OWNER ========= //

    // Hide identity or show identity from here
    function setBaseURI(string memory __baseURI) external onlyOwner {
        baseURI = __baseURI;
    }

    function ApproveRequestToSellProperty(
        uint256 _pendingSellId,
        bool _approval,
        string memory _rejectedReason
    ) public onlyOwner {
        require(
            requestsSellProperty[_pendingSellId].id == _pendingSellId,
            "property does not exist"
        );

        if (_approval == true) {
            onSellProperties[requestsSellProperty[_pendingSellId].id] = Property(
                requestsSellProperty[_pendingSellId].id,
                requestsSellProperty[_pendingSellId].title,
                requestsSellProperty[_pendingSellId].phoneNumber,
                requestsSellProperty[_pendingSellId].price,
                requestsSellProperty[_pendingSellId].CurrentOwner,
                requestsSellProperty[_pendingSellId].details,
                requestsSellProperty[_pendingSellId].houseAddress,
                requestsSellProperty[_pendingSellId].Pictures,
                requestsSellProperty[_pendingSellId].isAgency
            );

            requestsSellProperty[_pendingSellId] = Property(0,"","",0,address(0),"","","",false);
            properties[_pendingSellId] = Property(0,"","",0, address(0), "","", "",false);
            delete requestsSellProperty[_pendingSellId];
            delete properties[_pendingSellId];
        } 
         if (_approval == false) {

              rejectedOnSellPropertyRequests[requestsSellProperty[_pendingSellId].id] = PropertyRejected(
                requestsSellProperty[_pendingSellId].id,
                requestsSellProperty[_pendingSellId].title,
                requestsSellProperty[_pendingSellId].phoneNumber,
                requestsSellProperty[_pendingSellId].price,
                requestsSellProperty[_pendingSellId].CurrentOwner,
                requestsSellProperty[_pendingSellId].details,
                requestsSellProperty[_pendingSellId].houseAddress,
                requestsSellProperty[_pendingSellId].Pictures,
                requestsSellProperty[_pendingSellId].isAgency,
                _rejectedReason
            );
            
            requestsSellProperty[_pendingSellId] = Property(0,"","",0,address(0),"","","",false);

            delete requestsSellProperty[_pendingSellId];
        }
    }


    function changeAddPropertyFee(uint256 _newFee) public onlyOwner {
        addPropertyFee = _newFee;
    }
    function changeOnSellPropertyFee(uint256 _newFee) public onlyOwner {
        sellPropertyFee = _newFee;
    }
    function changeIndividualSellingCharges(uint256 _newFee) public onlyOwner {
        individualSellingChargesInPercentage = _newFee;
    }
    function changeAgencySellingCharges(uint256 _newFee) public onlyOwner {
        agencySellingChargesInPercentage = _newFee;
    }

    function ChangeOwner(address _owner) public onlyOwner {
        owner = _owner;
    }
}