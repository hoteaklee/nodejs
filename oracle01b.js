// zipcode2013에서
// 서울시에 있는 모든 구를 조회해서 출력하세요

const oracledb = require('oracledb');

async function main(){

    //const sql = 'select distinct gugun from zipcode2013 where sido = \'서울\' ';
   // const sql = " select distinct gugun from " + " zipcode2013 where sido = '서울' " +" order by gugun " ;

    // placeholder를 이용해서 동적으로 sql질의문을 작성할 수 있음
    // :인덱스 => 배열로 정의
    // :키 => 객체로 정의
    //const sql = 'select distinct gugun from '+ 'zipcode2013 where sido = :1 order by gugun' ;
    const sql = 'select distinct gugun from '+ 'zipcode2013 where sido = :sido order by gugun' ;
    //let params = ['서울'];    // insert, update, delete, where 할때 사용함
    let params = {sido:'서울'};
    let options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    }; //oracle db를 위한 옵션 정의

    let conn = null; // 디비 연결 객체

    try {
        // 오라클 인스턴스 클라이언트 초기화
        oracledb.initOracleClient({libDir:'C:/Java/instantclient_19_17'});

        // 오라클 접속정보를 이용해서 오라클 연결객체 하나 생성
        conn = await oracledb.getConnection({
            user: 'bigdata',password: 'bigdata', connectionString:'13.125.85.72:1521/XE'  /*connectionString:'ip주소:포트번호/SID*/
        });
        console.log('오라클 데이터베이스 접속 성공!!');

        // sql문을 실행하고 결과를 받아옴
        let result = await conn.execute(sql, params, options);
        //let result = await conn.execute(sql);

        //실행결과를 결과집합 객체로 변환
        let rs = result.resultSet;

        let row = null;
        // 결과집합 객체의 각 요소를 순회하면서 내용 출력
        while ((row = await rs.getRow())){      //OUT_FORMAT 설정 필요!!
            console.log(row.GUGUN);
        }

        // 작업이 끝나면 결과집합 객체를 닫음
        rs.close();


    } catch (ex){
        console.error(ex);
    } finally {
        if (conn){
            try {
                await conn.close();
                console.log('오라클 데이터베이스 접속 해제 성공!!');
            } catch (ex){ console.error(ex);}
        }
    }


};
main();