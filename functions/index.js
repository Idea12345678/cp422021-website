const { functions, admin, auth, db, rtdb, cloudRegion } = require("./bootstrap")
const utils = require("./utils")

// ✅ รายการโต๊ะทั้งหมด
exports.listTables = functions.region(cloudRegion).https.onCall(async (data, context) => {
  const result = []
  const tables = await db.collection("tables").get()
  tables.forEach(doc => {
    result.push(doc.data())
  })
  return utils.createSuccess(result)
});

// ✅ เพิ่มโต๊ะใหม่
exports.addTable = functions.region(cloudRegion).https.onCall(async (data, context) => {
  try {
    await db.collection("tables").doc(data.name).set(data)
    return utils.createSuccess(data)
  } catch (err) {
    return utils.createReject(err.message)
  }
});

// ✅ จองโต๊ะ (เปลี่ยนสถานะเป็น reserved)
exports.reserveTable = functions.region(cloudRegion).https.onCall(async (data, context) => {
  try {
    await db.collection("tables").doc(data.name).update({ status: "reserved" })
    return utils.createSuccess(data)
  } catch (err) {
    return utils.createReject(err.message)
  }
});

// ✅ ดึงรายการคิวทั้งหมด (เรียงตามเวลาเข้าคิว)
exports.listQueues = functions.region(cloudRegion).https.onCall(async (data, context) => {
  try {
    const snapshot = await db.collection("queues").orderBy("timestamp").get()
    const result = []
    snapshot.forEach(doc => result.push(doc.data()))
    return utils.createSuccess(result)
  } catch (err) {
    return utils.createReject(err.message)
  }
});

// ✅ เพิ่มคิวใหม่
exports.enqueue = functions.region(cloudRegion).https.onCall(async (data, context) => {
  try {
    const id = data.name || Date.now().toString()
    await db.collection("queues").doc(id).set(data)
    return utils.createSuccess(data)
  } catch (err) {
    return utils.createReject(err.message)
  }
});

// ✅ ลบคิวออก (เรียกคิว)
exports.dequeue = functions.region(cloudRegion).https.onCall(async (data, context) => {
  try {
    await db.collection("queues").doc(data.name).delete()
    return utils.createSuccess({ name: data.name })
  } catch (err) {
    return utils.createReject(err.message)
  }
});
