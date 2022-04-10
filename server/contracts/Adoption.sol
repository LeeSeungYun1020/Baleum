pragma solidity >=0.4.22 <0.9.0;

contract Adoption {
    address [16] public adopters;

    function adopt(uint petId) public returns (uint) {
        require(0 <= petId && petId <= 15);
        // require 조건 확인
        adopters[petId] = msg.sender;
        // 이 함수 실행하는 사람이나 스마트 컨트랙트는 msg.sender
        return petId;
    }

    // view 함수는 데이터 변경없이 조회만 수행, cpp의 const 멤버 함수와 유사
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}
