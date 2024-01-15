const { Tedis } = require("tedis");
const express = require('express');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const OS = require('os');
const ENV = 'DEV';


const app = express();
const client = new Tedis({
  port: 6379,
  host: "127.0.0.1",
});
// App
app.get('/', (req, res) => {
  //******************************************* */
  setTimeout(async () => {
    let res;
    /**
     * base
     */
    res = await client.command("FLUSHDB");
    console.log(res);
    // "OK"
    res = await client.command("SET", "key1", "Hello");
    console.log(res);
    // "OK"
    res = await client.command("SET", "key2", "World");
    console.log(res);
    // "OK"
  
    /**
     * key
     */
    res = await client.keys("*");
    console.log(res);
    // ["key2","key1"];
    res = await client.del("key1");
    console.log(res);
    // 1
  
    /**
     * string
     */
    res = await client.set("mystring", "hello");
    console.log(res);
    // "OK"
    res = await client.get("mystring");
    console.log(res);
    // "hello"
  
    /**
     * hash
     */
    res = await client.hmset("myhash", {
      name: "tedis",
      age: 18
    });
    console.log(res);
    // "OK"
    res = await client.hgetall("myhash");
    console.log(res);
    // {
    //   "name": "tedis",
    //   "age": "18"
    // }
  
    /**
     * list
     */
    res = await client.lpush("mylist", "hello", "a", "b", "c", "d", 1, 2, 3, 4);
    console.log(res);
    // 9
    res = await client.llen("mylist");
    console.log(res);
    // 9
  
    /**
     * set
     */
    res = await client.sadd("myset", "hello");
    console.log(res);
    // 1
    res = await client.sadd("myset", "tedis");
    console.log(res);
    // 1
    res = await client.scard("myset");
    console.log(res);
    // 2
  
    /**
     * zset
     */
    res = await client.zadd("myzset", {
      one: 1,
      two: 2,
      three: 3
    });
    console.log(res);
    // 3
    res = await client.zcard("myzset");
    console.log(res);
    // 3
  
    // close
    client.close();
  }, 3000);
  //******************************************* */
  res.statusCode = 200;
  const msg = 'Rendering through K8s/EKS Cluster running from an AWS - Container Name: ConfigService:v1.8';
  res.send(getPage(msg));
});

app.get('/test', (req, res) => {
  client.set('Name1', 'FredJabbari1');
  var respx = client.get('Name1');
  console.log('xxx:===>', respx);
  res.statusCode = 200;
  const msg = 'Config SVC running on K8s EKS Cluster1';
  res.send(getPage(msg));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

function getPage(message) {

  let body = "<!DOCTYPE html>\n"
    + "<html>\n"
    + "<style>\n"
    + "body, html {\n"
    + "  height: 100%;\n"
    + "  margin: 0;\n"
    + "}\n"
    + "\n"
    + ".bgimg {\n"
    + "  background-image: url('https://www.w3schools.com/html/pic_trulli.jpg');\n"
    + "  height: 100%;\n"
    + "  background-position: center;\n"
    + "  background-size: cover;\n"
    + "  position: relative;\n"
    + "  color: pink;\n"
    + "  font-family: \"Courier New\", Courier, monospace;\n"
    + "  font-size: 25px;\n"
    + "}\n"
    + "\n"
    + ".topleft {\n"
    + "  position: absolute;\n"
    + "  top: 0;\n"
    + "  left: 16px;\n"
    + "}\n"
    + "\n"
    + ".bottomleft {\n"
    + "  position: absolute;\n"
    + "  bottom: 0;\n"
    + "  left: 16px;\n"
    + "}\n"
    + "\n"
    + ".middle {\n"
    + "  position: absolute;\n"
    + "  top: 50%;\n"
    + "  left: 50%;\n"
    + "  transform: translate(-50%, -50%);\n"
    + "  text-align: center;\n"
    + "}\n"
    + "\n"
    + "hr {\n"
    + "  margin: auto;\n"
    + "  width: 40%;\n"
    + "}\n"
    + "</style>\n"
    + "<body>\n"
    + "\n"
    + "<div class=\"bgimg\">\n"
    + "  <div class=\"topleft\">\n"
    + "    <p>ENVIRONMENT: " + ENV + "</p>\n"
    + "  </div>\n"
    + "  <div class=\"topleft\">\n"
    + "    <h1>Published from EKS Cluster in AWS..</h1>\n"
    + "    <hr>\n"
    + "    <p>" + OS.hostname() + "</p>\n"
    + "  </div>\n"
    + "  <div class=\"middle\">\n"
    + "    <h2><p>" + message + "</p></h2>\n"
    + "  </div>\n"
    + "</div>\n"
    + "\n"
    + "</body>\n"
    + "</html>\n";
  return body;
}
