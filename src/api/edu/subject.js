import request from '@/utils/request' // 里面封装了axios

export default {
    // 1. 课程分類列表
    getSubjectList() {
        return request({
            url: `/eduservice/subject/list`,
            method: 'get',
        })
    },
}
