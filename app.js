const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');



const app = new Koa();
const router = new KoaRouter();

// Replace with DB
const things = [
    'My Family',
    'Programming',
    'Cooking',
    'Cruise'
];


// Json prettier Midlleware
app.use(json());

// BodyParser Middleware
app.use(bodyParser());

// Add additional properties to context
app.context.author = 'Kevin Zhang (Code Advocator)';

// Simple Middleware Example
// app.use(async ctx => (ctx.body = {
//     msg: 'Hello World! Kevin - keep learning everyday'
// }));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
});

// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

// List of things
async function index(ctx) {
    await ctx.render('index', {
        title: 'Things I really love:',
        things: things
    });
}
// Show add things
async function showAdd(ctx) {
    await ctx.render('add');
}

// Add thing
async function add(ctx) {
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');

}


// Router Middleware
app.use(router.routes()).use(router.allowedMethods());


router.get('/test', ctx => (ctx.body = `Hello ${ctx.author}`));
router.get('/test2/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`));

app.listen(3000, () => console.log("Server started ..."));