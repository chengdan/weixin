//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad(e) {
        wx.showShareMenu({
            withShareTicket: true
        })

    }, onShow(e) {
        wx.showShareMenu({
            withShareTicket: true
        })
    },
})

