// pages/index/index.js
const WXAPI = require("apifm-wxapi")
WXAPI.init('idozhuoyong') // 初始化使用专属域名

Page({
    /**
     * 页面的初始数据
     */
    data: {
        noticeList: [], // 公告列表
        goodsCategory: [], // 商品类别
        banners: [] // 商品轮播
    },
    onLoad() {
        // 获取公告
        this.getNoticeList();
        // 获取商品分类
        this.getGoodsCategory();
        // 获取商品轮播图
        this.getBanners();
    },

    // 获取公告
    getNoticeList() {
        WXAPI.noticeList({
            pageSize: "5"
        }).then(res => {
            // console.log(res);
            if (res.code === 0) {
                this.setData({
                    noticeList: res.data.dataList
                });
            }
        });
    },
    // 获取商品分类
    getGoodsCategory() {
        WXAPI.goodsCategory().then(res => {
            // console.log(res);
            if (res.code === 0) {
                let data = res.data;
                // 数据处理
                let goodsCategory = [];
                let tempArr = [];
                for (let i = 0; i < data.length; i++) {
                    if (i !== 0 && i % 10 === 0) {
                        goodsCategory.push(tempArr.concat());
                        tempArr = [];
                    }
                    tempArr.push(data[i]);
                }
                goodsCategory.push(tempArr.concat());

                // console.log(goodsCategory);
                this.setData({
                    goodsCategory: goodsCategory
                });
            }
        });
    },
    // 获取商品轮播图
    getBanners() {
        WXAPI.banners({
            type: "new"
        }).then(res => {
            console.log(res);
            if (res.code === 0) {
                this.setData({
                    banners: res.data
                });
            }
        });
    },

    // 搜索
    selectResult(e) {
        console.log('select result', e.detail)
    },
})