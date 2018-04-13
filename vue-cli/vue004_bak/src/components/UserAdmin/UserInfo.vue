<template>
  <div class="hello">
    <Tabs v-model="currentTab">
        <TabPane label="信息管理" name="tab1">
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
        <TabPane label="用户管理" name="tab2">
          <!-- 用户管理tab内容 -->
           <Layout>
                <Content :style="{background:'#fff'}">
                  <Button type="primary" @click="toAddAccount">添加用户</Button>
                </Content>

                  
                <Content :style="{background:'#fff'}">
                    <div :style="{marginTop:'20px'}">
                    <Table :columns="columnsOption"
                          :data="currentPageData"
                          :loading="loading">
                    </Table>
                    <div style="height:20px;"></div>
                    <Page  :total="dataCount"  show-sizer  :page-size="pageSize" show-total  @on-change="changePage" @on-page-size-change="changePageSize"></Page>
 
                    </div>
                </Content>
            </Layout>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>

let localData = [
  {userId:'fdsa145145451452115125',userName:'张飞1',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'张飞2',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'张飞3',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'张飞4',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'张飞5',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'张飞6',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'张飞7',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'张飞8',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'张飞9',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽1',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽2',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽3',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽4',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽5',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽6',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽7',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽8',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽9',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'关羽0',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'刘备1',userNo:'18233560001'},
  {userId:'fdsa145145451452115125',userName:'曹操2',userNo:'18233560001'}
];

export default {
  name: 'UserInfo',
  data () {
    return {
      // 默认激活的选项卡
      currentTab:'tab1',
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
      // 加载页面请求的所有数据
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条 默认是10条
      pageSize: 10,
      // 每列的设置
      loading:true,
      columnsOption: [
          {
            type: 'index',
            width: 60,
            title:'序号',
            align: 'center'
          },
          {
              title: '用户姓名',
              key: 'userName'
          },
          {
              title: '账号(手机号)',
              key: 'userNo'
          },
          {
              title: '操作',
              key: 'userId',
              render: (h, params) => {
                  let userId = params.row.userId;
                  return h('div', [
                      h('span', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          },
                          on: {
                              click: () => {
                                  this.$Modal.confirm({
                                      title: '提示',
                                      content: '<p>确定要删除该用户吗？</p><p>删除后该用户无法再登录小程序</p>',
                                      onOk: () => {
                                          this.$Message.info('删除成功');
                                      },
                                      onCancel: () => {
                                          // this.$Message.info('Clicked cancel');
                                      }
                                  });
                              }
                          }
                      },'删除') 
                  ]);
              }
          }
      ],
      userData:[],
      currentPageData:[]
    }
  },
  created(){
    // 用户点击产看详情要传递farmId
    this.farmId = this.$router.currentRoute.params.farmId;
    this.currentTab = this.$router.currentRoute.params.currentTab||'tab1';
  },
  mounted(){
      setTimeout(() => {
        this.loading = false;
        this.handleListApproveHistory(localData)
      }, 300);
  },
  methods:{
    toEditUserInfo(){
      this.$router.push({name:'IF_010004'})
    },
    toAddAccount(){
      this.$router.push({name:'IF_010005'})
    },
    //*-******************************************************** 表格相关方法
    // 获取历史记录信息
    handleListApproveHistory(testData) {
      // 保存取到的所有数据
      this.ajaxHistoryData = testData;
      this.dataCount = testData.length;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (testData.length < this.pageSize) {
        this.currentPageData = this.ajaxHistoryData;
      } else {
        this.currentPageData = this.ajaxHistoryData.slice(0, this.pageSize);
      }
    },
    // 监听切换页码的方法
    changePage(index) {
      //注意 第一页是 1
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.currentPageData = this.ajaxHistoryData.slice(_start, _end);
    },
    // 监听每页条数改变的方法
    changePageSize(pageSize){
      this.pageSize = pageSize;
      // 切换到第一页
      this.changePage(1)
    }
    //*-******************************************************** 表格相关方法
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
