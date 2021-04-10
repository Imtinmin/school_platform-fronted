<template>
    <div>
        <p class="Introduction-title">课程介绍</p>
           <p style="margin-top:3%;text-align:center"> {{ Introduction }}</p>
    </div>
</template>

<script>
import Course from '@/api/Course'
export default {
    data(){
        return {
            course_id: this.$route.params.id,
            Introduction: ''
        }
    },
    methods: {
        async LoadCourseInfo(){
            try {
                let result = await Course.getCourseInfo(this.course_id)
                this.Introduction = result.data.data.Introduction
                //alert(JSON.stringify(result.data))
            } catch (error) {
                this.$handleError(error);
            }
            
        }
    },
    mounted(){
        this.LoadCourseInfo();
    }
}
</script>

<style scoped>
.Introduction-title {
    text-align: center;
    font-size: 20px;
}
</style>