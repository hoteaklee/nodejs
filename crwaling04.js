//미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
//https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
//?serviceKey=hVrYuNPc8LwRCs5D0D39FUaHss2DrgCmXkcJ9cGWKrIWhctX6HlKm05vxWM7s0ZdjOEDFpaD%2Fr%2F0OXn1JhfQsg%3D%3D&returnType=xml&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0



// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');     // Ajax 라이브러리
const cheerio = require('cheerio');   // DOM 라이브러리


async  function main() { // 비동기 I/O 지원 함수 정의

    // 접속할 url, 쿼리스트링, user-agent 헤더 지정
    const URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
    const params = {'serviceKey':'hVrYuNPc8LwRCs5D0D39FUaHss2DrgCmXkcJ9cGWKrIWhctX6HlKm05vxWM7s0ZdjOEDFpaD/r/0OXn1JhfQsg==',
    'returnType':'json','sidoName':'경기', 'numOfRows':1000
    };  // serviceKey: 일반인증키(Decoding)
    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'}



    // axios로 접속해서 html를 블러옴
    const json = await axios.get(URL,{
        params : params, headers : headers
    });  // 서버 용청시 User-Agent 해더 사용

    //받아온 데이터 잠시 확인
   // console.log(json.data)

    //JSON 으로 불러오기
    let items = json.data['response']['body']['items'];
    //console.log(items);

    //미세먼지 정보 출력
    // pm25Value는 출력 안됨!!
    for (let item of items){
        console.log(item.sidoName, item.stationName,
            item.pm10Value, item.pm25Value,item.dataTime);
    }


};
main();