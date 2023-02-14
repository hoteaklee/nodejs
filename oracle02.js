

const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');
const {options} = require("axios");  // db연결 정보 파일

async function main(){

    let sql1 = ' create table sungjuk (name varchar(100), kor number(3) ,' +
            ' eng number(3), mat number(3)) ';
    let sql2 = ' insert into sungjuk values (:1,:2,:3,:4) ';
    let sql3 = ' update sungjuk set kor =:1, eng =:2, mat=:3' + ' where name = :4 ';
    let sql4 = ' delete from sungjuk where name = :1 ';
    let sql5 = ' select * from sungjuk ';
    let params = [];    // insert, update, delete, where 할때 사용함
    let conn = null; // 디비 연결 객체

    try {
        // 오라클 인스턴스 클라이언트 초기화
        oracledb.initOracleClient({libDir:'C:/Java/instantclient_19_17'});
        // 오라클 접속정보를 이용해서 오라클 연결객체 하나 생성
        conn = await oracledb.getConnection(dbconfig);
        console.log('오라클 데이터베이스 접속 성공!!');

        //let result = await conn.execute(sql1);

        // params =['혜교',99,98,99];
        // let result = await conn.execute(sql2,params);
        // await conn.commit();    // 반드시 필요!!

        // params = [11,22,33,'혜교'];
        // let result = await conn.execute(sql3, params);
        // await conn.commit();

        // params = ['혜교'];
        // let result = await conn.execute(sql4, params);
        // await conn.commit();

         result = await conn.execute(sql5);

        console.log(result);


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