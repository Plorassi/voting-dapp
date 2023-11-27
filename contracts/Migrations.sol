// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.12;

contract Migrations {

    // Contract trigger address
    address public owner = msg.sender;
    uint256 public last_completed_migration;

    // check if the sender is the owner of the contract
    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    // This is a public restricted function, to test
    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }
}
