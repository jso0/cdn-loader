#介绍

## 用法 (Usage)

在入口文件中require("cdn-loader + ? + ModuleName + @ + version + !")

注意三个符号 `?` 、`@` 、`!`

示例： `require('cdn?jQuery@3.1.0!')`

> Note:模块区分大小写
> (功能类似与 `webpack` 的 `externals`)

webpack打包后

``` javascript
// entry.js
/***/ 15:
/***/ function(module, exports) {

    module.exports = window.jQuery;

/***/ }

```

``` html
// index.html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>


```

## 安装 (Install)

> `npm install -D cdn-loader`

## TODO

- [x] 编写一个直接更新webpack原始chunk的插件与``


Have fun

by jso0

[CDNjs.com](https://cdnjs.com/libraries)