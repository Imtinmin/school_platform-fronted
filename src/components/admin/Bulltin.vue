<template>
<div>
    
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>公告管理</span>
        </div>
        <!--<el-alert title="暂时无法修改发布时间,添加公告只有内容会立刻显示在列表里" type="warning" show-icon>
        </el-alert>-->
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="bulletin_id" label="公告ID" width="100">
            </el-table-column>
            <el-table-column prop="bulletin_content" label="公告内容">
            </el-table-column>
            <el-table-column prop="created_at" label="发布时间">
            </el-table-column>
            <el-table-column prop="updated_at" label="更新时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="edit(scope.$index, tableData)">修改</el-button>
                    <el-button size="medium" type="danger" @click="DelBulletin(scope.$index, tableData)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑公告" :visible.sync="BulletinFormVisible">
            <el-form :label-position="labelPosition" :model="BulletinForm">
                <el-form-item label="公告内容" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="BulletinForm.content" autocomplete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="发布时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="BulletinForm.create_time" type="datetime" placeholder="选择日期时间"
                        align="right" :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ChallengeFormVisible = false">取 消</el-button>
                <el-button type="primary"
                    @click="UpdateBulletin(bulletin_id,BulletinForm.content,BulletinForm.index)">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
    <el-card>
        <div slot="header" class="clearfix">
            <span>添加公告</span>
        </div>
            <el-form :label-position="labelPosition" :model="BulletinForm">
                <el-form-item label="公告内容" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="newBulletinForm.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                    <el-button @click="addBulletin(newBulletinForm.content)" type="primary">发布公告</el-button>
                </el-form-item>
            </el-form>
    </el-card>
    
    </div>
</template>

<script>
    import Bulletin from '@/api/Bulletin'
    export default {
        data() {
            return {
                tableData: [],
                BulletinFormVisible: false,
                newBulletinForm: {
                    content: ''
                },
                BulletinForm: {
                    content: '',
                    index: ''
                },
                formLabelWidth: '70px',
                labelPosition: 'right',
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        methods: {
            async LoadingBulletin() {
                try {
                    let result = await Bulletin.getBulletinList();
                    this.tableData = result.data.data;
                    //alert(this.BulletinList)
                } catch (error) {
                    this.$handleError(error);
                }
            },
            edit(index, row) {
                this.bulletin_id = row[index]["bulletin_id"]
                this.BulletinForm.content = row[index]["bulletin_content"]
                this.BulletinForm.index = index
                this.BulletinFormVisible = true
            },
            async DelBulletin(index, rows) {
                let id = rows[index].bulletin_id
                try {
                    let result = await Bulletin.DelBulletin(id)
                    this.$message.success("删除成功")
                    rows.splice(index, 1);
                } catch (error) {
                    this.$handleError(error);
                }
            },
            async UpdateBulletin(id, content, index) {
                try {
                    let result = await Bulletin.UpdateBulletin(id, content)
                    this.$message.success("修改成功")
                    this.tableData[index].bulletin_content = content
                    this.BulletinFormVisible = false
                } catch (error) {
                    this.$handleError(error);
                }
            },
            async addBulletin(content){
                try {
                    let result = await Bulletin.AddBulletin(content)
                    let res = result.data.data
                    this.tableData.unshift({"bulletin_id":res.bulletin_id,"bulletin_content": content,"created_at":res.created_at,"updated_at":res.updated_at})
                    //数组前添加
                    this.$message.success("添加成功")
                } catch (error) {
                    this.$handleError(error);
                }
            }
        },
        mounted() {
            this.LoadingBulletin()
        }
    }
</script>