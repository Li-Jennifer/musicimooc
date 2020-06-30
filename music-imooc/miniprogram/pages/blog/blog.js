// miniprogram/pages/blog/blog.js
let keyword = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false, //控制底部弹出层是否显示
    blogList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  // 发布功能
  onPublish() {
    // 判断用户是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: (res) => {
              this.onLoginSuccess({
                detail: res.userInfo,
              });
            },
          });
        } else {
          this.setData({
            modalShow: true,
          });
        }
      },
    });
  },
  onLoginSuccess(event) {
    const detail = event.detail;
    wx.navigateTo({
      url: `../blog-edit/blog-edit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    });
  },
  onLoginFail() {
    wx.showModal({
      title: "授权用户才能发布",
      content: "",
    });
  },
});
