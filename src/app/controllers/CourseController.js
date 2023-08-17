const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose')
const {mutipleMongooseToObject} = require('../../util/mongoose')
class CourseController {

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then((course) =>{
                res.render('courses/show',{course: mongooseToObject(course)})
            })
            .catch(next);
    }

    // [GET] /courses/create

    create(req, res, next) {
        res.render("courses/create")
    }

     // [POST] /courses/store

     async store(req, res, next) {
        // res.json(req.body)
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg`;
        const course = await new Course(req.body);
        course
            .save()
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(next);
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit',{
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    //[PUT] /courses/:id
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /courses/:id
    destroy(req, res, next){
        Course.delete({_id:req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /courses/:id/force
    forceDestroy(req, res, next){
        Course.deleteOne({_id:req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id:req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next);
    }
    
    //[POSR] /courses/handle-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                .then(()=> res.redirect('back'))
                .catch(next);
            break;
            default:
                res.json({message: 'Action is invalid'});
        }
    }
}
// GET, POST, PUT, PATH, DELETE, OPTIONS, HEAD
//PUT, PATH: dùng chỉnh sửa dữ liệu
module.exports = new CourseController();

// const NewsController = require('./NewsController');
