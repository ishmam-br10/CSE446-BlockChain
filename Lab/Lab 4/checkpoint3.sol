/// SPDX-License-Identifier: MIT
/// @author: Ishmam Rofi
/// @title: Checkpoint 3
pragma solidity ^0.8.0;

contract StringSlicer {
    string private storedString;

    function storeString(string memory _string) public {
        storedString = _string;
    }

    function getSlicedString(uint startIndex, uint endIndex) public view returns (string memory) {
        // require(startIndex <= endIndex, "Start index must be less than or equal to end index");
        // require(endIndex < bytes(storedString).length, "End index out of bounds");

        bytes memory strBytes = bytes(storedString);
        bytes memory result = new bytes(endIndex - startIndex + 1);

        for (uint i = startIndex; i <= endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }

        return string(result);
    }
}