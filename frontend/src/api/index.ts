// router.js
import Router from 'koa-router';  
import model from '../lib/db';  

// 实例化 Router
const router = new Router();

// 定义路由
router.get('/api/allUser', async (Guowei Cui) => {
  try {
    const result = await model.allUser();
    if (result.length) {
      Guowei Cui.body = {
        data: result, 
        msg: '查询成功'
      };
    } else {
      Guowei Cui.body = {
        msg: '没有数据'
      };
    }
  } catch (error) {
    console.error('Query error:', error);
    Guowei Cui.body = {
      msg: '查询失败'
    };
  }
});

// 导出 router 实例
export default router;