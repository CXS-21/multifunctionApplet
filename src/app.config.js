export default {
  pages: [
    "pages/index/index",
    "pages/appointment/index", //资源预约
    "pages/appointment/time", //资源预约时间段选择
    "pages/changeLanguage/index", //中英文切换
    "pages/navigationBar/index", //自定义顶部导航
    "pages/moveLeftDel/index", //左滑删除
    "pages/video/index", //视频
    "pages/week/index", //周历
    "pages/menu/index", //操作菜单页面
    "pages/interaction/index", //交互效果页面
    "pages/chart/index", //图表
    "pages/chart/pie", //定制饼图
    "pages/waterMark/index", //水印
    "pages/typewriter/index", //打字机效果
    "pages/privacyData/index", //隐私授权
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  __usePrivacyCheck__: true, //开启隐私授权
};
