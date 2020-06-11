const Router = require("koa-router");
const router = new Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

//引入Models
const Admin = require('../../models/Admin')
const User = require('../../models/User')
const Doctor = require('../../models/Doctor')

/**
* @route: GET api/admin/test
* @desc: 测试接口地址
* @access: 公开
*/
router.get('/test',async ctx =>{
    ctx.status = 200
    ctx.body = {msg:'admins api works......'}
})

/**
* @route: POST api/admin/login
* @desc: 登录接口
* @access: 公开
*/
router.post('/login',async ctx =>{
    const {username,password} = ctx.request.body
    const findresult = await Admin.find({username})
    if (findresult.length===0){
        ctx.body = {success:0,msg:'用户名不存在！'}
    }else {
        const result = bcrypt.compareSync(password,findresult[0].password)
        if (result){
            ctx.status = 200
            ctx.body = {success:1,msg:'登录成功！'}
        }else {
            ctx.body = {success:0,msg:'密码错误！'}
        }
    }
})

/**
* @route: POST api/admin/addadmin
* @desc: 添加管理员登录用户
* @access: 公开
*/
router.post('/addadmin',async ctx =>{
    const {name,username,password} = ctx.request.body
    const findResult = await Admin.find({username})
    if (findResult.length > 0){
        ctx.body = {success:0,msg:'账号已被注册'}
    }else{
        const newAdmin = new Admin({
            name,
            username,
            password: bcrypt.hashSync(password, 10),
        })
        await newAdmin
            .save()
            .then(newAdmin =>{
                ctx.body = newAdmin
            })
            .catch(err =>{
                console.log(err)
            })
        ctx.body = {success:1,msg:'添加成功'}
    }
})
/**
* @route: POST api/admin/adduser
* @desc: 添加普通登录用户
* @access: 公开
*/
router.post('/adduser',async ctx =>{
    const {name,email,password} = ctx.request.body
    const findResult = await User.find({email})
    if (findResult.length > 0 ){
        ctx.body = {success:0,msg:'邮箱已被占用'}
    }else {
        const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'},'https');
        const newUser = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            avatar,
        });
        await newUser
            .save()
            .then((user) => {
                ctx.body = user;
            })
            .catch(err => {
                console.log(err)
            });
        //返回json数据
        ctx.body = {success:1,msg:'添加登录用户成功'};
    }
})
/**
* @route: api/admin/deluser
* @desc: 删除普通登录用户
* @access: 公开
*/
router.post('/deluser',async ctx =>{
    const{email} = ctx.request.body
    const delResult = await User.remove({email})
    ctx.body = {msg:delResult}
})
/**
* @method: POST
* @route: api/admin/adddoctor
* @desc: 添加兽医资料
* @access: 公开
*/
router.post('/adddoctor',async ctx =>{
    const {name,age,gender,email,label} = ctx.request.body
    const findResult = await Doctor.find({email})
    if (findResult.length > 0){
        ctx.body = {success:0,message:'邮箱已被占用'}
    }else {
        const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'},'https');
        const newDoctor = new Doctor({
            name,
            age,
            gender,
            email,
            avatar,
            label
        })
        await newDoctor
            .save()
            .then((res) =>{
                console.log(res)
            })
            .catch(err =>{
                console.log(err)
            })
        ctx.body = {success:1,msg:'添加兽医资料成功'}
    }
})
/**
* @method: POST
* @route: api/admin/deldoctor
* @desc: 删除兽医
* @access: 公开
*/
router.post('/deldoctor',async ctx =>{
    const {email} = ctx.request.body
    const delResult = await Doctor.remove({email})
        .catch(err =>{
            console.error(err)
        })
    ctx.body = {data:delResult,msg:'删除兽医成功'}
})
/**
* @method: POST
* @route: api/admin/updoctor
* @desc: 更新兽医信息
* @access: public
*/
router.post('/updoctor',async ctx =>{
    const {id,name,age,gender,email,label} = ctx.request.body
    const result = await Doctor.updateOne({_id:id},{name,age,gender,email,label})
    ctx.body = {success:1,msg:'更新兽医信息成功',data:result}
})


module.exports = router.routes();