import { createBrowserRouter, redirect } from 'react-router';
import Api from './ApiClient';
import Auth from './layouts/Auth';
import Dashboard from './layouts/Dashboard';
import Error from './layouts/Error';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Main from './pages/dashboard/Main';


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
                children: [
                    {
                        index: true,
                        Component: Main,
                    },
                    {
                        path: 'users',
                        Component: Main,
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
    if (authData.expires_in < Date.now()) {
        Api.setHeader('Authorization', `Bearer ${authData.refresh_token}`);

        authData = await Api.post('/refresh');
        if (authData.access_token) {
            Api.setHeader('Authorization', `Bearer ${authData.access_token}`);
            localStorage.setItem('auth_data', JSON.stringify(authData));
            return redirect('/dashboard');
        }
    }

    Api.setHeader('Authorization', `Bearer ${authData.access_token}`);

    const checkRequest = await Api.get('/users/profile');
    return checkRequest.ok;
}

async function dashboardMiddleware() {
    if (await isLogin()) {
        console.log(1);

    } else {
        throw redirect('/auth');
    }

}

async function authMiddleware() {
    if (await isLogin()) throw redirect('/dashboard');
}

export default router;
