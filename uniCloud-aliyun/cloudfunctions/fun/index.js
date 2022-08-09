// 初始化云函数
let db = uniCloud.database({
  throwOnNotFound: false,
})
const dbCmd = db.command;
exports.main = async (event, context) => {
  //event为客户端上传的参数
  if (event.api === 'publish') {
    // 把content存进message表里头
    return await db.collection('message').add({
      content: event.content,
      user: event.user,
    })
  }
  if (event.api === 'getMessages') {
    // 把content存进message表里头
    return await db.collection('message').get()
  }
  if (event.api === 'check') {
    return await db.collection('message').where({
      content: ""
    }).remove().then((res) => {
      console.log("清楚无效留言", res.deleted, "条")
    }).catch((err) => {
      console.log(err.message)
    })
  }

  //返回数据给客户端
  return event
};
