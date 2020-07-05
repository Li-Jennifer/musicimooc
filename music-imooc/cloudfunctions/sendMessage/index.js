// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数P
exports.main = async (event, context) => {
  const {
    OPENID
  } = cloud.getWXContext()

  const result = await cloud.openapi.subscribeMessage.send({
    touser: OPENID, //要推送给那个用户
    page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`, //要跳转到那个小程序页面
    data: { //推送的内容
      phrase1: {
        value: '评价完成'
      },
      thing2: {
        value: event.content
      }
    },
    templateId: 'oyD0XnmGYU9zZ6_GNUvRbYr_zvIdW_f6t8MA1WzYf5Q' //模板id
  })
  return result
}