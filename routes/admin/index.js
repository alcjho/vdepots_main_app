import AdminController from '../../controllers/AdminController.js';
export default (app) => {
    app.get('/:lg/admin/', AdminController.index);
}