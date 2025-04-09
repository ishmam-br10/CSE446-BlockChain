// SPDX-License-Identifier: MIT
/// @author: Ishmam Rofi
/// @title: Issue Tracker
pragma solidity ^0.8.0;

contract IssueTracker {
    enum Status { ACTIVE, IN_PROGRESS, COMPLETE, CLOSED }

    struct Issue {
        uint issueId;
        string description;
        Status status;
    }

    mapping(uint => Issue) private issueList;  // made private
    uint public issueCount;

    // Made external
    function addIssue(string calldata _description, Status _status) external {
        require(_status == Status.ACTIVE, "Initial status must be ACTIVE");
        issueCount++;
        issueList[issueCount] = Issue(issueCount, _description, _status);
    }

    // Made external
    function updateIssueStatus(uint _issueId, Status _newStatus) external {
        require(_issueId > 0 && _issueId <= issueCount, "Invalid issueId");
        Issue storage issue = issueList[_issueId];

        if (issue.status == Status.ACTIVE) {
            require(_newStatus == Status.IN_PROGRESS, "ACTIVE IN_PROGRESS");
        } else if (issue.status == Status.IN_PROGRESS) {
            require(_newStatus == Status.COMPLETE, "IN_PROGRESS to COMPLETE");
        } else if (issue.status == Status.COMPLETE) {
            require(_newStatus == Status.CLOSED, "COMPLETE to CLOSED");
        } else {
            revert("CLOSED issues can't be updated");
        }

        issue.status = _newStatus;
    }

    
    function getIssue(uint _issueId) external view returns (Issue memory) {
        require(_issueId > 0 && _issueId <= issueCount, "Invalid issueId");
        return issueList[_issueId];
    }
}

/// DRIVERRRRRR

// SPDX-License-Identifier: MIT
/// @author: Ishmam Rofi
/// @title: Driver
pragma solidity ^0.8.0;

import "./IssueTracker.sol";

contract Driver {
    IssueTracker public tracker;

    constructor(address _trackerAddress) {
        tracker = IssueTracker(_trackerAddress);
    }

    function driverAddIssue(string calldata _description) external {
        tracker.addIssue(_description, IssueTracker.Status.ACTIVE);
    }

    function driverUpdateStatus(uint _id, IssueTracker.Status _newStatus) external {
        tracker.updateIssueStatus(_id, _newStatus);
    }

    function getIssue(uint _id) external view returns (
        uint issueId,
        string memory description,
        IssueTracker.Status status
    ) {
        IssueTracker.Issue memory issue = tracker.getIssue(_id);
        return (issue.issueId, issue.description, issue.status);
    }
}