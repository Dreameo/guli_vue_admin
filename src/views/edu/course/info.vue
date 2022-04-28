<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 "-->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input
          v-model="courseInfo.description"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss'"
          name="multipartFile"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {
        title: "",
        subjectParentId: "", // 一级分类
        subjectId: "", // 二级分类
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "/static/cover/01.jpg",
        price: 0,
      },

      teacherList: [], // 存储所有讲师列表的数组
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类
      BASE_API: process.env.BASE_API, // 接口地址
    };
  },

  created() {
    this.getTeacherList(); // 获取教师列表
    this.getSubjectOneList(); // 获取一级分类
  },

  methods: {
    // next() {
    //   console.log("next");
    //   this.$router.push({ path: "/course/chapter/1" });
    // },

    saveOrUpdate() {
      course
        .addCourseInfo(this.courseInfo)
        .then((response) => {
          // 提示
          this.$message({
            type: "success",
            message: "添加课程信息成功！",
          });
          // 2. 跳转
          this.$router.push({
            path: "/course/chapter/" + response.data.courseId,
          });
        })
        .catch((error) => {});
    },

    getTeacherList() {
      // 获取所有教师列表
      course
        .getTeacherList()
        .then((response) => {
          console.log(response.data);
          this.teacherList = response.data.items;
        })
        .catch((error) => {});
    },

    getSubjectOneList() {
      // 获取一级分类
      subject
        .getSubjectList()
        .then((response) => {
          this.subjectOneList = response.data.list;
        })
        .catch((error) => {});
    },

    subjectLevelOneChanged(value) {
      // 一级分类变化时 变化  value是一级分类的id值
      // console.log("value:" + value);
      for (var i = 0; i < this.subjectOneList.length; i++) {
        var oneSubject = this.subjectOneList[i];
        // console.log("onsubject.id" + oneSubject.id);
        //判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          //从一级分类获取里面所有的二级分类
          this.subjectTwoList = oneSubject.children;
          //把二级分类id值清空
          this.courseInfo.subjectId = "";
        }
      }
    },

    //上传之前调用的方法
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!(isJPG || isPNG)) {
      //   this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },

    //上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url;
    },
  },
};
</script>
