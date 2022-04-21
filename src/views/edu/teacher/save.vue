<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacherInfo.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacherInfo.sort"
          controls-position="right"
          min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacherInfo.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacherInfo.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacherInfo.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from "@/api/edu/teacher";
export default {
  data() {
    return {
      teacherInfo: {
        // 讲师对象， 可以加入值， 也可以不加
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: "",
      },
    };
  },
  created() {
    // 在数据渲染之前，调用判断路径是否有id 从而判断是add 还是update 讲师信息
    this.init()
  },

  watch: {
    //监听
    $route(to, from) {
      //路由变化方式，路由发生变化，方法就会执行
      this.init();
    },
  },

  methods: {
    init() {
      // 方法抽取
      if (this.$route.params && this.$route.params.id) {
        // 如果id存在
        this.getInfo(this.$route.params.id);
      } else {
        this.teacherInfo = {}; // 清空表单
      }
    },

    saveOrUpdate() {
      // 根据是否有id来判断是添加还是修改
      if (this.teacherInfo.id) {
        // 修改
        this.updateTeacherInfo();
      } else {
        this.saveTeacher(); // 调用save用户方法
      }
    },

    saveTeacher() {
      // 添加讲师信息
      teacher.addTeacher(this.teacherInfo).then((response) => {
        // 添加成功给予提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        // 返回到讲师列表 路由跳转
        //回到列表页面 路由跳转
        this.$router.push({ path: "/teacher/list" }); // 跳转到list界面
      });
    },

    getInfo(id) {
      // 根据id查找讲师信息
      teacher.getTeacherById(id).then((response) => {
        this.teacherInfo = response.data.teacher;
        console.log(response);
      });
    },

    updateTeacherInfo() {
      // 修改讲师信息
      teacher.updateTeacher(this.teacherInfo).then((response) => {
        // 添加成功给予提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        // 返回到讲师列表 路由跳转
        //回到列表页面 路由跳转
        this.$router.push({ path: "/teacher/list" }); // 跳转到list界面
      });
    },
  },
};
</script>