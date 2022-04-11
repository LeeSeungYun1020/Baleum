import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Learn.sol";

contract TestLearn {
    Learn learn = Learn(DeployedAddresses.Learn());
    bytes32 testKey = keccak256(abi.encode(1, 1, "ileilliat@gmail.com"));

    function testSave() public {
        bytes32 returned = learn.save(1, 1, "ileilliat@gmail.com", "2022-04-05 08:17:49", "complete", 100, "intro");
        Assert.equal(returned, testKey, "Test save");
    }

    function testReadAll() public {
        Learn.process[] memory pcs;
        pcs = learn.readAll();
        Assert.equal(pcs, testProcess, "Test readAll");
    }

    function testRead() public {
        Learn.processData memory returned = learn.read(1, 1, "ileilliat@gmail.com");
        Assert.equal(returned, testProcessData, "Test read");
    }

    function testReadByKey() public {
        Learn.processData memory returned = learn.readByKey(testKey);
        Assert.equal(returned, testProcessData, "Test readByKey");
    }
}
