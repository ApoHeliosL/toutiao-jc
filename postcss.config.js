/*
* postcss配置文件 移动端适配
*/
module.exports = {
    plugins: {
        // 'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },   
        'postcss-pxtorem': {
            // 设计稿375/10 = 37.5
            // 设计稿750/10 = 75
            rootValue: 37.5,
            // 需要转换的css属性 *代表所有
            propList: ['*']
        }
    }
}
