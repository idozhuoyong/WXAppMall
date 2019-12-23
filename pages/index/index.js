// pages/index/index.js

Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputShowed: false,
        inputVal: ""
    },
    onLoad() {
        // this.setData({
        //     search: this.search.bind(this)
        // })
    },
    // search(value) {
    //     console.log("search: " + value);
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
    //         }, 200)
    //     })
    // },
    selectResult(e) {
        console.log('select result', e.detail)
    },
})