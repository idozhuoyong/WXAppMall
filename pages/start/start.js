// pages/start/start.js
const WXAPI = require("apifm-wxapi")
WXAPI.init('idozhuoyong') // 初始化使用专属域名
const keyIsFirstStart = "keyIsFirstStart";
let _this = undefined;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    isShowToMallBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    wx.getStorage({
      key: keyIsFirstStart,
      success: function(res) {
        // console.log(res);
        if (res.data === "false" && _this.data.banners.length === 0) {
          // 跳转页面
          wx.switchTab({
            url: '/pages/index/index',
          });
        }
      },
    })
    // 请求启动 banner 图
    WXAPI.banners({"type": "app"}).then(res => {
      // console.log(res);
      if (res.code === 0) {
        // 请求成功
        this.setData({"banners": res.data});
      } else {
        // 请求失败
        let banners = [{
          id: 46925,
          picUrl: "https://cdn.it120.cc/apifactory/2019/02/21/70bccd7ef011cbf7c72cdfac1eb157e8.png"
        }];
        this.setData({ "banners": banners});
      }

      // 第一次不会主动触发swiperChange方法
      if (this.data.banners.length <= 1 && this.data.isShowToMallBtn === false) {
        this.setData({ "isShowToMallBtn": true });
      }
    });
  },

  /**
   * 启动轮播图切换
   */
  swiperChange: function(event) {
    // console.log(event);
    if (event.detail.current === this.data.banners.length-1) {
      if (this.data.isShowToMallBtn === false) {
        this.setData({"isShowToMallBtn": true});
      }
    } else {
      if (this.data.isShowToMallBtn === true) {
        this.setData({"isShowToMallBtn": false });
      }
    }
  },

  /**
   * 进入店铺
   */
  onHandlerToMall: function(event) {
    console.log("进入店铺");
    
    // 存储标识
    wx.setStorage({
      key: keyIsFirstStart,
      data: 'false',
    });

    // 跳转页面
    wx.switchTab({
      url: '/pages/index/index',
    });
  }
})