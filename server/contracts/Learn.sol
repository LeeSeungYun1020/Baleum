pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Learn {

    struct process {
        uint classId;
        uint contentId;
        string userId;
        string date;
        string state;
        uint score;
        string feedback;
    }

    struct processData {
        string date;
        string state;
        uint score;
        string feedback;
    }

    process[] pcs;
    mapping(bytes32 => processData) public processes;

    function save(
        uint classId,
        uint contentId,
        string memory userId,
        string memory date,
        string memory state,
        uint score,
        string memory feedback) public returns (bytes32){
        pcs.push(process(classId, contentId, userId, date, state, score, feedback));
        bytes32 key = keccak256(abi.encode(classId, contentId, userId));
        processes[key] = processData(date, state, score, feedback);
        return key;
    }

    function readAll() public view returns (process[] memory) {
        return pcs;
    }

    function read(
        uint classId,
        uint contentId,
        string memory userId) public view returns (processData memory) {
        bytes32 key = keccak256(abi.encode(classId, contentId, userId));
        return processes[key];
    }

    function readByKey(bytes32 key) public view returns (processData memory) {
        return processes[key];
    }
}
