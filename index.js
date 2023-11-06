const express = require('express')
const path = require('path')
const logger = require('./middleware/logger.js')
const { engine } = require('express-handlebars');
const members = require("./members.js")


const app = express()


//init middleware
//app.use(logger)

// Handlebars middleware
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');
app.set('views', './views');
  

//body parser midlleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Homepage route
app.get('/', (req,res)=> {
    res.render('index',{
        title: "Member App",
        members
    })
})

//Set static folder
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/apiMembers', require('./routes/api/apiMembers.js'))



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server runing: "+PORT))
