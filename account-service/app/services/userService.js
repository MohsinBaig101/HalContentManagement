const { User, userDetail } = require('../models')
const md5 = require('md5')
const userRepositry = require('../repositories/userRepositry')
const userDetailRepositry = require('../repositories/userDetailRepositry')
const thirdPartyService = require('../../externalServices/thirdPartyService')
const tierRepositry = require('../repositories/tierRepositry')
const { Op } = require("sequelize");
const {getSignedURLOfFile} = require('../../utils/s3Bucket')
module.exports = {
  createSuperAdminAccount: async (user) => {
    // try {
    //   const role = await Role.findOne({
    //       code : 'super-admin'
    //   });
    //   const hash = await bcrypt.hash(user.password, 10)
    //   user.password = hash;
    //   user.role = role._id;
    //   const res = await User.create(user)
    //   return res
    // } catch (err) {
    //   return err
    // }
  },
  getUserByEmail: async (email) => {
    return await userRepositry.getUserByEmail(email)
  },
  getUserDetailByPageName: async (pageUrlName) => {
    return await userDetailRepositry.getUserDetailByPageUrl(pageUrlName)
  },
  getGravatarAvatar: async (email) => {
    const emailAddress = String(email).trim().toLowerCase()
    const emailHash = md5(emailAddress)
    try {
      const res = await thirdPartyService.getGravatar(emailHash)
      return {
        status: true,
        url: res.url
      }
    } catch (err) {
      return {
        status: false,
        url: ''
      }
    }
  },
  updateProfilePicURL: async (imageName, userId) => {
    await User.update({ profilePic: imageName }, { where: { id: userId } })
    const user = await User.findOne({ where: { id: userId }, attributes: ['profilePic'] })
    if (user) {
      const signUrl = await helper.getSignedUrl(user, 'profilePic', false)
      return {
        profilePic: signUrl.profilePic,
        key: imageName
      }
    } else {
      return {
        profilePic: '',
        key: ''
      }
    }
  },
  pageUrlExist: async (pageUrl,userId) => {
   
      return await userDetail.findOne({
        where: {
          [Op.and]: {
            pageURL: pageUrl,
            UserId: {
              [Op.ne]: userId
            }
          }
        }
      })
  
  },
  saveUserDetails: async (data) => {
    const userDetailObj = await userDetail.findOne({ where: { UserId: data.userId } })
    if (userDetailObj) {
      await userDetailRepositry.update(data)
      return {
        status: true
      }
    } else {
      await userDetailRepositry.save(data)
      return {
        status: true
      }
    }
  },
  updateCoverPhoto: async (fileName, userId) => {
    const userDetailObj = await userDetail.findOne({ where: { UserId: userId } })
    if (userDetailObj) {
      userDetailObj.coverPhoto = fileName
      userDetailObj.UserId = userId
      const user = await userDetailObj.save()
      if (user) {
        const signUrl = await helper.getSignedUrl(user, 'coverPhoto', false)
        return {
          coverPhoto: signUrl.coverPhoto,
          key: fileName
        }
      }
    } else {
      const user = await userDetail.create({
        coverPhoto: fileName,
        UserId: userId
      })
      if (user) {
        const signUrl = await helper.getSignedUrl(user, 'coverPhoto', false)
        return {
          coverPhoto: signUrl.coverPhoto,
          key: fileName
        }
      }
    }
  },
  introVideoUpload: async (fileName, userId) => {
    const userDetailObj = await userDetail.findOne({ where: { UserId: userId } })
    if (userDetailObj) {
      userDetailObj.introVideo = fileName
      userDetailObj.UserId = userId

      const user = await userDetailObj.save()
      if (user) {
        const signUrl = await helper.getSignedUrl(user, 'introVideo', false)
        return {
          introVideo: signUrl.introVideo,
          key: fileName
        }
      }
    } else {
      const user = await userDetail.create({
        introVideo: fileName,
        UserId: userId
      })
      if (user) {
        const signUrl = await helper.getSignedUrl(user, 'introVideo', false)
        return {
          introVideo: signUrl.introVideo,
          key: fileName
        }
      }
    }
  },
  getUserBasicInfo: async (userId) => {
    let res = await User.findOne({
      attributes: [
        'firstName', 'lastName', 'email', 'phone', 'profilePic'
      ],
      where: { id: userId },
      include: {
        model: userDetail,
        attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] }
      }
    })

    if(res && res.userDetail){
      res = JSON.parse(JSON.stringify(res))
      const coverPhotoUrl = res.userDetail && res.userDetail.coverPhoto  ? await getSignedURLOfFile(res.userDetail.coverPhoto) : null
      const profilePhotoUrl = await getSignedURLOfFile(res.profilePic)
      const introVideoUrl = res.userDetail && res.userDetail.introVideoType && res.userDetail.introVideoType === 'video' && res.userDetail.introVideo ? await getSignedURLOfFile(res.userDetail.introVideo) : null
      return {
        ...res,
        profilePicUrl : profilePhotoUrl,
        userDetail :{
          ...res.userDetail,
          coverPhotoUrl : coverPhotoUrl,
          introVideoUrl:introVideoUrl
        }
      }
    }else{
      return null;
    }
  },
  updatePassword: async (id, password) => {
    return await userRepositry.updatePassword(id, password)
  },
  getCreatorProfile: async (pageUrl) => {
    const userDetail = await userDetailRepositry.getFullUserDetail(pageUrl)
    if (userDetail) {
      const tiers = await tierRepositry.getUserTiers(userDetail.UserId)
      return {
        tiers: tiers,
        user: userDetail,
        status: 'ok'
      }
    } else {
      return {
        status: 'not-found'
      }
    }
  },
  removeMediaVideo:async(key,userId)=>{
    return await userDetailRepositry.removeMediaVideo(key,userId)
  }

}
