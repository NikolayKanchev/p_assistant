const Child = require('../models/child');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.get_all = (req, res, next) => {
    Child.find()
    .select('_id name user birthdate gender clothesSize shoeSize img')
    .exec()
    .then(result => {
        const response = { 
            count: result.length,
            children: result
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error : err });
    });
}

exports.get_one = (req, res, next) => {
    const childId = req.params.childId;
    
    Child.findById(childId)
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
    const id = req.params.childId;

    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Child.update({ _id: id }, {$set: updateOps })
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

exports.delete = (req, res, next) => {
    const id = req.params.childId;

    Child.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });        
    });
}

const CheckUserExist = (userId) => {
    
    return new Promise((resolve, reject) =>{
        User.find({ _id: userId })
            .exec()
            .then(user => {
                if(user.length >= 1){
                    resolve(true)
                }else{
                    reject({ message: "The user does not exist !" })
                }
            })
        }
    )
}

const CheckChildExist = (userId, name, birthdate) => {
    return new Promise((resolve, reject) =>{
        Child.find({ user: userId, name: name, birthdate: birthdate })
            .exec()
            .then(child => {
                if(child.length >= 1){
                    reject({ message: "The child already exist !"})
                }else{
                    resolve(false)
                }
            })
        }
    )
}

exports.add = async (req, res, next) => {
    try{
        const userExist= await CheckUserExist(req.body.userId);
        const childExist = userExist? await CheckChildExist(req.body.userId, req.body.name, req.body.birthdate): false;        

        if(!childExist){
            const child = new Child({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.userId,
                name: req.body.name,
                birthdate: req.body.birthdate,
                gender: req.body.gender,
                clothesSize: req.body.clothesSize,
                shoeSize: req.body.shoeSize,
                img: req.file !== undefined? req.file.path: ""
            });
        
            child.save()
            .then(result => {
                res.status(201).json({
                    message: "children POST request",
                    child: result
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