import { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";
import { zh } from "./zh";
import { en } from "./en";
export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      // 默认为英文
      content: en,
    };
  }
  componentWillMount() {}
  componentDidMount() {
    this.updateContent();
  }

  /* change language and update content */
  changeLanguage() {
    let language = Taro.getStorageSync("language");
    if (language === "zh") {
      Taro.setStorageSync("language", "en");
    } else {
      Taro.setStorageSync("language", "zh");
    }
    this.updateContent();

    // console.log(Taro.Current.page.route, 999);

    Taro.reLaunch({
      url: "/" + Taro.Current.page.route, //更改语言后的新页面
    });
  }
  /* get content from language */
  updateContent() {
    let app = Taro.getApp();
    // console.log("app: ", app);
    let params = app.$app.taroGlobalData.content;
    console.log("params: ", params);
    let lastLanguage = Taro.getStorageSync("language");
    // console.log("lastLanguage: ", lastLanguage);

    if (lastLanguage === "en") {
      // 字典赋值
      params = en;
      Taro.setStorageSync("content", en);
      Taro.setStorageSync("language", "en");
      this.setState({
        content: params,
      });
    } else {
      params = zh;
      Taro.setStorageSync("content", zh);
      Taro.setStorageSync("language", "zh");
      this.setState({
        content: params,
      });
    }
  }
  render() {
    const { content } = this.state;
    // console.log("2222: ", content);
    return (
      <View>
        <View
          className="language"
          onClick={() => {
            this.changeLanguage();
          }}
        >
          {content.title === "EN" ? "ZH" : "EN"}
        </View>
      </View>
    );
  }
}
