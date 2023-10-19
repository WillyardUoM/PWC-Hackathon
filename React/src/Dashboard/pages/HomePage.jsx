
import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './Style/App.css'
const HomePage = () => {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
  
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 300});
    }
  
    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 300});
    }
    return (
  <div className="main">
    
  <div className="sec1">
    <div className="part1">
      <div className="header">
        <h3>Your Result</h3>
        <Toast ref={toast} />
              <ConfirmDialog className='confirmDialog' visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" 
                  header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
              <div className="card flex justify-content-center">
                  <Button className='btn'  icon="pi pi-check" onClick={() => setVisible(true)} label="Confirm" />
              </div>
       </div>
      <div className="boxes">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
  
      </div>
    </div>
    <div className="part2"></div>
  </div>
  <div className="sec2">
  <div className="part1">
    
    </div>
    <div className="part2"></div>
  </div>
  
  </div>
    )
  }

export default HomePage;
