const rp = require("request-promise");
const APPID = "wx8891f3cec008e6e5";
const APPSECRET = "e688ffa5f335817d3852d30889b942e3";
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')

const updateAccessToken = async () => {
    const resStr = await rp(URL)
    const res = JSON.parse(resStr)
    // console.log(res)
    // 将token存储在json文件中
    // 有时候可能会读取失败
    if (res.access_token) {
        fs.writeFileSync(fileName, JSON.stringify({
            access_token: res.access_token,
            createTime: new Date()
        }))
    } else {
        await updateAccessToken()
    }
}

const getAccessToken = async () => {
    // 读取JSON文件
    // 当第一次执行的时候，没有access_token.json文件时，会出现错误
    try {
        const readRes = fs.readFileSync(fileName, 'utf8')
        const readObj = JSON.parse(readRes)
        // 如果服务器出现宕机，读取出来的access_token则有可能不是两小时之内的。所以需要进行时间比较
        const createTime = new Date(readObj.createTime).getTime()
        const nowTime = new Date().getTime()
        if ((nowTime - createTime) / 1000 / 60 / 60 >= 2) {
            await updateAccessToken()
            await getAccessToken()
        }
        return readObj.access_token
    } catch (error) {
        await updateAccessToken()
        await getAccessToken()
    }
}

setInterval(async () => {
    await updateAccessToken()
}, (7200 - 300) * 1000)

module.exports = getAccessToken
// console.log(getAccessToken())