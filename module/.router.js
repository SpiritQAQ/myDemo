function setRouter(app){ 
 var router = app; 




app.get('/getItems',function(req,res){

    var items = [
        {
            img:'./img/portfolio/dreams.png',
            title: 'Dreams',
            number: 6
        },
        {
            img:'./img/portfolio/escape.png',
            title: 'Escape',
            number: 5
        },
        {
            img:'./img/portfolio/golden.png',
            title: 'Golden',
            number: 4
        },
        {
            img:'./img/portfolio/treehouse.png',
            title: 'Treehouse',
            number: 3
        },
        {
            img:'./img/portfolio/startup-framework.png',
            title: 'Startup Framework',
            number : 2
        },
        {
            img:'./img/portfolio/dreams.png',
            title: 'Dreams',
            number: 6
        },
        {
            img:'./img/portfolio/escape.png',
            title: 'Escape',
            number: 5
        },
        {
            img:'./img/portfolio/golden.png',
            title: 'Golden',
            number: 4
        },
        {
            img:'./img/portfolio/treehouse.png',
            title: 'Treehouse',
            number : 3
        },
        {
            img:'./img/portfolio/startup-framework.png',
            title: 'Startup Framework',
            number: 2
        },
        {
            img:'./img/portfolio/golden.png',
            title: 'Golden',
            number: 4
        },
        {
            img:'./img/portfolio/escape.png',
            title: 'Escape',
            number: 5
        },
        {
            img:'./img/portfolio/treehouse.png',
            title: 'Treehouse',
            number: 3
        },
        {
            img:'./img/portfolio/dreams.png',
            title: 'Dreams',
            number: 6
        },
        {
            img:'./img/portfolio/startup-framework.png',
            title: 'Startup Framework',
            number: 2
        },
        {
            img:'./img/portfolio/golden.png',
            title: 'Golden',
            number: 4
        },
        
        {
            img:'./img/portfolio/escape.png',
            title: 'Escape',
            number: 5
        },
        {
            img:'./img/portfolio/dreams.png',
            title: 'Dreams',
            number: 6
        },
    ]
    var pageIndex = req.query.page
    var len = 3 ;

    var retItems = items.slice(pageIndex*len,pageIndex*len+len)

    res.send({
        status:0,
        data:retItems
    })
})}
 module.exports.setRouter = setRouter