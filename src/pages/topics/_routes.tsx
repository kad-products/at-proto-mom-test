import { route } from 'rwsdk/router';
import Pages__topics__entry from './entry';
import Pages__topics__listing from './listing';

export default {
	app: [route('/', [Pages__topics__listing]), route('/:slug', [Pages__topics__entry])],
};
