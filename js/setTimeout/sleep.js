function sleep(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve()
    }, timeout)
  })
}

for (let i = 0; i < 5; i++) {
  sleep(1000 * i).then(() => console.log(i))
}

// 改成async await
;(async () => {
  for (let i = 0; i < 5; i++) {
    await sleep(1000)
    console.log(i)
  }
})()
