<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="user_id" label="user_id" width="80">
      </el-table-column>
      <el-table-column prop="name" label="name" width="80">
      </el-table-column>
      <!--<el-table-column
      prop="token"
      label="token"
      >
    </el-table-column>-->
      <el-table-column prop="signUpTime" label="注册时间">
      </el-table-column>
      <el-table-column prop="lastLoginTime" label="上次登录时间">
      </el-table-column>
      <el-table-column prop="admin" label="是否为管理员" width="120">
      </el-table-column>
      <el-table-column prop="banned" label="banned" width="80">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="UpdateAdmin(scope.$index, scope.row)">赐予管理员</el-button>
          <el-button size="small" @click="degrade(scope.$index, scope.row)">贬了</el-button>
          <el-button size="medium" type="danger" @click="confirm(scope.$index, tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import User from '@/api/User'
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      async UpdateAdmin(index, rows) {
        let user_id = this.tableData[index].user_id;
        try {
          let result = await User.UpdateAdmin(user_id);
          this.$message.success(result.data.msg)
          this.tableData[index].admin = 1;
        } catch (error) {
          this.$handleError(error);
        }
      },
      confirm(index, rows) {
        this.$confirm(`确认删除 ${rows[index].name} ?`)
          .then(_ => {
            this.deleteRow(index, rows)
          })
          .catch(_ => {});
      },
      async deleteRow(index, rows) {

        let user_id = this.tableData[index].user_id;
        try {
          let result = await User.DeleteUser(user_id);
          this.$message.success(result.data.msg)
          rows.splice(index, 1);
        } catch (error) {
          this.$handleError(error);
        }
      },
      async degrade(index, rows) {
        let user_id = this.tableData[index].user_id;
        try {
          let result = await User.degrade(user_id);
          this.$message.success(result.data.msg)
          this.tableData[index].admin = 0;
        } catch (error) {
          this.$handleError(error);
        }
      },
      async LoadUserList() {
        try {
          let result = await User.UserList();
          //alert(JSON.stringify(result.data.data))
          this.tableData = result.data.data
        } catch (error) {
          this.$handleError(error);
        }
      }
    },
    mounted() {
      this.LoadUserList()
    }
  }
</script>