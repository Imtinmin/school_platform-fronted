<template>
    <div>
        <el-button type="text" @click="showSolvedUsers(challenge.qid)">解题排行</el-button>
        <div style="height:10px"></div>
        <div>{{ challenge.description }}</div>
        <div style="height:10px"></div>
        <a :href="challenge.url">
            <el-button type="text">题目链接</el-button>
        </a>
    </div>
</template>

<script>
    import Challenge from '@/api/Challenge'
    export default {
        props: ['challenge'],
        data() {
            return {

            }
        },
        methods: {
            showSolvedUsers(id) {
                this.$emit('show', id)
            }
        },
        mounted() {

        },
    }
</script>