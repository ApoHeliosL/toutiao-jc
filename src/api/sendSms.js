/**
 * 发送手机号码相关请求模块
 */
import request from '../../utils/request';

/**
 * 手机号码注册
 */
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,
    })
}

