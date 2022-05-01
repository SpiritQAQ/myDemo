Promise.myAll = function (promiseList) {
  const results = []
  let reason = null
  let count = 0
  return new Promise((resolve, reject) => {
    promiseList.forEach((promiseItem, index) => {
      promiseItem
        .then((result) => {
          // results.push(result)不能用push 顺序就变了
          results[index] = result

          count += 1

          if (count === promiseList.length) resolve(results)
        })
        .catch((error) => {
          reason = error
          reject(reason)
        })
    })
  })
}

Promise.myRace = function (promiseList) {
  let reason = null

  return new Promise((resolve, reject) => {
    promiseList.forEach((promiseItem, index) => {
      promiseItem
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  })
}
