import { useState } from "react";
import { View, Text, Button, Image, Input } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useDebounceFn } from "ahooks";
import "./index.less";
import Empty from "../../components/Empty";
const dataList = [
  {
    label: "隐私授权",
    url: "/pages/privacyData/index",
  },
  {
    label: "资源预约",
    url: "/pages/appointment/index",
  },
  {
    label: "一键切换中英文",
    url: "/pages/changeLanguage/index",
  },
  {
    label: "自定义顶部导航栏",
    url: "/pages/navigationBar/index",
  },
  {
    label: "周历",
    url: "/pages/week/index",
  },
  {
    label: "左滑删除",
    url: "/pages/moveLeftDel/index",
  },
  {
    label: "列表局部加载",
    url: "",
  },
  {
    label: "视频播放",
    url: "/pages/video/index",
  },
  {
    label: "图片压缩",
    url: "",
  },
  {
    label: "操作菜单",
    url: "/pages/menu/index",
  },
  {
    label: "交互回调效果",
    url: "/pages/interaction/index",
  },
  {
    label: "图表集",
    url: "/pages/chart/index",
  },
  {
    label: "水印",
    url: "/pages/waterMark/index",
  },
  {
    label: "打字机效果",
    url: "/pages/typewriter/index",
  },
  {
    label: "------",
    url: "",
  },
  {
    label: "------",
    url: "",
  },
  {
    label: "------",
    url: "",
  },
];
export default () => {
  const [menuList, setMenuList] = useState(dataList);
  const [search, setSearch] = useState("");

  useDidShow(() => {
    setSearch("");
    onMatch();
  });

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
    if (item.url) {
      Taro.navigateTo({
        url: item.url,
      });
    } else {
      Taro.showToast({
        title: "Coming soon~",
        icon: "none",
      });
    }
  };

  return (
    <View className="index_container">
      <View className="index_search_box">
        <Input
          value={search}
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
        {menuList && menuList.length > 0 ? (
          menuList.map((item, index) => {
            return (
              <Button
                key={index}
                className={`item ${item.url ? "" : "item_bgc_ban"}`}
                onClick={() => handleNav(item)}
              >
                <Text>{item.label}</Text>
              </Button>
            );
          })
        ) : (
          <Empty />
        )}
        {menuList && menuList.length > 0 && (
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
        )}
      </View>
    </View>
  );
};
