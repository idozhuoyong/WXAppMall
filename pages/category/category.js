// pages/category/category.js
const WXAPI = require("apifm-wxapi")
WXAPI.init('idozhuoyong') // 初始化使用专属域名

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadmoreShowType: 0,
        categoryList: [],
        selectedCategory: {},
        goodsList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        WXAPI.goodsCategory().then(res => {
            // console.log(res);
            if (res.code === 0) {
                let selectedCategory = {};
                if (res.data && res.data.length > 0) {
                    selectedCategory = res.data[0];
                }
                this.setData({
                    categoryList: res.data,
                    selectedCategory: selectedCategory
                });
                this.getGoodsList();
            }
        });
    },

    /**
     * 事件处理函数
     */
    onHandlerCategoryClick(e) {
        console.log();
        if (e.currentTarget.dataset.selectedCatetory) {
            this.setData({
                selectedCategory: e.currentTarget.dataset.selectedCatetory
            });
            this.getGoodsList();
        }
    },

    /**
     * 发送交易
     */
    getGoodsList() {
        this.setData({
            goodsList: [],
            loadmoreShowType: 1
        });

        WXAPI.goods({
            categoryId: this.data.selectedCategory.id,
            page: "1",
            pageSize: "100000"
        }).then(res => {
            // console.log(res);
            let goodsList = [];
            let loadmoreShowType = 0;

            if (res.code === 0) {
                goodsList = res.data;
            } else {
                loadmoreShowType = 2;
            }

            this.setData({
                goodsList: goodsList,
                loadmoreShowType: loadmoreShowType
            });
        });
    }

})