<template>
  <div class="Aaa">
    <h2>Aaa</h2>
    <p>{{msg}}</p>
    <div>
       <table id="products-datatable" class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>产品ID</th>
                  <th>服务ID</th>
                  <th>是否激活</th>
                  <th>显卡UUID</th>
                  <th>状态</th>
                  <th>启用时间</th>
                  <th>到期时间</th>
                  <th>注册时间</th>
                  <th>激活时间</th>
                  <th>选项参数</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products">
                  <td data-toggle="tooltip" data-placement="bottom" v-bind:title="product.productId">{{ product.productId }}</td>
                  <td data-toggle="tooltip" data-placement="bottom" v-bind:title="product.terminalId">{{ product.terminalId }}</td>
                  <td>{{ product.isActivate === 1 ? '是' : '否' }}</td>
                  <td data-toggle="tooltip" data-placement="bottom" v-bind:title="product.uuid">{{ product.uuid}}</td>
                  <td>{{ product.state === 1 ? '启用' : '未启用' }}</td>
                  <td data-toggle="tooltip" data-placement="bottom" v-bind:title="product.activeDate">{{ product.activeDate }}</td>
                  <td data-toggle="tooltip" data-placement="bottom" v-bind:title="product.expiresDate">{{ product.expiresDate  }}</td>
                  <td data-toggle="tooltip" data-placement="bottom" v-bind:title="product.registerDate">{{ product.registerDate  }}</td>
                  <td data-toggle="tooltip" data-placement="bottom" v-bind:title="product.activateDate">{{ product.activateDate }}</td>
                  <td data-toggle="tooltip" data-placement="bottom" data-html="true" v-bind:title="showJson(product.options)">...</td>
                  <td>
                    <a href="#" class="btn btn-info btn-xs" v-show="product.isActivate === 0"><i class="fa fa-pencil"></i> 激活 </a>
                  </td>
                </tr>
              </tbody>
            </table>
    </div>
  </div>
</template>

<script>
let localData = [
  {
    "endRow": 6,
    "firstPage": 1,
    "hasNextPage": false,
    "hasPreviousPage": false,
    "isFirstPage": true,
    "isLastPage": true,
    "lastPage": 1,
    "list": [{
            "activateDate": "2016-10-26 16:57:49",
            "graphicsId": 30,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64,
                "limit_cores": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 16:57:13",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit"
        },
        {
            "activateDate": "2016-10-26 17:01:27",
            "activeDate": "2016-10-01",
            "expiresDate": "2016-10-31",
            "graphicsId": 31,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64,
                "limit_cores": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 16:59:19",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit2"
        },
        {
            "activateDate": "2016-10-26 17:11:57",
            "activeDate": "2016-10-01",
            "graphicsId": 32,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64,
                "limit_cores": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 17:00:36",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit3"
        },
        {
            "activateDate": "2016-10-26 17:53:56",
            "activeDate": "2016-10-01",
            "graphicsId": 33,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 17:53:30",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit4"
        },
        {
            "activateDate": "2016-10-27 13:05:57",
            "activeDate": "2016-10-01",
            "expiresDate": "2016-10-30",
            "graphicsId": 34,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 8,
                "limit_cores": 8
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-27 13:05:46",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "a890024cbssed0tfda180a00880s16ft"
        },
        {
            "activateDate": "2016-10-27 13:31:37",
            "activeDate": "2016-10-01",
            "expiresDate": "2016-10-30",
            "graphicsId": 35,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 8,
                "limit_cores": 8
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-27 13:31:37",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "a890024cbssed0tfda180a00880s16ff"
        }, {
            "activateDate": "2016-10-26 16:57:49",
            "graphicsId": 30,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64,
                "limit_cores": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 16:57:13",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit"
        },
        {
            "activateDate": "2016-10-26 17:01:27",
            "activeDate": "2016-10-01",
            "expiresDate": "2016-10-31",
            "graphicsId": 31,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64,
                "limit_cores": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 16:59:19",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit2"
        },
        {
            "activateDate": "2016-10-26 17:11:57",
            "activeDate": "2016-10-01",
            "graphicsId": 32,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64,
                "limit_cores": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 17:00:36",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit3"
        },
        {
            "activateDate": "2016-10-26 17:53:56",
            "activeDate": "2016-10-01",
            "graphicsId": 33,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 17:53:30",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit4"
        },
        {
            "activateDate": "2016-10-27 13:05:57",
            "activeDate": "2016-10-01",
            "expiresDate": "2016-10-30",
            "graphicsId": 34,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 8,
                "limit_cores": 8
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-27 13:05:46",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "a890024cbssed0tfda180a00880s16ft"
        },
        {
            "activateDate": "2016-10-27 13:31:37",
            "activeDate": "2016-10-01",
            "expiresDate": "2016-10-30",
            "graphicsId": 35,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 8,
                "limit_cores": 8
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-27 13:31:37",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "a890024cbssed0tfda180a00880s16ff"
        }, {
            "activateDate": "2016-10-26 16:57:49",
            "graphicsId": 30,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64,
                "limit_cores": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 16:57:13",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit"
        },
        {
            "activateDate": "2016-10-26 17:01:27",
            "activeDate": "2016-10-01",
            "expiresDate": "2016-10-31",
            "graphicsId": 31,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64,
                "limit_cores": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 16:59:19",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit2"
        },
        {
            "activateDate": "2016-10-26 17:11:57",
            "activeDate": "2016-10-01",
            "graphicsId": 32,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64,
                "limit_cores": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 17:00:36",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit3"
        },
        {
            "activateDate": "2016-10-26 17:53:56",
            "activeDate": "2016-10-01",
            "graphicsId": 33,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 64
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-26 17:53:30",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "12321321321-limit4"
        },
        {
            "activateDate": "2016-10-27 13:05:57",
            "activeDate": "2016-10-01",
            "expiresDate": "2016-10-30",
            "graphicsId": 34,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 8,
                "limit_cores": 8
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-27 13:05:46",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "a890024cbssed0tfda180a00880s16ft"
        },
        {
            "activateDate": "2016-10-27 13:31:37",
            "activeDate": "2016-10-01",
            "expiresDate": "2016-10-30",
            "graphicsId": 35,
            "isActivate": 1,
            "options": {
                "cap_track": true,
                "counter_threads": 8,
                "limit_cores": 8
            },
            "productId": 1,
            "productName": "test",
            "registerDate": "2016-10-27 13:31:37",
            "state": 1,
            "terminalId": 1,
            "terminalName": "Test",
            "uuid": "a890024cbssed0tfda180a00880s16ff"
        }
    ],
    "navigatePages": 8,
    "navigatepageNums": [
        1
    ],
    "nextPage": 0,
    "pageNum": 1,
    "pageSize": 10,
    "pages": 1,
    "prePage": 0,
    "size": 6,
    "startRow": 1,
    "total": 6
}
];
export default {
  name: 'Aaa',
  created(){
  },
  mounted(){},
  data () {
    return {
      msg: 'Welcome to Your Vue.js Aaa component',
      products: [],
    }
  },
    methods: {
        showJson(json) {
            return '';
        },
        getProducts() {
            for(var i=0;i<localData[0].list.length;i++){
              console.log(localData[0].list[0])
            }
            this.products = localData[0].list;
        }
    },
    mounted() {
        // 获取产品数据
        this.getProducts();
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
