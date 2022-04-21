import request from '@/utils/request' // 里面封装了axios

// axios请求，request封装好了
// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

export default {
    // 1. 讲师列表，条件查询带分页
    // page当前页   limit每页展示数量   teacherQuery条件对象(json格式)
    getTeacherListPage(page, limit, teacherQuery) {
        return request({
            // url: '/eduservice/teacher/' + page + '/' + limit,
            url: `/eduservice/teacher/pageTeacherCondition/${page}/${limit}`, // ``里面可以解析变量
            method: 'post',
            // teacherQuery 条件对象， 后端使用requestBody获取数据
            data: teacherQuery // data就表示对象 转换为json传递到接口中去
        })
    },

    // 2. 根据id删除讲师
    delTeacherById(teacher_id) {
        return request({
            url: `/eduservice/teacher/${teacher_id}`, // ``里面可以解析变量
            method: 'delete' // delete 方法

        })
    },

    // 3. 增加讲师信息
    addTeacher(teacherInfo) {
        return request({
            url: `/eduservice/teacher/save`, // ``里面可以解析变量
            method: 'post', // post 方法
            data: teacherInfo
        })
    },

    // 4. 根据id查找讲师信息
    getTeacherById(id) {
        return request({
            url: `/eduservice/teacher/${id}`, // ``里面可以解析变量
            method: 'get', // get 方法
        })
    },

    // 5. 修改讲师信息
    updateTeacher(teacherInfo) {
        return request({
            url: `/eduservice/teacher/updateTeacher`, // ``里面可以解析变量
            method: 'post', // post 方法
            data: teacherInfo,
        })
    }
}
