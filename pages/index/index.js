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
    },
    onLoad() {
        // 获取公告
        this.getNoticeList();
        // 获取商品分类
        this.getGoodsCategory();
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
            console.log(res);
            if (res.code === 0) {
                this.setData({
                    goodsCategory: res.data
                });
            }
        });
    },

    // 搜索
    selectResult(e) {
        console.log('select result', e.detail)
    },
})