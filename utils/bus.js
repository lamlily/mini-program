let Vue = require("./vue.js")
let bus = new Vue();
// 抛出 bus中的$emit方法
module.exports=bus;