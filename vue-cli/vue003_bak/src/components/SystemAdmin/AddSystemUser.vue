<template>
  <div class="hello">
    <Row justify="center">
        <Col span="8" offset="1">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="登录账号" prop="signno">
                    <Input v-model="formValidate.signno" placeholder="请输入登录账号"></Input>
                </FormItem>
                <FormItem label="用户姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入用户姓名"></Input>
                </FormItem>
                <FormItem label="登录密码" prop="password">
                    <Input v-model="formValidate.password" placeholder="请输入登录密码"></Input>
                </FormItem>
                <FormItem label="确认登录密码" prop="repeatpass">
                    <Input v-model="formValidate.repeatpass" placeholder="请输入登录密码"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'AddSystemUser',
  data () {
    return {
      mode:'',
      formValidate: {
          signno: '',
          name: '',
          password:'',
          repeatpass:''
        
      },
      ruleValidate: {
          signno: [
              { required: true, message: '登录账号为必填项目！', trigger: 'blur' }
          ],
          name: [
              { required: true, message: '用户姓名为必填项目！', trigger: 'blur' },
          ],
          password: [
              { required: true, message: '登录密码为必填项目！', trigger: 'blur' }
          ],
          repeatpass: [
              { required: true, message: '确认登录密码为必填项目！', trigger: 'blur' },
              { required: true, message: '确认登录密码应与登录密码一致！', trigger: 'blur' },
              {
                validator(rule, value, callback, source, options) {
                  console.log(arguments)
                  var errors = [];
                  // test if email address already exists in a database
                  // and add a validation error to the errors array if it does
                  callback(errors);
                  }
              }
          ]
         
      }
    }
  },
  created(){
    this.mode = this.$router.currentRoute.params.mode||'add';
    // 根据模式 切换状态   编辑/新增
    if(this.mode==='edit'){
      this.formValidate.signno = this.$router.currentRoute.params.signno;
      this.formValidate.name = this.$router.currentRoute.params.name;
    }else{

    }
  },
  methods:{
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('Success!');
            } else {
                this.$Message.error('Fail!');
            }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
