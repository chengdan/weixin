const app = getApp()

Page({
    data:{
        recodePath:"",
        isRecode:true,
        editData:"",
    },
    getMius:function () {
        console.log(2);
        wx.playBackgroundAudio({
            dataUrl:"http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46', ",
            title:"此时此刻",
            coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
        })
    },
    startRecode:function(){
        var s = this;
        console.log("start");
        wx.startRecord({
            success: function (res) {
                console.log(res);
                var tempFilePath = res.tempFilePath;
                s.setData({ recodePath: tempFilePath, isRecode:true});
            },
            fail: function (res) {
                console.log("fail");
                console.log(res);
                //录音失败
            }
        });
    },
    endRecode:function() {//结束录音
        var s = this;
        console.log("end");
        wx.stopRecord();
        s.setData({isRecode: false});


        wx.showToast();
        setTimeout(function () {
            var urls = app.globalData.urls + "/Web/UpVoice";
            console.log(s.data.recodePath);
            wx.uploadFile({
                url: urls,
                filePath: s.data.recodePath,
                name: 'file',
                header: {
                    'content-type': 'multipart/form-data'
                },
                success: function (res) {
                    var str = res.data;
                    var data = JSON.parse(str);
                    if (data.states == 1) {
                        var cEditData = s.data.editData;
                        cEditData.recodeIdentity = data.identitys;
                        s.setData({editData: cEditData});
                    }
                    else {
                        wx.showModal({
                            title: '提示',
                            content: data.message,
                            showCancel: false,
                            success: function (res) {

                            }
                        });
                    }
                    wx.hideToast();
                },
                fail: function (res) {
                    console.log(res);
                    wx.showModal({
                        title: '提示',
                        content: "网络请求失败，请确保网络是否正常",
                        showCancel: false,
                        success: function (res) {

                        }
                    });
                    wx.hideToast();
                }
            });
        }, 1000)
    }
});