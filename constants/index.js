export const CONTRACT_ADDRESS = '0x4Bf5c68549F8425CD6eA084a2680280D7A90DEd5'
export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'approver',
        type: 'address'
      }
    ],
    name: 'ClaimApproved',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimId',
        type: 'uint256'
      }
    ],
    name: 'ClaimExecuted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'rejecter',
        type: 'address'
      }
    ],
    name: 'ClaimRejected',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'patient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'ipfsHash',
        type: 'string'
      }
    ],
    name: 'ClaimSubmitted',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_claimId',
        type: 'uint256'
      }
    ],
    name: 'approveClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'claims',
    outputs: [
      {
        internalType: 'address',
        name: 'patient',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'ipfsHash',
        type: 'string'
      },
      {
        internalType: 'bool',
        name: 'executed',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'approvedByHospital',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'approvedByInsuranceCompany',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'rejectedByOwners',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_ipfsHash',
        type: 'string'
      },
      {
        internalType: 'address',
        name: '_hospital',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_insuranceCompany',
        type: 'address'
      }
    ],
    name: 'createClaimReq',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getClaims',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'patient',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'ipfsHash',
            type: 'string'
          },
          {
            internalType: 'bool',
            name: 'executed',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'approvedByHospital',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'approvedByInsuranceCompany',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'rejectedByOwners',
            type: 'bool'
          }
        ],
        internalType: 'struct MedicalInsuranceClaim.Claim[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'checkAddr',
        type: 'address'
      }
    ],
    name: 'getUserRole',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'hospital',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'insuranceCompany',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_claimId',
        type: 'uint256'
      }
    ],
    name: 'isClaimApproved',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_claimId',
        type: 'uint256'
      }
    ],
    name: 'isClaimRejected',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'isConfirmed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'numConfirmationsRequired',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'patient',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_claimId',
        type: 'uint256'
      }
    ],
    name: 'rejectClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'userRole',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]
