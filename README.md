# 注意
1. dva项目初始化要把node_modules全部删掉重新yarn安装依赖
2. node-sass装4.11.1 sass-loader装7.3.0

# require("history").createHashHistory报错
1. 找到node_modules=>dva=>lib=>index.js
2. 找到`require("history/createHashHistory")`
3. 替换成`require("history").createHashHistory`

# 安装依赖包
1. `yarn add node-sass@4.11.1 sass-loader@7.3.0 antd@3.13.3`
2. `yarn add babel-plugin-import`

# 配置antd按需加载 -> .webpackrc.js
1. .webpackrc 改成 .webpackrc.js
2. 添加 `export default {
    extraBabelPlugins: [
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ];
}`

# antd Form 表单提供的方法
`Form.create()(组件名)`
1. getFieldDecorator("字段名",{配置信息})(表单组件)
2. getFieldValue("字段名")
3. validateFields((err,values)=>{
    if (!err) console.log(values);
})