const { getSignedURLOfFile } = require('../../utils/s3Bucket')

module.exports = async (data, key, isArr=true) => {
    if (isArr === true) {
        const newData = []
        if (data && data.length > 0) {
            for (const item of data) {
                if (item[key] !== '') {
                    const url = await getSignedURLOfFile(item[key])
                    newData.push({
                        ...item.dataValues,
                        [key]: url
                    })
                } else {
                    newData.push({
                        ...item.dataValues,
                        [key]: null
                    })
                }
            }
            return newData
        } else {
            return data
        }
    } else {
        let newData = {
            [key]: ''
        }
        if (data[key] !== '') {
            const url = await getSignedURLOfFile(data[key])
            newData = {
                ...data.dataValues,
                [key]: url
            }
        } else {
            newData = {
                ...data.dataValues,
                [key]: null
            }
        }
        return newData
    }
}