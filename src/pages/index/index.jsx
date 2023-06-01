import { useState } from "react";
import { View, Text, Button, Image, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useDebounceFn } from "ahooks";
import "./index.less";
const dataList = [
  {
    id: 1,
    label: "资源预约",
    url: "/pages/appointment/index",
  },
  {
    id: 2,
    label: "一键切换中英文",
    url: "/pages/changeLanguage/index",
  },
  {
    id: 3,
    label: "自定义顶部导航栏",
    url: "/pages/navigationBar/index",
  },
  {
    id: 4,
    label: "周历",
    url: "/pages/week/index",
  },
  {
    id: 5,
    label: "左滑删除",
    url: "/pages/moveLeftDel/index",
  },
  {
    id: 6,
    label: "列表局部加载",
    url: "",
  },
  {
    id: 7,
    label: "视频播放",
    url: "/pages/video/index",
  },
  {
    id: 8,
    label: "图片压缩",
    url: "/pages/img/index",
  },
  {
    id: 9,
    label: "操作菜单",
    url: "/pages/menu/index",
  },
  {
    id: 10,
    label: "交互回调效果",
    url: "/pages/interaction/index",
  },
  {
    id: 11,
    label: "图表集",
    url: "/pages/chart/index",
  },
  {
    id: 12,
    label: "水印",
    url: "/pages/waterMark/index",
  },
  {
    id: 13,
    label: "------",
    url: "",
  },
  {
    id: 14,
    label: "------",
    url: "",
  },
  {
    id: 15,
    label: "------",
    url: "",
  },
  {
    id: 16,
    label: "------",
    url: "",
  },
];
export default () => {
  const [menuList, setMenuList] = useState(dataList);
  const [search, setSearch] = useState("");

  const { run: handleSearch } = useDebounceFn(
    async (e) => {
      onMatch(e);
    },
    {
      wait: 500,
    }
  );

  const onMatch = (value) => {
    let total;
    if (value) {
      let newList = [];
      menuList.map((item) => {
        if (item.label.includes(value)) newList.push(item);
      });
      setMenuList(newList);
      total = newList.length;
    } else {
      setMenuList(dataList);
      total = dataList.length;
    }
    Taro.showToast({
      title: `共找到${total}条数据`,
      icon: "none",
      duration: 2000,
    });
  };

  const handleNav = (item) => {
    Taro.navigateTo({
      url: item.url,
    });
  };

  return (
    <View className="index_container">
      <View className="index_search_box">
        <Input
          onInput={(e) => {
            handleSearch(e.target.value);
            setSearch(e.target.value);
          }}
        />
        <Image
          src={require("../../assets/search.png")}
          onClick={() => onMatch(search)}
        />
      </View>
      <View className="index_content">
        {menuList &&
          menuList.length > 0 &&
          menuList.map((item) => {
            return (
              <Button
                key={item.id}
                className={"item"}
                onClick={() => handleNav(item)}
              >
                <Text>{item.label}</Text>
              </Button>
            );
          })}
        <View
          className="back_top"
          onClick={() => {
            Taro.pageScrollTo({
              scrollTop: 0,
              duration: 200,
            });
          }}
        >
          <Image src={require("../../assets/back.png")} className={"pic"} />
        </View>
      </View>
    </View>
  );
};
