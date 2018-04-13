<template>
    <div class="layout">
        <Layout>
            <Header :style="{background:'#fff'}">
                <div class="header">if+ 硬件系统管理后台</div>
            </Header>
            <Content>
                 <Row>
                    <Col span="16">
                        <div class="carouselContainer">
                            <Carousel autoplay v-model="value2" loop>
                                 <CarouselItem v-for="url in imgs">
                                     <div class="carousel" >
                                        <img :src="url" alt="">
                                    </div>
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </Col>
                    <Col span="8">
                         <div class="signIn">
                             <div class="systemName">硬件客户管理系统</div>
                             <Form ref="formSignIn" :model="formSignIn"  :rules="ruleInline" label-position="right" :label-width="70">
                                <FormItem label="账号" prop="user">
                                    <Input  type="text" v-model="formSignIn.user"></Input>
                                </FormItem>
                                <FormItem label="密码" prop="password">
                                    <Input  type="password"  v-model="formSignIn.password"></Input>
                                </FormItem>
                                <FormItem label="保存账号">
                                    <i-switch v-model="formSignIn.signInAvoid" size="large">
                                        <span slot="open">开</span>
                                        <span slot="close">关</span>
                                    </i-switch>
                                </FormItem>
                                <Button type="primary" @click="onSignIn('formSignIn')" long>登录</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    </div>
</template>
<script>
//引入接口
import ApiLink from '../api'
export default {
    data () {
        return{
            value2:0,
            imgs:[
                '../../static/img/banner1.jpg',
                '../../static/img/banner2.jpg',
                '../../static/img/banner3.jpg',
                '../../static/img/banner4.jpg',
            ],
            formSignIn: {
                            user: '',
                            password: '',
                            signInAvoid:true
                        },
            ruleInline: {
                    user: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少6位', trigger: 'blur' }
                    ]
            }
        }
    },
    created(){
        let token = window.localStorage.getItem('token')||null;
               
        if(token!==null){
            let tokenObj = JSON.parse(token);
            let userName = tokenObj.userName;
            return    
            // 直接进入首页
            this.$router.push('/index')
        }
    },
    methods:{
        onSignIn(name){
              this.$refs[name].validate((valid) => {
                    // 前端校验
                    if (valid) {
                        this.$http({
                            method: 'post',
                            url:ApiLink.URL_LOGIN,
                            data: {
                                userName:this.formSignIn.user,
                                passWord:this.formSignIn.password,
                                signInAvoid:this.formSignIn.signInAvoid //是否记录账号
                            }
                        }).then((res)=>{
                            console.log('succ')
                            window.localStorage.setItem('token',JSON.stringify(res.data)) 
                            let token = window.localStorage.getItem('token');
                            this.$Message.success('登录成功'+token);
                            //进入首页
                            this.$router.push('/index')
                        }).catch((err)=>{
                            console.log('err')
                            console.log(err)
                            this.$Message.error('账号或密码输入有误');
                        });
                    }
                })
        }
    }
}
</script>
<style scoped>
.header{color:#000;}
.footer{text-align: center;}

.signIn{
    padding:40px 32px;
    max-width:336px;
    margin:200px auto;
    border:1px solid #ccc;
}
.signIn .systemName{
    line-height: 30px;
    font-size: 14px;
    color:#333;
}

.carouselContainer{
    margin:0px auto;
    padding:100px 100px;
}
.carousel{
    height: 500px;
    width: 100%;
    background: #506B9E;
    text-align: center;
    line-height: 300px;
    font-size: 50px;
}
.carousel img{
    width:100%;
    height: 100%;
}
</style>