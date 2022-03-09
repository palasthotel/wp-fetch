import {wpFetchPosts, wpFetchPostById,wpFetchPostsBySlug} from './sources/posts.js';
import {wpFetchTerms, wpFetchTerm} from './sources/terms.js';
import {wpFetchMenus, wpFetchMenu} from './sources/menus.js';
import postsAsHierarchy from './transformers/posts-as-hierarchy.js';
import termsAsHierarchy from './transformers/terms-as-hierarchy.js';
import menuAsHierarchy from './transformers/menu-as-hierarchy.js';

export {
    wpFetchPosts,
    wpFetchPostById,
    wpFetchPostsBySlug,
    wpFetchTerms,
    wpFetchTerm,
    wpFetchMenus,
    wpFetchMenu,
    postsAsHierarchy,
    termsAsHierarchy,
    menuAsHierarchy,
}