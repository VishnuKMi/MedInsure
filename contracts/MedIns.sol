// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract MedicalInsuranceClaim {
    address public patient;
    address public insuranceCompany;
    address public hospital;
    uint8 public constant numConfirmationsRequired = 2;

    struct Claim {
        uint256 claimId; // Added claimId field
        address patient;
        string ipfsHash;
        bool executed;
        bool approvedByHospital;
        bool approvedByInsuranceCompany;
        bool rejectedByOwners;
    }

    uint256 private nextClaimId; // Added nextClaimId variable to track the next claimId value

    mapping(uint256 => mapping(address => bool)) public isConfirmed; // TODO: switch to 'TRUE' after execute
    Claim[] public claims;
    mapping(address => bytes32) public userRole; // New mapping to store user roles

    event ClaimSubmitted(uint256 claimId, address patient, string ipfsHash);
    event ClaimApproved(uint256 claimId, address approver);
    event ClaimRejected(uint256 claimId, address rejecter);
    event ClaimExecuted(uint256 claimId);

    modifier onlyOwners() {
        require(
            userRole[msg.sender] == bytes32("insurance") ||
                userRole[msg.sender] == bytes32("hospital"),
            "Only insurance company and hospital can perform this action"
        );
        _;
    }

    function createClaimReq(
        string memory _ipfsHash,
        address _hospital,
        address _insuranceCompany
    ) public {
        patient = msg.sender;
        insuranceCompany = _insuranceCompany;
        hospital = _hospital;

        userRole[_insuranceCompany] = bytes32("insurance"); // Set initial role for the insurance company
        userRole[_hospital] = bytes32("hospital"); // Set initial role for the hospital

        uint256 claimId = nextClaimId; // Assign the nextClaimId value as the claimId
        nextClaimId++; // Increment the nextClaimId value

        claims.push(
            Claim({
                claimId: claimId,
                patient: msg.sender,
                ipfsHash: _ipfsHash,
                executed: false,
                approvedByHospital: false,
                approvedByInsuranceCompany: false,
                rejectedByOwners: false
            })
        );
        emit ClaimSubmitted(claimId, msg.sender, _ipfsHash);
    }

    function approveClaim(uint256 _claimId) public onlyOwners {
        require(_claimId < claims.length, "Invalid claimId");
        require(
            !isConfirmed[_claimId][msg.sender],
            "Claim is already approved or rejected by the owner"
        );
        isConfirmed[_claimId][msg.sender] = true;
        emit ClaimApproved(_claimId, msg.sender);
        if (isClaimApproved(_claimId)) {
            executeClaim(_claimId);
        } else if (isClaimRejected(_claimId)) {
            emit ClaimRejected(_claimId, msg.sender);
        }
    }

    function rejectClaim(uint256 _claimId) public onlyOwners {
        require(_claimId < claims.length, "Invalid claimId");
        require(
            !isConfirmed[_claimId][msg.sender],
            "Claim is already approved or rejected by the owner"
        );
        isConfirmed[_claimId][msg.sender] = true;
        claims[_claimId].rejectedByOwners = true;
        emit ClaimRejected(_claimId, msg.sender);
    }

    function executeClaim(uint256 _claimId) internal onlyOwners {
        require(_claimId < claims.length, "Invalid claimId");
        require(!claims[_claimId].executed, "Claim is already executed");
        require(
            !claims[_claimId].rejectedByOwners,
            "Claim is rejected by owners"
        );
        claims[_claimId].executed = true;
        claims[_claimId].approvedByHospital = true;
        claims[_claimId].approvedByInsuranceCompany = true;
        emit ClaimExecuted(_claimId);
    }

    function isClaimApproved(uint256 _claimId) public view returns (bool) {
        require(_claimId < claims.length, "Invalid claimId");
        uint256 approvalCount = 0;
        if (
            isConfirmed[_claimId][hospital] &&
            !claims[_claimId].rejectedByOwners
        ) {
            approvalCount++;
        }
        if (
            isConfirmed[_claimId][insuranceCompany] &&
            !claims[_claimId].rejectedByOwners
        ) {
            approvalCount++;
        }
        return approvalCount >= numConfirmationsRequired;
    }

    function isClaimRejected(uint256 _claimId) public view returns (bool) {
        require(_claimId < claims.length, "Invalid claimId");
        return claims[_claimId].rejectedByOwners;
    }

    function isActionTook(uint256 _claimId, address _addrToCheck)
        public
        view
        returns (bool)
    {
        require(_claimId < claims.length, "Invalid claimId");
        return
            isConfirmed[_claimId][_addrToCheck];
    }

    function getUserRole(address checkAddr)
        public
        view
        returns (string memory)
    {
        bytes32 role = userRole[checkAddr];
        if (role == bytes32("insurance")) {
            return "insurance";
        } else if (role == bytes32("hospital")) {
            return "hospital";
        } else {
            return "unknown";
        }
    }

    function getClaims() public view returns (Claim[] memory) {
        return claims;
    }
}
