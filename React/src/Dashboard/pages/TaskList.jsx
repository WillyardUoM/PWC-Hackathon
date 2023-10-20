import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './Style/App.css'
import { ProgressBar } from 'primereact/progressbar';

function TaskList({ apiResponse }) {
    const activityBodyTemplate = (apiResponse) => {
        return <ProgressBar value={apiResponse.learningroadmap.progress} showValue={false} style={{ height: '6px' }}></ProgressBar>;
    };

    const activityFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        );
    };

    return (
        <div className="card">
            <DataTable value={apiResponse.learningroadmap} tableStyle={{ minWidth: '50rem' }}>
                <Column field="phase" header="Phase" sortable style={{ width: '10%' }}></Column>
                <Column field="course" header="Course"  style={{ width: '50%' }}></Column>
                <Column field="progress" header="Progress" sortable style={{ width: '25%' }}></Column>

            </DataTable>
        </div>
    );
}

export default TaskList;