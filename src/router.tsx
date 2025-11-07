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
import Cources from './pages/dashboard/Courses';
import Langs from './pages/dashboard/Langs';
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
                        path: 'cources',
                        Component: Cources,
                        loader: async () => {
                            return { courses: await Api.get('/courses/') };
                        },
                        action: async ({ request }) => {
                            const form = await request.formData();
                            const courceId = form.get("deleteCourse");
                            const addName = form.get("addName");
                            if (!courceId && !addName) {
                                return {
                                    error: true,
                                    error_text: 'Заполните поле'
                                };
                            }
                            if (courceId) {
                                await Api.delete(`/courses/${courceId}`);
                                return;
                            }
                            if (addName) {
                                await Api.post(`/courses/`, { name: addName });
                                return;
                            }
                        }
                    },
                    {
                        path: 'langs',
                        Component: Langs,
                        loader: async () => {
                            return { langs: await Api.get('/langs/') };
                        },
                        action: async ({ request }) => {
                            const form = await request.formData();
                            const langId = form.get("deleteLang");
                            const addName = form.get("addName");
                            if (!langId && !addName) {
                                return {
                                    error: true,
                                    error_text: 'Заполните поле'
                                };
                            }
                            if (langId) {
                                await Api.delete(`/langs/${langId}`);
                                return;
                            }
                            if (addName) {
                                await Api.post(`/langs/`, { name: addName });
                                return;
                            }

                        }
                    },
                    {
                        path: 'users',
                        Component: Users,
                        loader: async () => {
                            return { users: await Api.get('/users/') };
                        },
                        action: async ({ request }) => {
                            const userId = (await request.formData()).get("deleteUser");
                            Api.delete(`/users/${userId}`);
                        }
                    },
                    {
                        path: 'users/:userId/edit',
                        Component: EditUser,
                        loader: async ({ params }) => {
                            const userId = params.userId;
                            return {
                                user: await Api.get(`/users/${userId}`),
                                courses: await Api.get(`/courses/`),
                                langs: await Api.get(`/langs/`),
                                roles: await Api.get(`/roles/`),
                            };
                        },
                        action: async ({ request, params }) => {
                            const userId = params.userId;
                            const formData = await request.formData();
                            const login = formData.get('login');
                            const password = formData.get('password');
                            const first_name = formData.get('first_name');
                            const last_name = formData.get('last_name');
                            const role = Number(formData.get('role'));
                            const courses = formData.getAll('courses').map(Number);
                            const langs = formData.getAll('langs').map(Number);

                            if (!login || !password || !first_name
                                || !last_name || !role || !courses.length || !langs.length
                            ) {
                                return {
                                    error: true,
                                    error_text: 'Заполните пустые поля'
                                };
                            }

                            await Api.patch(`/users/${userId}`, {
                                first_name,
                                last_name,
                                login,
                                password,
                                role_id: role,
                            });
                            await Api.put(`/users/${userId}/langs`, { langs });
                            await Api.put(`/users/${userId}/courses`, { courses });
                            return redirect('/dashboard/users');
                        },
                    },
                    {
                        path: 'users/create',
                        Component: EditUser,
                        loader: async () => {
                            return {
                                courses: await Api.get(`/courses/`),
                                langs: await Api.get(`/langs/`),
                                roles: await Api.get(`/roles/`),
                            };
                        },
                        action: async ({ request }) => {
                            const formData = await request.formData();
                            const login = formData.get('login');
                            const password = formData.get('password');
                            const first_name = formData.get('first_name');
                            const last_name = formData.get('last_name');
                            const role = Number(formData.get('role'));
                            const courses = formData.getAll('courses').map(Number);
                            const langs = formData.getAll('langs').map(Number);

                            if (!login || !password || !first_name
                                || !last_name || !role || !courses.length || !langs.length
                            ) {
                                return {
                                    error: true,
                                    error_text: 'Заполните пустые поля'
                                };
                            }

                            const newUser = await Api.post('/users/', {
                                first_name,
                                last_name,
                                login,
                                password,
                                role_id: role,
                            });
                            await Api.put(`/users/${newUser[0]}/langs`, { langs });
                            await Api.put(`/users/${newUser[0]}/courses`, { courses });
                            return redirect('/dashboard/users');
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
                            const uid = context.get(userContext)?.uid;
                            return {
                                modules: await Api.get(`/users/${uid}/modules`),
                                userData: context.get(userContext)
                            };
                        },
                        action: async ({ request }) => {
                            const moduleId = (await request.formData()).get("deleteModule");
                            await Api.delete(`/modules/${moduleId}`);
                        }
                    },
                    {
                        path: 'modules/:moduleId',
                        Component: Themes,
                        loader: async ({ params, context }) => {
                            const moduleId = params.moduleId;
                            return {
                                themes: await Api.get(`/modules/${moduleId}/themes`),
                                userData: context.get(userContext)
                            };
                        },
                        action: async ({ request }) => {
                            const themeId = (await request.formData()).get("deleteTheme");
                            await Api.delete(`/themes/${themeId}`);
                        }
                    },
                    {
                        path: 'modules/:moduleId/edit',
                        Component: EditModule,
                        loader: async ({ params }) => {
                            const moduleId = params.moduleId;
                            return {
                                module: await Api.get(`/modules/${moduleId}`),
                                courses: await Api.get(`/courses/`),
                                langs: await Api.get(`/langs/`),
                            };
                        },
                        action: async ({ request, params }) => {
                            const moduleId = params.moduleId;
                            const formData = await request.formData();
                            const name = formData.get('name');
                            const lang = formData.get('lang');
                            const courses = formData.getAll('courses').map(Number);

                            if (!name || !lang || !courses.length) {
                                return {
                                    error: true,
                                    error_text: 'Заполните пустые поля'
                                };
                            }

                            await Api.patch(`/modules/${moduleId}`, { name, lang_id: lang });
                            await Api.put(`/modules/${moduleId}/courses`, { courses });
                            return redirect('/dashboard/modules');
                        },
                    },
                    {
                        path: 'modules/create',
                        Component: EditModule,
                        loader: async () => {
                            return {
                                courses: await Api.get(`/courses/`),
                                langs: await Api.get(`/langs/`),
                            };
                        },
                        action: async ({ request }) => {
                            const formData = await request.formData();
                            const name = formData.get('name');
                            const lang = formData.get('lang');
                            const courses = formData.getAll('courses').map(Number);

                            if (!name || !lang || !courses.length) {
                                return {
                                    error: true,
                                    error_text: 'Заполните пустые поля'
                                };
                            }

                            const [newModule] = await Api.post(`/modules/`, { name, lang_id: lang });
                            await Api.put(`/modules/${newModule}/courses`, { courses });
                            return redirect('/dashboard/modules');
                        },
                    },
                    {
                        path: 'themes/:themeId',
                        Component: Theme,
                        loader: async ({ params, context }) => {
                            const themeId = params.themeId;
                            const uid = context.get(userContext)?.uid;
                            return {
                                id: themeId,
                                userData: context.get(userContext),
                                exercises: await Api.get(`/themes/${themeId}/exercises`),
                                grade: await Api.get(`/users/${uid}/themes/${themeId}/grades`)
                            };
                        },
                        action: async ({ request }) => {
                            const exerciseId = (await request.formData()).get("deleteExercise");
                            await Api.delete(`/exercises/${exerciseId}`);
                        }
                    },
                    {
                        path: 'themes/:themeId/edit',
                        Component: EditTheme,
                        loader: async ({ params, context }) => {
                            const themeId = params.themeId;
                            const uid = context.get(userContext)?.uid;
                            return {
                                theme: await Api.get(`/themes/${themeId}`),
                                modules: await Api.get(`/users/${uid}/modules`)
                            };
                        },
                        action: async ({ request, params }) => {
                            const themeId = params.themeId;
                            const formData = await request.formData();
                            const name = formData.get('name');
                            const module_id = Number(formData.get('module'));
                            const res = await Api.patch(`/themes/${themeId}`, { name, module_id });
                            return redirect(`/dashboard/modules/${res[3]}`);
                        },
                    },
                    {
                        path: 'themes/create',
                        Component: EditTheme,
                        loader: async ({ context }) => {
                            const uid = context.get(userContext)?.uid;
                            return {
                                modules: await Api.get(`/users/${uid}/modules`)
                            };
                        },
                        action: async ({ request }) => {
                            const formData = await request.formData();
                            const name = formData.get('name');
                            const module_id = Number(formData.get('module'));
                            const res = await Api.post(`/modules/${module_id}/themes`, { name });
                            return redirect(`/dashboard/modules/${res[3]}`);
                        },
                    },
                    {
                        path: 'themes/:themeId/exercises/:exerciseId/edit',
                        Component: EditExercise,
                        loader: async ({ params }) => {
                            const exerciseId = params.exerciseId;
                            return {
                                exercise: await Api.get(`/exercises/${exerciseId}`),
                                exercise_types: await Api.get(`/exercises/types`)
                            };
                        },
                        action: async ({ request, params }) => {
                            const exerciseId = params.exerciseId;
                            const themeId = params.themeId;
                            const formData = await request.formData();
                            const title = formData.get('name');
                            const type_id = Number(formData.get('exercise_type'));
                            if (!title || !type_id) {
                                return {
                                    error: true,
                                    error_text: 'Заполните пустые поля'
                                };
                            }
                            let data = { title, type_id };
                            switch (type_id) {
                                case 1: {
                                    const success_answer = formData.get('success_answer');
                                    if (!success_answer) {
                                        return {
                                            error: true,
                                            error_text: 'Заполните пустые поля'
                                        };
                                    }
                                    data.success_answer = success_answer;
                                    break;
                                }
                                case 2: {
                                    const answers = formData.getAll('answers');
                                    const success_answer = formData.get('success_answer');
                                    if (!answers || !success_answer) {
                                        return {
                                            error: true,
                                            error_text: 'Заполните пустые поля'
                                        };
                                    }
                                    await Api.patch(`/exercises/${exerciseId}`, { answers });
                                    data.success_answer = success_answer;
                                    break;
                                }
                                case 3: {
                                    const file = formData.get('file');
                                    if (file && file.size > 0 && file instanceof File) {
                                        data.fileName = await Api.send_file(file);
                                    } else {
                                        return {
                                            error: true,
                                            error_text: 'Заполните пустые поля'
                                        };
                                    }
                                    break;
                                }
                                case 4: {
                                    const content = formData.get('content');
                                    if (!content) {
                                        return {
                                            error: true,
                                            error_text: 'Заполните пустые поля'
                                        };
                                    }
                                    data.content = [{ type: 'text', data: formData.get('content') }];
                                    break;
                                }
                            }
                            await Api.patch(`/exercises/${exerciseId}`, data);
                            return redirect(`/dashboard/themes/${themeId}`);
                        },
                    },
                    {
                        path: 'themes/:themeId/exercises/create',
                        Component: EditExercise,
                        loader: async () => {
                            return {
                                exercise_types: await Api.get(`/exercises/types`)
                            };
                        },
                        action: async ({ request, params }) => {
                            const themeId = params.themeId;
                            const formData = await request.formData();
                            const title = formData.get('name');
                            const type_id = Number(formData.get('exercise_type'));
                            if (!title || !type_id) {
                                return {
                                    error: true,
                                    error_text: 'Заполните пустые поля'
                                };
                            }
                            const [exerciseId] = await Api.post(`/themes/${themeId}/exercises`, { title, type_id });

                            async function error() {
                                await Api.delete(`/exercises/${exerciseId}`);
                                return {
                                    error: true,
                                    error_text: 'Заполните пустые поля'
                                };
                            }

                            let data = {};
                            switch (type_id) {
                                case 1: {
                                    const success_answer = formData.get('success_answer');
                                    if (!success_answer) {
                                        return error();
                                    }
                                    data.success_answer = success_answer;
                                    break;
                                }
                                case 2: {
                                    const answers = formData.getAll('answers');
                                    const success_answer = formData.get('success_answer');
                                    if (!answers || !success_answer) {
                                        return error();
                                    }
                                    await Api.patch(`/exercises/${exerciseId}`, { answers });
                                    data.success_answer = success_answer;
                                    break;
                                }
                                case 3: {
                                    const file = formData.get('file');
                                    if (file && file.size > 0 && file instanceof File) {
                                        data.fileName = await Api.send_file(file);
                                    } else {
                                        return error();
                                    }
                                    break;
                                }
                                case 4: {
                                    const content = formData.get('content');
                                    if (!content) {
                                        return error();
                                    }
                                    data.content = [{ type: 'text', data: formData.get('content') }];
                                    break;
                                }
                            }
                            await Api.patch(`/exercises/${exerciseId}`, data);
                            return redirect(`/dashboard/themes/${themeId}`);
                        },
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
