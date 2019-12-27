const ProductModel = require('../../model/product');

module.exports.getAll = async () => {
    const result = await ProductModel.find({});
    return result;
}

module.exports.getById = async (id) => {
    const result = await ProductModel.findById(id);
    return result;
}

module.exports.CreateproductData = (res, masp, tensp,thuonghieu,soluong,gianhap,giaxuat,thue,img) => {
    let errors = [];
    let hinhanh="";
    console.log(img);
    console.log(tensp);
    
    
    if(img!="123")
    {
        hinhanh=img;
    }
    if (!masp || !tensp||!thuonghieu||!soluong||!gianhap||!giaxuat||!thue) {
        errors.push({ msg: 'Bạn cần điền hết các thông tin' });
    }
    
    if (errors.length > 0) {
        res.render('createproduct', { errors });
    } else {
        ProductModel.findOne({ masp: masp }).then(product => {
            if (product) {
                errors.push({ msg: 'Mã sản phẩm đã tồn tại' });
                res.render('createproduct', { errors });
            } else {
                const newproduct = new ProductModel({ masp, tensp, hinhanh,thuonghieu,soluong,gianhap,giaxuat,thue});
                res.redirect('/product');
                return newproduct.save();
            }
        });
    }
};



module.exports.EditproductData = (res,_id, masp, tensp,thuonghieu,soluong,gianhap,giaxuat,thue,img) => {
    let errors = [];
    let hinhanh="";
    if(img!="123")
    {
        hinhanh=img;
    }
    
    if (!masp || !tensp||!thuonghieu||!soluong||!gianhap||!giaxuat||!thue) {
        errors.push({ msg: 'Bạn cần điền hết các thông tin' });
    }
    
    if (errors.length > 0) {
        res.render('editproduct', { errors });
    } else {
    
         var current={_id: _id};
         var newvalues = { $set: {masp: masp, tensp: tensp,hinhanh:hinhanh,thuonghieu:thuonghieu,soluong:soluong,gianhap:gianhap,giaxuat:giaxuat,thue:thue } };
         ProductModel.updateOne(current,newvalues,function(err,res){
            if(err) throw err;
         })
        res.redirect('/product');
    }
};

module.exports.DeleteproductData = (res,_id) => {
    var current = {_id:_id};
    ProductModel.deleteOne(current,function(err,obj){
        if(err) throw err;
    });
    res.redirect('/product');
};