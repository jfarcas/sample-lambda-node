const { handler } = require('./index');

describe('Lambda Handler', () => {
    let mockContext;
    
    beforeEach(() => {
        mockContext = {
            functionName: 'lambda-test-nodejs',
            awsRequestId: 'test-request-123',
            getRemainingTimeInMillis: () => 30000
        };
        
        // Mock console methods to avoid cluttering test output
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
    });
    
    afterEach(() => {
        jest.restoreAllMocks();
    });

    // Simple dummy test
    test('dummy test - should pass', () => {
        expect(1 + 1).toBe(2);
        expect('hello').toBe('hello');
        expect(true).toBeTruthy();
    });
    
    test('should return hello world with default name', async () => {
        const event = {};
        
        const result = await handler(event, mockContext);
        
        expect(result.statusCode).toBe(200);
        expect(result.headers['Content-Type']).toBe('application/json');
        
        const body = JSON.parse(result.body);
        expect(body.message).toBe('Hello, World!');
        expect(body.runtime).toBe('Node.js 18');
        expect(body.functionName).toBe('lambda-test-nodejs');
        expect(body.requestId).toBe('test-request-123');
        expect(body).toHaveProperty('timestamp');
    });
    
    test('should return hello world with custom name from event.name', async () => {
        const event = { name: 'Alice' };
        
        const result = await handler(event, mockContext);
        
        expect(result.statusCode).toBe(200);
        
        const body = JSON.parse(result.body);
        expect(body.message).toBe('Hello, Alice!');
    });
    
    test('should return hello world with custom name from query parameters', async () => {
        const event = { 
            queryStringParameters: { 
                name: 'Bob' 
            } 
        };
        
        const result = await handler(event, mockContext);
        
        expect(result.statusCode).toBe(200);
        
        const body = JSON.parse(result.body);
        expect(body.message).toBe('Hello, Bob!');
    });
    
    test('should have correct response structure', async () => {
        const event = {};
        
        const result = await handler(event, mockContext);
        
        expect(result).toHaveProperty('statusCode');
        expect(result).toHaveProperty('headers');
        expect(result).toHaveProperty('body');
        
        const body = JSON.parse(result.body);
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('timestamp');
        expect(body).toHaveProperty('runtime');
        expect(body).toHaveProperty('functionName');
        expect(body).toHaveProperty('requestId');
        expect(body).toHaveProperty('region');
        expect(body).toHaveProperty('version');
    });
    
    test('should include CORS headers', async () => {
        const event = {};
        
        const result = await handler(event, mockContext);
        
        expect(result.headers).toHaveProperty('Access-Control-Allow-Origin', '*');
        expect(result.headers).toHaveProperty('Access-Control-Allow-Methods');
        expect(result.headers).toHaveProperty('Access-Control-Allow-Headers');
    });
    
    test('should handle missing context gracefully', async () => {
        const event = {};
        const minimalContext = {};
        
        const result = await handler(event, minimalContext);
        
        expect(result.statusCode).toBe(200);
        
        const body = JSON.parse(result.body);
        expect(body.functionName).toBe('lambda-test-nodejs');
        expect(body.requestId).toBe('local-test');
    });
});