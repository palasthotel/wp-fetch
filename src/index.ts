export {setAxios, getAxios, wpFetchGet} from './sources/base'
export {wpFetchPosts, wpFetchPostsBySlug, wpFetchPostById} from './sources/posts';
export {wpFetchTerms, wpFetchTerm} from './sources/terms';
export {wpFetchMenus, wpFetchMenu} from './sources/menus';
export {buildHierarchy, postsAsHierarchy, termsAsHierarchy, menuAsHierarchy} from './transformers';
export * from './@types';