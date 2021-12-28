const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

//initialize express
const app = express()
const articles = []

//list of sites to scrape
const sites = [{
    name:'goal',
    address:'https://www.goal.com/en-us'
    ,base:""
},
{
    name:'sky sports',
    address:'https://www.skysports.com/transfer-centre'
    ,base:"https://www.skysports.com"
},
{
    name:'transfermarkt',
    address:'https://www.transfermarkt.us',
    base:""
}
] 

//scrapes sites 
sites.forEach(sites => {
    axios.get(sites.address)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('a:contains("transfer")',html).each(function (){
            const title = $(this).text()
            const url =  $(this).attr('href')
            articles.push({
                title,
                url: sites.base + url,
                source: sites.name
            })
        })
        // res.json(articles)
    })
    // .catch((err)=> console.log(err))

})

app.get('/', (req,res)=>{
    res.json("Welcome to the Footy API")
})


app.get('/news', (req,res)=>{
    res.json(articles)
})
 
app.get('/news/newspaperId', (req,res)=>{
    const newspaperAdd = req.params.newspaperId
    const base = sites.filter(sites => sites.name == newspaperId)[0].base

    axios.get(newspaperAdd).then(response=>{
        const html= response.data
        const $ = cheerio.load(html)
        const specifics = []
        $('a:contains("transfer")',html).each(function (){
            const title = $(this).text()
            const url =  $(this).attr('href')
            specifics.push({
                title,
                url : base + url,
                source: newspaperId
            })
        })
        res.json(specifics)
    }).catch(err => console.log(err))
})

//listen to changes on port 8000
app.listen(PORT, () => console.log('server running on PORT ${PORT}'))
