const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.tsx",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: ["babel-loader", "ts-loader"]
            }
        ]
    },
    output: {
        filename: "index.js",
        globalObject: "this",
        library: "react-secure-link",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist"),
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [".js", ".tsx"],
        modules: ["node_modules"],
    },
    target: "web",
};