// components/panel/panel.js
let bus = require("../../utils/bus.js")
Component({
  /**
   * 组件的属性列表
   */
  //props: ["songType"],
  properties: {
    songType: { // 属性名
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    songList: [],
    offset:-1
  },
  ready() {
    var that = this;
    bus.$on('onPullDownRefresh', (msg) => {
      this.loadMore('onPullDownRefresh')
    })
    bus.$on('onReachBottom', (msg) => {
      this.loadMore('onReachBottom')
    })
    this.loadMore()
    console.log(this.data.songType)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(t) {
      var that = this;
      wx.request({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting', // 仅为示例，并非真实的接口地址
        data: {
          method: 'baidu.ting.billboard.billList',
          type: that.data.songType,
          size: 10,
          offset: ++that.data.offset
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.stopPullDownRefresh();
          console.log(res.data)
          
          that.setData({
            songList: t === 'onPullDownRefresh' ? res.data.song_list.concat(that.data.songList) : that.data.songList.concat(res.data.song_list)
          })
        }
      })
    }
  }
})
