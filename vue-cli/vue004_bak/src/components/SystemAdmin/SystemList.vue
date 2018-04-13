<template>
  <div class="hello">
    <div>
      <Button type="primary" @click="addAdminUser">添加系统管理员</Button>
    </div>
    <div style="height:20px;"></div>
    <div>
      <Table :columns="historyColumns"
            :data="historyData"
            @on-sort-change="sortChange" 
            :loading="loading">
      </Table>
      <div style="height:20px;"></div>
      <Page  :total="dataCount"  show-sizer  :page-size="pageSize" show-total  @on-change="changePage" @on-page-size-change="changePageSize"></Page>
    </div>
  </div>
</template>

<script>
let testData = [
  {farmId:'0adf15484512145454545454',farmName:'昌平世信2222222222222222222222222222222222222222222222222222222222222222222222222222222222222',farmCode:'if000000001',baseMark:'绑定',addDate:20180408,bindDate:20180408,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信1',farmCode:'if000000011',baseMark:'绑定',addDate:20180201,bindDate:20180401,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信3',farmCode:'if000000021',baseMark:'绑定',addDate:20180105,bindDate:20180405,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信4',farmCode:'if000000031',baseMark:'绑定',addDate:20180507,bindDate:20180407,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信5',farmCode:'if000000041',baseMark:'绑定',addDate:20180606,bindDate:20180406,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信6',farmCode:'if000000051',baseMark:'绑定',addDate:20180708,bindDate:20180408,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信7',farmCode:'if000000061',baseMark:'绑定',addDate:20180809,bindDate:20180409,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信8',farmCode:'if000000071',baseMark:'绑定',addDate:20180801,bindDate:20180411,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信9',farmCode:'if000000081',baseMark:'绑定',addDate:20180328,bindDate:20180428,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信10',farmCode:'if00000091',baseMark:'绑定',addDate:20181229,bindDate:20180429,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信11',farmCode:'if000000021',baseMark:'绑定',addDate:20180430,bindDate:20180430,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信12',farmCode:'if000000031',baseMark:'绑定',addDate:20180401,bindDate:20180401,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信123',farmCode:'if00000051',baseMark:'绑定',addDate:20180402,bindDate:20180402,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信16',farmCode:'if000000061',baseMark:'绑定',addDate:20180203,bindDate:20180203,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信54',farmCode:'if000000071',baseMark:'绑定',addDate:20180308,bindDate:20180308,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信77',farmCode:'if000000081',baseMark:'绑定',addDate:20180108,bindDate:20180108,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信00',farmCode:'if000000091',baseMark:'绑定',addDate:20180118,bindDate:20180118,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信66',farmCode:'if00000111',baseMark:'绑定',addDate:20171208,bindDate:20171208,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信23',farmCode:'if000002201',baseMark:'绑定',addDate:20171101,bindDate:20171101,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信63',farmCode:'if000003301',baseMark:'绑定',addDate:20171008,bindDate:20171008,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信76',farmCode:'if000004401',baseMark:'绑定',addDate:20180408,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000661',baseMark:'绑定',addDate:20170407,bindDate:20180408,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000771',baseMark:'绑定',addDate:20170405,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if0000000881',baseMark:'绑定',addDate:20170413,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000991',baseMark:'绑定',addDate:20170412,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000331',baseMark:'绑定',addDate:20170411,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000211',baseMark:'绑定',addDate:20150408,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000511',baseMark:'绑定',addDate:20150408,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000141',baseMark:'绑定',addDate:20150208,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000411',baseMark:'绑定',addDate:20150208,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000421',baseMark:'绑定',addDate:20160228,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000251',baseMark:'绑定',addDate:20160218,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000751',baseMark:'绑定',addDate:20160208,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000661',baseMark:'绑定',addDate:20160128,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160108,bindDate:20180408,option:'1'},
];
export default {
  name: 'SystemList',
  data () {
    return {
        loading:true,//表格是否显示加载中
        ajaxHistoryData: [],
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条 默认是10条
        pageSize: 10,
        // 每列的设置
        historyColumns: [
          {
            type: 'index',
            width: 60,
            title:'序号',
            align: 'center'
          },
          {
            title: "姓名",
            key: "farmName",
            render: (h, params) => {
              var farmName =  params.row.farmName;
              var farmId = params.row.farmId;
              return h('div', [
                  h('span', {
                      on: {
                          click: () => {
                            // 跳转路由到查看详情
                            this.lookUserInfo(farmId)
                          }
                      }
                  },farmName)
              ]);
            }
          },
          {
            title: "账号",
            key: "farmCode"
          },
          {
            title: "权限",
            key: "baseMark"
          },
          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                // 跳转修改页面携带用户信息
                                this.$Message.success('跳转编辑页面成功'+JSON.stringify({
                                                        mode:'edit',
                                                        userName:'张飞',
                                                        signno:'18233560007',
                                                        userId:'13215dfaeee15214545'
                                                      }));
                                this.$router.push({
                                                    name:'IF_030002',
                                                    params:{
                                                      mode:'edit',
                                                      name:'张飞',
                                                      signno:'18233560007',
                                                      password:'3213123213',
                                                      userId:'13215dfaeee15214545'
                                                    }
                                                  })
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                 this.$Message.success('删除成功');
                            }
                        }
                    }, '删除')
                ]);
            }
          }
        ],
        historyData: [],
    }
  },
  created(){
     setTimeout(()=>{
      this.loading = false;
      this.handleListApproveHistory(testData);
    },500)
  },
  methods:{
    addAdminUser(){
      this.$router.push({name:'IF_030002',params:{mode:'add'}})
    },
    // 获取历史记录信息
    handleListApproveHistory(testData) {
      // 保存取到的所有数据
      this.ajaxHistoryData = testData;
      this.dataCount = testData.length;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (testData.length < this.pageSize) {
        this.historyData = this.ajaxHistoryData;
      } else {
        this.historyData = this.ajaxHistoryData.slice(0, this.pageSize);
      }
    },
    // 监听切换页码的方法
    changePage(index) {
      //注意 第一页是 1
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.historyData = this.ajaxHistoryData.slice(_start, _end);
    },
    // 监听每页条数改变的方法
    changePageSize(pageSize){
      this.pageSize = pageSize;
      // 切换到第一页
      this.changePage(1)
    },
    // 表格-排序的监听
    sortChange(sortField){  
      // order 有三个   默认排序 normal   asc升序  desc降序
      let order = sortField.order;
      let sortName = sortField.key;
      console.log('监听排序  重新拉取数据回填表格'+'===|order='+order+'|sortName='+sortName)
      this.loading = true;
      if(order==='normal'){
          setTimeout(()=>{
              this.loading = false;
              this.handleListApproveHistory(testData);
          },500)
      }else{
        let sortArr = testData.sort((x,y)=>{
          if(order==='asc'){
            return x[sortName] - y[sortName];
          }else if(order==='desc'){
            return y[sortName] - x[sortName];
          }
        })
        sortArr.map((v,i)=>{
          console.log(v[sortName])
        })
        setTimeout(()=>{
            this.loading = false;
            this.handleListApproveHistory(sortArr);
        },500)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
