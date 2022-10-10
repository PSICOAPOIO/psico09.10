const Post = require('../models/Post')
const User = require('../models/User')
const { post } = require('../routes/postRoutes')

const {Op} = require('sequelize')

module.exports = class PostController{
    static async showPost(req,res){

        //pesquisa do form. puxa na url
        let search= ''
        if(req.query.search){
            search = req.query.search
        }

        //ordenar por:
        let order = 'DESC'
        if(req.query.order === 'old'){
            order='ASC'
        }else{
            order='DESC'
        }

        const postsData = await Post.findAll({
            include: User,
            where: {
                conteudo: { [Op.like]: `%${search}%` },
              },
            order:[['createdAt', order]],
        })
       

        const posts= postsData.map((result) => result.get({plain:true}))

        //quantidade de posts encontrados na pesquisa
        let postsQtd = posts.length

        if(postsQtd ===0){
            postsQtd=false
        }

        res.render('post/showPost', {posts, search, postsQtd})
    }
    
    static async forum(req,res){
        const userId = req.session.userid
        
        const user = await User.findOne({
            where:{
                id:userId,
            },
            include: Post,
            plain: true,
        })
        
        //ver se o usuario existe
        if(!user){
            res.redirect('/login')
        }

        const posts= user.posts.map((result) => result.dataValues)
        

        res.render('post/forum',{ posts })

    }

    static createPost(req, res){
        res.render('post/create')
    }

    static async createPostSave(req,res){

        const posts = {
            conteudo: req.body.conteudo,
            userId: req.session.userid
        }

        
        try{
            await Post.create(posts)

            req.flash('message','Post realizado com sucesso!')

            req.session.save(()=>{
                res.redirect('/post/forum')
            })
        }catch(error){
            console.log(error)
        }
    }

    static async removePost(req,res){
        const id = req.body.id

        const UserId =  req.session.userid

        try{
            await Post.destroy({where:{id: id, UserId: UserId}})
            req.flash('message','Post removido com sucesso!')

            req.session.save(()=>{
                res.redirect('/post/forum')
            })
        }catch(error){
            console.log(error)
        }
    }

    static async editPost(req,res){
        const id = req.params.id

        const post = await Post.findOne({where:{id:id}, raw:true})
        
        res.render('post/edit', {post})
        

    }

    static async editPostSave(req,res){
        const id = req.body.id

        const post = {
            conteudo: req.body.conteudo
        }
        
        try{
            await Post.update(post, {where: {id:id}})
            req.flash('message','Post Atualizado com sucesso!')

            req.session.save(()=>{
                res.redirect('/post/forum')
            })
        }catch(error){
            console.log(error)
        }
    }
}
