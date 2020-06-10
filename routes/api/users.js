const Router = require("koa-router");
const router = new Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('koa-passport');


//引入user
const User = require("../../models/User");
/**
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = {msg: "users works......"}
});




/**
 * @route POST api/users/login
 * @desc 登录接口地址 ==>返回的是token
 * @access 接口是公开的
 */
router.post('/login', async ctx => {
    //查询
    const {email, password} = ctx.request.body;
    const findResult = await User.find({email});
    if (findResult.length === 0) {
        ctx.status = 404;
        ctx.body = {msg: "用户不存在！"}
    } else {
        const result = bcrypt.compareSync(password, findResult[0].password); // true
        if (result) {
            //返回token
            const payload = {id: findResult[0]._id, name: findResult[0].name, avatar: findResult[0].avatar};
            const token = jwt.sign(payload, keys.secretOrkey, {expiresIn: 3600});
            const userId = findResult[0]._id
            ctx.status = 200;
            ctx.body = {success: 1, token: "Bearer " + token,userId:userId}
        } else {
            ctx.body = {success: 0,msg: '密码错误！'}
        }
    }

});



/**
 * @route GET api/users/current
 * @desc 用户信息接口地址 返回用户信息
 * @access 接口是私密的
 */
router.get('/current',
    passport.authenticate('jwt', { session: false }),
    async ctx => {
    const {_id,name,email,avatar} = ctx.state.user;
    ctx.body ={
        _id,
        name,
        email,
        avatar,
    }
});


module.exports = router.routes();