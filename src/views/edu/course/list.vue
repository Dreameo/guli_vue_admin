<template>
  <div class="app-container">
    <!-- 教师管理 -->

    <!-- 搜索栏 -->

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="讲师姓名">
        <!-- 双向绑定 -->
        <el-input v-model="teacherQuery.name" placeholder="讲师姓名" />
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="首席讲师" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
      </el-form-item>
      <el-button type="default" @click="clearQuery()">清空</el-button>
    </el-form>

    <!-- 教师列表 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <!-- scope表示这个表格范围 -->
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程标题" width="220" />

      <el-table-column label="发布状态" width="110">
        <template slot-scope="scope">
          {{ scope.row.status === "Noraml" ? "已发布" : "未发布" }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时" />

      <el-table-column prop="viewCount" label="浏览量" width="60" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column label="操作" width="600" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程基本信息</el-button
            >
          </router-link>
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程大纲信息</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除课程信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="getList"
      :current-page="page"
      :page-size="limit"
      :total="total"
    >
    </el-pagination>
  </div>
</template>



<script>
import course from "@/api/edu/course";

export default {
  // 写核心代码

  // 结构

  // data: {

  // },
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后返回的集合
      // 方法中，有三个参数
      page: 1, // 当前页
      limit: 5, // 每页记录数
      total: 0, // 总记录数
      teacherQuery: {}, // 条件封装， 初始值为空， 查询全部数据
    };
  },

  created() {
    // 页面渲染之前执行， 一般调用methods定义的方法
    this.getList(); // created调用方法
  },

  methods: {
    // 创建具体方法, 调用teacher.js定义的方法
    // 讲师列表的方法
    getList(page = 1) {
      // axios.post("").then().catch(); 以前这样写
      this.page = page;
      course
        .getCourseList()
        .then((response) => {
          // 请求成功 response是接口返回的信息
          console.log(response);

          this.list = response.data.courseList;
        })
        .catch((error) => {
          console.log(error); // 请求失败
        });
    },
    // 清空查询条件方法
    clearQuery() {
      // 清空查询条件，将条件对象置为空
      this.teacherQuery = {};
      // 调用查询列表方法
      this.getList();
    },
    // 根据id删除讲师
    removeDataById(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        course.deleteCourseById(id).then(() => {
          // 提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 刷新页面
          this.getList();
        });
      });
    },
  },
};
</script>
