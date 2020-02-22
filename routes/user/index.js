import AccountController from '../../controllers/AccountController.js';

export default (app) => {
    app.post('/:lg/login/', AccountController.login);
    app.get('/:lg/login/', AccountController.login);
}