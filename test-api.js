const fs = require('fs');

async function testApi() {
    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Test",
                email: "test@example.com",
                message: "Hello",
                phone: "(512) 555-1234",
                zip: "78759"
            })
        });


        const text = await response.text();
        let output = `Status: ${response.status}\n`;
        try {
            const data = JSON.parse(text);
            output += `Body: ${JSON.stringify(data, null, 2)}`;
        } catch (e) {
            output += `Body (Text): ${text}`;
        }
        fs.writeFileSync('api_response.log', output);
        console.log('Output written to api_response.log');
    } catch (error) {
        fs.writeFileSync('api_response.log', `Error: ${error}`);
        console.error('Error:', error);
    }
}

testApi();
