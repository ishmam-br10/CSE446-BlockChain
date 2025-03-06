pragma solidity >= 0.8.2 <0.9.0;
// Create a function that takes your studentID of integer value and returns your name. 
//If you enter the ID of any other student, it should return “This is not your ID”. 

contract Checkpoint1 {
    uint256 studentID = 24241332;
    string name = "Ishmam Bin Rofi";
    
    function StudentName(uint256 _studentID) public view returns(string memory) {
        if(_studentID == studentID) {
            return name;
        } else {
            return "This is not your ID";
        }
    }
}