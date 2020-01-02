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
        banners: [], // 商品轮播
        goodsRecommend: [], // 爆品推荐
        kanjiaGoodsList: [], // 砍价商品
        pintuanGoodsList: [], // 拼团商品
        goodsList: [], // 商品列表

        currentPage: 1,
        pageSize: 10,
        loadmoreShowType: 0
    },
    /**
     * 生命周期回调—监听页面加载
     */
    onLoad() {
        // 获取公告
        this.getNoticeList();
        // 获取商品分类
        this.getGoodsCategory();
        // 获取商品轮播图
        this.getBanners();
        // 获取爆品推荐商品
        this.getGoods();
        // 获取砍价商品
        this.getKanjiaGoodsList();
        // 获取拼团商品
        this.getPintuanGoodsList();
        // 获取商品列表
        this.getGoodsList(0);
    },
    /**
     * 监听用户下拉动作
     */
    onPullDownRefresh() {
        // 获取公告
        this.getNoticeList();
        // 获取商品分类
        this.getGoodsCategory();
        // 获取商品轮播图
        this.getBanners();
        // 获取爆品推荐商品
        this.getGoods();
        // 获取砍价商品
        this.getKanjiaGoodsList();
        // 获取拼团商品
        this.getPintuanGoodsList();
        // 获取商品列表
        this.getGoodsList(0, true);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.loadmoreShowType == 0) {
            this.setData({
                currentPage: this.data.currentPage + 1,
                loadmoreShowType: 1
            });
            this.getGoodsList(0);
        }
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
            // console.log(res);
            if (res.code === 0) {
                this.setData({
                    banners: res.data
                });
            }
        });
    },
    // 爆品推荐
    getGoods() {
        WXAPI.goods({
            recommendStatus: "1"
        }).then(res => {
            // console.log(res);
            if (res.code === 0) {
                this.setData({
                    goodsRecommend: res.data
                });
            }
        });
    },
    // 获取砍价商品
    getKanjiaGoodsList() {
        WXAPI.goods({
            kanjia: "true"
        }).then(res => {
            // console.log(res);
            if (res.code === 0) {
                this.setData({
                    kanjiaGoodsList: res.data
                });
            }
        });
    },
    // 获取拼团商品
    getPintuanGoodsList() {
        WXAPI.goods({
            pingtuan: "true"
        }).then(res => {
            // console.log(res);
            if (res.code === 0) {
                this.setData({
                    pintuanGoodsList: res.data
                });
            }
        });
    },
    /**
     * 商品列表
     * categoryId：获取指定分类下的商品
     */
    getGoodsList(categoryId, isPullDownRefresh) {
        if (categoryId === 0) {
            categoryId = ""; // 获取所有商品
        }
        let currentPage = this.data.currentPage;
        if (isPullDownRefresh) {
            currentPage = 1;
        }
        WXAPI.goods({
            categoryId: categoryId,
            page: currentPage,
            pageSize: this.data.pageSize
        }).then(res => {
            // console.log(res);
            if (isPullDownRefresh) {
                // 关闭下拉刷新
                wx.stopPullDownRefresh();
            }
            if (res.code === 0) {
                // 交易成功
                let goodsList = [];
                if (isPullDownRefresh) {
                    goodsList = res.data;
                } else {
                    goodsList = this.data.goodsList.concat(res.data);
                }

                this.setData({
                    goodsList: goodsList,
                    loadmoreShowType: 0,
                    currentPage: currentPage
                });
            } else {
                // 交易失败
                if (!isPullDownRefresh) {
                    this.setData({
                        loadmoreShowType: 2
                    });
                }
            }
        });
    },
    // 搜索
    selectResult(e) {
        console.log('select result', e.detail)
    },
})