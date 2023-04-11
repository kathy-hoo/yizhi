// pages/auto/auto.js
Page({

  data: {
    plant: [],
    tempeture: 0,
    moisture: 0,
    light: 0,
    ph: 0,
    ec: 0,
    water: 0
  },

  onLoad: function (options) {
    const that = this;
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("plants").doc(options.id).get({
        success: res => {
          that.setData({
            plant: res.data
          })
          // console.log(res)
          console.log(that.data.plant)
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },

  handleStep(e) {
    console.log(e)
    var num = e.detail.num
    var type = e.currentTarget.dataset.type
    switch (type) {
      case 0:
        this.setData({
          tempeture: num
        })
        // let tempeture = num
        break;
      case 1:
        this.setData({
          moisture: num
        })
        // let moisture = num
        break;
      case 2:
        this.setData({
          light: num
        })
        // let light = num
        break;
      case 3:
        this.setData({
          ph: num
        })
        // let ph = num
        break;
      case 4:
        this.setData({
          ec: num
        })
        // let ec = num
        break;
      case 5:
        this.setData({
          water: num
        })
        // let water = num
        break;
    }
  },
})