<template>
  <div class="BaseStationList">
    <div>
      <span>生产日期</span>
      <DatePicker type="date"  v-model="makeDate" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>基站标识</span>
      <Input v-model="baseStationCode" placeholder="请输入基站标识" style="width:200px"></Input>
      <!-- 新增基站代码 -->
      <Button type="primary" @click="addBaseNo">入库</Button>
    </div>
    <!-- localData所有的数据   columnOption 列属性设置  @refush子组件刷新数据的事件  -->
    <IFTable :localData="testData" :columnOption="historyColumns" @refush="refushData" ref="ifTable"></IFTable>
  </div>
</template>

<script>
import IFTable from "../IFTable";
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
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场1',farmCode:'if000000661',baseMark:'绑定',addDate:20170407,bindDate:20180408,option:'0'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2',farmCode:'if000000771',baseMark:'绑定',addDate:20170405,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场3',farmCode:'if0000000881',baseMark:'绑定',addDate:20170413,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场4',farmCode:'if000000991',baseMark:'绑定',addDate:20170412,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场5',farmCode:'if000000331',baseMark:'绑定',addDate:20170411,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场6',farmCode:'if000000211',baseMark:'绑定',addDate:20150408,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场7',farmCode:'if000000511',baseMark:'绑定',addDate:20150408,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场8',farmCode:'if000000141',baseMark:'绑定',addDate:20150208,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场9',farmCode:'if000000411',baseMark:'绑定',addDate:20150208,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场0',farmCode:'if000000421',baseMark:'绑定',addDate:20160228,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场321',farmCode:'if000000251',baseMark:'绑定',addDate:20160218,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场321',farmCode:'if000000751',baseMark:'绑定',addDate:20160208,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场22',farmCode:'if000000661',baseMark:'绑定',addDate:20160128,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场55',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场65',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场321',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场31',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场321',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场77',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场aa',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场fd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场fd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场gg',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场hh',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场jj',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场kk',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场ll',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场rr',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场ww',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场tt',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场uu',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场oo',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场pp',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场qw',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场qq',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场qw',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场qs',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场cc',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场xx',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场hh',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场hh',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场h2',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场62',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场db',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场nd',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场2f',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场666',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'蒙牛大牧场',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'光明11',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平dfds',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'伊利113',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160118,bindDate:20180408,option:'1'},
  {farmId:'0adf15484512145454545454',farmName:'昌平世信',farmCode:'if000000001',baseMark:'绑定',addDate:20160108,bindDate:20180408,option:'1'},
];
export default {
  name: "BaseStationList",
  data() {
    return {
      makeDate:undefined,
      baseStationCode:'',
      testData: [],
      historyColumns: [
        {
          type: "index",
          width: 60,
          title: "序号",
          align: "center"
        },
        {
          title: "基站标识",
          key: "farmName"
        },
        {
          title: "生产日期",
          key: "farmCode"
        },
        {
          title: "绑定状态",
          key: "baseMark"
        },
        {
          title: "连接状态",
          key: "addDate",
          sortable: true,
          sortable: "custom"
        },
        {
          title: "操作",
          key: "option",
          render: (h, params) => {
            let farmId = params.row.farmId;
            let option = params.row.option;
            // 1代表解绑  0 代表绑定
            let optionName = option === "1" ? "解绑" : "绑定";
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      if (option === "1") {
                        this.$Modal.confirm({
                          title: "解绑",
                          content: "<p>是否要解绑基站与当前牧场的关系？</p>",
                          onOk: () => {
                            this.$Message.info("解绑成功");
                          },
                          onCancel: () => {
                            // this.$Message.info('Clicked cancel');
                          }
                        });
                      } else {
                        //绑定输入代码
                        this.$Modal.confirm({
                          title: "绑定基站",
                          render: h => {
                            return h("Input", {
                              props: {
                                value: "",
                                autofocus: true,
                                placeholder: "请输入基站标识"
                              },
                              on: {
                                input: val => {
                                  this.bindBaseStationCode = val;
                                }
                              }
                            });
                          },
                          onOk: () => {
                            this.$Message.info(
                              "绑定成功，基站编号" + this.bindBaseStationCode
                            );
                          },
                          onCancel: () => {
                            // this.$Message.info('Clicked cancel');
                          }
                        });
                      }
                    }
                  }
                },
                optionName
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    addBaseNo() {

    },
    refushData() {
      this.testData = [].concat(this.testData).sort(function() {
        return Math.random();
      });
      console.log(this.testData[0]);
      var child = this.$refs.ifTable;
      child.init();
    }
  },
  components: {
    //使用自定义表格组件
    IFTable
  },
  created() {
    this.testData = testData;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
