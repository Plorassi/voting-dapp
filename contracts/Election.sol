// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.12;

contract Election {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidatesCount;

    event votedEvent(uint256 indexed _candidateId);

    constructor() public {
        addCandidate("Sailendra");
        addCandidate("Manoj");
        addCandidate("Bhanu");
        addCandidate("Nikhil");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint256 _candidateId) public {
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount++;

        emit votedEvent(_candidateId);
    }
}
