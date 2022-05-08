var fs = require('fs')
var path = require('path')

function findLargest(dir, cb) {
  try {
    fs.readdir(dir, function (err, files) {
      console.log('🚀 ~ file: callback.js ~ line 7 ~ files', files)
      if (err) throw err

      const stats = []
      let count = 0

      let found_stat = null
      let maxSize = 0

      files.forEach((file, index) => {
        fs.stat(path.join(dir, file), function (err, stat) {
          if (err) throw err
          stats[index] = stat
          count += 1
          if (stat.size > maxSize && stat.isFile()) {
            console.log(file, stat)
            maxSize = stat.size
            found_stat = file
          }
          if (count === files.length) {
            cb({
              maxSize,
              fileName: found_stat,
            })
          }
        })
      })
    })
  } catch (e) {
    console.error(e)
  }
}

const fileData = findLargest('../', (data) => console.log(data))
