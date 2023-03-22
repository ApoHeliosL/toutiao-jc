/**
 * 用户相关请求模块
 */
import request from '../../utils/request';

/**
 * 登录/注册
 */
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}
/* 
获取用户频道列表
*/
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}
