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
          :min="0"
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
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="teacherInfo.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
          </el-button>

          <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
        <input type="file" name="file"/>
      -->
          <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/eduoss/fileoss'"
                        field="multipartFile"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>
      </el-form-item>



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
// 引入组件
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  components: { ImageCropper, PanThumb },

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

      //上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, //上传组件key值
      BASE_API: process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled: false, // 保存按钮是否禁用,
    };
  },
  created() {
    //  console.log(this.BASE_API)
    // 在数据渲染之前，调用判断路径是否有id 从而判断是add 还是update 讲师信息
    this.init();
  },

  watch: {
    //监听
    $route(to, from) {
      //路由变化方式，路由发生变化，方法就会执行
      this.init();
    },
  },

  methods: {
    close() {
      // 关闭上传头像 弹框
      this.imagecropperShow = false;
      // 每次点击close之后， 组件重新初始化， 因此把这个组件唯一标识号变换一个不一样的数
      this.imagecropperKey = this.imagecropperKey + 1;
    },

    cropSuccess(data) {
      // :url="BASE_API + '/eduoss/fileoss'" 从这里返回数据
      // 上传成功 将返回的值 url复制给 avatar
      this.imagecropperShow = false;
      //上传之后接口返回图片地址
      
       this.teacherInfo.avatar = data.url;
       this.imagecropperKey = this.imagecropperKey + 1;
    },

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