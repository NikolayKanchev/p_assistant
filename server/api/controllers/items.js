const Item = require('../models/item');
const Category = require('../models/category');

const mongoose = require('mongoose');
const fs = require('fs')

exports.get_all = (req, res, next) => {
    Item.find( { category: req.body.categoryId })
    .exec()
    .then(result => {
        const response = { 
            count: result.length,
            items: result
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error : err });
    });
}

exports.get_one = (req, res, next) => {
    const item = req.params.itemId;
    
    Item.findById(item)
    .exec()
    .then(data => {
        console.log(data);
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({ message: 'No valid entry found for provided ID !'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

exports.update = (req, res, next) => {
    const id = req.params.itemId;

    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Item.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });    
}

const checkItemExist = (itemId) => {
    return new Promise((resolve, reject) =>{
        Item.find({ _id: itemId })
            .exec()
            .then(item => {
                if(item.length >= 1){
                    resolve(item)
                }else{
                    reject(undefined)
                }
            })
        }
    )
}

const deleteFile = (path) => {
    return new Promise((resolve, reject) =>{
        fs.unlink(path , (err) => {
            if (err){
                reject(false);
            }else{
                resolve(true);
            }
        });
        }
    )
}

exports.delete = async (req, res, next) => {
    const id = req.params.itemId;
    const item = await checkItemExist(id);

    if (item !== undefined){

        const path = "./" + item[0].img;        
        const fileDeleted = await deleteFile(path);

        if (fileDeleted){

            Item.deleteOne({_id: id})
            .exec()
            .then(() => {
                res.status(200).json({message: "Item deleted!"});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });        
            });
        }
    }
}

const checkCategoryExist = (categoryId) => {
    return new Promise((resolve, reject) =>{
        Category.find({ _id: categoryId })
            .exec()
            .then(category => {
                if(category.length >= 1){
                    resolve(true)
                }else{
                    reject(false)
                }
            })
        }
    )
}

exports.add = async (req, res, next) => {
    try{
        const categoryExist = await checkCategoryExist(req.body.category);

        if(categoryExist){
            const item = new Item({
                _id: new mongoose.Types.ObjectId(),
                category: req.body.category,
                name: req.body.name,
                size: req.body.size,
                price: req.body.price,
                img: req.file !== undefined? req.file.path: ""
            });
        
            item.save()
            .then(result => {
                res.status(201).json({
                    message: "Item Saved!",
                    item: result
                });
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
}