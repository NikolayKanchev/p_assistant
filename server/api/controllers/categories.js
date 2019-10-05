const Category = require('../models/category');
const Child = require('../models/child');
const mongoose = require('mongoose');


exports.get_all = (req, res, next) => {
    Category.find( { child: req.body.childId })
    // .populate('child')
    .exec()
    .then(result => {
        const response = { 
            count: result.length,
            categories: result
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error : err });
    });
}

const CheckChildExist = (childId) => {
    return new Promise((resolve, reject) =>{
        Child.find({ _id: childId })
            .exec()
            .then(child => {
                if(child.length >= 1){
                    resolve(true)
                }else{
                    reject({ message: "The child doesn't exist !"})
                }
            })
        }
    )
}

const CheckCategoryExist = (childId, name) => {
    return new Promise((resolve, reject) =>{
        Category.find({ child: childId ,name: name })
            .exec()
            .then(categories => {
                if(categories.length >= 1){
                    reject({ message: "The category already exist !"});
                }else{
                    resolve(false);
                }
            });
        }
    );
}

// Adds a category only if the child exist
// and only if a category with the same name doesn't exist
exports.add = async (req, res, next) => {
    try{
        const childExist = await CheckChildExist(req.body.childId);
        const categoryExist = childExist? await CheckCategoryExist(req.body.childId, req.body.name): false;

        if (!categoryExist){
            const category = new Category({
                _id: mongoose.Types.ObjectId(),
                child: req.body.childId,
                name: req.body.name
            });
            category.save()
                .then(result =>{
                    res.status(201).json(result);
                });
        }
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

exports.get_one = (req, res, next) => {
    Category.findById(req.params.categoryId)
    .exec()
    .then(category => {
        if(!category){
            return res.status(404).json({
                message: 'Category not found !'
            });
        }
        console.log(category);
        res.status(200).json(category)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

exports.delete = (req, res, next) => {
    const id = req.params.categoryId;

    Category.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });        
    });
}

exports.update = (req, res, next) => {
    // Category.findById(req.params.categoryId)
}