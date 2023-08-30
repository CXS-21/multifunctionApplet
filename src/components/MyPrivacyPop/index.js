import { useState, useEffect } from "react";
import { View, Button } from "@tarojs/components";
import "./index.less";

export default () => {
  const [isShowPrivacyPop, setIsShowPrivacyPop] = useState(false);

  useEffect(() => {
    if (wx.getPrivacySetting) {
      wx.getPrivacySetting({
        success: (res) => {
          console.log(
            "是否需要授权：",
            res.needAuthorization,
            "隐私协议的名称为：",
            res.privacyContractName
          );
          if (res.needAuthorization) {
            setIsShowPrivacyPop(true);
          } else {
            setIsShowPrivacyPop(false);
          }
        },
        fail: () => {},
        complete: () => {},
      });
    }
  }, []);

  return isShowPrivacyPop ? (
    <View className={`MyPrivacyPop`}>
      <View className="title">用户隐私保护提示</View>
      <View className="tips1">
        感谢您使用本应用，您使用本应用前应当阅读并同意
      </View>
      <View
        className="contract"
        onClick={() => {
          wx.openPrivacyContract({
            success: (res) => {
              console.log("openPrivacyContract success", res);
            },
            fail: (res) => {
              console.error("openPrivacyContract fail", res);
            },
          });
        }}
      >
        《用户隐私保护指引》
      </View>
      <View className="tips2">
        当您点击同意并开始使用产品服务时，即表示你已理解并同意该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法进入应用。
      </View>
      <View className="btn_box">
        <Button
          id="disagree-btn"
          onClick={() => {
            setIsShowPrivacyPop(false);
            wx.exitMiniProgram();
          }}
        >
          不同意并退出
        </Button>
        <Button
          id="agree-btn"
          openType="agreePrivacyAuthorization"
          onAgreePrivacyAuthorization={(e) => {
            console.log("e: ", e);
            setIsShowPrivacyPop(false);
          }}
        >
          同意并继续
        </Button>
      </View>
    </View>
  ) : null;
};
