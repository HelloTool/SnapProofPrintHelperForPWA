<div align="center">

<img src="./docs/images/icon.svg" width="192" height="192" alt="App icon">

# 快照凭证打印助手

**仓库**：
[![Gitee 仓库](https://img.shields.io/badge/Gitee-仓库-C71D23?logo=gitee)][RepositoryOnGitee]
[![GitHub 仓库](https://img.shields.io/badge/GitHub-仓库-0969da?logo=github)][RepositoryOnGithub]

**平台**：
[![Windows 10+（exe）](https://img.shields.io/badge/Windows_10+-exe-0078D4?logo=windows)][ReleaseOnGitee]
[![Web（PWA）](https://img.shields.io/badge/Web-PWA-0078D4?logo=windows)][PwaApp]

**语言**：
**中文** |
<small>期待您的翻译！</small>

_该应用程序目前仅支持中文。_

</div>

将多个转账记录图、电商订单图等以凭证样式打印到纸中。

## 特性

- 批量添加图片
- 添加裁切线，方便裁切
- 支持浏览器在线访问，安装应用到本地，暂时不支持 PWA 离线使用

## 软件截图

TODO

## 下载

TODO

## 使用方法

1. 进入应用
2. （仅手机）点击应用栏右上角“打开图片面板”按钮
3. 点击图片面板右上角“添加图片”按钮
4. （可选）在调整面板中调整参数
5. 点击“打印”按钮
6. （可选）调整打印参数
7. 点击打印对话框内的“打印”按钮

## 兼容性

### Web（PWA）版兼容性

本应用需要在支持打印功能的浏览器中打开，建议使用 Chrome v88 或者 Edge v88 更高版本浏览器打开本应用，**不能在微信、QQ 中打开**。

具体兼容性如下表：

| 操作系统 | 应用（浏览器）                                                                                                   | 特性 | 详情                                       | 解决方案           |
| -------- | ---------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------ | ------------------ |
| Android  | 微信、QQ、飞书、360极速浏览器、夸克、X浏览器、UC浏览器、QQ浏览器、小米浏览器、百度浏览器、百度、搜狗浏览器极速版 | 打印 | **无法使用打印功能**                       | 更换其他浏览器     |
| Android  | FireFox、Iceraven 等 FireFox 的分支                                                                              | 打印 | 始终带有页头与页脚，页面方向、布局尺寸错误 | 更换其他浏览器     |
| Android  | Chrome、Edge、Chromium、Cromite、华为浏览器、花瓣浏览器等 Chromium 的分支、荣耀浏览器、Via                       | 打印 | 页面方向、纸张尺寸错误                     | 打印时手动选择参数 |
| Windows  | FireFox                                                                                                          | 打印 | 纸张尺寸错误                               | 打印时手动选择参数 |

### Tauri 版兼容性

| 操作系统 | 特性 | 详情                                | 解决方案            |
| -------- | ---- | ----------------------------------- | ------------------- |
| Windows  | 运行 | 需要 WebView2 v88.0.0.0 或 更高版本 | 安装或更新 WebView2 |

## 许可证

```text
Copyright 2025 Jesse205

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## 开源声明

请参见 [《开源声明》](./docs/legal/os_notices.md)

[RepositoryOnGitee]: https://gitee.com/HelloTool/SnapProofPrintHelperForPWA
[RepositoryOnGithub]: https://github.com/HelloTool/SnapProofPrintHelperForPWA
[ReleaseOnGitee]: https://gitee.com/HelloTool/SnapProofPrintHelperForPWA/releases
[ReleaseOnGithub]: https://github.com/HelloTool/SnapProofPrintHelperForPWA/releases
[PwaApp]: https://hellotool.github.io/SnapProofPrintHelperForPWA/
