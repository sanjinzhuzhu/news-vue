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

export const userFollowedAPI = ({ userId }) => request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
        target: userId
    }
})

export const userUnFollowedAPI = ({ userId }) => request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'

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
//文章相关
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

export const detailAPI = ({ artId }) => request({
    url: `/v1_0/articles/${artId}`
})
//文章
export const likeArticleAPI = ({ artId }) => request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
        target: artId
    }
})

export const unLikeArticleAPI = ({ artId }) => request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE',
    data: {
        target: artId
    }
})
//文章评论

export const commentArticleAPI = ({ id, offset = null, limit = 10 }) => request({
    url: '/v1_0/comments',
    params: {
        type: 'a',
        source: id,
        offset,
        limit
    }
})
// 评论喜欢
export const commentLikingAPI = ({ comId }) => {
    return request({
        url: '/v1_0/comment/likings',
        method: 'POST',
        data: {
            target: comId
        }
    })
}
//评论不喜欢
export const commentDisLikingAPI = ({ comId }) => {
    return request({
        url: `/v1_0/comment/likings/${comId}`,
        method: 'DELETE'
    })
}
//文章 发布评论
export const commentSendAPI = ({ id, content, art_id = null }) => {
    const obj = {
        target: id,
        content
    }
    if (art_id !== null) { // 如果本次有第三个参数, 证明是对评论进行回复
        obj.art_id = art_id
    }
    return request({
        url: '/v1_0/comments',
        method: 'POST',
        data: obj
    })
}
//搜索联想建议
export const suggestListAPI = ({ keywords }) => request({
    url: '/v1_0/suggestion',
    // method:'GET',
    params: {
        q: keywords
    }
})
//搜索结果
export const saerchResultAPI = ({ page = 1, per_page = 10, q }) => request({
    url: '/v1_0/search',
    params: {
        page,
        per_page,
        q
    }
})



//用户 user资料
// export const getUserInfoAPI = () => request({
//     url: '/v1_0/user'
// })

// 用户 - 基本资料
export const userInfoAPI = () => {
    return request({
        url: '/v1_0/user'
    })
}
//用户 个人资料
export const userProfileAPI = () => request({
    url: '/v1_0/user/profile'
})

// 用户- 更新头像
// 注意: formObj的值必须是一个表单对象
// '{"a": 10, "b": 20}' // 对象格式的JSON字符串
// new FormData() // 表单对象
export const updatePhotoAPI = (formObj) => {
    return request({
        url: '/v1_0/user/photo',
        method: 'PATCH',
        data: formObj
        // 如果你的请求体内容是表单对象, 浏览器会自动携带请求头Content-Type为multipart/form-data
    })
}