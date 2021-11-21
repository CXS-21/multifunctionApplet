import Taro, { Component } from "@tarojs/taro"
import { Config } from "../config"
export default function request(url, options) {
  let { method, body } = options
  // 添加url前缀
  if (url.indexOf("https://") == -1 && url.indexOf("http://") == -1) {
    url = Config.SERVER_HOME + (url.indexOf("/") === 0 ? url.substr(1) : url)
  }
  let option = {
    method,
    url,
    header: {
      Accept: "application/json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      Expires: 0,
      "Content-Type": "application/json; charset=utf-8"
    },
    dataType: "json"
  }
  let token = Taro.getStorageSync("token")
  //console.log('token',token)
  if (token) {
    option.header = option.header || {}
    option.header.Authorization = `Bearer ${token}`
  }

  // 参数赋值
  switch (method) {
    case "GET":
    case "DELETE":
      option.data = body || {}
      break
    case "POST":
    case "PATCH":
    case "PUT":
      option.data = body || {}
      break
  }
  // console.log("option", option, method)
  return Taro.request({
    ...option
  }).then(res => {
    const { statusCode, data } = res
    if (statusCode >= 200 && statusCode < 300) {
      // console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res.data)
      return data
    } else {
      let { error } = data
      switch (error) {
        default:
          // 400提示
          Taro.showToast({
            title: data.message,
            icon: "none",
            mask: false
          })
      }
      // throw new Error(data.message)
    }
  })
  // .then(res => {
  //   let statusCode = res.statusCode
  //   if (statusCode >= 200 && statusCode < 400) {
  //     return res.data
  //   } else {
  //     if (res.data.error) {
  //       console.log("异常！！！")
  //       Taro.showToast({
  //         title: res.data.message,
  //         icon: "none",
  //         duration: 1000
  //       })
  //     }
  //     return res.data
  //   }
  // })
  // .catch(() => {
  //   console.log("异常！！！")
  //   Taro.showToast({
  //     title: "出现异常了",
  //     icon: "none",
  //     duration: 1000
  //   })
  //   return null
  // })
}

export function requestGet(url, body) {
  return request(url, { method: "GET", body })
}
export function requestDelete(url) {
  return request(url, { method: "DELETE" })
}
export function requestPost(url, body) {
  return request(url, { method: "POST", body })
}
export function requestPatch(url, body) {
  return request(url, { method: "PATCH", body })
}
export function requestPut(url, body) {
  return request(url, { method: "PUT", body })
}
