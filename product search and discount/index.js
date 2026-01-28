const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url.startsWith("/product")) {
        const parsedUrl = url.parse(req.url, true);
        const { name, price, discount } = parsedUrl.query;


        if (!name || !price || !discount) {
            res.writeHead(400, { "Content-Type": "text/html" });
            return res.end("<h2>Missing product details</h2>");
        }

        const originalPrice = Number(price);
        const discountPercent = Number(discount);
        const finalPrice = originalPrice - (originalPrice * discountPercent) / 100;


        const logEntry = `${new Date().toLocaleString()} | ${name} | ₹${originalPrice} | ${discountPercent}%\n`;
        fs.appendFile("searches.txt", logEntry, (err) => {
            if (err) console.error("Failed to log search");
        });

 
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Product Price</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: #f4f6f8;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    .card {
                        background: white;
                        padding: 25px;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        width: 320px;
                    }
                    h2 {
                        margin-bottom: 15px;
                        color: #333;
                    }
                    p {
                        margin: 8px 0;
                        color: #555;
                    }
                    .final {
                        font-size: 18px;
                        font-weight: bold;
                        color: #2c7be5;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>${name}</h2>
                    <p>Original Price: ₹${originalPrice}</p>
                    <p>Discount: ${discountPercent}%</p>
                    <p class="final">Final Price: ₹${finalPrice}</p>
                </div>
            </body>
            </html>
        `);
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h2>Page Not Found</h2>");
    }
});

server.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});