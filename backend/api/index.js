const Router = require('koa-router');
const Model = require('../lib/mysql');
const router = new Router();
// 查询所有的筹款人
router.get('/api/allFundraiser', async (ctx) => {
    try {
      const result = await Model.allFundraiser();
      if (result.length > 0) {
        ctx.body = {
          data: result,
          total: result.length,
          msg: '查询成功'
        };
      } else {
        ctx.status = 404; // 
        ctx.body = {
          data: [],
          msg: '暂时没有筹款人'
        };
      }
    } catch (error) {
      console.error(error); // 使用console.error来记录错误
      ctx.status = 500; // 设置HTTP状态码为500，表示服务器内部错误
      ctx.body = {
        error: '服务器错误',
        msg: '查询失败'
      };
    }
  });
// 根据 FUNDRAISER_ID 查询特定的筹款人  
router.get('/api/fundraiser/:id', async (ctx) => {  
  const fundraiserId = ctx.params.id;
  console.log(fundraiserId)
  await Model.findFundraiserById(fundraiserId)  
      .then(result => {  
          if (result.length) {  
              ctx.body = {  
                  data: result[0],
                  msg: '查询成功'  
              };  
          } else {  
              try {  
                  throw Error('没有找到筹款人');  
              } catch (error) {  
                  console.log(error);  
              }  
              ctx.body = {  
                  data: null,  
                  msg: '没有找到该筹款人'  
              };  
          }  
      })  
      .catch(error => {  
          console.error(error);  
          ctx.body = {  
              msg: '查询失败'  
          };  
      });  
});
router.get('/api/allCategories', async (ctx) => {  
  await Model.allCategories()  
      .then(result => {  
          if (result.length) {  
              ctx.body = {  
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
              ctx.body = {  
                  data: null,  
                  msg: '没有数据'  
              };  
          }  
      })  
      .catch(error => {  
          console.error(error);  
          ctx.body = {  
              msg: '查询失败'  
          };  
      });  
});    
module.exports = router