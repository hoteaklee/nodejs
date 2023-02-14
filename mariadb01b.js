const mariadb = require('mariadb');
const dbconfig = require('./dbconfig2.js');

async function main(){
    const sql = ' select distinct gugun from zipcode2013 ' + ' where sido = ? ';
                                                                //' where sodo = :sido';

  let conn = null;
  let params = ['서울'];
  // let params = {sido: '서울'};


    try {
        conn = await mariadb.createConnection(dbconfig);

        let result = await conn.execute(sql, params);
        //let result = await conn.execute({namedPlaceholders:true, sql:sql}, params);
        //console.log(result);

        for (let row of result){
            console.log(row.gugun);
        }



    } catch (ex){
        console.error(ex)
    } finally {
        if (conn){
            try { await conn.close();}
            catch (ex){}
        }
    }

};
main();