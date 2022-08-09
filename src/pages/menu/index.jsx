import { useState } from "react";
import Taro from "@tarojs/taro";
import { Button, View, Text } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "taro-ui/dist/style/components/float-layout.scss";
import "./index.less";

export default function() {
  const [selectValue, setSelectValue] = useState("");
  const [selectModifyValue, setSelectModifyValue] = useState("");
  const [isShow, setIsShow] = useState(false);
  const menuList = ["A", "B", "C"];
  const dealList = [
    {
      id: 1,
      name: "处理方式1",
    },
    {
      id: 2,
      name: "处理方式2",
    },
    {
      id: 3,
      name: "处理方式3",
    },
    {
      id: 4,
      name: "取消",
    },
  ];

  const handleShowMenu = () => {
    Taro.showActionSheet({
      itemList: menuList,
      success: function(res) {
        // console.log("res: ", res);
        let index = res.tapIndex;
        let val = menuList[index];
        setSelectValue(val);
      },
      fail: function(res) {
        console.log(res.errMsg);
      },
    });
  };

  const handleShowModifyMenu = () => {
    setIsShow(!isShow);
  };

  const handleDeal = (item) => {
    setSelectModifyValue(item.name);
    setIsShow(false);
  };
  return (
    <View>
      <Button onClick={handleShowMenu}>显示默认菜单</Button>
      <View>
        <Text>选择的菜单项：</Text>
        <Text>{selectValue}</Text>
      </View>
      <Button onClick={handleShowModifyMenu}>显示自定义菜单</Button>
      <View>
        <Text>选择的菜单项：</Text>
        <Text>{selectModifyValue}</Text>
      </View>
      {isShow ? (
        <AtFloatLayout
          className={"handleContainer"}
          isOpened={isShow}
          onClose={() => setIsShow(false)}
          title={`标题内容`}
        >
          <View className={"handleCon"}>
            {dealList.map((v) => {
              return (
                <View
                  className={"item"}
                  onClick={() => handleDeal(v)}
                  key={v.id}
                >
                  {v.name}
                </View>
              );
            })}
          </View>
        </AtFloatLayout>
      ) : null}
    </View>
  );
}
