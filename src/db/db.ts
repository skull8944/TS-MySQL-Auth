import mysql from "mysql";
import log from "../utils/log";


const Connect = async () => new Promise<mysql.Connection>((resolve, reject) => {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "ts_user"
  });

  connection.connect((error) => {
    if (error) {
      log.error(`[DB]: ${error.message}`);
      reject(error); // 失敗的回傳方法
      return;
    }

    resolve(connection); // 正確完成的回傳方法
  });
});

const Query = async <T>(connection: mysql.Connection ,query: string) => 
  new Promise<T>((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
      if (error) {
        log.error(`[DB]: ${error.message}`);
        reject(error)
        return;
      }
      log.info(`[DB]: query success`);
      resolve(result)
    });
  })


export { Connect, Query }