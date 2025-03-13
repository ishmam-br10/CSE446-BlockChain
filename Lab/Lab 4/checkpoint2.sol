/// SPDX-License-Identifier: MIT
/// @author: Ishmam Rofi
/// @title: Checkpoint 2
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
        require(_status == Status.ACTIVE, "Initial status must be ACTIVE");
        issueCount++;
        issueList[issueCount] = Issue(issueCount, _description, _status);
    }

    function updateIssueStatus(uint _issueId, Status _newStatus) public {
        Issue storage issue = issueList[_issueId];
        require(_issueId > 0 && _issueId <= issueCount, "Invalid issueId");

        if (issue.status == Status.ACTIVE) {
            require(_newStatus == Status.IN_PROGRESS, "Can only update ACTIVE to IN_PROGRESS");
        } else if (issue.status == Status.IN_PROGRESS) {
            require(_newStatus == Status.COMPLETE, "Can only update IN_PROGRESS to COMPLETE");
        } else if (issue.status == Status.COMPLETE) {
            require(_newStatus == Status.CLOSED, "Can only update COMPLETE to CLOSED");
        } else {
            revert("Cannot update CLOSED issue");
        }

        issue.status = _newStatus;
    }
}