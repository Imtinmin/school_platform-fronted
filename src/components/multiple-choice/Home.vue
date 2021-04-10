<template>
<div class="wrapper">

</div>
</template>

<script>
    import SelectChallenge from "@/api/SelectChallenge";
export default {
    data(){
        return {
            selection: [],
            dialogVisible: false
        }
    },
    methods:{
        toPreview(){
            this.$router.push({"name":"QuestionView"})
        },
        toIndex(){
            this.$router.push({"name":"Home"})
        },
        async LoadingStatus(){
            try {
                let result = await SelectChallenge.getStatus();
                this.toPreview()
            }catch (e) {
                this.dialogVisible = true
            }
        }
    },
    created() {
    }
}
</script>

<style scoped>
.header-form {
  display: flex;
  flex-wrap: wrap;
  text-align: right;
  margin-bottom: 20px;
}
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
}




</style>