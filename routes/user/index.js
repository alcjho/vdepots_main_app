import AccountController from '../../controllers/AccountController.js';

export default (app) => {
    app.get('/:lg/login/', AccountController.index);
}