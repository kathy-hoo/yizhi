// pages/plant/plant.js
Page({

  data: {
    sp_picture:[],
    plants:[],
    length:0,
    isLength:false
  },

  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection("sp_picture").get({
      success: res => {
        console.log(res)
        this.setData({
          sp_picture: res.data
        })
      }, fail: err => {

      }
    }),

    db.collection("plants").get({
      success: res => {
        // console.log(res)
        console.log(res.data.length)
        this.setData({
          plants: res.data,
          length:res.data.length
        })
        if(this.data.length>0){
          this.setData({
            isLength:true
          })
        }else{
          this.setData({
            isLength:false
          })
        }
      }, fail: err => {
        this.setData({
          length: res.data.length
        })
        console.log(this.data.length)
      }
    })
  },

  onShow: function () {
    this.onLoad()
  },

  linkToSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  handleChange: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../newplant/newplant?id=' + id,
    })
  },

  handleAdd(e){
    wx.navigateTo({
      url: '../newplant/newplant'
    })
  },

  handleDelete: function (e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    const db = wx.cloud.database();
    db.collection("plants").doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad()
      }, fail: err => {
        // console.log(err)
        wx.showToast({
          title: '删除失败',
        })
      }
    })
    // console.log(id)
  },

  handleDetail:function(e){
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../plant_detail/plant_detail?id=' + id,
    })
  }
})