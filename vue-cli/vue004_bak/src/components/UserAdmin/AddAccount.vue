<template>
  <div class="">
      <Row justify="center">
          <Col span="6">
            <Form ref="formSaveUser" :model="formItem" :label-width="80"  :rules="ruleInline">
                <FormItem label="登录账号" prop="signinno">
                    <Input v-model="formItem.signinno" placeholder="请输入登录账号"></Input>
                </FormItem>
                <FormItem label="用户姓名" prop="username">
                    <Input v-model="formItem.username" placeholder="请输入用户姓名"></Input>
                </FormItem>
                <div :style="{paddingLeft:'80px'}">
                  <Button type="ghost" @click="onClickBack">返回</Button>
                  <Button type="primary" @click="onClickSave('formSaveUser')">保存</Button>
                </div>
            </Form>
          </Col>
      </Row>
  </div>
</template>

<script>
export default {
  name: 'AddAccount',
  created(){
    
  },
  data () {
    return {
      formItem:{
        signinno:'',
        username:''
      },
      ruleInline: {
          signinno: [
              { required: true, message: '登录账号为必填项', trigger: 'blur' },
              { type: 'string', min: 11, message: '登录账号至少11位', trigger: 'blur' }
          ],
          username: [
              { required: true, message: '用户姓名为必填项', trigger: 'blur' }
          ]
      }
    }
  },
  methods:{
    onClickSave(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            this.onClickBack();
          }
        })
    },
    onClickBack(a){
        console.log(this)
        this.$router.push({name:'IF_010003',params:{currentTab:'tab2'}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
