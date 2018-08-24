const http = require("http");
const data = require("./data/inventory");

http.createServer((req, res) => {

    if (req.url === "/") {
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify(data));
    } else if (req.url === "/instock") {
        res.writeHead(200, {"Content-Type": "text/json"});
        listInStock(res);
    } else if (req.url === "/onbackorder") {
        res.writeHead(200, {"Content-Type": "text/json"});
        listOnBackOrder(res);
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 Data not found");
    }
}).listen(3000);

console.log("Server listening on port 3000");


function listInStock(res) {
    let inStock = data.filter(item => {
        return item.avail === "In stock";
    });
    res.end(JSON.stringify(inStock));
}

function listOnBackOrder(res) {
    let onOrder = data.filter(item => {
        return item.avail === "On backorder";
    });
    res.end(JSON.stringify(onOrder));
}