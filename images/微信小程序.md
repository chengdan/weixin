##微信小程序常用标签
  - view 标签
    + 写法
    ```wxml
    <view>这里写内容</view>
    <!--类似html中div，是块级作用域-->
    ```
   
  - button ul li 标签
    + 写法
    ```wxml
    <button>按钮</button>
    <ul>
      <li>我是第一个</li>
      <li>我是第二个</li>
    <ul>
   
    <!--他们的使用方法跟html中是一样的-->
    ```
      
  - image 标签
    + 写法
    ```wxml
    <image src=""/>
   
    <!--类似html中的img标签，在微信小程序中如果写img标签是会报错的，
    在里面只识别image这个标签，用法都是一样的，在src属性中写入图片路径-->   
    ```
   
  - navigator 标签
    + 写法
    ```wxml
    <navigator url="../logs/logs">登录</navigator>
   
    <!--类似a链接，在url中直接写入需要跳转的链接路径即可，不需要加后缀名，
    而a链接在微信小程序中也可以写入，虽然不会报错，也可以渲染要页面上，
    但是点击后并不会跳转--> 
    ```
   
  - input 标签
    + 写法
    ```wxml
    <view class="itemView">用户名
      <input class="input" name="userName" placeholder="请输入用户名"/>
    </view>
    <view class="itemView">密    码
      <input class="input" password placeholder="请输入密码"/>
    </view>
      
     <!--虽然跟html中一样都是写的input框，但是按原html中的写法会报错，
     在微信小程序中，input框中使用input框的话必须要写class=“input”才可以使用，
     而密码中如果需要将输入的内容隐藏，必须写password才可以，而占位符的使用
     还是与html中的一样--> 
    ```
   
  - block 标签
    + 写法
    ```wxml
    <block wx:for="{{tips}}">
       <view style="width:100%;height:200rpx;">
          <input data-id="{{index}}" value="{{inputValue}}" bindfocus="bindFocus" bindinput="bindKeyInput" placeholder="输入文字以继续"/>
       </view>
    </block>
   
    <block wx:for="{{imageList}}" wx:for-item="image">
       <image src="{{image}}" data-src="{{image}}" bindtap="getImage"></image>
    </block>
    <view bindtap="chooseImage">chooseImg</view>
   
    <!-- block标签配合wx:if="" 或者 wx:for=""使用，
    因为 wx:if （是否显示，false或者true）或者 wx：for（是一个循环）
    是一个控制属性，需要将它添加到一个标签上，也就是view标签上。
    但是如果我们想一次性判断多个组件标签，我们可以使用一个 <block/> 标签
    将多个组件包装起来，并在上边使用 wx:if或者wx：for 控制属性
    --> 
    ```

## 微信小程序配置路由
  - 在app.json中配置路由功能，结合上面所写的navigator 标签进行页面跳转
  ```json
//  json文件
  {
    "pages":[
      "pages/index/index",
      "pages/logs/logs",
      "pages/detail/detail",
      "pages/pic/pic",
      "pages/music/music"
    ]
   }
 //需要配置的路由往上写即可（如我写的detail，pic，music页面）
 // 路由嵌套最多五层   
  ```
  - 页面结构
    + 配置的所有页面都写在pages文件目录下，需要写什么页面就创建什么文件夹，
    如需要写detail页面，在下面生产detail文件夹即可
    + 文件夹里面遵循微信小程序的格式，要写三个页面，如detail.wxml页面 
    detail.wxss页面 detail.js页面
    + detail.wxml如html文件，写页面布局，
    + detail.wxss如css文件，写样式
    + detail.js写逻辑代码
    
  
  
## 微信小程序内置功能
 - 转发功能
 ```javascript
  //js文件
  Page({
    onLoad(e) {
           wx.showShareMenu({
               withShareTicket: true
           })
   
       },
    onShow(e) {
           wx.showShareMenu({
               withShareTicket: true
           })
       }
  })
  
  //在所需要实现转发功能的页面的js文件中写入这个代码即可，如果在app.js中写
  //入这个代码也可以实现转发功能，但这个功能只会在index界面中实现，
  // 别的界面并不会实现，在什么界面需要在什么界面的js文件中写入以上代码
 ```
 - 重定向功能
 ```wxml
 <!--wxml文件-->
 <button bindtouchstart="login">登陆</button>
 ```
 ```javascript
  //js文件
  Page({
    toLogin:function() {
      wx.redirectTo({
                     url:'../logs/logs'
                 })
    }
  })
  
  //在js文件中写入以上代码就可以实现重定向，需要跳转到哪一个页面，就在url
  // 中写入需要跳转的地址路由即可
 ``` 
 - 通过修改input框内容同时修改view里的内容
 ```
 <!--wxml文件-->
 <input class="input" name="userName" bindinput="getMsg" value="{{msg}}"/>
 <view>{{msg}}</view>
 ```
 
 ```javascript
 //js文件
 Page({
    data:{
        msg:""
    },
    getMsg:function() {
      //  需要修改data里面的msg只能通过this.setData（）才修改赋值
      this.setData({
                  msg : e.detail.value
              })
    }
 })
 ```
 - 打开相册功能
 ```wxml
 <!--wxml文件-->
 <image src="{{source}}" mode="fulltoFill"  class="pic"/>
 <button type="primary" bindtap="getImage" class="button_anniu">点击我选择相册</button>
 ```
 ```javascript
 //js文件
 Page({
    data:{
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
        }
 })
 ```
 - 图片预览功能
 ```wxml
  <!--wxml文件-->
  <button bindtap="preview"><image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2334255281,1297666570&fm=200&gp=0.jpg"  class="swiper"></image></button>
  ```
  ```javascript
  //js文件
  Page({
    preview:function(){
            wx.previewImage({
                // 当前显示图片的链接，不填则默认为 urls 的第一张
                current: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2334255281,1297666570&fm=200&gp=0.jpg', 
                //需要预览的图片地址，是以数组的形式写入
                urls: [ 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2334255281,1297666570&fm=200&gp=0.jpg',
                    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3028147815,2241520118&fm=200&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3587249202,925587608&fm=200&gp=0.jpg',
                    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=499725973,120133363&fm=200&gp=0.jpg',
                    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1843823577,1430925347&fm=200&gp=0.jpg',
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1034099875,4148134346&fm=200&gp=0.jpg',],
    
            })
        }
  })
  //注意：图片预览功能只能获取http或者是https的文件，本地图片预览不成功
  ```
  - 播放音乐功能
  ```wxml
    <!--wxml文件-->
    <image src="http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000"/>
    <button bindtap="getMius">点击播放音乐</button>
  ```
  ```javascript
  Page({
    getMius:function () {
          console.log(2);
          wx.playBackgroundAudio({
              dataUrl:"http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46', ",
              title:"此时此刻",
              coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
          })
      }
  })
  ```
  - 录音功能（写的不完善）
  ```wxml
      <!--wxml文件-->
      <button type="primary" bindtouchstart="startRecode" bindtouchend="endRecode" class="cxbtn btn">按住录音</button>
  ```
  ```javascript
  Page({
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
  })
  ```
  
## 微信小程序事件分类，事件绑定
 - 事件绑定
   + key 以bind或catch开头，然后跟上事件的类型，如bindtap, catchtouchstart
     ```wxml
         <!--写法如-->
         <button bindtap="getMsg">222</button>
         <button bindtouchstart="startRecode" bindtouchend="endRecode">11</button>
     ```
 - 事件分类
   + touchstart 手指触摸
   + touchmove 手指触摸后移动
   + touchcancel 手指触摸动作被打断，如弹窗和来电提醒
   + touchend 手指触摸动作结束
   + tap 手指触摸后离开
   + longtap 手指触摸后后，超过350ms离开
   + 单击(tap)
   + 双击(dbtap)
   + 长按(longtap)
 - 注意：单击事件由touchstart、touchend组成,touchend后触发tap事件。
 
## 微信小程序的生命周期钩子函数
 - data 页面的初始数据
 - onLoad 监听页面加载
 - onReady 监听页面渲染完成
 - onShow 监听页面显示
 - onUnload 监听页面卸载
 ```javascript
 Page({
    //通过data初始化数据
    data:{
        
    },
    //监听页面在加载的状态,页面加载完成之后就不会在执行
    onLoad: function () {
        console.log('index---------onLoad()')
    },
    //监听页面显示，当从当前页面调转到另一个页面,另一个页面销毁时会再次执行
    //只要再次显示该页面都会执行一次
    onShow: function() {
        console.log('index---------onShow()')
    },
    //监听页面渲染完成,完成之后不会在执行
    onReady: function() {
        console.log('index---------onReaday()');
    },
    //监听页面隐藏,当前页面调到另一个页面的时候会执行
    onHide: function() {
        console.log('index---------onHide()')
    },
    //当页面销毁时调用
    onUnload: function() {
        console.log('index---------onUnload')
    }
 })
 ```
 
## 微信小程序实现ajax请求服务器功能
 - 内置方法 wx.request
 ```wxml
 <!--wxml文件-->
 <button bindtouchstart="go">发送请求</button>
 ```
 ```javascript
 Page({
    go:function () {
            wx.request({
                //上线的话必须是https,所以这个是不可以的，并且需要去配置
                // request合法域名，通过https://mp.weixin.qq.com/
                //设置里面进行配置
                
                //请求路径
                url:"http://v.juhe.cn/weather/index?key=b4c1589fc5953546970d69acefd4e5b1",
                //请求携带数据
                data:{
                    cityname: "上海",
                },
                //以什么类型请求数据
                method: 'GET',
                // header: {}, // 设置请求的 header 
                //接受到的数据
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
        }
 })
 ```
 
   
    