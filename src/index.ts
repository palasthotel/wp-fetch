export {setAxios, getAxios, wpFetchGet} from './sources/base'
export {wpFetchPosts, wpFetchPostsBySlug, wpFetchPostById} from './sources/posts';
export {wpFetchRevisions, wpFetchRevision} from './sources/revisions';
export {wpFetchTerms, wpFetchTerm} from './sources/terms';
export {wpFetchUsers, wpFetchUser} from './sources/users';
export {buildHierarchy, postsAsHierarchy, termsAsHierarchy} from './transformers';
export * from './@types';
export * from './type-guard';