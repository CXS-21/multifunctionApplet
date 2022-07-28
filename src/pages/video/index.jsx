import { Component } from "react";
import { View, Text, Button, Video } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import "./index.less";
@connect(({ user }) => ({
  userInfo: user.userInfo,
}))
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="container">
        <View className="content">
          <Video
            id="video"
            src="https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
            poster="https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
            initialTime="0"
            controls={true}
            autoplay={false}
            loop={false}
            muted={false}
            danmuBtn
            enable-danmu
            danmuList={[
              {
                text: "第 1s 出现的弹幕",
                color: "#ff0000",
                time: 1,
              },
              {
                text: "第 3s 出现的弹幕",
                color: "#ff00ff",
                time: 3,
              },
            ]}
          />
        </View>
      </View>
    );
  }
}
