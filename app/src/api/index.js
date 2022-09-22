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

    export const getAllArticleListAPI= ({ channel_id,timestamp}) => {
        return request({
          url: '/v1_0/articles',
          params: {
            channel_id,
            timestamp
          }
        })
      }