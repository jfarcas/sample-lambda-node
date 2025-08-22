// const AWS = require('aws-sdk'); // Commented out as not currently used

/**
 * Simple Lambda function that returns a hello world message
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context - Lambda Context runtime methods and attributes
 * @returns {Object} - API Gateway Lambda Proxy Output Format
 */
exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    try {
        // Extract name from event or use default
        const name = event.name || event.queryStringParameters?.name || 'World';
        
        // Create response
        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                message: `Hello, ${name}!`,
                timestamp: new Date().toISOString(),
                runtime: 'Node.js 18',
                functionName: context.functionName || 'lambda-test-nodejs',
                requestId: context.awsRequestId || 'local-test',
                region: process.env.AWS_REGION || 'eu-west-1',
                version: process.env.AWS_LAMBDA_FUNCTION_VERSION || '$LATEST'
            })
        };
        
        console.log('Response:', JSON.stringify(response, null, 2));
        return response;
        
    } catch (error) {
        console.error('Error processing request:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message,
                timestamp: new Date().toISOString(),
                requestId: context.awsRequestId || 'local-test'
            })
        };
    }
};