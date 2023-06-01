import { View, Image } from "@tarojs/components";
import "./index.less";

export default () => {
  return (
    <View className={`my_empty`}>
      <Image src={require("../../assets/empty.png")}></Image>
      No data available...
    </View>
  );
};
