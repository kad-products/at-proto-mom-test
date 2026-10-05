import { route } from 'rwsdk/router';
import Pages__journey__entry from './entry';

export default {
	app: [route('/*', [Pages__journey__entry])],
};
