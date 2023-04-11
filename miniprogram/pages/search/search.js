// pages/search/search.js
Page({

  data: {
    keyword:'',
    plantlist:[]
  },

  onLoad: function (options) {
    // this.setData({
    //   keyword:keyword
    // })
    // let keyword = this.data.keyword
    // console.log(keyword);
    // const db = wx.cloud.database();
    // const _ = db.command
    // db.collection('plants').where(_.or([{
    //   name: db.RegExp({
    //     regexp: '.*' + keyword,
    //     options: 'i',
    //   })
    // },
    // {
    //   NO: db.RegExp({
    //     regexp: '.*' + keyword,
    //     options: 'i',
    //   })
    // }
    // ])).get({
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       isShow: true
    //     })
    //   },
    //   fail: err => {
    //     console.log(err)
    //   }
    // })
  },

  handleSearch(e){
    // console.log(e)
    this.setData({
      keyword:e.detail.value
    })
  },

  clear_input(e){
    this.setData({
      keyword:'',
    })
  },

  handleConfirm(e){
    this.setData({
      plantlist: []
    })
    let keyword = this.data.keyword
    // console.log("关键词",keyword);
    const db = wx.cloud.database();
    const _ = db.command
    db.collection('plants').where(_.or([{
      NO: keyword
    },{
      name: db.RegExp({
        regexp: '.*' + keyword,
        options: 'i',
      })
    },
    {
      date: db.RegExp({
        regexp: '.*' + keyword,
        options: 'i',
      })
    }
    ])).get({
      success: res => {
        // console.log(res)
        if (res.data.length == 0) {
          wx.showToast({
            icon: "none",
            title: '没有搜索结果',
          })
        }
        if(!keyword){
          wx.showToast({
            icon: "none",
            title: '请输入搜索内容',
          })
        }else{
          this.setData({
            plantlist: res.data
          })
          // console.log(this.data.plantlist)
        }
        // console.log(this.data.plantlist)
      },
      fail: err => {
        wx.showToast({
          icon: "none",
          title: '发生错误',
        })
      },
      complete(){
        wx.hideLoading()
      }
    })
  },

  handleChange: function (e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.redirectTo({
      url: '../newplant/newplant?id=' + id,
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
        wx.navigateBack({
          
        })
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