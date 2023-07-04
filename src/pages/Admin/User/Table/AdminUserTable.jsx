import React from "react";
import Sidebar from "../../../../components/Admin/Sidebar/Sidebar";

import userApi from '../../../../api/UserApi'
import { useState } from "react";
import { Table, Pagination } from "react-bootstrap";

const AdminUserTable = (props) => {

    const [userList, setUserList] = useState([]);
    const [countPages, setCountPages] = useState(-1);
    const countItemInPage = 5;

    const queryParams = new URLSearchParams(window.location.search);
    const currentPage = Number(queryParams.get('page') ?? 1);

    if (userList.length <= 0) {
        userApi.getUserList(currentPage, countItemInPage)
            .then(res => setUserList(res))
    }

    if (countPages < 0) {
        userApi.getCountPages(countItemInPage)
            .then(res => {
                setCountPages(Math.ceil(res));
            })
            .catch(error => { })
    }

    let active = currentPage;
    const [paginationItems, setPaginationItems] = useState([]);

    if (paginationItems.length <= 0 && countPages >= 0) {
        let items = [];
        for (let number = 1; number <= countPages; number++) {
            items.push(<Pagination.Item key={number} active={number === active} href={window.location.pathname + `?page=${number}`}>
                {number}
            </Pagination.Item>
            );
        }
        setPaginationItems([...paginationItems, items])
    }



    return (
        <div className="container-fluid">
            <div className="row">

                <Sidebar/>

                <main className="ms-sm-auto col-xxl-10 col-lg-9 col-12 px-md-4">
                    <h2 className="border-bottom py-3">Таблица пользователей</h2>
                    <div className="small overflow-x-auto">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Логин</th>
                                    <th>Email</th>
                                    <th>Роль</th>
                                    <th>Количество посещений</th>
                                    <th>Дата регистрации</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userList.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.login}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>{item.countVisits}</td>
                                            <td>{item.createDate}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                    <Pagination className="mt-5 mb-2">{paginationItems}</Pagination>
                </main>

            </div>
        </div>
    )
}

export default AdminUserTable