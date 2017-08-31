import index from './pages/index/index.vue';
import search from './pages/search/search.vue';
import addDiscipline from './pages/addDiscipline/addDiscipline.vue';
import addSuccess from './pages/addSuccess/addSuccess.vue';
import disciplineDetail from './pages/disciplineDetail/disciplineDetail.vue';

export default {
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/search',
            component: search
        },
        {
            path: '/addDiscipline',
            component: addDiscipline
        },
        {
            path: '/addSuccess',
            component: addSuccess
        },
        {
            path: '/disciplineDetail',
            component: disciplineDetail
        },
    ]
};