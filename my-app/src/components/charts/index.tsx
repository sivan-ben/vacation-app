import React from 'react';
import { useSelector } from 'react-redux'
import { HorizontalBar } from 'react-chartjs-2';


export default function ChartAdmin() {
    const vacations = useSelector((state: any) => state.vacations)

    const data = {
        labels: vacations.map((vacation: any) => vacation.destination),
        datasets: [
            {
                label: 'followers',
                backgroundColor: '#757ce8',
                borderColor: '#002884',
                borderWidth: 1,
                hoverBackgroundColor: '#002884',
                data: vacations.map((vacation: any) => vacation.followers)
            }
        ]
    };

    return (
        <div >
            <h1>vacations chart</h1>
            <div className="chartVacation">
                <HorizontalBar data={data} />
            </div>
        </div>

    )

}