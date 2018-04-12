<template>
  <div class="hello">
    <Tabs value="name1">
        <TabPane label="信息管理" name="name1">
          <!-- 信息管理tab内容 -->
            <Layout>
                <Content :style="{background:'#fff'}">
                   <Button type="primary" @click="toEditUserInfo">编辑信息</Button>
                </Content>
                <Content :style="{background:'#fff'}">
                  <ul class="userInfoBox">
                    <li v-for="info in farmInfo">
                       <Row justify="center">
                          <Col span="3" offset="1">{{info.fieldName}}</Col>
                          <Col span="12" offset="2">{{info.fieldValue}}</Col>
                      </Row>
                    </li>
                  </ul>
                </Content>
            </Layout>
        </TabPane>
        <TabPane label="用户管理" name="name2">
          <!-- 用户管理tab内容 -->
           <Layout>
                <Content :style="{background:'#fff'}">
                  <Button type="primary" @click="toAddAccount">添加用户</Button>
                </Content>

                  
                <Content :style="{background:'#fff'}">
                    <div :style="{marginTop:'20px'}">
                      <Table :columns="columns1" :data="data1"></Table>
                    </div>
                </Content>
            </Layout>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>

export default {
  name: 'UserInfo',
  data () {
    return {
      farmId:'',
      farmInfo:[
        {fieldName:'牧场编号',fieldValue:'F0000000'},
        {fieldName:'牧场简称',fieldValue:'创新农厂'},
        {fieldName:'牧场名称',fieldValue:'北京*************大牧场'},
        {fieldName:'所在地',fieldValue:'北京市朝阳区崔各庄*******'},
        {fieldName:'统一社会信用代码',fieldValue:'***********************'},
        {fieldName:'详细地址',fieldValue:'北京市朝阳区崔各庄红厂创业产业园区B12'},
        {fieldName:'负责人',fieldValue:'某某某'},
        {fieldName:'联系电话',fieldValue:'18233560007'},
        {fieldName:'座机',fieldValue:'***********************'},
        {fieldName:'占地面积',fieldValue:'12亩'}
      ],
      columns1: [
          {
              title: 'Name',
              key: 'name'
          },
          {
              title: 'Age',
              key: 'age'
          },
          {
              title: 'Address',
              key: 'address'
          }
      ],
      data1: [
          {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
              date: '2016-10-01'
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
              date: '2016-10-02'
          },
          {
              name: 'Jon Snow',
              age: 26,
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
          }
      ]
    }
  },
  created(){
    // 用户点击产看详情要传递farmId
    this.farmId = this.$router.currentRoute.params.farmId;

  },
  mounted(){

  },
  methods:{
    toEditUserInfo(){
      this.$router.push({name:'IF_010004'})
    },
    toAddAccount(){
      this.$router.push({name:'IF_010005'})
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userInfoBox{
  border:1px solid #ccc;
  margin-top:20px;
}
.userInfoBox li{
  line-height: 50px;
  font-size: 16px;
  color:#333;
}
.userInfoBox li:nth-child(even){background:#f8f8f8;}
</style>
