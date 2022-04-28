import request from '@/utils/request' // 里面封装了axios

export default {
    // 1. 课程列表
    addCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },

    // 2. 获取所有教师 供下拉列表选择
    getTeacherList() {
        return request({
            url: `/eduservice/teacher/list`,
            method: 'get'
        })
    }
}
