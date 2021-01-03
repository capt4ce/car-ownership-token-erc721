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
}
