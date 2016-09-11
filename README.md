#介绍

## 基本用法 (Usage)

在入口文件中require("cdn-loader + ? + ModuleName + @ + version + !")

注意三个符号 `?` 、`@` 、`!`

示例： `require('cdn?jQuery@3.1.0!')`

> Note:模块区分大小写

> 功能类似与 `webpack` 的 `externals`

webpack打包后

js

``` javascript
// entry.js
/***/ 15:
/***/ function(module, exports) {

    module.exports = window.jQuery;

/***/ }

```

手动添加到html文件

``` html
// index.html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>


```

## 高级用法 (自动生成)

更多支持可通过**[html-webpack-cdn-plugin](https://github.com/jso0/html-webpack-cdn-plugin)**插件自行配置...

## 安装 (Install)

> `npm install -D cdn-loader`

## TODO

- [x] 编写一个更新html-webpack-plugin输出assets插件
- [ ] 后续优化
- [ ] 支持别名设置


Have fun

by jso0

[CDNjs.com](https://cdnjs.com/libraries)
