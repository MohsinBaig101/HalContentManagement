const { userDetail, User } = require('../models')
const { Op } = require('sequelize')
const { deleteFile } = require('../../utils/s3Bucket')

module.exports = {
  getUserDetailByPageUrl: async (pageUrlName) => {
    return await userDetail.findOne({
      where: {
        pageURL: pageUrlName
      }
    })
  },
  save: async (data) => {
    // const user = await userDetail.findOne({
    //   where: {
    //     UserId: data.userId
    //   }
    // })
    // (user && user.introVideo) ? deleteFile(user.introVideo) : null
    return await userDetail.create({
      pageName: data.pageName,
      description: data.description,
      pageURL: data.pageURL,
      about: data.about,
      UserId: data.userId,
      introVideo: data.introVideoType === 'url' ? data.introVideo : null,
      introVideoType: data.introVideoType
    })
  },
  update: async (data) => {
    const userDetailObj = await userDetail.findOne({
      where: {
        UserId: data.userId
      }
    })
    // const videoUrl = (userDetailObj && userDetailObj.introVideo) ? userDetailObj.introVideo : null
    // (videoUrl) ? deleteFile(videoUrl) : null
    userDetailObj.pageName = data.pageName
    userDetailObj.description = data.description
    userDetailObj.pageURL = data.pageURL
    userDetailObj.about = data.about
    userDetailObj.UserId = data.userId
    if(data.introVideoType === 'url'){
      userDetailObj.introVideo = data.introVideo
    }
    userDetailObj.introVideoType = data.introVideoType
    await userDetailObj.save()
  },
  getFullUserDetail: async (pageUrlName) => {
    return await userDetail.findOne({
      attributes: ['nameForFan', 'creationName', 'soundMoreAccurate', 'coverPhoto', 'pageURL', 'about', 'introVideo', 'UserId'],
      where: {
        pageURL: pageUrlName
      },
      include: {
        model: User,
        attributes: ['profilePic', 'email']
      }
    })
  },
  removeMediaVideo:async(key,userId)=>{
    (key) ? deleteFile(key) : null
    return await userDetail.update({introVideo:null,introVideoType:null },{where:{UserId:userId}})
  }
}
