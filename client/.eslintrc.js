module.exports = {
    "env": {
        //browser 全局变量
        "browser": true,
        // 支持除模块外所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
        "es6": true,
        // Node.js 全局变量和 Node.js 作用域
        "node": true
    },
    // 自定义全局变量
    "globals": {
        "env": true
    },
    // 启用推荐的规则（http://eslint.cn/docs/rules/）
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    parser: "babel-eslint",
    "parserOptions": {
        //你想使用的额外的语言特性
        "ecmaFeatures": {},
        // 设置ECMAScript模块
        "sourceType": "module"
    },
    // 第三方插件
    "plugins": [
        "react"
    ],
    "rules": {
        //强制使用一致的缩进
        "indent": [
            /* 错误级别：
             * "off" 或 0 - 关闭规则
             * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
             * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
             */
            "error",
            4
        ],
        //强制使用一致的换行风格
        "linebreak-style": [
            "error",
            "unix"
        ],
        // 设置定义字符串的符号：双引号，单引号和反勾号(在 ECMAScript 6 中)
        "quotes": [
            "error",
            "single"
        ],
        // 结尾分号
        "semi": [
            "error",
            "always"
        ],
        //禁用 console
        "no-console": [
            "warn",
            {"allow": ["warn", "error"]}
        ],
        // 禁止未使用过的变量（参数除外）
        "no-unused-vars": [
            "error",
            {"args": "none"}
        ],
        // 只提示声明了propTypes的组件的错误
        "react/prop-types": [
            "warn",
            {"skipUndeclared": true}
        ]
    }
};