const {ProfilePsikolog, SchedulePsikolog} = require('../models')

module.exports = class Controller {
  static async getAllPsikolog(req, res, next){
    try {
      const data = await ProfilePsikolog.findAndCountAll({
        offset: req.query.page || 0, //untuk pagination
        limit: 4, // tergantung tim FE mau berapa yang keluar
        attributes  : ["id","UserId","fullname", "imageUrl", "rating"]
      })
      res.status(200).json({status : true, result : data})
    } catch (error) {
      next(error)
    }
  }

  static async detailProfilePsikolog(req, res, next){
    try {
      const data = await ProfilePsikolog.findOne({
        where : {
          id : req.params.ProfilePsikologId
        },
        attributes : ["id","fullname", "imageUrl", "rating", "description"],
        include : [{
          model : SchedulePsikolog,
          attributes : {
            exclude : ["createdAt", "updatedAt"]
          }
        }]
      })
      res.status(200).json({status : true, result : data})
    } catch (error) {
      next(error)
    }
  }
}