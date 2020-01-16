// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    onShow() {
        wx.login({
            success(res) {
                console.log(res);
                wx.getUserInfo({
                    success(res) {
                        console.log(res);
                    }
                });
            }
        });
    }
})