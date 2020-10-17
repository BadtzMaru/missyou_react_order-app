# 注意
1. dva项目初始化要把node_modules全部删掉重新yarn安装依赖

# require("history").createHashHistory报错
1. 找到node_modules=>dva=>lib=>index.js
2. 找到`require("history/createHashHistory")`
3. 替换成`require("history").createHashHistory`

# 安装依赖包
1. `yarn add node-sass sass-loader antd`
2. `yarn add babel-plugin-import`

# 配置antd按需加载 -> .webpackrc.js
1. .webpackrc 改成 .webpackrc.js
2. 添加 `{
    extraBabelPlugins: [
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ];
}`
