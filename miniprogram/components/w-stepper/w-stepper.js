// component/stepper/stepper.js
Component({
  properties: {
    num:{
      type:String,
      value:'0'
    }
  },
  data: {
    // num: 1,
  },

  methods: {
    bindMinus: function() {
      var num = Number(this.data.num)-Number('0.1');
      // console.log(parseInt(this.data.num));
      // console.log(num);
      num=(num.toFixed(1)).toString();
      this.setData({
        num: num,
      });
      this.triggerEvent('minusClick', { num }, {})
      // console.log(num)
    },

    bindPlus: function() {
      var num = Number(this.data.num) + Number('0.1');
      num = (num.toFixed(1)).toString();
      this.setData({
        num: num,
      });
      this.triggerEvent('plusClick', { num }, {})
      // console.log(num)
    },

    bindManual: function(e) {
      let num = e.detail.value;
      this.setData({
        num: num
      });
      this.triggerEvent('manualClick', { num }, {})
    }
  }
})