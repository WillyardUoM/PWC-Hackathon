import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './Style/App.css'

function TaskList({ apiResponse }) {


    return (
        <div className="card">
            <DataTable value={apiResponse.learningroadmap} tableStyle={{ minWidth: '50rem' }}>
                <Column field="phase" header="Phase" sortable style={{ width: '10%' }} ></Column>
                <Column field="course" header="Course"  style={{ width: '50%' }}></Column>
                <Column field="progress" header="Progress" sortable style={{ width: '25%' }}></Column>

            </DataTable>
        </div>
    );
}

export default TaskList;