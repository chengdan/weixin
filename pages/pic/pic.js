const app = getApp()
Page({
    data: {
        source:"../../images/Screenshot_1.png",
    },
    getImage: function() {
        var that = this;
        wx.chooseImage({
            count: 1,
            //original原图，compressed压缩图
            sizeType: ['original'],
            //album来源相册 camera相机
            sourceType: ['album', 'camera'],
            //成功时会回调
            success: function(res) {
                //重绘视图
                that.setData({
                    source: res.tempFilePaths,
                })

            }
        })
    },

    preview:function(){
        wx.previewImage({
            current: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2334255281,1297666570&fm=200&gp=0.jpg', // 当前显示图片的链接，不填则默认为 urls 的第一张
            urls: [ 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2334255281,1297666570&fm=200&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3028147815,2241520118&fm=200&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3587249202,925587608&fm=200&gp=0.jpg',
                'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=499725973,120133363&fm=200&gp=0.jpg',
                'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1843823577,1430925347&fm=200&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1034099875,4148134346&fm=200&gp=0.jpg',],

        })
    },
    goIndex:function () {
        wx.redirectTo({
            url:'../detail/detail'
        })
    },
})
