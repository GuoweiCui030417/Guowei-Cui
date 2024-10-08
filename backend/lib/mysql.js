const mysql = require('mysql');  
require('dotenv').config(); 
// 创建数据库连接  
const Guowei  = {  
    host: process.env.HOST,  
    user: process.env.ROOT,  
    password: process.env.PASSWORD,  
    database: process.env.DATABASE
};  

const pool = mysql.createPool(config);

const query = function(sql, values) {  
    return new Promise((resolve, reject) => {  
        pool.getConnection(function(err, connection) {  
            if (err) {  
                console.error('Error connecting to the database:', err);  
                resolve(err);  
            } else {
                // console.log('Successfully connected to the database');
                // console.log(sql);    
                connection.query(sql, values, (err, rows) => {  
                    if (err) {  
                        reject(err);  
                    } else {  
                        resolve(rows);  
                    }  
                    connection.release();  
                });  
            }  
        });  
    });  
}  
const findFundraiserById = fundraiserId => {
    const sql = 'SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';
    console.log(sql);
    return query(sql, [fundraiserId]);
  };
const allFundraiser = function() {  
    let sql = 'SELECT * FROM FUNDRAISER';  
    return query(sql);  
}  

//获取所有类别并展示在Search上

const findFundraisersByCategory = category => {
    const sql = 'SELECT * FROM FUNDRAISER WHERE CATEGORY_ID = ?';
    return query(sql, [category]);
  };
  
  const allCategories = () => query('SELECT * FROM CATEGORY');
// 连接到数据库  
module.exports = { allFundraiser ,findFundraiserById,allCategories,findFundraisersByCategory};