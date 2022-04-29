import request from '@/utils/request' // 里面封装了axios

export default {
    // 1. 增加小节
    addVideo(video) {
        return request({
            url: `/eduservice/video/addVideo`,
            method: 'post',
            data:video
        })
    },

    // 2. 根据id删除小节
    deleteVideoById(id) {
        return request({
            url: `/eduservice/video/deleteVideoById/${id}`,
            method: 'delete',
        })
    },

    // 3. 根据id查询小节
    getVideoById(id) {
        return request({
            url: `/eduservice/video/getVideoById/${id}`,
            method: 'get',
        })
    },

    // 4. 修改小节信息
    updateVideo(video) {
        return request({
            url: `/eduservice/video/updateVideo`,
            method: 'post',
            data:video
        })
    },
    
}