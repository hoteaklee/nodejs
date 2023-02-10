// hanb.co.kr 사이트에서 새로나온 책에 대한 정보를 긁어오기
//  https://www.hanbit.co.kr/store/books/new_book_list.html

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');     // Ajax 라이브러리
const cheerio = require('cheerio');   // DOM 라이브러리

async  function main(){ // 비동기 I/O 지원 함수 정의

    // 접속할 url 지정
    const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html';

    // axios로 접속해서 html를 블러옴
    const html = await axios.get(URL);  // 비동기 I/O 지원

    // 블러온 html을  parsing해서 DOM 생성
    const dom = cheerio.load(html.data);
    //console.log(dom);   /*//객체형태로 출력 확인*/

    // CSS 선택자로 도서제목를 담고 있는 요소 지정
    let elements = dom('.book_tit');

    // 찾은 요소를 순회하면서 요소의 텍스트 출력
    elements.each((idx,title)=>{
        console.log(dom(title).text());     /* text():텍스트만 출력 명령어*/
    });

    // CSS 선택자로 저자를 담고 있는 요소 지정
     elements = dom('.book_writer');
    elements.each((idx,title) => {
        console.log(dom(title).text());
    });


    // CSS 선택자로 가격을 담고 있는 요소 지정
    elements = dom('.price');
    elements.each((idx,title) => {
        console.log(dom(title).text());
    });
};

main();