// pages/information/information.js
Page({

  data: {
    information:[],
    id:''
  },

  onLoad: function () {
    const db=wx.cloud.database()
    db.collection('informations').get({
      success:res=>{
        this.setData({
          information:res.data[0],
          id: res.data[0]._id
        })
        // console.log(this.data.information)
      },
      fail:err=>{
        console.log(err)
      }
    })
  },

  // onShow(){
  //   this.onLoad()
  // },

  formSubmit(e){
    // console.log(e)
    // console.log()
    let info=e.detail.value
    const db = wx.cloud.database()
    if(info.id=='' && this.data.id==''){
      this.add(db,info)
      this.refresh()
    }else{
      this.update(db,info)
    }
  },

  add:function(db,info){
    db.collection("informations").add({
      data: {
        name: info.name,
        age: info.age,
        phone: info.phone,
        email: info.email
      }, success: res => {
        wx.showToast({
          title: '提交信息成功',
        })
      }, fail: err => {
        wx.showToast({
          title: '提交信息失败',
        })
      }
    })
  },

  update:function(db,info){
    db.collection("informations").doc(this.data.id).update({
      data: {
        name: info.name,
        age: info.age,
        phone: info.phone,
        email: info.email
      }, success: res => {
        wx.showToast({
          title: '修改信息成功',
        })
      }, fail: err => {
        wx.showToast({
          title: '修改信息失败',
        })
      }
    })
  },

  refresh:function(){
    const db = wx.cloud.database()
    db.collection('informations').get({
      success: res => {
        this.setData({
          id: res.data[0]._id
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})