<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 章节列表 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapters" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button style="" type="text" @click="openVideo(chapter.id)"
              >添加小节</el-button
            >
            <el-button style="" type="text" @click="openEditChatper(chapter.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="removeChapter(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>

        <!-- 视频 小节-->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button style="" type="text" @click="editVideo(video.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="removeVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
        >下一步</el-button
      >
    </div>
  </div>
</template>

<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: "",
      chapters: [],

      chapter: {
        id: "",
        courseId: "",
        title: "",
        sort: "",
      }, // 章节

      video: {
        id: "",
        courseId: "",
        chapterId: "",

        // 小节
        title: "",
        sort: "",
        free: "",
      },

      dialogChapterFormVisible: false, // 章节弹出框标识
      dialogVideoFormVisible: false, // 小节弹出框标识
      saveVideoBtnDisabled: false,
    };
  },

  created() {
    // 根据 url中 的id 获取章节
    // 获取url中的参数 this.$route.params && this.$route.params.id
    if (this.$route.params && this.$route.params.id) {
      // url中是否有参数  并且 参数id 是否存在
      this.courseId = this.$route.params.id;
      console.log("courseId :" + this.courseId)
      this.getChapters(); 
    }
  },

  methods: {
    openChapterDialog() {
      this.chapter = {};

      this.dialogChapterFormVisible = true;
    },

    //====================章节操作开始=============================

    openEditChatper(id) {
      // 打开修改章节

      // 1. 弹出 修改对话框
      this.openChapterDialog();

      // 2. 回显数据
      // 根据章节id查询
      chapter
        .getChapterById(id)
        .then((response) => {
          this.chapter = response.data.chapter;
        })
        .catch((error) => {});
    },

    removeChapter(id) {
      // 删除章节

      // 1. 弹出确认框
      this.$confirm("此操作将删除章节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        //调用删除的方法
        chapter.deleteChapterById(id).then((response) => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });

          //刷新页面
          this.getChapters();
        });
      }); //点击取消，执行catch方法
    },

    addChapter() {
      // 增加章节
      chapter
        .addChapter(this.chapter)
        .then((response) => {
          // 提示
          this.$message({
            type: "success",
            message: "添加章节成功！",
          });

          // 关闭 弹窗
          this.dialogChapterFormVisible = false;

          // 3. 刷新页面
          this.getChapters();
        })
        .catch((error) => {});
    },
    updateChapter() {
      // 修改章节
      chapter
        .updateChapter(this.chapter)
        .then((response) => {
          // 提示
          this.$message({
            type: "success",
            message: "修改章节成功！",
          });
          // 关闭弹窗
          this.dialogChapterFormVisible = false;

          // 刷新 列表页面
          this.getChapters();
        })
        .catch((error) => {});
    },

    saveOrUpdate() {
      // 增加或者修改章节
      // 增加或者修改之前 将 课程id设置一下
      this.chapter.courseId = this.courseId;
      if (!this.chapter.id) {
        this.addChapter();
      } else {
        this.updateChapter();
      }
    },

    getChapters() {
      chapter
        .getChapters(this.courseId)
        .then((response) => {
          console.log("chapter:getChapters==>");
          console.log(response);
          this.chapters = response.data.chapters;
        })
        .catch((error) => {});
    },

    //====================章节操作结束=============================

    //====================小节操作开始=============================
    openVideo(chapter_id) {
      this.video = {}; // 清空 video数据
      this.video.chapterId = chapter_id;
      this.dialogVideoFormVisible = true;
    },

    addVideo() {
      // 增加小节
      video
        .addVideo(this.video)
        .then((response) => {
          // 提示
          this.$message({
            type: "success",
            message: "增加小节成功",
          });
          // 关闭窗口
          this.dialogVideoFormVisible = false;
          // 刷新列表
          this.getChapters();
        })
        .catch((error) => {});
    },

    updateVideo() {
      // 修改小节
      video.updateVideo(this.video).then(response => {
          //// 提示
          this.$message({
            type: "success",
            message: "修改小节成功",
          });

          // 关闭 弹窗
          this.dialogVideoFormVisible = false

          this.getChapters()
      }).catch(error =>{

      })
    },

    editVideo(video_id) {
      this.openVideo()

      video.getVideoById(video_id).then(response => {
          this.video = response.data.video
      }).catch(error => {

      })

    },

    removeVideo(video_id) {
      video
        .deleteVideoById(video_id)
        .then((reponse) => {
          // 提示
          this.$message({
            type: 'success',
            message: '删除小节成功！'
          })

          // 查询 全部章节列表
          this.getChapters()
        })
        .catch((error) => {});
    },

    saveOrUpdateVideo() {
      this.video.courseId = this.courseId;
      console.log(video.id)
      if (!this.video.id) {
        this.addVideo();
      } else {
        this.updateVideo();
      }
    },

    //====================小节操作结束=============================

    previous() {
      console.log("previous + couser_id:" + this.courseI);
      this.$router.push({ path: "/course/info/" + this.courseId });
    },

    next() {
      console.log("next + couser_id:" + this.courseId);
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },
  },
};
</script>


<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>
