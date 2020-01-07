const ProductModel = require('../../model/product');
const BillModel = require('../../model/bill');
const PromotionModel = require('../../model/promotion');
const SoldModel = require('../../model/sold');


module.exports.CopyBillToSold = async (res) => {
    var bill;
    var promo = await PromotionModel.findOne({ isActive: true });
    bill = await BillModel.find({});
    var giam = 0;
    if (promo) {
        giam = promo.giam;
    }

    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();


    for (var i = 0; i < bill.length; i++) 
    {
        var masp1 = bill[i].masp;
        console.log("sold+++" + masp1);
        var tensp1 = bill[i].tensp;
        var hinhanh1 = bill[i].hinhanh;
        var thuonghieu1 = bill[i].thuonghieu;
        var soluong1= bill[i].soluong;
        var gianhap1= bill[i].gianhap;
        var giaxuat1= bill[i].giaxuat;
       await SoldModel.findOne({ masp: bill[i].masp, ngayban: date, khuyenmai: giam }).then(product => {
            if (product) {
                let soluong;
                soluong = product.soluong + soluong1;
                var current = { _id: product._id };
                var newvalues = { $set: { soluong: soluong } };
                SoldModel.updateOne(current, newvalues, function (err, res) {
                    if (err) throw err;
                })
            }
            else {
                console.log("dmmm: "+masp1);
                const newproduct = new SoldModel({ masp: masp1, tensp: tensp1, hinhanh: hinhanh1, thuonghieu: thuonghieu1, soluong: soluong1, gianhap: gianhap1, giaxuat: giaxuat1, thue: 10, ngayban: date, khuyenmai: giam });
                newproduct.save();
            }
        });
    }

    var newvalues1 = { $set: { isActive: false } };
    var current1 = { isActive: true };
    await PromotionModel.updateOne(current1, newvalues1, function (err, res) {
        if (err) throw err;
    });

    await BillModel.deleteMany({}, function (err, obj) {
        if (err) throw err;
    });
    
    res.redirect('/thanhtoan');
};