// pages/wea_detail/wea_detail.js
Page({
  data: {
    
  },
  onLoad: function (options) {
    this.getLocation();
  },
  //获取经纬度方法
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);

        that.getDistrict(latitude, longitude);
      }
    })
  },

  //获取城市信息
  getDistrict: function (latitude, longitude) {
    var that = this
    var url = "https://api.map.baidu.com/reverse_geocoding/v3/";
    var params = {
      ak: "ThI6yr8qlRrnLl5OT7T3dN4YMap1PNdr",
      output: "json",
      coordtype: 'wgs84ll',
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var district = res.data.result.addressComponent.district;
        var city = res.data.result.addressComponent.city;

        that.setData({
          district:district,
          city:city
        })

        var descDistrict = district.substring(0, district.length - 1);
        var descCity = city.substring(0, city.length - 1);
        that.getWeahter(descDistrict);
        that.getAir(descCity)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getWeahter: function (district) {
    var that = this
    var url = 'https://free-api.heweather.net/s6/weather'
    var params = {
      location: district,
      key: "307061a5d6ca42638e98b5e2aa9a677a"
    }
    // var weather = require('../../utils/weather.js')
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        console.log(res)
        var date=res.data.HeWeather6[0].daily_forecast[0].date;
        var location = res.data.HeWeather6[0].basic.location;
        var update = res.data.HeWeather6[0].update.loc;
        var tmp = res.data.HeWeather6[0].now.tmp;
        var tmp_max = res.data.HeWeather6[0].daily_forecast[0].tmp_max;
        var tmp_min = res.data.HeWeather6[0].daily_forecast[0].tmp_min;
        var cond_txt = res.data.HeWeather6[0].now.cond_txt;
        // var cond_icon = weather.weatherIcon(cond_txt);
        var hourly = res.data.HeWeather6[0].hourly;
        var daily = res.data.HeWeather6[0].daily_forecast;
        var fl = res.data.HeWeather6[0].now.fl;
        var wind_dir = res.data.HeWeather6[0].now.wind_dir;
        var wind_sc = res.data.HeWeather6[0].now.wind_sc;
        var hum = res.data.HeWeather6[0].now.hum;
        var pres = res.data.HeWeather6[0].now.pres;
        var vis = res.data.HeWeather6[0].now.vis;
        var uv_brf = res.data.HeWeather6[0].lifestyle[5].brf;
        var sr = res.data.HeWeather6[0].daily_forecast[0].sr;
        var ss= res.data.HeWeather6[0].daily_forecast[0].ss;
        var mr = res.data.HeWeather6[0].daily_forecast[0].mr;
        var ms= res.data.HeWeather6[0].daily_forecast[0].ms;
        var comf = res.data.HeWeather6[0].lifestyle[0].brf;
        var drsg = res.data.HeWeather6[0].lifestyle[1].brf;
        var flu = res.data.HeWeather6[0].lifestyle[2].brf;
        var sport = res.data.HeWeather6[0].lifestyle[3].brf;
        var trav = res.data.HeWeather6[0].lifestyle[4].brf;
        var uv = res.data.HeWeather6[0].lifestyle[5].brf;
        var cw = res.data.HeWeather6[0].lifestyle[6].brf;
        that.setData({
          date:date,
          location:location,
          update:update,
          tmp:tmp,
          tmp_max:tmp_max,
          tmp_min:tmp_min,
          cond_txt:cond_txt,
          // cond_icon:cond_icon,
          hourly:hourly,
          daily:daily,
          fl:fl,
          wind_dir:wind_dir,
          wind_sc:wind_sc,
          hum:hum,
          pres:pres,
          vis:vis,
          uv_brf:uv_brf,
          sr:sr,
          ss:ss,
          mr:mr,
          ms:ms,
          comf:comf,
          drsg:drsg,
          flu:flu,
          sport:sport,
          trav:trav,
          uv:uv,
          cw:cw,
        })
      },
      
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getAir: function (city) {
    var that = this
    var url = 'https://free-api.heweather.net/s6/air/now'
    var params = {
      location: city,
      key: "307061a5d6ca42638e98b5e2aa9a677a"
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var qlty=res.data.HeWeather6[0].air_now_city.qlty
        var pm25 = res.data.HeWeather6[0].air_now_city.pm25
        var pm10 = res.data.HeWeather6[0].air_now_city.pm10
        var no2 = res.data.HeWeather6[0].air_now_city.no2
        var so2 = res.data.HeWeather6[0].air_now_city.so2
        var co = res.data.HeWeather6[0].air_now_city.co
        var o3 = res.data.HeWeather6[0].air_now_city.o3
        var aqi = res.data.HeWeather6[0].air_now_city.aqi
        var main = res.data.HeWeather6[0].air_now_city.main
        that.setData({
          qlty:qlty,
          pm25:pm25,
          pm10:pm10,
          no2:no2,
          so2:so2,
          co:co,
          o3:o3,
          aqi:aqi,
          main:main
        })
      },

      fail: function (res) { },
      complete: function (res) { },
    })
  }
})