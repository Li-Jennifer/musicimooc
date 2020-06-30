// miniprogram/pages/blog-edit/blog-edit.js
const MAX_WORDS_NUM = 140 // 输入文字最大的个数
const MAX_IMG_NUM = 9 // 最大上传图片数量
const db = wx.cloud.database()
let content = '' //输入的文字内容
let userInfo = {}
Page({

  
  data: {
    wordsNum: 0, //输入文字的个数
    footerBottom: 0,
    images: [],
    selectPhoto: true //添加图片元素是否正在显示
  },


  onLoad: function (options) {
   // console.log(options)
    userInfo = options
  },

  // 输入的时候控制输入的字数
  onInput(event) {
    let wordsNum = event.detail.value.length
    if (wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
    content = event.detail.value
  },
  // 软键盘弹起的时候控制底部的高度
  onFocus(event) {
    this.setData({
      footerBottom: event.detail.height
    })
  },
  onBlur() {
    this.setData({
      footerBottom: 0
    })
  },
  // 选择照片
  onChooseImage() {
    // 还能再选几张图片
    let max = MAX_IMG_NUM - this.data.images.length
    wx.chooseImage({
      count: max,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
        max = MAX_IMG_NUM - this.data.images.length
        this.setData({
          selectPhoto: max <= 0 ? false : true
        })
      }
    })
  },
  // 删除图片
  onDelImage(event) {
    this.data.images.splice(event.target.dataset.index, 1) //删除对应照片
    this.setData({
      images: this.data.images
    })
    if (this.data.images.length == MAX_IMG_NUM - 1) {
      // 图片个数等于8，显示增加图片框
      this.setData({
        selectPhoto: true
      })
    }
  },
  // 预览照片
  onPreviewImage(event) {
    wx.previewImage({
      urls: this.data.images,
      current: event.target.dataset.imgsrc
    })
  },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})