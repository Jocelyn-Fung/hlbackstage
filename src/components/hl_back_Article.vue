<template>
  <div class="article">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/article' }">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <template>
      <el-table :data="postList" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title" label="标题" width="420"></el-table-column>
        <el-table-column prop="create_date" label="日期" width="180">
          <template slot-scope="scope">{{scope.row.create_date | dateForm}}</template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="80">
          <template slot-scope="scope">{{scope.row.type===1? '文章':'视频'}}</template>
        </el-table-column>
        <el-table-column prop="user.nickname" label="作者" width="180"></el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分享" placement="top">
              <el-button
                type="success"
                icon="el-icon-share"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
                type="warning"
                icon="el-icon-delete"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { dateForm } from '@/utils/mufilters.js'
// 引入文章列表获取的api
import { ArticleList } from '@/apis/article.js'
export default {
  data () {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      total: 2
    }
  },
  filters: {
    dateForm
  },
  methods: {
    async init () {
      let res = await ArticleList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      if (res.status === 200) {
        this.postList = res.data.data
        this.total = res.data.total
      }
    },
    handleEdit (index, row) {
    //   console.log(index, row)
    },
    handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`) // 这里获取到的是每次点击后每页显示几条数据
      this.pageSize = val
      //   发送请求，刷新页面
      this.init()
    },
    handleCurrentChange (val) {
    //   console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang='less' scoped>
.bread {
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>
