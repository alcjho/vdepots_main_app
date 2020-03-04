import AccountController from '../../controllers/AccountController.js';

 //main validation method for users form
export default (app) => {
    app.post('/:lg/login/', AccountController.login);
    app.post('/:lg/add/', AccountController.add);
    app.get('/:lg/login/', AccountController.login);
    app.get('/:lg/logout/', AccountController.logout);
    
}