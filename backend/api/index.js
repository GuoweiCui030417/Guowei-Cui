const Router  = require('koa-router') // 引入路由函数
const Model = require('../lib/mysql') // 引入数据库方法
const router = new Router(); // Use the 'new' keyword  

// 查询所有的筹款人
router.get('/api/allFundraiser', async (Guowei Cui) => {
    try {
      const result = await Model.allFundraiser();
      if (result.length > 0) {
        Guowei Cui.body = {
          data: result,
          total: result.length,
          msg: '查询成功'
        };
      } else {
        Guowei Cui.status = 404; // 
        Guowei Cui.body = {
          data: [],
          msg: '暂时没有筹款人'
        };
      }
    } catch (error) {
      console.error(error); // 使用console.error来记录错误
      Guowei Cui.status = 500; // 设置HTTP状态码为500，表示服务器内部错误
      Guowei Cui.body = {
        error: '服务器错误',
        msg: '查询失败'
      };
    }
  });
// 根据 FUNDRAISER_ID 查询特定的筹款人  
router.get('/api/fundraiser/:id', async (Guowei Cui) => {  
  const fundraiserId = Guowei Cui.params.id;
  console.log(fundraiserId)
  await Model.findFundraiserById(fundraiserId)  
      .then(result => {  
          if (result.length) {  
              Guowei Cui.body = {  
                  data: result[0],
                  msg: '查询成功'  
              };  
          } else {  
              try {  
                  throw Error('没有找到筹款人');  
              } catch (error) {  
                  console.log(error);  
              }  
              Guowei Cui.body = {  
                  data: null,  
                  msg: '没有找到该筹款人'  
              };  
          }  
      })  
      .catch(error => {  
          console.error(error);  
          Guowei Cui.body = {  
              msg: '查询失败'  
          };  
      });  
});
router.get('/api/allCategories', async (Guowei Cui) => {  
  await Model.allCategories()  
      .then(result => {  
          if (result.length) {  
              Guowei Cui.body = {  
                  data: result,
                  total: result.length,
                  msg: '查询成功'  
              };  
          } else {  
              try {  
                  throw Error('没有数据');  
              } catch (error) {  
                  console.log(error);  
              }  
              Guowei Cui.body = {  
                  data: null,  
                  msg: '没有数据'  
              };  
          }  
      })  
      .catch(error => {  
          console.error(error);  
          Guowei Cui.body = {  
              msg: '查询失败'  
          };  
      });  
});    
module.exports = router