import request from '@/utils/request' // 里面封装了axios

export default {
    // 1. 课程分類列表
    getChapters(course_id) {
        return request({
            url: `/eduservice/chapter/getChapters/${course_id}`,
            method: 'get',
        })
    },

    // 2. 增加章节
    addChapter(chapter) {
        return request({
            url: `/eduservice/chapter/addChapter`,
            method: 'post',
            data: chapter
        })
    },

    // 3. 根据id查找章节信息
    getChapterById(id) {
        return request({
            url: `/eduservice/chapter/getChapterById/${id}`,
            method: 'get',
        })
    },

    // 4. 更新章节信息
    updateChapter(chapter) {
        return request({
            url: `/eduservice/chapter/updateChapter`,
            method: 'post',
            data: chapter
        })
    },

    // 5. 根据id删除章节信息
    deleteChapterById(id) {
        return request({
            url: `/eduservice/chapter/deleteChapterById/${id}`,
            method: 'delete',
        })
    },
}
