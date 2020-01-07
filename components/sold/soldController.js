const soldService = require('./soldService');

module.exports.thanhtoan = async (req, res, next) => {
    try {
        await soldService.CopyBillToSold(res);
    } catch (error) {
        next(error);
    }
}