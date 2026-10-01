import { pages } from '@kad-products/shed/rwsdk/server';
import { except, render, route } from 'rwsdk/router';
import { type DefaultAppContext, defineApp, type RequestInfo } from 'rwsdk/worker';
import AppDocument from '@/documents/app';
import Pages__about_us from '@/pages/about-us';
import Pages__explore_the_protocol from '@/pages/explore-the-protocol';
import Pages__one_moms_journey from '@/pages/one-moms-journey';
import Pages__root from '@/pages/root';
import Pages__the_test from '@/pages/the-test';
import Pages__not_found from './pages/not-found';

export default defineApp([
	render(AppDocument, [
		except<RequestInfo<DefaultAppContext>>(pages.handlePageError),
		route('/', Pages__root),
		route('/explore-the-protocol', Pages__explore_the_protocol),
		route('/one-moms-journey', Pages__one_moms_journey),
		route('/the-test', Pages__the_test),
		route('/about-us', Pages__about_us),
		route('*', Pages__not_found),
	]),
]);
