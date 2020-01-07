const ProductModel = require('../../model/product');
const BillModel = require('../../model/bill');
const PromotionModel = require('../../model/promotion');

module.exports.getAll = async () => {

    const result = await ProductModel.find({});
    return result;
}


module.exports.getAllBill = async () => {

    const result = await BillModel.find({});
    return result;
}

module.exports.getMagiamgia = () => {

    var promo=PromotionModel.findOne({isActive: true });
    
    return promo;
    
}

module.exports.findPro = async (key) => {
    if (key.length > 0) {
        const result = await ProductModel.find({ $text: { $search: key } });
        return result;
    }
    else {
        const resultAll = await ProductModel.find({});
        return resultAll;
    }

}

module.exports.getById = async (id) => {
    const result = await ProductModel.findById(id);
    return result;
}

module.exports.createBillData = (res, masp, tensp, thuonghieu, gianhap, giaxuat, thue, img) => {
    let errors = [];
    let hinhanh = "";
    console.log(img);
    console.log(tensp);

    if (img != "123") {
        hinhanh = img;
    }

    BillModel.findOne({ masp: masp }).then(product => {
        let soluong;
        if (product) {
            soluong = product.soluong + 1;
            var current = { _id: product._id };
            var newvalues = { $set: { soluong: soluong, masp: masp, tensp: tensp, hinhanh: hinhanh, thuonghieu: thuonghieu, gianhap: gianhap, giaxuat: giaxuat, thue: thue } };
            BillModel.updateOne(current, newvalues, function (err, res) {
                if (err) throw err;
            })
            res.redirect('/thanhtoan')

        } else {
            soluong = 1;    
            const newproduct = new BillModel({ masp, tensp, hinhanh, thuonghieu, soluong, gianhap, giaxuat, thue });
            newproduct.save();
            return res.redirect('/thanhtoan');
        }
    });


}

module.exports.CreateproductData = (res, masp, tensp, thuonghieu, soluong, gianhap, giaxuat, thue, img) => {
    let errors = [];
    let hinhanh = "";
    console.log(img);
    console.log(tensp);


    if (img != "123") {
        hinhanh = img;
    }
    if (!masp || !tensp || !thuonghieu || !soluong || !gianhap || !giaxuat || !thue) {
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
                const newproduct = new ProductModel({ masp, tensp, hinhanh, thuonghieu, soluong, gianhap, giaxuat, thue });
                res.redirect('/product');
                return newproduct.save();
            }
        });
    }
};


module.exports.addNumberofBill = (res, __id) => {
    var current = { _id: __id };
    var temp;

    BillModel.findOne({ _id: __id }).then(bill => {
        var soluong1 = bill.soluong + 1;
        temp = bill.masp;
        var newvalues = { $set: { soluong: soluong1 } };

        BillModel.updateOne(current, newvalues, function (err, res) {
            if (err) throw err;
        })
        res.redirect('/thanhtoan');
    });
}

module.exports.promotion = (res, ma) => {
    var newvalues = { $set: { isActive: false } };
    var current = { isActive: true };
    PromotionModel.updateOne(current, newvalues, function (err, res) {
        if (err) throw err;
    });
    PromotionModel.findOne({ magiamgia: ma }).then(promo => {
        if (promo) {
            var current = { _id: promo._id };
            var newvalues = { $set: { isActive: true } };
            PromotionModel.updateOne(current, newvalues, function (err, res) {
                if (err) throw err;
            })
        }
        res.redirect('/thanhtoan');
    });
    
}

module.exports.deletePromo = () => {
    var newvalues = { $set: { isActive: false } };
    var current = { isActive: true };
    PromotionModel.updateOne(current, newvalues, function (err, res) {
        if (err) throw err;
    });
}

module.exports.subNumberofBill = (res, __id) => {
    var current = { _id: __id };
    var temp;

    BillModel.findOne({ _id: __id }).then(bill => {
        if (bill.soluong > 1) {
            var soluong1 = bill.soluong - 1;
            temp = bill.masp;
            var newvalues = { $set: { soluong: soluong1 } };

            BillModel.updateOne(current, newvalues, function (err, res) {
                if (err) throw err;
            })
        }
        res.redirect('/thanhtoan');
    });
}

module.exports.EditproductData = (res, _id, masp, tensp, thuonghieu, soluong, gianhap, giaxuat, thue, img) => {
    let errors = [];
    let hinhanh = "";
    if (img != "123") {
        hinhanh = img;
    }

    if (!masp || !tensp || !thuonghieu || !soluong || !gianhap || !giaxuat || !thue) {
        errors.push({ msg: 'Bạn cần điền hết các thông tin' });
    }

    if (errors.length > 0) {
        res.render('editproduct', { errors });
    } else {

        var current = { _id: _id };
        var newvalues = { $set: { masp: masp, tensp: tensp, hinhanh: hinhanh, thuonghieu: thuonghieu, soluong: soluong, gianhap: gianhap, giaxuat: giaxuat, thue: thue } };
        ProductModel.updateOne(current, newvalues, function (err, res) {
            if (err) throw err;
        })
        res.redirect('/product');
    }
};

module.exports.DeleteproductData = (res, _id) => {
    var current = { _id: _id };
    ProductModel.deleteOne(current, function (err, obj) {
        if (err) throw err;
    });
    res.redirect('/product');
};

module.exports.DeletebillData = (res) => {
    BillModel.deleteMany({}, function (err, obj) {
        if (err) throw err;
    });
    res.redirect('/thanhtoan');
};

module.exports.deleteBill = (res, _id) => {
    var current = { _id: _id };
    BillModel.deleteOne(current, function (err, obj) {
        if (err) throw err;
    });
    res.redirect('/thanhtoan');
};



