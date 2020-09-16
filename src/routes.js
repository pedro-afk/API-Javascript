const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const auth = require('./middlewares/auth');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const PostsController = require('./controllers/PostsController');

const routes = Router();
const upload = multer(uploadConfig);

routes.delete('/delete/post/:id', auth, PostsController.delete);

routes.put('/update/user', UserController.update);
routes.put('/update/post', auth, upload.single('thumbnail'), PostsController.update);

routes.get('/list/posts/user', PostsController.show);
routes.get('/list/posts', PostsController.index);
routes.get('/list/users', UserController.index);

routes.post('/login/user', SessionController.store);
routes.post('/register/user', SessionController.create);
routes.post('/new/post', auth, upload.single('thumbnail'), PostsController.create);

//rota de teste
routes.get('/', (req, res) => {
    return res.json({ ok: true });
});

module.exports = routes;