/// SPDX-License-Identifier: MIT
/// @author: Ishmam Rofi
/// @title: Checkpoint 1
pragma solidity ^0.8.0;

contract IssueTracker {
    enum Status { ACTIVE, IN_PROGRESS, COMPLETE, CLOSED }

    struct Issue {
        uint issueId;
        string description;
        Status status;
    }

    mapping(uint => Issue) public issueList;
    uint public issueCount;

    function addIssue(string memory _description, Status _status) public {
        issueCount++;
        issueList[issueCount] = Issue(issueCount, _description, _status);
    }
}