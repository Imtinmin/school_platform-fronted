<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
    </div>

      <div class="options" v-for="option in options" :key="option.id">
        <el-radio v-model="radio" :label="option.text" @change="updateResult">{{option.text}}</el-radio>
      </div>

      <!--<el-checkbox-group v-model="checkList" @change="updateResult">
        <div class="options" v-for="option in options" :key="option.id">
          <el-checkbox :label="option.text"></el-checkbox>
        </div>
      </el-checkbox-group>-->



  </el-card>
</template>

<script>
const TYPE_SINGLE_CHOICE = 1
const TYPE_MULTIPLE_CHOICE = 2
const TYPE_TEXT = 3

export default {
  name: 'question',
  props: ['quest'],
  data () {
    return {
      ...this.quest,
      radio: '',
      checkList: [],
      textarea: ''
    }
  },
  methods: {
  },
  computed: {
    isSingleQuest: function () {
      return this.type === TYPE_SINGLE_CHOICE
    },
    isMultipleQuest: function () {
      return this.type === TYPE_MULTIPLE_CHOICE
    },
    isTextQuest: function () {
      return this.type === TYPE_TEXT
    }
  }
}
</script>

<style scoped>
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