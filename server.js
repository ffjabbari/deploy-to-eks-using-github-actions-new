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


var redis = new RedisClient.createClient("6379", "127.0.0.1", { no_ready_check: true });
//var redis = new RedisClient.createClient("6379", "f7i-c21n-m2n-redis-001.f7i-c21n-m2n-redis.vwfcil.use1.cache.amazonaws.com", { no_ready_check: true });

//connect to redis
redis.connect().then(async () => {
  redis.on('error', err => {
    console.log('Error ' + err);
  });
  console.log("===> Connected To Elasticache Successfully...");
});



async function setKey(key, value) {
  try {
    await redis.set(key, value);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    
  }
}

async function getKey(key) {
  try {
    const value = await redis.get(key); 
    console.log("===> value is: ", value);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    
  }
}

// App
app.get('/', (req, res) => {

  console.log("===========>0 Version xxaa.bb running...");
  setKey("key111", "value111");
  getKey("key111");
  
  res.statusCode = 200;
  const msg = 'Rendering through K8s/EKS Cluster running from an AWS - Container Name: ConfigService:v1.19';
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
    + "    <h1>Published from EKS Cluster in 1.15</h1>\n"
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
