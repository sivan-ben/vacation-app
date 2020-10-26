import React, { useEffect } from "react";
import mainAxios from '../axios';
import AdminCard from '../adminCard'
import './admin.css';
import { useDispatch, useSelector } from 'react-redux'
import { setVacations } from '../../redux/actions';


export default function AdminComponent(props: any) {
    const dispatch = useDispatch();
    const vacationsData = useSelector((state: any) => state.vacations)

    useEffect(() => {
        mainAxios.get("/admin").then(res => {
            dispatch(setVacations(res.data.result))     
        })
            .catch(err => {
                props.history.push('/login')
            })
    }, [])

    const vacations = vacationsData.map((vacation: any) => {
        return (
            <div className="card" >
                <AdminCard vacation={vacation} />
            </div>
        );
    });
    return (<div>
        <div className="cards">
            {vacations}
        </div>
    </div>
    )
}