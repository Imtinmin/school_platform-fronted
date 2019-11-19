<template>
    <div>
        <div style="padding: 12px 24px; box-sizing: border-box;overflow: hidden;background-color:#1976d2"><!--#545c64;-->
            <!--<el-image style="margin-left:22%" fit="contain" :src=src1></el-image>-->
            <img style="margin-left:22%" src="../img/x10sec.png">
            <img src="../img/gdpcisa.png">
        </div>
        <div style="padding: 32px 24px; box-sizing: border-box; background-color: rgb(238, 238, 238); display: table;width:100%">
            <p style="max-width: 700px; margin: 0px auto 13px; padding: 19px 0px 0px; font-weight: 300; font-size: 20px; line-height: 28px; letter-spacing: 0px; color: rgba(0, 0, 0, 0.87);">The platform developed by X10Sec  in GDPC. This platform will collect or make a series of problems having a good quality for CTFers to solve. Hope you can improve your security skills in this platform and enjoy it.</p>
            <p style="max-width: 700px; margin: 0px auto 13px; padding: 19px 0px 0px; font-weight: 300; font-size: 20px; line-height: 28px; letter-spacing: 0px; color: rgba(0, 0, 0, 0.87);"></p>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                src1: "../img/x10sec.png",
                src2: "https://x10sec.org/images/gdpcisa.png"
            }
        }
    }
</script>

<style scoped>
    .home {
        margin-left: 10%;
        margin-right: 10%;
    }

    .content {
        margin-left: 15%;
        margin-right: 15%;
        margin-top: 1rem;
    }

    .title {
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 25px;
        font-weight: 600;
    }
</style>