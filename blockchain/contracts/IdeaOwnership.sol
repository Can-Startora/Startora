// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IdeaOwnership
 * @dev Manages the registration of startup ideas for proof-of-ownership (IP Protection).
 */
contract IdeaOwnership {
    struct IdeaRecord {
        address owner;
        string ideaId;
        bytes32 ideaHash;
        string ipfsHash;
        uint256 timestamp;
        uint256 blockNumber;
    }

    // Mapping from ideaHash to its registration record
    mapping(bytes32 => IdeaRecord) private _records;
    
    // Mapping from ideaId (string) to its registration record
    mapping(string => IdeaRecord) private _idRecords;

    // Events
    event IdeaRegistered(
        address indexed owner,
        string ideaId,
        bytes32 indexed ideaHash,
        string ipfsHash,
        uint256 timestamp,
        uint256 blockNumber
    );

    /**
     * @dev Registers a new startup idea hash for proof of ownership.
     * @param ideaId The unique string identifier from the database.
     * @param ideaHash The cryptographic hash representing the idea's detailed description.
     * @param ipfsHash The IPFS hash representing the detailed JSON file of the idea.
     */
    function registerIdea(
        string calldata ideaId,
        bytes32 ideaHash,
        string calldata ipfsHash
    ) external {
        require(ideaHash != bytes32(0), "Idea ownership: Hash cannot be empty");
        require(bytes(ideaId).length > 0, "Idea ownership: ID cannot be empty");
        require(_records[ideaHash].owner == address(0), "Idea ownership: Idea hash already registered");
        require(_idRecords[ideaId].owner == address(0), "Idea ownership: Idea ID already registered");

        IdeaRecord memory record = IdeaRecord({
            owner: msg.sender,
            ideaId: ideaId,
            ideaHash: ideaHash,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp,
            blockNumber: block.number
        });

        _records[ideaHash] = record;
        _idRecords[ideaId] = record;

        emit IdeaRegistered(
            msg.sender,
            ideaId,
            ideaHash,
            ipfsHash,
            block.timestamp,
            block.number
        );
    }

    /**
     * @dev Retrieves registration details for a specific idea hash.
     */
    function getRecordByHash(bytes32 ideaHash) external view returns (
        address owner,
        string memory ideaId,
        string memory ipfsHash,
        uint256 timestamp,
        uint256 blockNumber
    ) {
        IdeaRecord memory record = _records[ideaHash];
        require(record.owner != address(0), "Idea ownership: Hash not registered");
        return (
            record.owner,
            record.ideaId,
            record.ipfsHash,
            record.timestamp,
            record.blockNumber
        );
    }

    /**
     * @dev Retrieves registration details for a specific idea ID.
     */
    function getRecordById(string calldata ideaId) external view returns (
        address owner,
        bytes32 ideaHash,
        string memory ipfsHash,
        uint256 timestamp,
        uint256 blockNumber
    ) {
        IdeaRecord memory record = _idRecords[ideaId];
        require(record.owner != address(0), "Idea ownership: ID not registered");
        return (
            record.owner,
            record.ideaHash,
            record.ipfsHash,
            record.timestamp,
            record.blockNumber
        );
    }
}
