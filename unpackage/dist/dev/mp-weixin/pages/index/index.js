"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello \u5F20\u601D\u54F2",
      time: "",
      content: "",
      list: [],
      user: "",
      message: "Hello Vue!"
    };
  },
  onLoad() {
    common_vendor.index.showToast({
      title: "\u52A0\u8F7D"
    }), this.timer = setInterval(() => this.changeTime(), 1e3), common_vendor.rn.callFunction({
      name: "fun",
      data: {
        api: "getMessages"
      }
    }).then((res) => {
      this.list = res.result.data;
    }), common_vendor.rn.callFunction({
      name: "fun",
      data: {
        api: "check"
      }
    }).then((res) => {
      console.log(res);
    });
  },
  onUnload() {
    clearInterval(this.timer);
  },
  methods: {
    changeTime() {
      this.time = new Date().toLocaleString();
    },
    publish() {
      if (!this.user) {
        this.user = "\u533F\u540D";
      }
      if (!this.content) {
        common_vendor.index.showToast({
          title: "\u8BF7\u586B\u5199\u7559\u8A00",
          icon: "error"
        });
        this.user = "";
        this.content = "";
        return;
      }
      common_vendor.rn.callFunction({
        name: "fun",
        data: {
          api: "publish",
          content: this.content,
          user: this.user
        }
      }).then((res) => {
        console.log(res), this.list.push({
          _id: res.result.id,
          content: this.content,
          user: this.user
        });
        this.content = "";
        this.user = "";
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.user,
    b: common_vendor.o(($event) => $data.user = $event.detail.value),
    c: $data.content,
    d: common_vendor.o(($event) => $data.content = $event.detail.value),
    e: common_vendor.o(($event) => $options.publish()),
    f: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.user),
        b: common_vendor.t(item.content),
        c: common_vendor.n("list-" + index % 2),
        d: item._id
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/E-C++/Myweb/Uni-apps/YuanDao/YuanDao/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
