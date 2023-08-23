const mariadb = require('mariadb');

// 데이터베이스 연결 풀 생성
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'ubuntu',
  password: '1234',
  database: 'project',
  connectionLimit: 5, // 연결 풀의 최대 연결 수
});

// 데이터베이스 쿼리 실행 함수
async function queryDatabase(query, values = []) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query, values);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.release(); // 연결 반환
  }
}

module.exports = {
  queryDatabase,
};
