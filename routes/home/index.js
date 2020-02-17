import HomeController from '../../controllers/HomeController.js';
export default (app) =>{
    app.get('/', HomeController.index);
    app.get('/:lg/', HomeController.index);
}