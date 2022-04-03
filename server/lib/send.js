module.exports = {sendJSONArrayResult, sendJSONObjectResult}

function sendJSONArrayResult(res, err, result) {
    if (err || result.length === 0)
        res.send([{result: false}])
    else {
        result[0]["result"] = true
        res.send(result)
    }
}

function sendJSONObjectResult(res, err, result, justResult = false) {
    if (err || result.length === 0)
        res.send({result: false})
    else if (justResult)
        res.send({result: true})
    else {
        result["result"] = true
        res.send(result)
    }
}