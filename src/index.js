const path = require('path');
const express = require('express');
const methodOverride = require('method-override')
const morgan = require('morgan');
const handlebars = require('express-handlebars');

// const SortMiddleware = require('./app/middleware/SortMiddleware');



const route = require('./routes');
const db = require('./config/db');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

// Connect to DB
db.connect();

const app = express();
const port = 3000;


//use static folder
app.use(express.static(path.join(__dirname, '/public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware);

// app.get('/middleware', 
//     function(req, res, next){
//         if(['vethuong', 'vevip'].includes(req.query.ve)){
//             req.face = 'Gach gach gah!!!';
//             return next();
//         }
//         res.status(403).json({
//             message:'access dined'
//         });
//     },
//     function(req, res, next){
//         res.json({
//             message: 'successfully!',
//             face: req.face
//         });
//     }
// );
// HTTP logger
// app.use(morgan('combined'));

//Template engine
app.engine('hbs', 
    handlebars.engine({ 
        extname: '.hbs',
        helpers:{
            sum:(a,b) => a+b,
            sortable: (field, sort) =>{

                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-up-wide-short',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
              </a>`;
            }
        }
     }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// console.log('path', path.join(__dirname, 'resources/views'));
//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
