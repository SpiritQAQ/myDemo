import { renderArticle, renderButton } from './test.js'
async function ArticleGenerator() {
  const url = 'http://localhost:3000/article/list'
  const url2 = 'http://localhost:3000/article/detail'
  const articleList = await fetch(url).then((res) => res.json())

  const articleDetail = await fetch(
    `${url2}?id=${articleList.data[1]._id}`
  ).then((res) => res.json())

  const result = renderArticle(articleDetail.data._doc)

  console.log(result)
}

renderButton(() => ArticleGenerator())
