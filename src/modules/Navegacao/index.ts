import NavigationService from './Service/NavigationService';
import NavigationController from './Controller/NavegacaoController';

const navigationService = new NavigationService();

const navigationController = new NavigationController(navigationService);

export { navigationController };
