import request from '@/utils/request.js'
import axios from '@/utils/request.js'
import { getToken } from '@/utils/token.js'

export const loginAPI = ({ mobile, code }) =>
    axios({
        url: '/v1_0/authorizations',
        method: 'POST',
        data: {
            mobile,
            code
        }
    })

export const getAllChannelsAPI = () =>
    axios({
        url: '/v1_0/channels',
        method: 'GET'
    })

export const getUserChannelsAPI = () =>
    axios({
        url: '/v1_0/user/channels',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
export const updateChannelsAPI = (channels) =>
    axios({
        url: '/v1_0/user/channels',
        method: 'PUT',
        data: {
            channels//用户已选整个频道数组
        }
    })

export const getAllArticleListAPI = ({ channel_id, timestamp }) => request({
    url: '/v1_0/articles',
    params: {
        channel_id,
        timestamp
    }
})

export const disliskeArticleAPI = ({ artId }) =>
    request({
        url: '/v1_0/article/dislikes',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: {
            target: artId
        }
    })

export const feedbackArticleReportAPI = ({ artId, type }) => {
    return request({
        url: '/v1_0/article/reports',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: {
            target: artId,
            type: type,
            remark: ''

        }
    })
}
