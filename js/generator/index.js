import { renderArticle, renderButton } from './test.js'

// 场景为 获取文章列表再用其中一个id去获取详情
export function* ArticleGenerator() {
  const url = 'http://localhost:3000/article/list'
  const url2 = 'http://localhost:3000/article/detail'
  const articleList = yield fetch(url)

  const articleDetail = yield fetch(`${url2}?id=${articleList.data[1]._id}`)

  const result = yield renderArticle(articleDetail)

  console.log(result)
}

renderButton(() => {
  const generator = ArticleGenerator()

  generator
    .next()
    .value.then(function (res) {
      return res.json()
    })
    .then(function (data) {
      // 将文章列表传递下去，next(值) 的值就是 const xxx = yield balabala 的xxx，语句的返回值
      // 并向迭代器请求下个值（fetch()的结果）一个promise
      return generator.next(data).value
    })
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      const renderResult = generator.next(data.data._doc).value
      generator.next(renderResult)
    })
})
