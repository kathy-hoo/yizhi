// pages/log/log.js
Page({

  data: {
    logs:[],
    id:'',
    length:0
  },

  onLoad: function (options) {
    const that = this;
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("plants").doc(options.id).get({
        success: res => {
          console.log(res)
          if(res.data.log){
            var arr = Object.keys(res.data.log)
            that.setData({
              logs: res.data.log,
              id: options.id,
              length: arr.length
            })
          }else{
            that.setData({
              length:0
            })
          }
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },

  handleClear:function(e){
    // console.log(e)
    // var that=this
    const db=wx.cloud.database()
    const _ = db.command
    db.collection('plants').doc(this.data.id).update({
      data:{
        log:_.remove()
      },success:res=>{
        
        wx.showToast({
          title: '清空成功',
        })
        // console.log(this.data)
        this.onLoad(this.data)
      },fail:err=>{
        wx.showToast({
          title: '清空失败',
        })
        console.log(err)
      }
    })
  }
})