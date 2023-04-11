// pages/profile/profile.js
Page({

  data: {
    nickName:'',
    avatarUrl:'',
    list: [{
      page: '../information/information',
      img: '/assets/profile/information.png',
      title: '个人信息'
    }, {
      page: '../message/message',
      img: '/assets/profile/message.png',
      title: '消息'
    }, {
      page: '../setting/setting',
      img: '/assets/profile/setting.png',
      title: '关于软件'
    }]
  },

  onLoad: function (options) {
    var that=this
    wx.getUserInfo({
      success:function(res){
        console.log(res)
        that.setData({
          nickName:res.userInfo.nickName,
          avatarUrl:res.userInfo.avatarUrl
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
  },

})