import React, { useEffect } from "react";
import mainAxios from '../axios';
import Vacation from '../vacation'
import './listStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { setVacations } from '../../redux/actions'

export default function VactionList() {
    const dispatch = useDispatch();
    const vacationsData = useSelector((state: any) => state.vacations)

    useEffect(() => {
        mainAxios.get("/vacations").then(res => {
            dispatch(setVacations(res.data.result))
        })
            .catch(err => {
                alert("error")
            })
    }, [])

    const vacations = vacationsData.map((vacation: any) => {
        return (
            <div className='card'>
                <Vacation vacation={vacation} />
            </div>
        );
    });
    return (
        <div className="cards">
            {vacations}
        </div>
    )
}