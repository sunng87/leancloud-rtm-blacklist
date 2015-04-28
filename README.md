# LeanCloud 实时通信聊天室黑名单云代码范例

[![Awesome LeanCloud](http://leancloud.sexy/badge.svg)](http://leancloud.sexy)

## 原理

通过一张 `BlackList` 表管理每个聊天室（对话）的屏蔽名单，被踢出聊天室时加入屏蔽名单，加入聊天室时检查屏蔽名单是否包含该用户，有则拒绝。

[相关文档](https://leancloud.cn/docs/realtime_v2.html#%E4%BA%91%E4%BB%A3%E7%A0%81_Hook)

## 安装

1. 在数据管理界面创建新 class `BlackList`
2. Fork 此项目，修改 `config/global.json` 填入应用相关信息
3. 在云代码界面部署此项目，至多三分钟后生效

## 自定义业务逻辑

你可以随意修改两个函数中的代码满足应用特殊的业务逻辑。

## 社交应用的黑名单？

这个 Demo 主要描述聊天室场景下黑名单的实现。社交应用的黑名单类似，即在创建对话的 hook `_conversationStart` 里做相应的检查。
同时，社交应用的黑名单数据结构为两个 Client ID 之间的关系，与本 Demo 略有不同。

## License

[Unlicense](http://choosealicense.com/licenses/unlicense/)

