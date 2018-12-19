//logs.js
let bus = require("../../utils/bus.js");
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  
    onPullDownRefresh:function(){
    console.log("下拉刷新")
    bus.$emit("onPullDownRefresh", "hi")
  }
})
