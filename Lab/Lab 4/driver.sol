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