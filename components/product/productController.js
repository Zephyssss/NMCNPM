const productService = require('./productService');
const product = require('../../model/product');


module.exports.makhuyenmai

module.exports.tangSoluong = async(req, res, next) =>{
    try {
        await productService.addNumberofBill(res,req.query.id);
        } catch (error) {
        next(error);
    }
}

module.exports.makhuyenmai = async(req, res, next) =>{
    try {
        await productService.promotion(res, req.body.magiamgia);
        } catch (error) {
        next(error);
    }
}

module.exports.giamSoluong = async(req, res, next) =>{
    try {
        await productService.subNumberofBill(res,req.query.id);
        } catch (error) {
        next(error);
    }
}

module.exports.search = async(req, res, next) =>{
    let value;
    let lisst;
    try {
        var tong = 0;
        lisst = await productService.getAllBill();
        value = await productService.findPro(req.body.searchKey);
        for(var i = 0; i<lisst.length;i++){
            tong += lisst[i].giaxuat*lisst[i].soluong;
        }
    } catch (error) {
        next(error);
    }
    tong += tong*0.1;

    res.render('checkout', {gia: tong, list: value, bill: lisst, isCheckout:true, isBill: true, title:"Thanh toán"});
}

module.exports.Product = async (req, res, next) => {
    let value;
    try {
        value=await productService.getAll();
    } catch (error) {
        next(error);
    }
    res.render('product', { title: 'product',list:value, isProduct:true});
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

module.exports.addBill = async (req, res, next) => {
    let value;
    try {
        value=await productService.getById(req.query.add);
    } catch (error) {
        next(error);
    }
    productService.createBillData(res, value.masp, value.tensp, value.thuonghieu, value.gianhap, value.giaxuat, value.thue,value.hinhanh)
   

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

module.exports.xoa1Bill = async (req, res, next) => {
    try {
        await productService.deleteBill(res,req.query.id);
    } catch (error) {
        next(error);
    }
}



module.exports.removeBill = async (req, res, next) => {
    try {
        await productService.DeletebillData(res);
    } catch (error) {
        next(error);
    }
}


module.exports.checkout = async (req, res, next) => {
    let value;
    var promo; 
    var product;
    try {
        promo = await productService.getMagiamgia();
    } catch (error) {
        next(error);
    }
    try {
        product = await productService.getAll();
    } catch (error) {
        next(error);
    }
    try {
        var tong=0;
        value=await productService.getAllBill();
        for(var i = 0; i<value.length;i++){
            tong += value[i].giaxuat*value[i].soluong;
        }
    } catch (error) {
        next(error);
    }
    //console.log("Key------"+promo.giam);
  
    if(promo!=null){
        tong = tong - promo.giam*tong/100 + tong*0.1;
        res.render('checkout', {list:product, giam:promo.giam, isBill:true, title:"Thanh toán", bill:value, gia: tong, isCheckout:true});    
    }
    else{
        tong += tong*0.1;
        res.render('checkout', {list:product, giam:0, isBill:true, title:"Thanh toán", bill:value, gia: tong, isCheckout:true});
    }
}
