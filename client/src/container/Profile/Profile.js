import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../../component/header/Header';
import { AppContext } from '../../component/provider/Provider';
import Loading from '../../component/loading/loadingPage';
import axios from 'axios';

export const ProfilePage = () => {
    const { userData } = useContext(AppContext);
    const [data, setData] = useState([]);
    console.log(userData);
    useEffect(() => {
        const getData = async () => {
            if (userData) {
                try {
                    const res = await axios.post('/listFavoriteUniv', { email: userData[0].email });
                    setData(res.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getData();
    }, [userData])
    return (
        <>
            <Header />
            <div>Your Favorites University : </div>
            <table>
                <thead>
                    <tr>
                        <th>University</th>
                        <th>Country</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((data, i) => (
                        <tr key={i}>
                            <td data-header="University">{data.name}</td>
                            <td data-header="Country">{data.country}</td>
                            <td data-header="Website">{data.website}</td>
                        </tr>
                    ))
                    }
                </tbody>

            </table>

        </>
    )
}