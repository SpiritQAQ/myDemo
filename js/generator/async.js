const renderArticle = (data) => {
  const dom = document.createElement('div')
  dom.innerHTML = JSON.stringify(data)

  document.body.appendChild(dom)
  return '渲染完成'
}

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

ArticleGenerator()
