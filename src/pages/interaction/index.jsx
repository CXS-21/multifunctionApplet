import { useState, useEffect } from "react";
import Taro, { usePullDownRefresh } from "@tarojs/taro";
import { Button, View, Text, Image } from "@tarojs/components";
import "./index.less";

export default function() {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    //1.手势滑动返回时不做拦截
    //2.在任何场景下，此功能都不应拦住用户退出小程序的行为
    Taro.enableAlertBeforeUnload({
      message: "确认返回？",
    });
  }, []);

  usePullDownRefresh(() => {
    Taro.stopPullDownRefresh();
  });

  const handleShowNum = () => {
    let num = 4;
    let timer = setInterval(() => {
      num = num - 1;
      console.log("num: ", num);
      if (num < 0) {
        clearInterval(timer);
        setIsShow(true);
        Taro.hideToast();
      } else {
        Taro.showToast({
          title: `${num}秒后显示数字2`,
          icon: "none",
        });
      }
    }, 1000);
  };

  const handleShowImg = () => {
    Taro.showToast({
      title: "注意",
      image: "../../assets/clock.png",
      duration: 2000,
    });
  };

  const handleCloseMsg = () => {
    Taro.disableAlertBeforeUnload();
  };

  const handleShowNavLoading = () => {
    Taro.showNavigationBarLoading();
  };

  const handleHideNavLoading = () => {
    Taro.hideNavigationBarLoading();
  };

  const handlePull = () => {
    Taro.startPullDownRefresh({
      success: () => {
        setTimeout(() => {
          Taro.stopPullDownRefresh();
        }, 1000);
      },
    });
  };

  return (
    <View>
      <Button onClick={handleShowNum}>点击三秒后显示数字2</Button>
      {isShow && <Text>2</Text>}
      <Button onClick={handleShowImg}>显示图案</Button>
      <Button onClick={handleCloseMsg}>关闭返回询问窗口</Button>
      <Button onClick={handleShowNavLoading}>显示加载导航条</Button>
      <Button onClick={handleHideNavLoading}>关闭加载导航条</Button>
      <Button onClick={handlePull}>下拉加载</Button>
      <Button
        onClick={() => {
          Taro.getNetworkType({
            success(res) {
              console.log("res: ", res);
            },
          });
        }}
      >
        网络类型
      </Button>
    </View>
  );
}
