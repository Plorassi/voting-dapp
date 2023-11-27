// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.12;

contract Election {
    // Formulate a prospective model
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Keep records of accounts that cast votes
    mapping(address => bool) public voters;
    // Save Candidates and Retrieve Candidate
    mapping(uint256 => Candidate) public candidates;
    // Record Candidates Count
    uint256 public candidatesCount;

    // Event triggered when a vote occurs
    event votedEvent(uint256 indexed _candidateId);

    // code that is triggered when contract is deployed
    constructor() public {
        addCandidate("Sailendra");
        addCandidate("Manoj");
        addCandidate("Bhanu");
        addCandidate("Nikhil");
    }

    // functionality to add candidates
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // election voting logic
    function vote(uint256 _candidateId) public {
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount++;

        emit votedEvent(_candidateId);
    }
}
