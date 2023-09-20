import { Container } from 'inversify';
import TvDataService from './services/TvDataService';

const container = new Container();

container.bind(TvDataService).toSelf().inSingletonScope();

export default container;
