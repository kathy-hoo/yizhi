// pages/newplant/newplant.js
Page({

  data: {
    imgUrl:'',
    isImage:false,
    plant:[],
    id:''
  },

  onLoad: function (options) {
    const that = this;
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("plants").doc(options.id).get({
        success: res => {
          that.setData({
            plant: res.data,
            imgUrl:res.data.url,
            isImage:true,
            id:options.id
          })
          // this.onLoad();
          // console.log(imgUrl)
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },

  handleImage(e){
    var that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const filePath = res.tempFilePaths[0]
        that.setData({
          imgUrl:filePath,
          isImage:true
        })
        // console.log("地址",that.data.imgUrl)
        // const cloudPath = new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]
        // wx.cloud.uploadFile({
        //   cloudPath,
        //   filePath,
        //   success: res => {
        //     console.log('[上传文件] 成功：', res)
        //     that.setData({

        //     })
        //     app.globalData.fileID = res.fileID
        //     app.globalData.cloudPath = cloudPath
        //     app.globalData.imagePath = filePath

        //     wx.navigateTo({
        //       url: '../storageConsole/storageConsole'
        //     })
        //   },
        //   fail: e => {
        //     console.error('[上传文件] 失败：', e)
        //     wx.showToast({
        //       icon: 'none',
        //       title: '上传失败',
        //     })
        //   },
        //   complete: () => {
        //     wx.hideLoading()
        //   }
        // })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  formSubmit: function (e) {
    const db = wx.cloud.database()
    var timestamp = Date.parse(new Date());
    var day=new Date(timestamp);
    timestamp = timestamp / 1000;
    let no =timestamp.toString(32);
    let y=day.getFullYear()+"";
    let m = (day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1)+"";
    let d = day.getDate() < 10 ? '0' + day.getDate() : day.getDate()+""; 
    let date=y+m+d;
    let plant = e.detail.value;
    if(plant.name==''&& plant.url==''){
      wx.showToast({
        title: '信息不能为空！',
      })
    }else if (plant.id == ""&& this.data.id=='') {
      this.add(db, plant,no,date)
    } else {
      this.update(db, plant)
    }
  },

  add: function (db, plant,no,data) {
    // console.log(no)
    db.collection("plants").add({
      data: {
        name: plant.name,
        NO: no,
        url:plant.url,
        date:data
        // tempeture:0,
        // moisture:0,
        // light:0,
        // ph:0,
        // ec:0,
        // water:0,
        // log:[],
        // isDevice:false
      }, success: res => {
        wx.navigateBack({
          
        })
        wx.showToast({
          title: '新增记录成功',
        })
        
      }, fail: err => {
        wx.showToast({
          title: '新增失败',
        })
      }
    })
  },

  update: function (db, plant) {
    // console.log(plant);
    db.collection("plants").doc(this.data.id).update({
      data: {
        name: plant.name,
        // NO: plant.NO,
        url: plant.url
      }, success: res => {
        wx.showToast({
          title: '修改记录成功',
        })
        wx.navigateBack({
          
        })
      }, fail: err => {
        wx.showToast({
          title: '修改失败',
        })
      }
    })
  },

  handleDel(e){
    this.setData({
      imgUrl: '',
      isImage: false,
    })
  }
})