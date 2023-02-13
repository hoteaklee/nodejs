// 코로나 19 시도별 확진자 데이터를 이용해서 특정 지역의 확진자 현황 출력
//https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=hVrYuNPc8LwRCs5D0D39FUaHss2DrgCmXkcJ9cGWKrIWhctX6HlKm05vxWM7s0ZdjOEDFpaD%2Fr%2F0OXn1JhfQsg%3D%3D&pageNo=1&numOfRows=500&apiType=json&std_day=2023-02-12&gubun=%EC%84%9C%EC%9A%B8
//https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');     // Ajax 라이브러리
const {XMLParser}= require('fast-xml-parser') ; // xml 처리기 라이브러리

async  function main() { // 비동기 I/O 지원 함수 정의

    // 접속할 url 지정
    // apiType : xml 또는 JSON
    const URL = 'http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api';
    const params = {
        'serviceKey': 'hVrYuNPc8LwRCs5D0D39FUaHss2DrgCmXkcJ9cGWKrIWhctX6HlKm05vxWM7s0ZdjOEDFpaD/r/0OXn1JhfQsg==',
        'apiType': 'xml' , 'std_day' : '2023-02-12', 'gubun': ''
    };  // serviceKey: 일반인증키(Decoding)
    const headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'}

    // axios로 접속해서 html를 블러옴
    const xml = await axios.get(URL, {
        params: params, headers: headers
    });  // 서버 용청시 User-Agent 해더 사용

    //받아온 데이터 잠시 확인
   // console.log(xml.data);

    // XML을  JSON으로 변환하기
    const parser = new XMLParser()
    let json = parser.parse(xml.data);


    // //JSON 으로 불러오기
    let items = json['response']['body']['items']['item'];
    //console.log(json); //제이슨 확인
    //console.log(items);

    // 지역별 코로나 확진 정보 출력
    for (let item of items){
        console.log(`지역 : ${item.gubun},전일 확진자수 :${item.incDec},누적 확진자 수: ${item.defCnt},누적 사망자수: ${item.deathCnt},측정일: ${item.stdDay}`)
    }


};
main();