export const renderArticle = (data) => {
  const dom = document.createElement('div')
  dom.innerHTML = JSON.stringify(data)

  document.body.appendChild(dom)
  return '渲染完成'
}

export const renderButton = (func) => {
  const button = document.createElement('button')

  button.innerHTML = '获取数据'
  button.onclick = () => func()
  document.body.appendChild(button)
}
