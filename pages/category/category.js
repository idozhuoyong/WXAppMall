// pages/category/category.js
const WXAPI = require("apifm-wxapi")
WXAPI.init('idozhuoyong') // 初始化使用专属域名

Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList: [],
        selectedCategory: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        WXAPI.goodsCategory().then(res => {
            console.log(res);
            if (res.code === 0) {
                let selectedCategory = {};
                if (res.data && res.data.length > 0) {
                    selectedCategory = res.data[0];
                }
                this.setData({
                    categoryList: res.data,
                    selectedCategory: selectedCategory
                });
            }
        });
    }

})