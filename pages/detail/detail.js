// pages/detail/detail.js
var timer;
Page({

  /**
   * 页面的初始数据
   */
  // data: {

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.options.songId)
    console.log(options.songId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')

    this.getMp3();
    this.getLry();
  },
  //请求 歌词
  getLry(){
    var that = this;
 
    wx.request({
          url:"http://tingapi.ting.baidu.com/v1/restserver/ting",
      data:{
        method:"baidu.ting.song.lry",
        songid:that.options.songId
      },
      header:{
        "content-type":"application/json"
      },
      success(res){
        console.log(that.parseLyric(res.data.lrcContent))
        let lry = that.parseLyric(res.data.lrcContent)
        
        that.setData({
          lry
        })
      }
    })
  },
  getMp3() {
    var that = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting', // 仅为示例，并非真实的接口地址
      data: {
        method: 'baidu.ting.song.play',
        songid: that.options.songId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        let poster = res.data.songinfo.pic_big;
        let name = res.data.songinfo.title;
        let author = res.data.songinfo.author;
        let src = res.data.bitrate.show_link;
        that.setData({
          poster,
          name,
          author,
          src
        })
      }
    })
  },
  parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for (var i = 0; i < lyrics.length; i++) {
      var lyric = decodeURIComponent(lyrics[i]);
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      var timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr) continue;
      var clause = lyric.replace(timeReg, '');
      for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
        var t = timeRegExpArr[k];
        var min = Number(String(t.match(/\[\d*/i)).slice(1)),
          sec = Number(String(t.match(/\:\d*/i)).slice(1));
        var time = min * 60 + sec;
        lrcObj[time] = clause;
      }
    }
    return lrcObj;
  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  data: {
    // 歌曲专辑图片
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    // 歌曲来源
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    lry:[],
    time:0
  },
  audioPlay() {
    this.audioCtx.play()
    // 播放；定时器
    timer = setInterval(()=>{
      this.setData({
        time:++this.data.time
      })
    },1000)
   
  },
  audioPause() {
    this.audioCtx.pause()
    clearInterval(timer)
  },
  audio14() {
    this.audioCtx.seek(14)
  },
  audioStart() {
    this.audioCtx.seek(0)
  }
})