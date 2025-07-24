//-------- utils --------//
const createReject = function (reason = "") {
  return { success: false, reason: reason }
}

const createSuccess = function (data = {}) {
  return { success: true, data: data }
}

const checkNotAuth = function (context) {
  if (!context.auth) {
    return createReject("ไม่ได้เป็นสมาชิก")
  }
  
  return false
}

const checkNotAdmin = function (context) {
  if (!context.auth) {
    return createReject("ไม่ได้เป็นสมาชิก")
  }
  if (context.auth.token.role !== "admin") {
    return createReject("ไม่ใช่ผู้ดูแลระบบ")
  }
  if (context.auth.token.role === "admin") {
    return false
  } else {
    return createReject("ไม่ใช่ผู้ดูแลระบบ")
  }
}

exports.createReject = createReject
exports.checkNotAuth = checkNotAuth
exports.createSuccess = createSuccess
exports.checkNotAdmin = checkNotAdmin

exports.genHash = function (length = 16) {
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // eslint-disable-line
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  
  return result
}

exports.genNumber = function (length = 16) {
  let result = ""
  const characters = "0123456789"; // eslint-disable-line
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  
  return result
}

exports.filterRemove = function (obj, removes = []) {
  Object.keys(obj).forEach(key => {
    if (removes.includes(key)) {
      delete obj[key]
    }
  })
  
  return obj
}

exports.filterWant = function (obj, wants = []) {
  Object.keys(obj).forEach(key => {
    if (!wants.includes(key)) {
      delete obj[key]
    }
  })
  
  return obj
}
