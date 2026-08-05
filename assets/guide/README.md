# 当季导览图片说明

首页尾页景点由 `js/data.js` 的 `seasonalDestinations` 配置驱动。每个景点包含一张横幅缩略图（`*-strip.jpg`）和一张点击后加载的大图（`*-full.jpg`）。

当前素材对应：

- `longtan-*`：龙潭大峡谷。
- `qingyao-*`：青要山。
- `wangfu-*`：王府竹海。
- `yangzigou-*`：养子沟临时占位，现使用另一张龙潭大峡谷图片。

更新季节或替换景点时，可替换同名图片，或在 `js/data.js` 中调整图片路径、双语文案和 PDF 路径。当前四个景点的出游计划按钮均临时指向 `assets/guides/longtan-grand-canyon-guide.pdf`。
