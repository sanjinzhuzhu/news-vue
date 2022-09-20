import axios from '@/utils/request.js'

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
