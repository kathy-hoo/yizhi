// pages/plant_detail/plant_detail.js
Page({

  data: {
    plant:[],
    id:''
  },

  onLoad: function (options) {
    // console.log(options)
    const that = this;
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("plants").doc(options.id).get({
        success: res => {
          that.setData({
            plant: res.data,
            id:options.id
          })
          // console.log(plant)
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },

  onShow: function () {
    var that=this
    let id=that.data.id
    const db = wx.cloud.database();
    db.collection("plants").doc(id).get({
      success: res => {
        this.setData({
          plant: res.data,
          // id:options.id
        })
        // console.log(plant)
      }, fail: err => {
        console.log(err)
      }
    })
  },

  handleman:function(e){
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../manual/manual?id=' + id,
    })
  } ,

  handleauto:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../auto/auto?id=' + id,
    })
  },

  handlelog:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../log/log?id=' + id,
    })
  },

  handleDevice(e){
    console.log(e)
    let id=e.currentTarget.dataset.id
    const db = wx.cloud.database()
    db.collection("plants").doc(id).update({
      data: {
        isDevice:!this.data.plant.isDevice
      }, success: res => {
        // setData({
        //   id:id
        // })
        this.onLoad(e.currentTarget.dataset)
      }, fail: err => {
        console.log(err)
      }
    })
  }
})