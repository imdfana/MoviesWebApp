const randomBytes = require('crypto').randomBytes;

const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var params = {
		    TableName : "Movies"
		};
		
		let httpMethod = event.httpMethod
    if (httpMethod === 'GET') {
      db.scan(params, function(err, data) {
			    if (err) {
			        errorResponse(err,context.awsRequestId, callback);
			    } else {
			        callback(null, {
		            statusCode: 201,
		            body: JSON.stringify(data.Items),
		            headers: {
		                'Access-Control-Allow-Origin': '*',
	            	},
	        		});
			    }
			});
      
    } else if (httpMethod === 'POST') {
    	const id = randomBytes(16);
    	console.log('Received event (', id, '): ', event);
    	const username = event.requestContext.authorizer.claims['cognito:username'];
    	const bdy = JSON.parse(event.body);
    	recordMovie(id,bdy.name,
    							bdy.description, 
    							bdy.picture,
    							bdy.status,
    							bdy.user).then(() => {
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({}),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
	    }).catch((err) => {
	    	 errorResponse(err,context.awsRequestId, callback);
	    });
    }
};

function recordMovie(id, name, description, picture, status, user) {
    return db.put({
        TableName: 'Movies',
        Item: {
            id: id.toString(),
            name: name,
            description: description,
            picture: picture,
            status: status,
            user: user,
            RequestTime: new Date().toISOString(),
        },
    }).promise();
};

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}