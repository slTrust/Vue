<template>
  <div class="UserInfo">
    <div>
      <!-- 新增用户页面跳转的按钮 -->
      <Button type="primary" @click="addUser">新增用户</Button>
    </div>
    <Table :columns="historyColumns" :data="historyData" @on-sort-change="sortChange"></Table>
    <Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage"></Page>
  </div>
</template>

<script>
let testData = [
  {farmId:'0adf15484512145454545454',farmName:'昌平世信2',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信1',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-01',bindDate:'2018-04-01',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信3',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-05',bindDate:'2018-04-05',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信4',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-07',bindDate:'2018-04-07',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信5',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-06',bindDate:'2018-04-06',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信6',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信7',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-09',bindDate:'2018-04-09',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信8',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-11',bindDate:'2018-04-11',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信9',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-28',bindDate:'2018-04-28',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信10',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-29',bindDate:'2018-04-29',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信11',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-30',bindDate:'2018-04-30',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信12',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-01',bindDate:'2018-04-01',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信123',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-02',bindDate:'2018-04-02',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信16',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-02-03',bindDate:'2018-02-03',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信54',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-03-08',bindDate:'2018-03-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信77',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-01-08',bindDate:'2018-01-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信00',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-01-18',bindDate:'2018-01-18',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信66',farmCode:'if000000001',baseMark:'绑定',addDate:'2017-12-08',bindDate:'2017-12-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信23',farmCode:'if000000001',baseMark:'绑定',addDate:'2017-11-01',bindDate:'2017-11-01',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信63',farmCode:'if000000001',baseMark:'绑定',addDate:'2017-10-08',bindDate:'2017-10-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信76',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:'2018-04-08',bindDate:'2018-04-08',option:'1'},
];

export default {
  name:'UserList',
  data() {
    return {
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      historyColumns: [
        {
          type: 'index',
          width: 60,
          title:'序号',
          align: 'center'
        },
        {
          title: "牧场简称",
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
                          // this.$router.push({ path:'/index/addUser'})
                          // window.eventHub.$emit('look-user',{farmId: farmId})
                        }
                    }
                },farmName)
            ]);
          }
        },
        {
          title: "牧场编号",
          key: "farmCode"
        },
        {
          title: "基站标识",
          key: "baseMark"
        },
        {
          title: "新增日期",
          key: "addDate",
          sortable: true,
          // sortable:'custom'
        },
        {
          title: "绑定日期",
          key: "bindDate",
          sortable: true
        },
        {
          title: "操作",
          key: "option",
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
                            this.show(params.index)
                          }
                      }
                  }, '绑定')
              ]);
          }
        }
      ],
      historyData: []
    };
  },
  methods: {
    sortChange(a){  
      console.log(a)
    },
    lookUserInfo(farmId){
      this.$router.push({name:'IF_010003',params:{farmId:farmId}})
    },
    addUser(){
      this.$router.push({name:'IF_010002'})
    },
    // 获取历史记录信息
    handleListApproveHistory() {
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
    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.historyData = this.ajaxHistoryData.slice(_start, _end);
    },
    show (index) {
        this.$Modal.info({
            title: 'User Info',
            content: `11111`
        })
    },
    remove (index) {

    }
  },
  created() {
    this.handleListApproveHistory();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
