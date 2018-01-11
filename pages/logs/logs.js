//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
    go:function () {
      console.log(1);
        wx.request({
            url:"http://v.juhe.cn/weather/index?key=b4c1589fc5953546970d69acefd4e5b1",
            data:{
                cityname: "上海",
            },
            method: 'GET',
            success:function (res) {
                console.log(res);
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },
    login:function () {
        wx.redirectTo({
            url:'../detail/detail'
        })
    },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
