//index.js
//获取应用实例
const app = getApp()
var Vue = require("../../utils/vue.js")
console.log(Vue);
// var bus = new Vue();
let bus = require("../../utils/bus.js");

Page({
  onPullDownRefresh:function(){
    console.log("下拉刷新")
    bus.$emit("onPullDownRefresh","hi")
  },
  onReachBottom:function(){
    console.log("到底了")
    bus.$emit("onReachBottom","hi")
  },

  data: {
    imgUrls: [
      'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1100472.jpg?max_age=2592000',
      'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1102759.jpg?max_age=2592000',
      "https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1100463.jpg?max_age=2592000",
      'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1101847.jpg?max_age=2592000',

"https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1102430.jpg?max_age=2592000"

    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }

})
