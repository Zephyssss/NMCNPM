const productService = require('./productService');
const product = require('../../model/product');

module.exports.Product = async (req, res, next) => {
    let value;
    try {
        value=await productService.getAll();
    } catch (error) {
        next(error);
    }
    res.render('product', { title: 'product',list:value});
}

module.exports.Editproduct = async (req, res, next) => {
    let value;
    if(typeof req.query.edit=== 'undefined'){
        res.render('editproduct', { title: 'Create product'});
    }
    else{
        try {
            value=await productService.getById(req.query.edit);
        } catch (error) {
            next(error);
        }
        res.render('editproduct', { title: 'Edit product',product: value});
    }
}

module.exports.Createproduct = async (req, res, next) => {
    res.render('createproduct', { title: 'Create product'});
}

module.exports.CreateproductData = async (req, res, next) => {
    try {
        await productService.CreateproductData(res,req.body.masanpham,req.body.tensanpham,req.body.thuonghieu,req.body.soluong,req.body.gianhap,req.body.giaban,req.body.thue,req.body.url);
    } catch (error) {
        next(error);
    }
}

module.exports.EditproductData = async (req, res, next) => {
    try {
        await productService.EditproductData(res,req.body.id,req.body.masanpham,req.body.tensanpham,req.body.thuonghieu,req.body.soluong,req.body.gianhap,req.body.giaban,req.body.thue,req.body.url);
    } catch (error) {
        next(error);
    }
}

module.exports.DeleteproductData = async (req, res, next) => {
    try {
        await productService.DeleteproductData(res,req.body.id);
    } catch (error) {
        next(error);
    }
}