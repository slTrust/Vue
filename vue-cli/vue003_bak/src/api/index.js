//所有接口的定义位置

//引入开发的端口
import PROJECT_Mode from './project_mode'
const TEST_PORT = 'http://result.eolinker.com/uu8A7Ifbee195eabcf0772783d960fd1da71721bc475724?uri=';

const COMPONY_A = '192.168.2.123/';

const COMPONY_B = 'https://cloudsys.innohards.com/';

// 匹配域名
let PORT = '';
switch(PROJECT_Mode){
    case 0:{
        PORT = TEST_PORT;
        break;
    }
    case 1:{
        PORT = COMPONY_A;
        break;
    }
    case 2:{
        PORT = COMPONY_B;
        break;
    }
}


//url接口
//登录接口url 
const URL_LOGIN = PORT+'weblogin/login';

export default {
    URL_LOGIN
}

