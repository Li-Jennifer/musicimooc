// pages/playlist/playlist.js
const MAX_LIMIT = 15;
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图图片
    swiperImgUrls: [
      {
        url:
          "http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg",
      },
      {
        url:
          "http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg",
      },
      {
        url:
          "http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg",
      },
    ], 
    playlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlaylist();
  },
  _getPlaylist() {
    wx.showLoading({
      title: "加载中",
    });
    wx.cloud
      .callFunction({
        name: "music", // 云函数的名称
        data: {
          start: this.data.playlist.length,
          count: MAX_LIMIT,
          $url: "playlist",
        }, //参数
      })
      .then((res) => {
        this.setData({
          playlist: this.data.playlist.concat(res.result.data), //在当前数据的基础上拼接
        });
        wx.stopPullDownRefresh(); //停止当前页面下拉刷新
        wx.hideLoading();
      });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      playlist: [],
    });
    this._getPlaylist();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist();
  },
});
