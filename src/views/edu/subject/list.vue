<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from '@/api/edu/subject'

export default {

  data() {
    return {
      filterText: '',

      data2: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  created() { // 页面渲染之前
    this.getSubjectList();
  },

  methods: {

    getSubjectList() { // 获取所有科目
        subject.getSubjectList()
            .then(response => {
                console.log(response)
                this.data2 = response.data.list
            })
            .catch(error => {

            })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value) !== -1 // toLowerCase()不区分大小写
    },

  }
}
</script>

