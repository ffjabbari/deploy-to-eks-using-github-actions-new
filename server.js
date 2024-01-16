//const { redis } = require("redis");
//import { createClient } from "redis";
//let { redis } = require("redis");
var RedisClustr = require('redis-clustr');
var RedisClient = require('redis');
//var config = require("./config.json");
const express = require('express');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const OS = require('os');
const ENV = 'DEV';

const app = express();


var redis = new RedisClustr({
  servers: [
      {
          host: "f7i-c21n-m2n-redis-001.f7i-c21n-m2n-redis.vwfcil.use1.cache.amazonaws.com",
          port: "6379" 
      }
  ],
  createClient: function (port, host) {
      // this is the default behaviour
      return RedisClient.createClient(port, host);
  }
});

//   port: 6379,
//   host: "127.0.0.1",
  //host: "master.f7i-c21n-m2n-redis.vwfcil.use1.cache.amazonaws.com",
//   host: "f7i-c21n-m2n-redis-001.f7i-c21n-m2n-redis.vwfcil.use1.cache.amazonaws.com",
//   connectTimeout: 17000,
//   maxRetriesPerRequest: 4,
//   retryStrategy: (times) => Math.min(times * 30, 1000),
//   reconnectOnError: (error)  => {
//          const targetErrors = [/READONLY/, /ETIMEDOUT/];
//          return targetErrors.some((targetError) => targetError.test(error.message));
//  }
  //port: 6379,
  //host: "master.f7i-c21n-m2n-redis.vwfcil.use1.cache.amazonaws.com",
  // host: "f7i-c21n-m2n-redis-001.f7i-c21n-m2n-redis.vwfcil.use1.cache.amazonaws.com",
  // host: "127.0.0.1",
// });
// App
app.get('/', (req, res) => {

//******************************************* */
//check the functioning
redis.set("framework2", "AngularJS2", function (err, reply) {
  console.log("redis.set2 " , reply);
});

redis.get("framework2", function (err, reply) {
  console.log("redis.get2 ", reply);
}); 
//******************************************* */
  // //******************************************* */
  // setTimeout(async () => {
  //   let res;
  //   /**
  //    * base
  //    */
  //   res = await redis.command("FLUSHDB");
  //   console.log(res);
  //   // "OK"
  //   res = await redis.command("SET", "key1", "Hello");
  //   console.log(res);
  //   // "OK"
  //   res = await redis.command("SET", "key2", "World");
  //   console.log(res);
  //   // "OK"
  
  //   /**
  //    * key
  //    */
  //   res = await redis.keys("*");
  //   console.log(res);
  //   // ["key2","key1"];
  //   res = await redis.del("key1");
  //   console.log(res);
  //   // 1
  
  //   /**
  //    * string
  //    */
  //   // res = await redis.set("mystring", "hello");
  //   // console.log(res);
  //   // // "OK"
  //   // res = await redis.get("mystring");
  //   // console.log(res);
  //   // "hello"
  
  //   /**
  //    * hash
  //    */
  //   // res = await redis.hmset("myhash", {
  //   //   name: "tedis",
  //   //   age: 18
  //   // });
  //   // console.log(res);
  //   // // "OK"
  //   // res = await redis.hgetall("myhash");
  //   // console.log(res);
  //   // {
  //   //   "name": "tedis",
  //   //   "age": "18"
  //   // }
  
  //   /**
  //    * list
  //    */
  //   // res = await redis.lpush("mylist", "hello", "a", "b", "c", "d", 1, 2, 3, 4);
  //   // console.log(res);
  //   // // 9
  //   // res = await redis.llen("mylist");
  //   // console.log(res);
  //   // 9
  
  //   /**
  //    * set
  //    */
  //   // res = await redis.sadd("myset", "hello");
  //   // console.log(res);
  //   // // 1
  //   // res = await redis.sadd("myset", "tedis");
  //   // console.log(res);
  //   // // 1
  //   // res = await redis.scard("myset");
  //   // console.log(res);
  //   // 2
  
  //   /**
  //    * zset
  //    */
  //   // res = await redis.zadd("myzset", {
  //   //   one: 1,
  //   //   two: 2,
  //   //   three: 3
  //   // });
  //   // console.log(res);
  //   // // 3
  //   // res = await redis.zcard("myzset");
  //   // console.log(res);
  //   // 3
  
  //   // close
  //   //redis.close();
  // }, 3000);
  //******************************************* */
  res.statusCode = 200;
  const msg = 'Rendering through K8s/EKS Cluster running from an AWS - Container Name: ConfigService:v1.14';
  res.send(getPage(msg));
});

app.get('/test', (req, res) => {
  res.statusCode = 200;
  const msg = 'Config SVC running on K8s EKS Cluster14';
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
    + "    <h1>Published from EKS Cluster in 1.13</h1>\n"
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
