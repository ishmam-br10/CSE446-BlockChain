/// SPDX-License-Identifier: MIT
/// @author: Ishmam Rofi
/// @title: Checkpoint 1.1

pragma solidity >= 0.8.2 <0.9.0;
// Create a function that takes your studentID of integer value and returns your name. 
//If you enter the ID of any other student, it should return “This is not your ID”. 
// now make the student id sting and compare again
contract Checkpoint1 {
    string private studentID = "24241332";
    string private name = "Ishmam Bin Rofi";

    function StudentName(string memory _studentID) public view returns (string memory) {
        if (keccak256(abi.encodePacked(_studentID)) == keccak256(abi.encodePacked(studentID))) {
            return name;
        } else {
            return "This is not your ID";
        }
    }
}