import axios from "axios";
import { SERVER_BASE } from "../consts";

class UserApi
{

    async Reg(login, password, role)
    {
        let result;
        await axios.post(`${SERVER_BASE}/api/user/reg`, {
            login,
            password,
            roleName: role ?? "USER"
        })
        .then(res => {
            if (res.data.token != null)
            {
                localStorage.setItem("token", res.data.token);
            }
            window.location.href = '/';
        })
        .catch(error => {
            result = error.response?.data?.error ?? 'Ошибка сервера'
        })
        return result;
    }

    async Login(login, password)
    {
        let result ;
        try
        {

        await axios.post(`${SERVER_BASE}/api/user/login`, {
            login,
            password
        })
        .then(res => {
            if (res.data.token != null)
            {
                localStorage.setItem('token', res.data.token)
                window.location.href = '/'
            }
        })
        .catch(error => {
            result = error.response.data.error ?? 'Ошибка сервера'
        })
        }
        catch(error)
        {
            console.log(error)
        }

        return result;
    }

    async Authentication()
    {
        let result = null;
        try
        {
            if (localStorage.getItem('token') == null)
                return null;
            
            await axios.get(`${SERVER_BASE}/api/user/authentication`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                if (res.data?.login != null && res.data?.role != null)
                    result = {
                        login: res.data.login,
                        role: res.data.role
                    }
            })
            .catch(res => {

            });
        }
        catch(error)
        {
            console.log(error)
        }

        return result;
    }

    async getUserList(page, count)
    {
        try
        {
            let result = null;
            await axios.get(`${SERVER_BASE}/api/user/getusers?page=${page}&count=${count}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                result = res.data;
            })
            .catch(error => {})

            return result;
        }
        catch(error)
        {

        }
    }

    async addVisit()
    {
        try
        {
            await axios.post(`${SERVER_BASE}/api/user/addvisit`, null, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
        }
        catch (error) {}
    }

    async getCountPages(count)
    {
        try
        {
            let result = 0;
            await axios.get(`${SERVER_BASE}/api/user/getcountusers`, {
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                if (res.data.count)
                    result = res.data.count
            })
            .catch(error => {})

            return result / count;
        }
        catch(error)
        {
            return 0;
        }
    }

}

export default new UserApi()