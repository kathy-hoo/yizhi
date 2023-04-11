// miniprogram/pages/start/start.js
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    var that=this;
    wx.getSetting({
      success: function(res) {
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            },
          })
        }
      },
    })
  },
  handleBtnClick:function(e){
    if(e.detail.userInfo){
      wx.switchTab({
        url: '../index/index',
      })
    }else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})