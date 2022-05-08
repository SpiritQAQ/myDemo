import { renderArticle, renderButton } from './test.js'
// import { ArticleGenerator } from './index.js'

function* ArticleGenerator() {
  const url = 'http://localhost:3000/article/list'
  const url2 = 'http://localhost:3000/article/detail'
  const res1 = yield fetch(url)
  const articleList = yield res1.json()
  const res2 = yield fetch(`${url2}?id=${articleList.data[1]._id}`)

  const {
    data: { _doc: articleDetail },
  } = yield res2.json()
  const result = yield renderArticle(articleDetail)

  console.log(result)
}

function autoGenerator(generator) {
  function isPromise(obj) {
    return 'function' === typeof obj.then
  }

  const iterator = generator()

  function handle(data) {
    const result = iterator.next(data)
    if (result.done) {
      return
    }

    if (isPromise(result.value)) {
      result.value
        .then((res) => {
          return handle(res)
        })
        .catch((err) => iterator.throw(err))
    } else {
      handle(result.value)
    }
  }

  try {
    handle()
  } catch (e) {
    iterator.thorw(e)
  }
}

renderButton(() => {
  autoGenerator(ArticleGenerator)
})
