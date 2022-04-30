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
    },

    // 3. 根据courseid 查找 课程信息
    getCourseInfoById(id) {
        return request({
            url: `/eduservice/course/getCourseInfo/${id}`,
            method: 'get'
        })
    },

    // 4. 传入 courseinfo对象 修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },


    // 5. 根据课程id 查询确认课程信息
    getPublishCourse(course_id) {
        return request({
            url: `/eduservice/course/getPublishCourseInfo/${course_id}`,
            method: 'get',
        })
    },

    // 6. 课程的最终发布
    publishCourse(course_id) {
        return request({
            url: `/eduservice/course/publishCourse/${course_id}`,
            method: 'post',
        })
    },


    // 7. 课程列表查询
    getCourseList() {
        return request({
            url: `/eduservice/course/getCourseList`,
            method: 'get',
        })
    },

    // 8. 根据课程id删除课程信息
    deleteCourseById(id) {
        return request({
            url: `/eduservice/course/deleteCourseById/${id}`,
            method: 'delete',
        })
    }

   



}
