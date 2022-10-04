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

export const removeChannelAPI = ({ channel_id }) => request({
    url: `/v1_0/user/channels/${channel_id}`,
    method: 'DELETE',
    params: {//参数,axios会帮拼接在url？后面(查询字符组串)
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
//联想菜单列表
export const suggestListAPI = ({ keywords }) => request({
    url: '/v1_0/suggestion',
    // method:'GET',
    params: {
        q: keywords
    }
})


//用户 个人资料
export const userProfileAPI =()=>request({
    url:'/v1_0/user/profile'
})

//用户 user资料
export const getUserInfoAPI =()=>request({
    url:'/v1_0/user'
})