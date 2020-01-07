// pages/category/category.js
const WXAPI = require("apifm-wxapi")
WXAPI.init('idozhuoyong') // 初始化使用专属域名

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [{
            name: "上装",
            id: "1"
        }, {
            name: "裤装",
            id: "2"
        }, {
            name: "特价区",
            id: "3"
        }, {
            name: "裙装",
            id: "4"
        }],
        navSelectedIndex: "2",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        WXAPI.goodsCategory().then(res => {
            console.log(res);
        });
    }

})