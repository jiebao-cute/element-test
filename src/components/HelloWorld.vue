<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <el-row  :gutter="20">
      <el-col :span="8" :offset="8">
        <el-card shadow="always">
          <h1>活动表格</h1>
          <el-divider></el-divider>
        <el-form :model="ValidateForm" ref="ValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="用户名"
            prop="name"
            :rules="[
                { required: true, message: '姓名不能为空'},
              ]"
          >
            <el-input type="text" placeholder="请输入用户名" v-model="ValidateForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
                { required: true, message: '密码不能为空'},
              ]"
          >
            <el-input  placeholder="请输入密码" v-model="ValidateForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ValidateForm')">提交</el-button>
            <el-button @click="resetForm('ValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
       ValidateForm: {
        name: '',
        password: ''
      },

    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('Name:'+ this.ValidateForm.name +';'+ 'password:' + this.ValidateForm.password);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.grid-content {
  /* background: rgb(14, 214, 131); */
  border-radius: 4px;
  min-height: 80px;
}
.el-card {
  border-radius:30px;
  width: 380px;
}
.el-row {
  margin-bottom: 20px;
}
.el-form-item{
  width: 300px;
}
</style>
