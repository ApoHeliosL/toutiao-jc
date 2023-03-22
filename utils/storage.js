/**
 * 本地存储封装模块
 */
export const getItem = name => {
    const data = window.localStorage.getItem(name)
    try {
        //尝试data转为js对象 因为data可能不是JSON格式字符串
        return JSON.parse(data)
    } catch (err) {
        //data 不是JSON格式字符串
        return data
    }
}
export const setItem = (name, value) => {
    // 如果是对象先转为JSON格式字符串在存储
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)

}
export const removeItem = name => {
    window.localStorage(name)
}