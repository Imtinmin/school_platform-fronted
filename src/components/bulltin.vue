<template>
    <div class="bulltin">
        <h2 style="text-align:center">公告</h2>
        <div class="block">
            <el-timeline v-loading="loading">
                <template v-for="(bulletin,i) in BulletinList">
                <el-timeline-item color="#409EFF" :timestamp="bulletin.created_at" placement="top" :key="i">
                    <el-card>
                        <h3>{{ bulletin.bulletin_content }}</h3>
                        <p style="color:#909399">发布于：{{ bulletin.created_at }}</p>
                    </el-card>
                </el-timeline-item>
                </template>
            </el-timeline>
        </div>
    </div>
</template>

<style scoped>
    .bulltin {
        margin-left: 20%;
        margin-right: 20%;
        margin-top: 1%;
    }
</style>

<script>
import Bulltin from '@/api/Bulletin'
export default {
    data(){
        return {
            BulletinList: [],
            loading: false,
        }
    },
    methods: {
        async LoadingBulletin(){
            this.loading = true
            try {
                let result = await Bulltin.getBulletinList();
                this.BulletinList = result.data.data;
                this.loading = false
                //alert(this.BulletinList)
            } catch (error) {
                this.$handleError(error);
            }
        }
    },
    mounted(){
        this.LoadingBulletin();
    }
}
</script>