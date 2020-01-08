const soldService = require('./soldService');

module.exports.thanhtoan = async (req, res, next) => {
    try {
        await soldService.CopyBillToSold(res);
    } catch (error) {
        next(error);
    }
}

module.exports.doanhthu = async (req, res, next)=>{
    let list;
    try {
        list = await soldService.getSold(); 
    
    }catch(error){
        next(error);
    }

    res.render('revenue',{list:list, isRevenue: true});
}