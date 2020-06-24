pragma solidity 0.4.25;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    mapping(uint => Candidate) public candidates_p;
    mapping(uint => Candidate) public candidates_d;
    // Store Candidates Count
    uint public candidatesCount;
    uint public candidatesCount_p;
    uint public candidatesCount_d;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        addCandidate("Candidate 3");
        addCandidate_p("Candidate 1");
        addCandidate_p("Candidate 2");
        addCandidate_p("Candidate 3");
        addCandidate_p("Candidate 4");
        addCandidate_d("Candidate 1");
        addCandidate_d("Candidate 2");
        addCandidate_d("Candidate 3");
        addCandidate_d("Candidate 4");
        addCandidate_d("Candidate 5");
    }

    function addCandidate (string _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
    function addCandidate_p (string _name) private {
        candidatesCount_p ++;
        candidates_p[candidatesCount_p] = Candidate(candidatesCount_p, _name, 0);
    }
    function addCandidate_d (string _name) private {
        candidatesCount_d ++;
        candidates_d[candidatesCount_d] = Candidate(candidatesCount_d, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
    function vote_p (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount_p);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates_p[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
    function vote_d (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount_d);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates_d[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
