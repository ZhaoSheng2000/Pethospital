const Router = require("koa-router");
const router = new Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('koa-passport');


//引入models
const User = require("../../models/User");
const PetOwner = require('../../models/PetOwner')
const Pet = require('../../models/Pet')

function local(v) {
    const d = new Date(v || Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString();
}

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
            await User.updateOne(
                {_id: findResult[0]._id},
                {$push: {userlog: local()}}
            )
            ctx.status = 200;
            ctx.body = {success: 1, token: "Bearer " + token, userId: userId}
        } else {
            ctx.body = {success: 0, msg: '密码错误！'}
        }
    }

});

/**
 * @route GET api/users/current
 * @desc 用户信息接口地址 返回用户信息
 * @access 接口是私密的
 */
router.get('/current',
    passport.authenticate('jwt', {session: false}),
    async ctx => {
        const {_id, name, email, avatar} = ctx.state.user;
        ctx.body = {
            _id,
            name,
            email,
            avatar,
        }
    });
/**
 * @method: POST
 * @route: api/users/addowner
 * @desc: 添加宠物主人信息
 * @access: public
 */
router.post('/addowner', async ctx => {
    const {name, gender, phone} = ctx.request.body
    const findResult = await PetOwner.find({phone})
    if (findResult.length > 0) {
        ctx.body = {success: 0, msg: '手机已被占用'}
    } else {
        const newPetOwner = new PetOwner({
            name,
            gender,
            phone
        })
        await newPetOwner
            .save()
            .then()
            .catch(err => {
                console.error(err)
            })
        ctx.body = {success: 1, msg: '添加宠物主人信息成功'}
    }
})
/**
 * @method: POST
 * @route: api/users/delowner
 * @desc: 删除主人信息
 * @access: public
 */

router.post('/delownenr', async ctx => {
    const {phone} = ctx.request.body
    const result = await PetOwner.remove({phone})
        .catch(err => {
            console.error(err)
        })
    ctx.body = {data: result}
})
/**
 * @method: POST
 * @route: api/users/upowner
 * @desc: 修改主人信息
 * @access: public
 */
router.post('/upowner', async ctx => {
    const {id, name, gender, phone} = ctx.request.body
    const result = await User.updateOne({_id: id}, {name, gender, phone})
        .catch(err => {
            console.error(err)
        })
    ctx.body = {data: result, msg: '更新主人信息成功'}
})
/**
 * @method: POST
 * @route: api/users/addpet
 * @desc: 添加宠物
 * @access: public
 */
router.post('/addpet', async ctx => {
    const {name, gender, type, birth} = ctx.request.body
    const newPet = new Pet({
        name,
        gender,
        type,
        birth
    })
    await newPet
        .save()
        .then()
        .catch(err => {
            console.error(err)
        })
    ctx.body = {success: 1, msg: '添加宠物成功'}
})
/**
 * @method: POST
 * @route: api/users/addpetlog
 * @desc: 添加宠物访问记录
 * @access: public
 */
router.post('/addvisit', async ctx => {
    const {id, time, remark} = ctx.request.body
    await Pet.updateOne(
        {_id:id},
        {$push: {visitRecords:{time,remark}}}
    )
        .catch(err =>{
            console.error(err)
        })
    ctx.body = {success:1,msg:'添加就宠物访问记录成功'}
})
/**
* @method: POST
* @route: api/users/uppet
* @desc: 修改宠物信息
* @access: public
*/
router.post('/uppet',async ctx =>{

})
module.exports = router.routes();