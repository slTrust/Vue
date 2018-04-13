<template>
	<div>
        <div class="searchBox">
            <div class="searchContent">
                <Button type="primary" @click="refushData">刷新数据</Button>
                <span>筛选</span>
                <Input v-model="search" 
                    placeholder="请输入模糊词" 
                    style="width: 200px" 
                    @on-blur="searchEnd"
                    @on-focus="searchEnd"
                    @on-keyup="searchEnd"
                ></Input>
            </div>
        </div>
        <Table :columns="columnJson"
            :data="currentPageData"
            @on-sort-change="sortChange" 
            :loading="loading">
        </Table>
        <div style="height:20px;"></div>
        <Page   :total="dataCount"  
                show-sizer  :page-size="pageSize" 
                show-total  @on-change="changePage"
                @on-page-size-change="changePageSize">
        </Page>
	</div>
</template>

<script>
export default {
    name:'IFTable',
    props:['localData','columnOption'],
    data(){
        return{
            search:'',
            loading:false,//表格是否显示加载中
            porpData:[],
            //表格的所有数据
            ajaxHistoryData: [],
            //当前页数据 
            currentPageData:[], 
            // 初始化信息总条数
            dataCount: 0,
            // 每页显示多少条 默认是10条
            pageSize: 10,
            // 每列的设置
            columnJson:[]
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            // step1 挂载的时候将查询的所有数据 和列配置 props到 IFTable组件 
            // step2 在IFTable挂载的时候 将porps数据 填充到本地的 数据 和 列配置
            // step3 如果想刷新数据 则在IFTable里 定义事件 $emit('refush') 父组件收到通知重新 props数据
            
            // 深拷贝数据  防止发生引用问题错误映射修改数据
            this.porpData = [].concat(this.localData);
            // 初始化表格  将数据填充进去 propData要长期保存
            this.handlePorpsData([].concat(this.porpData))
            // 传递列配置
            this.columnJson = this.columnOption;
        },
        // 填充初始化表格的数据
        handlePorpsData(data) {
            // 保存取到的所有数据
            this.ajaxHistoryData = data;
            this.dataCount = data.length;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            if (this.ajaxHistoryData.length < this.pageSize) {
                this.currentPageData = this.ajaxHistoryData;
            } else {
                this.currentPageData = this.ajaxHistoryData.slice(0, this.pageSize);
            }
        },
        // 监听切换页码的方法
        changePage(index) {
            //注意 第一页是 1
            let _start = (index - 1) * this.pageSize;
            let _end = index * this.pageSize;
            this.currentPageData = this.ajaxHistoryData.slice(_start, _end);
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
            if(order==='normal'){
                this.handlePorpsData([].concat(this.filterData(this.search)));
            }else{
                let sortArr = [].concat(this.filterData(this.search)).sort((x,y)=>{
                    if(order==='asc'){
                        return x[sortName] - y[sortName];
                    }else if(order==='desc'){
                        return y[sortName] - x[sortName];
                    }
                })
                // 将排序后的数据回填到表格里
                this.handlePorpsData(sortArr);
            }
        },
        // 模糊查询输入
        searchEnd(){
            let search = this.search;
            this.handlePorpsData([].concat(this.filterData(search)))
        },
        // 过滤数据
        filterData(search){
            let localData = [].concat(this.localData);
            let res = localData.filter((row,idx,arr)=>{
                // 获取单行数据 每个字段的key 转数组
                let valKeys = Object.keys(row);
                let isPush = false;
                valKeys.map((columnKey,subIdx,subArr)=>{
                    if((row[columnKey]+'').indexOf(search)!==-1){
                        isPush = true;
                    }
                })
                return isPush;
            })
            return res;
        },
        refushData(){
            this.$emit('refush');
        }
       
    }

};
</script>
<style scoped>
.searchBox{
    padding:20px;
}
.searchBox .searchContent{
    text-align: right;
}
.searchBox .searchContent span{padding-right:16px;}
</style>
