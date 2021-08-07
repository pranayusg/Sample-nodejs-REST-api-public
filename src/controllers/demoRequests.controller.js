const getRequests=(req, res) => {
    res.status(200).json({
        message: 'Handling GET request.',
        description: 'The GET method is used to retreive data from a server at the specified resource.Since a GET request is only requesting data and not modifying any resources, its considered a safe and idempotent method.GET reqs are read only while others write something on server'
    })
}

const statuscodes=(req, res) => {
    res.status(200).json({
        '1xx': 'Informational – Communicates transfer protocol-level information.',
        '2xx': 'Success – Indicates that the client’s request was accepted successfully. ',
        '3xx': 'Redirection – Indicates that the client must take some additional action in order to complete their request.',
        '4xx': 'Client Error – This category of error status codes points the finger at clients. ',
        '5xx': 'Server Error – The server takes responsibility for these error status codes.',
        '100': '(Informational) — Server acknowledges a request',
        '200': '(Success) — Server completed the request as expected',
        '300': '(Redirection) — Client needs to perform further actions to complete the request',
        '400': 'Bad Request — Client sent an invalid request — such as lacking required request body or parameter',
        '401': 'Unauthorized — Client failed to authenticate with the server',
        '403': 'Forbidden — Client authenticated but does not have permission to access the requested resource',
        '404': 'Not Found — The requested resource does not exist',
        '412': 'Precondition Failed — One or more conditions in the request header fields evaluated to false',
        '500': 'Internal Server Error — Server failed to fulfill a valid request due to an error with server',
        '503': 'Service Unavailable — The requested service is not available'
    })
}

const parameters=(req, res) => {
    res.status(200).json({
        description: 'Parameters are options you can pass with the endpoint (such as specifying the response format or the amount returned) to influence the response.There are several types of parameters: header parameters, path parameters, and query string parameters.',
        headerParameters: 'Parameters included in the request header, usually related to authorization.',
        pathParameters: 'Parameters within the path of the endpoint, before the query string (?). These are usually set off within curly braces.',
        queryStringParameters: 'Parameters in the query string of the endpoint, after the ?.'
    })
}

const pathParameter= (req, res) => {
    try {
        const pathparameter = req.params.pathparameter
        res.status(200).json({
            message: 'GET request with path parameter',
            pathparameter: pathparameter
        })
    }
    catch (e) {
        res.status(400).json({
            message: 'Path parameter client error.'
        })
    }
}

const postRequests=(req, res) => {
    try {
        const userInfo = {
            name: req.body.name,
            description: req.body.description
        }
        res.status(200).json({
            message: 'POST request with JSON body',
            userInfo: userInfo,
            description: "POST requests are used to send data to the API server to create or udpate a resource. The data sent to the server is stored in the request body of the HTTP request.Data can be sent in JSON, XML, or query parameters (there's plenty of other formats, but these are the most common).It's worth noting that a POST request is non-idempotent. It mutates data on the backend server (by creating or updating a resource), as opposed to a GET request which does not change any data."
        })
    }
    catch (e) {
        res.status(400).json({
            message: 'Please provide your info in JSON format correctly for name and description'
        })
    }
}

const queryParameters=(req, res) => {
    try {
        let name = req.query.name
        let description = req.query.description
        res.status(200).json({
            message: 'POST request with query parameters',
            userInfo: { name: name, description: description },
            description: "POST requests are used to send data to the API server to create or udpate a resource. The data sent to the server is stored in the request body of the HTTP request.Data can be sent in JSON, XML, or query parameters (there's plenty of other formats, but these are the most common).It's worth noting that a POST request is non-idempotent. It mutates data on the backend server (by creating or updating a resource), as opposed to a GET request which does not change any data."
        })
    }
    catch (e) {
        res.status(400).json({
            message: 'Please use POST request with query parameters properly'
        })
    }
}

const patchRequests=(req, res) => {
    res.status(200).json({
        message: 'Handling PATCH request',
        description: 'PATCH requests are to make partial update on a resource. Also PUT requests modifys a resource entity, so to make more clear – PATCH method is the correct choice for partially updating an existing resource, and PUT should only be used if you’re replacing a resource in its entirety.'
    })
}

const deleteRequests= (req, res) => {
    res.status(200).json({
        message: 'Handling DELETE request',
        description: 'The DELETE method requests that the origin server delete the resource recognized by the Request-URI.A successful response of DELETE requests SHOULD be HTTP response code 200 (OK) if the response includes an entity describing the status, 202 (Accepted) if the action has been queued, or 204 (No Content) if the action has been performed but the response does not include an entity.'
    })
}


module.exports={getRequests,statuscodes,parameters,pathParameter,postRequests,queryParameters,patchRequests,deleteRequests}