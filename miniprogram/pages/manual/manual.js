// pages/manual/manual.js

// const INDEX = 0

Page({

  data: {
    index:0,
    plant:[],
    tempeture:'0',
    moisture:'0',
    light:'0',
    ph:'0',
    ec:'0',
    water:'0',
    temlog:'',
    moilog:'',
    lgtlog:'',
    phlog:'',
    eclog:'',
    watlog:''
  },

  onLoad: function (options) {
    const that = this;
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("plants").doc(options.id).get({
        success: res => {
          that.setData({
            plant: res.data,
            tempeture: res.data.tempeture,
            moisture: res.data.moisture,
            light: res.data.light,
            ph: res.data.ph,
            ec: res.data.ec,
            water: res.data.water,
          })
          // console.log(res)
          // console.log(that.data.plant)
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },

  // handleMinus(e){
  //   console.log(e)
  //   var num=e.detail.num
  // },

  // handlePlus(e){
  //   console.log(e)
  //   var num=e.detail.num
  //   // var type=e.database.type
  //   // this.check(type)
  // },

  // handleManual(e){
  //   console.log(e)
  //   var num=e.detail.num
  // },

  handleStep(e){
    // console.log(e)
    var num = e.detail.num
    var type = e.currentTarget.dataset.type
    switch (type) {
      case 0:
        this.setData({
          tempeture: num
        })
        if (Number(num) > Number(this.data.plant.tempeture)){
          this.setData({
            temlog:'升温'
          })
        }
        if (Number(num) < Number(this.data.plant.tempeture)){
          this.setData({
            temlog: '降温'
          })
        }
        // let tempeture = num
        break;
      case 1:
        this.setData({
          moisture: num
        })
        if (Number(num) > Number(this.data.plant.moisture)) {
          this.setData({
            moilog: '加湿'
          })
        } 
        if (Number(num) < Number(this.data.plant.moisture)) {
          this.setData({
            moilog: '降湿'
          })
        }
        // let moisture = num
        break;
      case 2:
        this.setData({
          light: num
        })
        if (Number(num) > Number(this.data.plant.light)) {
          this.setData({
            lgtlog: '加光'
          })
        } 
        if (Number(num) < Number(this.data.plant.light)) {
          this.setData({
            lgtlog: '减光'
          })
        }
        // let light = num
        break;
      case 3:
        this.setData({
          ph: num
        })
        if (Number(num) > Number(this.data.plant.ph)) {
          this.setData({
            phlog: '提高ph值'
          })
        }
        if (Number(num) < Number(this.data.plant.ph)) {
          this.setData({
            phlog: '降低ph值'
          })
        }
        // let ph = num
        break;
      case 4:
        this.setData({
          ec: num
        })
        if (Number(num) > Number(this.data.plant.ec)) {
          this.setData({
            eclog: '提高电导率'
          })
        }
        if (Number(num) < Number(this.data.plant.ec)) {
          this.setData({
            eclog: '降低电导率'
          })
        }
        // let ec = num
        break;
      case 5:
        this.setData({
          water: num
        })
        if (Number(num) > Number(this.data.plant.water)) {
          this.setData({
            watlog: '补水'
          })
        }
        if (Number(num) < Number(this.data.plant.water)) {
          this.setData({
            watlog: '烘干'
          })
        }
        // let water = num
        break;
    }
  },

  // check(index){
  //   switch (index) {
  //     case 0:
  //       this.setData({
  //         tempeture:num
  //       })
  //       let tempeture = num
  //       break;
  //     case 1:
  //       let moisture = num
  //       break;
  //     case 2:
  //       let light = num
  //       break;
  //     case 3:
  //       let ph = num
  //       break;
  //     case 4:
  //       let ec = num
  //       break;
  //     case 5:
  //       let water = num
  //       break;
  //   }
  // }
  // update: function (db, plant) {
  //   // console.log(plant);
  //   db.collection("plants").doc(plant.id).update({
  //     data: {
  //       tempeture: tempeture,
  //       moisture:moisture,
  //       light:light,
  //       ph:ph,
  //       ec:ec,
  //       water:water
  //     }, success: res => {
  //       wx.showToast({
  //         title: '修改记录成功',
  //       })
  //       wx.navigateBack({

  //       })
  //     }, fail: err => {
  //       wx.showToast({
  //         title: '修改失败',
  //       })
  //     }
  //   })
  // },

  handleUpdate(e){
    var that=this
    // var index
    var time = require('../../utils/util.js');
    let id = that.data.plant._id
    const db = wx.cloud.database()
    db.collection('plants').doc(id).get({
      success: res => {
        // console.log(res)
        var arr = Object.keys(res.data.log)
        var length = arr.length
        this.setData({
          index: length
        })
        // console.log('成功', that.data.index)
        // console.log('成功',length)
      }
    })
    // that.getLength()
    // console.log('开始', that.data.index)
    // let index = this.data.index
    // console.log('开始',index)
    // let id = this.data.plant._id
    // const db = wx.cloud.database()
    setTimeout(function () {
      // console.log(that.data.index)
      db.collection("plants").doc(id).update({
        data: {
          tempeture: that.data.tempeture,
          moisture: that.data.moisture,
          light: that.data.light,
          ph: that.data.ph,
          ec: that.data.ec,
          water: that.data.water,
          ['log.' + [that.data.index]]: {
            time: time.formatTime(new Date()),
            temlog: that.data.temlog,
            moilog: that.data.moilog,
            lgtlog: that.data.lgtlog,
            phlog: that.data.phlog,
            eclog: that.data.eclog,
            watlog: that.data.watlog,
          }
        }, success: res => {
          wx.showToast({
            title: '修改记录成功',
          })
          wx.navigateBack({

          })
          // this.setData({
          //   count: this.data.count + 1
          // })
          // console.log('结束',this.data.count)
        }, fail: err => {
          console.log(err)
          wx.showToast({
            title: '修改失败',
          })
        }
      })
    }, 1000) //延迟时间 这里是1秒
    
  },

  // getLength:function(){
  //   // var length=0
  //   var that=this
  //   const db=wx.cloud.database()
  //   // console.log(that.data.id)
  //   // console.log('成功', that.data.index)
  //   db.collection('plants').doc(that.data.id).get({
  //     success:res=>{
  //       // console.log(res)
  //       var arr = Object.keys(res.data.log)
  //       let length=arr.length
  //       that.setData({
  //         index:length
  //       })
  //       console.log('成功', that.data.index)
  //       // console.log('成功',length)
  //     }
  //   })
  //   // console.log('长度',that.data.index)
  //   // console.log('结束' ,length)
  //   // return length
  // }
})