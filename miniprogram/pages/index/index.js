var bmap = require('../../libs/bmap-wx.js');
var util = require('../../utils/util.js')
Page({
  data: {
    weatherData: {
      currentCity:'',
      data:'',
      pm25:'',
      temperature:'',
      weatherDesc:'',
      wind:''
    },
    plant:[
      {
        imgurl:'/assets/index/fcs.png',
        name:'发财树'
      },
      {
        imgurl: '/assets/index/hz.png',
        name: '红掌'
      },
      {
        imgurl: '/assets/index/hzy.png',
        name: '虹之玉'
      },
      {
        imgurl: '/assets/index/lh.png',
        name: '芦荟'
      },
      {
        imgurl: '/assets/index/ll.png',
        name: '绿萝'
      },
      {
        imgurl: '/assets/index/xrq.png',
        name: '仙人球'
      },
      {
        imgurl: '/assets/index/hf.png',
        name: '红枫'
      },
      {
        imgurl: '/assets/index/zy.png',
        name: '竹叶'
      },
    ],
    year:'',  
    month:'',
    day:''
  },
  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'ThI6yr8qlRrnLl5OT7T3dN4YMap1PNdr'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log('success!!!');
      var weatherData = data.currentWeather[0];
      that.setData({
        weatherData: weatherData
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day=now.getDate()
    this.setData({
      year: year,
      month: month,
      day: day
    })
  },
  handleClickLink(){
    wx.navigateTo({
      url: '../wea_detail/wea_detail',
    })
  },
  getCalendarData(e) { // 监听日历数据
    console.log(e.detail)
  }
})