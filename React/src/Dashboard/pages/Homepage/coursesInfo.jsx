import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../Style/App.css'

function DetailsCourse({ apiResponse2 }) {


    return (
        <div className="card">
            <DataTable value={apiResponse2.phases} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Stage" sortable style={{ width: '10%' }} ></Column>

            </DataTable>
        </div>
    );
}

export default DetailsCourse;