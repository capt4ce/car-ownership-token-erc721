pragma solidity ^0.4.17;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract CarOwnershipToken is ERC721Token, Ownable {
    string public constant name = "CarOwnershipToken";
    string public constant symbol = "COT";
    mapping(address => uint256) tokens;

    struct Car {
        string code;
        string img;
    }

    Car[] public cars;

    constructor() public ERC721Token(name, symbol) {}

    // function getCars() public view returns (Car[] carsReturn) {
    //     carsReturn = cars;
    // }

    function getCar(uint256 _carId)
        public
        view
        returns (string code, string img)
    {
        Car memory _grad = cars[_carId];

        code = _grad.code;
        img = _grad.img;
    }

    function mint(string _code, string _img) public payable onlyOwner {
        Car memory _gradient = Car({code: _code, img: _img});
        uint256 _carId = cars.push(_gradient) - 1;

        _mint(msg.sender, _carId);
    }

    // function approval(
    //     address _owner,
    //     address _approved,
    //     uint256 _tokenId
    // ) {
    //     require(tokens[_owner] == _tokenId);
    //     tokens[_approved] = _tokenId;
    // }

    // function transfer(address _to, uint256 _amount) public payable {
    //     require(_amount <= tokens[msg.sender]);
    //     tokens[msg.sender] -= _amount;
    //     tokens[_to] += _amount;
    // }

    // function balanceOf(address _owner) public view returns (uint256) {
    //     return tokens[_owner];
    // }

    // function ownerOf(uint256 _tokenId) public view returns (address) {
    //     return tokens[_tokenId].from;
    // }

    // function TransferFrom(
    //     address _from,
    //     address _to,
    //     uint256 _tokenId
    // ) payable {
    //     require(tokens[_from] == _tokenId);
    //     tokens[_from] = 0;
    //     tokens[_to] = _tokenId;
    // }

    // function approve(address _approved, uint256 _tokenId) payable {
    //     require(tokens[msg.sender] == _tokenId);
    //     tokens[_approved] = _tokenId;
    // }
}

// pragma solidity ^0.4.24;

// import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

// // import "zeppelin-solidity/contracts/ownership/Ownable.sol";

// contract CarOwnershipToken is ERC721Token {
//     struct Car {
//         string code;
//         string name;
//         string img;
//     }

//     string public constant name = "CarOwnershipToken";
//     string public constant symbol = "COT";
//     Car[] public cars;

//     constructor() public {}

//     function mint(
//         string _code,
//         string _name,
//         string _img
//     ) {
//         Car memory _car = Car({code: _code, name: _name, img: _img});
//         uint256 _carId = cars.push(_car) - 1;

//         _mint(msg.sender, _carId);
//     }

//     function getCar(uint256 _carId)
//         public
//         view
//         returns (
//             string code,
//             string name,
//             string img
//         )
//     {
//         Car memory _car = cars[_carId];

//         code = _car.code;
//         name = _car.name;
//         img = _car.img;
//     }
// }
