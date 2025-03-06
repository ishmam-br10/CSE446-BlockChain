/// SPDX-License-Identifier: MIT
/// @author: Ishmam Rofi
/// @title: Checkpoint 4
pragma solidity >= 0.8.2 <0.9.0;

//Write a solidity contract that will take the last two digits of your id .
// If your full id is divisible by those last two digits, 
// return your full name and if it is not divisible, return a message saying not found.
// [you must use at least one local and a state variable ] 

contract Checkpoint4 {
    uint private studentID = 24241332;
    string private name = "Ishmam Bin Rofi";

    function StudentName(uint _studentID) public view returns (string memory) {
        uint lastTwoDigits = _studentID % 100;
        if (studentID % lastTwoDigits == 0) {
            return name;
        } else {
            return "Not Found";
        }
    }
}