<template>
    <div style="margin-left:2%;margin-right:5%;">
        <el-container>
            <el-aside>
                <el-row class="tac">
                    <h4 style="text-align:center;">课程目录</h4>
                    <el-menu default-active="Introduction" isCollapse="true" @open="handleOpen" @close="handleClose"
                        router>
                        <el-menu-item index="Introduction">课程介绍</el-menu-item>
                        <template v-for="(chapter,i) in chapters">
                            <el-submenu :index="String(chapter.chapter_id)" :key="i">
                                <template slot="title">
                                    <i class="el-icon-video-camera"></i>{{ chapter.chapter_name }}
                                </template>
                                <template v-for="(video,i) in chapter.videos">
                                    <el-menu-item :index="chapter.chapter_id+'-'+Number(i+1)" :key="i"><i
                                            class="el-icon-video-camera-solid"></i>{{ video.title }}</el-menu-item>
                                </template>
                                <el-menu-item v-if="chapter.exam" :index="'/multiple-choice/View?exam='+chapter.exam">
                                    章节测验</el-menu-item>
                            </el-submenu>
                        </template>

                        <el-menu-item v-if="course.exam" :index="'/multiple-choice/View?exam='+course.exam">综合测验
                        </el-menu-item>
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
                        <!--<video 
                        preload 
                        controls="controls" 
                        width="700"
                        >
                        <source :src="url"></source>
                        </video>-->

                        <div class="player">
                            <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions"
                                :playsinline="false" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)"
                                @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)"
                                @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)"
                                @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)"
                                @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied"
                                @statechanged="playerStateChanged($event)">
                            </video-player>
                        </div>

                        <el-divider></el-divider>
                        <h3 style="margin-left:2%;text-align:left;font-size:16px">{{ content }}</h3>
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
    import 'video.js/dist/video-js.css'

    export default {
        data() {
            return {
                course_id: this.$route.params.id,
                param: this.$route.path,
                chapters: [],
                course: '',
                url: '',
                look: false,
                content: '',
                ppt_url: '',
                playerOptions: {
                    height: '500',
                    autoplay: false,
                    muted: true,
                    language: 'en',
                    playbackRates: [0.5, 1.0, 1.3,1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        // mp4
                        src: "",
                        // webm
                        // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                    }],
                    poster: "",
                }
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            async LoadCourseInfo() {
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
            loadingVideo(video) {
                if (this.param.split('/')[this.param.split('/').length - 1] == 'Introduction') {
                    this.look = false
                } else {
                    if (video.split('-').length == 2) {
                        var chapter = Number(video.split('-')[0])
                        var video = Number(video.split('-')[1])

                        if (!isNaN(chapter) && !isNaN(video)) {
                            this.url = this.chapters[chapter - 1].videos[video - 1].url
                            this.content = this.chapters[chapter - 1].videos[video - 1].content
                            this.title = this.chapters[chapter - 1].videos[video - 1].title
                            this.ppt_url = this.chapters[chapter - 1].videos[video - 1].ppt_url

                            this.$set(this.playerOptions.sources, 0, {
                               type: "video/mp4",
                               src: this.chapters[chapter - 1].videos[video - 1].url
                             })
                            
                            this.look = true
                            //next()
                        } else {
                            this.$router.push({
                                'name': '404page'
                            })
                        }
                    }
                }
            },
            //video

            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
            },
            onPlayerEnded(player) {
            },
            onPlayerLoadeddata(player) {
                // console.log('player Loadeddata!', player)
            },
            onPlayerWaiting(player) {
                // console.log('player Waiting!', player)
            },
            onPlayerPlaying(player) {
                // console.log('player Playing!', player)
            },
            onPlayerTimeupdate(player) {
                // console.log('player Timeupdate!', player.currentTime())
            },
            onPlayerCanplay(player) {
                // console.log('player Canplay!', player)
            },
            onPlayerCanplaythrough(player) {
                // console.log('player Canplaythrough!', player)
            },
            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },
            // player is ready
            playerReadied(player) {
                // seek to 10s
                console.log('example player 1 readied', player)
                player.currentTime(10)
                // console.log('example 01: the player is readied', player)
            }
        },
        mounted() {
            this.LoadCourseInfo();
            setTimeout(() => {

                this.player.muted(false)
            }, 5000)
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        //更新课程视频
        beforeRouteUpdate(to, from, next) {
            if (to.name == 'Introduction') {
                this.look = false
                next()
            }
            var video = to.path.split('/')[to.path.split('/').length - 1]
            if (video) {
                if (video.split('-').length == 2) {
                    var chapter = Number(video.split('-')[0])
                    var video = Number(video.split('-')[1])
                    if (!isNaN(chapter) && !isNaN(video)) {
                        //alert(JSON.stringify(this.chapters[chapter-1].videos[video-1]))
                        this.url = this.chapters[chapter - 1].videos[video - 1].url
                        this.content = this.chapters[chapter - 1].videos[video - 1].content
                        this.title = this.chapters[chapter - 1].videos[video - 1].title
                        this.ppt_url = this.chapters[chapter - 1].videos[video - 1].ppt_url
                        this.look = true
                        next()
                    } else {
                        this.$router.push({
                            'name': '404page'
                        })
                    }
                }
            } else {
                this.$router.push({
                    'name': '404page'
                })
            }

        }

    }
</script>
