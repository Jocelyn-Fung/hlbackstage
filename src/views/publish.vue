<template>
  <div class="publish">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/article' }">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片嵌套 -->
    <el-card class="box-card">
      <el-form ref="form" :model="postForm" label-width="80px">
        <el-form-item label="标题：">
          <el-input v-model="postForm.title" ref="title"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <template>
            <el-radio v-model="postForm.type" :label="1">文章</el-radio>
            <el-radio v-model="postForm.type" :label="2">视频</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 组件的文件上传 -->
          <!-- action处理文件上传的服务器接口地址-->
          <!-- 有属于自己的headers异步操作 -->
          <!-- 要验证是否成功，可以调用on-success方法 -->
          <el-upload
            v-if="postForm.type === 2"
            action="http://127.0.0.1:3000/upload"
            :headers="setToken()"
            :on-success="handleSuccess"
            :limit="3"
            :file-list="fileList"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上视频文件</div>
          </el-upload>
          <!-- 富文本框 -->
          <VueEditor :config="config" v-if="postForm.type===1" ref="VueEditor" />
        </el-form-item>
        <el-form-item label="栏目：">
          <template>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCates" @change="handleCheckedCatesChange">
              <el-checkbox v-for="item in catesList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="封面：">
          <el-upload
            action="http://127.0.0.1:3000/upload"
            :headers="setToken()"
            list-type="picture-card"
            :on-success="handleCoverSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeUploadCover"
            :limit="3"
            :on-exceed="overLimit"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publishArticles">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
// 引入需要动态渲染生成的栏目列表
import { ArticleCate, publishArticle } from '@/apis/article.js'
export default {
  data () {
    return {
      // 最终发送请求需要的参数
      postForm: {
        title: '', // 已经获取
        content: '', // 已经获取
        categories: [],
        cover: [], // 已经获取
        type: 1 // 已经获取
      },
      //   这里是配置富文本框的视频上传和文件上传的
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.setToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
            console.log(res) // 返回了富文本框中文件上传成功
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.setToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
            // console.log(res) //存在的问题，基准路径没有添加进去
          }
        }
      },
      //   这里是配置栏目框的属性
      isIndeterminate: false,
      checkAll: false,
      checkedCates: [],
      catesList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      //   这是el组件文件上传的属性设置
      fileList: []
    }
  },
  components: {
    VueEditor
  },
  methods: {
    //   发布文章方法
    async publishArticles () {
      // 1.获取文章标题， 并赋值给title
      //   this.title = this.$refs.title.value
      // 2.获取富文本框内的内容也就是content文章内容，进行赋值
      //   this.content = this.$refs.VueEditor.editor.root.innerHTML
      //   3. 获取所属栏目ID集合
      // 4.获取封面图片ID集合
      // 只有在类型是文章的时候才需要从富文本框中获取数据，
      //   如果是发布视频内容，则需要在视频上传成功的时候就将上成功的路径赋值给content属性
      // 先获取到富文本框中的内容，然后赋值给content， 但是需要判断内容是否就是文章，也可能是视频文件大大大
      if (this.postForm.type === 1) {
        this.postForm.content = this.$refs.VueEditor.editor.root.innerHTML
      } else if (this.postForm.type === 2) {
        this.postForm.content =
          localStorage.getItem('hl_back_baseURL') + this.postForm.content
      }
      // 应该获取栏目数据 // 发布成功后应该将他push进文章的列表中[]
      this.catesList.forEach(value => {
        this.postForm.categories.push({
          id: value
        })
      })
      let res = await publishArticle(this.postForm)
      // console.log(res) // 可以正常发布文章了，但是富文本框的内容还没有获取到，content是''
      if (res.data.message === '文章发布成功') {
        this.$message.success('文章发布成功')
        this.$router.push({ path: 'article' })
      }
    },
    // 封装拦截器
    setToken () {
      let token = localStorage.getItem('hl_back_token')
      return {
        Authorization: token
      }
    },
    // 这里是文件上传视频的el中组件的测试方法 成功时调用的钩子函数
    handleSuccess (response, file, fileList) {
      if (response.message === '文件上传成功') {
        //   如果文件上传成功了就把文件的地址赋值给content
        this.postForm.content = response.data.url
      }
      //   console.log(response)
      //   console.log(file)
      //   console.log(fileList)
    },

    // 1.栏目全选或者全不选的时候触发
    handleCheckAllChange (val) {
      //   console.log(val)// val的值位true说明是全选状态，反之不是，true的时候，将数组.map循环遍历并且转换成为对象
      this.checkedCates = val
        ? this.catesList.map(value => {
          return value.id
        })
        : []
      this.isIndeterminate = false
    },
    // 2.处理栏目单选或者选中某一些
    handleCheckedCatesChange (value) {
      //   console.log(this.checkedCates, value) 获取到了被选中的栏目的id 是一个数组
      let checkedCount = value.length
      // 如果数量和源数据的数量一样，说明就是全选状态
      this.checkAll = checkedCount === this.catesList.length
      // 如果有选择，但是又没有全选，那么就是不确定的状态
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.catesList.length
    },

    // 1.处理封面图片   移除封面图片的时候需要把图片从数组中删除，否则只是页面中删除而已只是个效果
    handleRemove (file, fileList) {
      //   console.log(file, fileList) 遍历整个数组，然后从数组中删除被删除的那个图片
      for (let i = 0; i < this.postForm.cover.length; i++) {
        if (this.postForm.cover[i].id === file.response.data.id) {
          this.postForm.cover.splice(i, 1)
        }
      }
    }, //  2.封面图片上传成功后的钩子函数
    handleCoverSuccess (response) {
      //   console.log(file) 文件上传成功就赋值给cover属性，然后按照后台的需要保存好数据
      if (response.message === '文件上传成功') {
        this.postForm.cover.push({ id: response.data.id })
        // console.log(this.postForm.cover)
      }
    },
    // 3.封面图片上传之前，先判断用户上传的数据类型是否是图片文件
    beforeUploadCover (file) {
      //   console.log(file) 在上传之前做出判断，如果用户上传的类型不对，给出提示，且return false 不做接下来的上传操作了
      if (file.type.indexOf('image/') !== 0) {
        this.$message.warning('亲，只能上传图片文件哦！')
        return false
      }
    },
    // 4.限制3个图片，超过3张封面图片时告诉用户不能再多了
    overLimit (file, fileList) {
      //   console.log(fileList.length)
      if (fileList.length >= 3) {
        this.$message.warning('亲，我只能上传3张封面图片哟！')
      }
    },

    // 1.处理el组件视频上传的业务， 上传之前
    beforeUpload (file) {
      //   console.log(file) 在上传之前做出判断，如果用户上传的类型不对，给出提示，且return false 不做接下来的上传操作了
      if (file.type.indexOf('video/') !== 0) {
        this.$message.warning('亲，只能上传视频文件哦！')
        return false
      }
    },
    // 2.视频 删除之前
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  },
  // 1.动态生成栏目列表
  async mounted () {
    let res = await ArticleCate()
    if (res.status === 200) {
      this.catesList = res.data.data.splice(2)
      //   console.log(this.catesList)
    }
  }
}
</script>

<style lang='less' scoped>
.box-card {
  margin-top: 20px;
}
</style>
