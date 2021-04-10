<template>
  <div v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-card style="margin-top:2%">
      <div slot="header" class="clearfix">
        <span>选择题</span>
        <span>
        </span>
        <div v-if="!end" class="defaultCountdown"  >{{ min }}:{{ sec }}</div>
      </div>
      <div style="margin-top:3%" v-for="(challenge,i) in Challenge" :key="i">
        <el-card style="margin-left:10%;margin-right:10%">
          <div slot="header" class="clearfix">
            <span>题目: {{ challenge.title }} </span>
            <span v-if="end">
            <span v-if="challenge.correct" style="margin-left:2%;color:green">正确</span>
            <span v-else style="margin-left:2%;color:red">错误</span>
            </span>
            <!--<span style="margin-left:4%;color:red">答案：{{ challenge.answer}}</span>-->
          </div>
            <div v-if="!+challenge.is_multiple">
              <el-radio-group v-model="challenge.radio">
                <el-radio v-for="(option,i) in challenge.options" :label="option" :key="i" >{{ option }}</el-radio>
              </el-radio-group>
            </div>
        </el-card>
      </div>
      <div v-if="!end">
      <el-button style="margin-top:4%;margin-left:40%" @click="submitform($route.query.exam)" type="primary">提交答案</el-button>
      <el-button type="danger" @click="preabandon()">放弃</el-button>
      </div>
      <div style="margin-left:40%;color:red;font-size:20px;margin-top:4%" v-else>
        分数：{{ score }}
      </div>
    </el-card>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="20%"
            center
            top="30vh"
            >
        <span>是否开始答题？限时30分钟</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="goback()">取 消</el-button>
    <el-button type="primary" @click="LoadView($route.query.exam);dialogVisible=false">确 定</el-button>
  </span>
    </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible1"
            width="20%"
            center
            top="30vh"
            >
        <span>时间到，重新开始？</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="reset();dialogVisible1=false">确 定</el-button>
  </span>
    </el-dialog>
            <el-dialog
            title="提示"
            :visible.sync="dialogVisible2"
            width="20%"
            center
            top="30vh"
            >
        <span>是否放弃答题</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="abandon()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
 import Exam from '@/api/Exam'
  export default {
    data() {
      return {
        min: '',
        sec: '',
        EndTime: '',
        Challenge: [],
        radio: '',
        loading: false,
        correctNum: '',
        correctList: [],
        end: false,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false
      }
    },
    methods: {
      countDown() {
        let EndTime = this.EndTime;
        let newTime = new Date().getTime();
        let time = (EndTime - newTime / 1000);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        this.min = min
        this.sec = this.PrefixInteger(sec, 2)
        if(this.min <= 0 && this.sec <= 0){
          this.dialogVisible = true
          this.submitform(this.$route.query.exam)
          return false
        }
        setTimeout(() => {
          this.countDown()
        }, 1000)
      },
      //保留两位数字
      PrefixInteger(num, length) {
        return (Array(length).join('0') + num).slice(-length);
      },
      async LoadView(exam_id) {
        this.loading = true
        try {
          let result = await Exam.GetExam(exam_id)
          this.EndTime = result.data.data.EndTime
          this.Challenge = result.data.data.choice_question
          this.countDown()
          this.loading = false;
        } catch (error) {
          this.$handleError(error)
        }
      },
      async reset() {
        try {
          let result = await Exam.AbandonExam();
          this.dialogVisible2 = false
          this.LoadView(this.$route.query.exam)
        } catch (error) {
          this.$handleError(error)
        }
      },
      async submitform(id){
        try {
          let result = await Exam.SubmitAnswer(this.Challenge,id)
          this.correctNum = result.data.data.correctNum;
          this.correctList = result.data.data.correctList;
          this.score = result.data.data.score;
          for (let index = 0; index < this.Challenge.length; index++) {
            if(this.correctList.indexOf(this.Challenge[index].id) !== -1){
              this.Challenge[index].correct = true
            }
          }
          this.end = true
        } catch (error) {
          this.$handleError(error)
        }
      },
      preabandon(){
        this.dialogVisible2 = true
      },
      goback() {
        this.$router.go(-1)
      },
      async abandon(){
        try {
          let result = await Exam.AbandonExam();
          //this.dialogVisible2 = false
          this.$router.push({'name':"Home"})
        } catch (error) {
          this.$handleError(error)
        }
      },
      async getStatus(){
        try {
          let result = await Exam.ExamStatus();
          if(this.$route.query.exam){
            this.LoadView(this.$route.query.exam)
          }else{
            this.$handleError("error")
          }
        } catch (error) {
          if(error.code == 400){
            this.dialogVisible = true;
          }else{
            this.dialogVisible1 = true
          }
        }
      }
    },
    created() {
      this.getStatus()
      
    },

    mounted() {
    }

  }
</script>

<style scoped>
  .defaultCountdown {
    
    right:3%;
    width: 100px;
    height: 40px;
    border: 1px solid #ccc;
    background-color: #eee;
    text-align: center;
    font-size: 200%;
    position: fixed;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .options {
    line-height: 2;
  }


</style>