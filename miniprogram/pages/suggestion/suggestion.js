// pages/suggestion/suggestion.js
Page({

  data:{

  },

  inputs: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    this.setData({
      count: len
    });
  }, 

  handleSubmit(e){
    let textword=e.detail.value.textword
    const db=wx.cloud.database()
    db.collection('suggesstion').add({
      data:{
        text:textword
      },success:res=>{
        wx.showToast({
          title: '提交成功',
        })
      },fail:err=>{
        wx.showToast({
          title: '提交失败',
        })
      }
    })
  }
})