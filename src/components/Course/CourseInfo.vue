<template>
    <div style="margin-left:2%;margin-right:5%;">
        <el-container>
            <el-aside>
                <el-row class="tac">
                        <h4 style="text-align:center;">课程目录</h4>
                        <el-menu default-active="Introduction" isCollapse="true" @open="handleOpen"
                            @close="handleClose" router >
                            <el-menu-item index="Introduction">课程介绍</el-menu-item>
                            <template v-for="(chapter,i) in chapters">
                            <el-submenu :index="String(chapter.chapter_id)" :key="i">
                                <template slot="title">
                                    <i class="el-icon-video-camera"></i>{{ chapter.chapter_name }}
                                </template>
                                 <template v-for="(video,i) in chapter.videos">
                                     <el-menu-item :index="chapter.chapter_id+'-'+Number(i+1)" :key="i"><i class="el-icon-video-camera-solid"></i>{{ video.title }}</el-menu-item>
                                 </template>
                                   <el-menu-item v-if="chapter.exam" :index="'/multiple-choice/View?exam='+chapter.exam" >章节测验</el-menu-item>
                            </el-submenu>
                            </template>
                            
                            <el-menu-item v-if="course.exam" :index="'/multiple-choice/View?exam='+course.exam">综合测验</el-menu-item>
                        </el-menu>
                </el-row>
            </el-aside>
            <el-main>
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>{{ course.course_name }}</span>
                    </div>
                        <div style="text-align:center;" v-if="look">
                             <p style="text-align:center;font-size:24px">{{ title }}</p>
                            <video preload controls="controls" :src="url"></video>
                              <el-divider></el-divider>
                              <h3 style="margin-left:2%;text-align:left">{{ content }}</h3>
                            <div v-if="ppt_url">
                               <el-divider></el-divider>
                            
                            <h3> ppt 下载 </h3>
                            
                            <a :href="ppt_url">链接</a>
                            </div>
                        </div>

                        <div v-else style="text-align:center;margin-bottom:5%;">
                            <p style="font-size:25px">课程介绍</p>
                            <p style="margin-top:4%">{{ course.Introduction }}</p>
                        </div>
                    </el-card>      
                      
            </el-main>
        </el-container>

    </div>
</template>

<script>
import Course from '@/api/Course'

  export default {
      data(){
          return {
              course_id: this.$route.params.id,
              param: this.$route.path,
              chapters: [],
              course: '',
              url: '',
              look: false,
              content: '',
              ppt_url: ''
          }
      },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      async LoadCourseInfo(){
            try {
                let result = await Course.getCourseInfo(this.course_id)
                this.course = result.data.data
                this.chapters = result.data.data.chapter;
                var video = this.param.split('/')[this.param.split('/').length - 1]
                this.loadingVideo(video)
            } catch (error) {
                this.$handleError(error);
            }
            
        },
        loadingVideo(video){
            if(this.param.split('/')[this.param.split('/').length - 1] == 'Introduction'){
                this.look = false
            }else{
                if(video.split('-').length == 2){
                    var chapter = Number(video.split('-')[0])
                    var video = Number(video.split('-')[1])
                    
                    if(!isNaN(chapter) && !isNaN(video)){
                        this.url = this.chapters[chapter-1].videos[video-1].url
                        this.content = this.chapters[chapter-1].videos[video-1].content
                        this.title = this.chapters[chapter-1].videos[video-1].title
                        this.ppt_url = this.chapters[chapter-1].videos[video-1].ppt_url
                        this.look = true
                        //next()
                    }else{
                        this.$router.push({'name':'404page'})
                    }
                }
            }
        }
    },
    mounted(){
        this.LoadCourseInfo();

    },
    //更新课程视频
    beforeRouteUpdate (to, from, next) {
            if(to.name == 'Introduction'){
                this.look = false
                next()
            }
            var video = to.path.split('/')[to.path.split('/').length - 1]
            if(video){
                if(video.split('-').length == 2){
                    var chapter = Number(video.split('-')[0])
                    var video = Number(video.split('-')[1])
                    if(!isNaN(chapter) && !isNaN(video)){
                        //alert(JSON.stringify(this.chapters[chapter-1].videos[video-1]))
                        this.url = this.chapters[chapter-1].videos[video-1].url
                        this.content = this.chapters[chapter-1].videos[video-1].content
                        this.title = this.chapters[chapter-1].videos[video-1].title
                        this.ppt_url = this.chapters[chapter-1].videos[video-1].ppt_url
                        this.look = true
                        next()
                    }else{
                        this.$router.push({'name':'404page'})
                    }
                }  
            }else{
                this.$router.push({'name':'404page'})
            }
            
    }

  }
</script>