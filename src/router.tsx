import { createBrowserRouter, redirect } from 'react-router';
import { createContext } from "react-router";
import Api from './ApiClient';
import Auth from './layouts/Auth';
import Dashboard from './layouts/Dashboard';
import Error from './layouts/Error';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Main from './pages/dashboard/Main';
import Profile from './pages/dashboard/Profile';
import Modules from './pages/dashboard/Modules';
import Users from './pages/dashboard/Users';
import Themes from './pages/dashboard/Themes';
import Theme from './pages/dashboard/Theme';
import EditExercise from './pages/dashboard/edit/EditExercise';
import EditModule from './pages/dashboard/edit/EditModule';
import EditTheme from './pages/dashboard/edit/EditTheme';
import EditUser from './pages/dashboard/edit/EditUser';


const userContext = createContext(null);

const router = createBrowserRouter([
    {
        path: '*',
        Component: Error,
    },
    {
        path: '/',
        middleware: [dashboardMiddleware],
        children: [
            {
                path: 'dashboard',
                Component: Dashboard,
                loader: async ({ context }) => ({ userData: context.get(userContext) }),
                children: [
                    {
                        index: true,
                        Component: Main,
                    },
                    {
                        path: 'users',
                        Component: Users,
                        loader: async () => {
                            return { users: await Api.get('/users/') };
                        },
                    },
                    {
                        path: 'users/:userId/edit',
                        Component: EditUser,
                        loader: async ({ params }) => {
                            const userId = params.userId;
                            return { users: await Api.get(`/users/${userId}`) };
                        },
                    },
                    {
                        path: 'profile',
                        Component: Profile,
                        loader: async () => {
                            return { profile: await Api.get('/users/profile') };
                        },
                    },
                    {
                        path: 'modules',
                        Component: Modules,
                        loader: async ({ context }) => {
                            console.log(context);

                            const uid = context.get(userContext)?.uid;
                            return { modules: await Api.get(`/users/${uid}/modules`) };
                        },
                    },
                    {
                        path: 'modules/:moduleId',
                        Component: Themes,
                        loader: async ({ params }) => {
                            const moduleId = params.moduleId;
                            return { themes: await Api.get(`/modules/${moduleId}/themes`) };
                        }
                    },
                    {
                        path: 'modules/:moduleId/edit',
                        Component: EditModule,
                        loader: async ({ params }) => {
                            const moduleId = params.moduleId;
                            return { module: await Api.get(`/modules/${moduleId}`) };
                        }
                    },
                    {
                        path: 'themes/:themeId',
                        Component: Theme,
                        loader: async ({ params, context }) => {
                            const themeId = params.themeId;
                            const uid = context.get(userContext)?.uid;
                            return {
                                id: themeId,
                                uid: uid,
                                exercises: await Api.get(`/themes/${themeId}/exercises`),
                                grade: await Api.get(`/users/${uid}/themes/${themeId}/grades`)
                            };
                        }
                    },
                    {
                        path: 'themes/:themeId/edit',
                        Component: EditTheme,
                        loader: async ({ params }) => {
                            const themeId = params.themeId;
                            return {
                                theme: await Api.get(`/themes/${themeId}`)
                            };
                        }
                    },
                    {
                        path: 'exercises/:exerciseId/edit',
                        Component: EditExercise,
                        loader: async ({ params }) => {
                            const exerciseId = params.exerciseId;
                            return {
                                exercise: await Api.get(`/exercises/${exerciseId}`)
                            };
                        }
                    },
                ],
            },
        ],
    },
    {
        path: '/auth',
        Component: Auth,
        middleware: [authMiddleware],
        children: [
            {
                index: true,
                Component: Login,
                action: async ({ request }) => {
                    const formData = await request.formData();
                    const loginRes = await Api.post('/login', {
                        login: formData.get('login'),
                        password: formData.get('password')
                    });

                    if (loginRes.access_token) {
                        Api.setHeader('Authorization', `Bearer ${loginRes.access_token}`);
                        localStorage.setItem('auth_data', JSON.stringify(loginRes));
                        return redirect('/dashboard');
                    }

                    return {
                        error: loginRes.code ?? true,
                        error_text: 'Пользователь не найден'
                    };
                },
            },
            {
                path: 'register',
                Component: Register,
                action: async ({ request }) => {
                    const formData = await request.formData();
                    const password = formData.get('password');
                    const repeat_password = formData.get('repeat_password');

                    if (repeat_password !== password) {
                        return {
                            error: true,
                            error_text: 'Пароли не совпадают'
                        };
                    }

                    for (const [, value] of formData) {
                        if (!value) {
                            return {
                                error: true,
                                error_text: 'Поля не заполнены'
                            };
                        }
                    }

                    const refisterData = {
                        first_name: formData.get('first_name'),
                        last_name: formData.get('last_name'),
                        login: formData.get('login'),
                        password
                    };

                    const registerRes = await Api.post('/register', refisterData);

                    if (registerRes.access_token) {
                        Api.setHeader('Authorization', `Bearer ${registerRes.access_token}`);
                        localStorage.setItem('auth_data', JSON.stringify(registerRes));
                        return redirect('/dashboard');
                    }

                    return {
                        error: registerRes.code ?? true,
                        error_text: 'Ошибка регистрации'
                    };
                }
            },
        ],
    },
]);

async function isLogin() {
    let authData = JSON.parse(localStorage.getItem('auth_data') ?? '{}');

    if (!authData.access_token) return false;

    /**
     * Обновление токена по истечению времени
     */
    if (authData.expires_in < (Date.now() / 1000)) {
        Api.setHeader('Authorization', `Bearer ${authData.refresh_token}`);

        authData = await Api.post('/refresh');
        if (authData.access_token) {
            Api.setHeader('Authorization', `Bearer ${authData.access_token}`);
            localStorage.setItem('auth_data', JSON.stringify(authData));
            return redirect('/dashboard');
        }
    }

    Api.setHeader('Authorization', `Bearer ${authData.access_token}`);

    try {
        const checkRequest = await Api.get('/users/profile');
        if (checkRequest.error || checkRequest.msg) return false;

        localStorage.setItem('user_data', JSON.stringify({ 'uid': checkRequest[0], 'urid': checkRequest[6] }));
        return true;

    } catch {
        return false;
    }
}

async function dashboardMiddleware({ context }) {
    if (!(await isLogin())) throw redirect('/auth');

    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    userData.isAdmin = userData?.urid === 3;
    userData.isTeacher = userData?.urid === 2;
    userData.isStudent = userData?.urid === 1;
    context.set(userContext, userData);
}

async function authMiddleware() {
    if (await isLogin()) throw redirect('/dashboard');
}

export default router;
