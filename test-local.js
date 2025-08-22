const { handler } = require('./index');

// Mock context for local testing
const mockContext = {
    functionName: 'lambda-test-nodejs',
    awsRequestId: 'local-test-' + Date.now(),
    getRemainingTimeInMillis: () => 30000
};

async function testLocally() {
    console.log('🚀 Testing Lambda function locally...\n');
    
    try {
        // Test 1: Default name
        console.log('Test 1: Default name');
        const result1 = await handler({}, mockContext);
        console.log('Status Code:', result1.statusCode);
        console.log('Response:', JSON.parse(result1.body));
        console.log('---\n');
        
        // Test 2: Custom name in event
        console.log('Test 2: Custom name in event');
        const result2 = await handler({ name: 'Developer' }, mockContext);
        console.log('Status Code:', result2.statusCode);
        console.log('Response:', JSON.parse(result2.body));
        console.log('---\n');
        
        // Test 3: Custom name in query parameters
        console.log('Test 3: Custom name in query parameters');
        const result3 = await handler({ 
            queryStringParameters: { name: 'GitHub Actions' } 
        }, mockContext);
        console.log('Status Code:', result3.statusCode);
        console.log('Response:', JSON.parse(result3.body));
        console.log('---\n');
        
        // Test 4: API Gateway event structure
        console.log('Test 4: API Gateway event structure');
        const apiGatewayEvent = {
            httpMethod: 'GET',
            path: '/hello',
            queryStringParameters: { name: 'API User' },
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        };
        const result4 = await handler(apiGatewayEvent, mockContext);
        console.log('Status Code:', result4.statusCode);
        console.log('Response:', JSON.parse(result4.body));
        
        console.log('\n✅ All local tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Error during local testing:', error);
        process.exit(1);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    testLocally();
}

module.exports = { testLocally };