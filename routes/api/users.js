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
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post('/register', async ctx => {
    // console.log(ctx.request.body);
    const {email, name, password, date} = ctx.request.body;
    //存储到数据库
    const findResult = await User.find({email: email});
    if (findResult.length > 0) {
        ctx.status = 500;
        ctx.body = {"email": "邮箱已被占用！"}
    } else {
        const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'},'https');
        const newUser = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            avatar,
            date
        });
        // console.log(newUser)
        // 存储到数据库
        await newUser
            .save()
            .then((user) => {
                ctx.body = user;
            })
            .catch(err => {
                console.log(err)
            });

        //返回json数据
        ctx.body = newUser;
    }
});


/**
 * @route POST api/users/login
 * @desc 登录接口地址 ==>返回的是token
 * @access 接口是公开的
 */
router.post('/login', async ctx => {
    //查询
    console.log(ctx.request.body);
    const {email, password} = ctx.request.body;
    const findResult = await User.find({email});
    if (findResult.length === 0) {
        ctx.status = 404;
        ctx.body = {msg: "用户不存在！"}
    } else {
        const result = bcrypt.compareSync(password, findResult[0].password); // true
        if (result) {
            //返回token
            const payload = {id: findResult[0].id, name: findResult[0].name, avatar: findResult[0].avatar};
            const token = jwt.sign(payload, keys.secretOrkey, {expiresIn: 3600});

            ctx.status = 200;
            ctx.body = {success: true, token: "Bearer " + token}
        } else {
            ctx.status = 400;
            ctx.body = {msg: '密码错误！'}
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