pragma solidity >=0.4.22 <0.9.0;

contract Course {
    struct class {
        string userId;
        uint classId;
        string completedDate;
        string name;
        string detail;
        string teacher;
        string category;
    }

    struct classData {
        string completedDate;
        string name;
        string detail;
        string teacher;
        string category;
    }

    class[] cls;
    mapping(bytes32 => classData) public classes;

    function save(
        string memory userId,
        uint classId,
        string memory completedDate,
        string memory name,
        string memory detail,
        string memory teacher,
        string memory category) public returns (bytes32){
        cls.push(class(userId, classId, completedDate, name, detail, teacher, category));
        bytes32 key = keccak256(abi.encode(userId, classId));
        classes[key] = classData(completedDate, name, detail, teacher, category);
        return key;
    }

    function readAll() public view returns (class[] memory) {
        return cls;
    }

    function read(
        string memory userId,
        uint classId) public view returns (classData memory) {
        bytes32 key = keccak256(abi.encode(userId, classId));
        return classes[key];
    }
}
