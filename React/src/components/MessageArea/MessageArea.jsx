import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';

export default function MessageArea(props) {
    const toast = useRef(null);
    const messages = props.messages.map(({ message }) => {
            toast.current.show({ severity: 'info', summary: 'Info', detail: message });
    });
    return (<Toast ref={toast} />);
}

MessageArea.defaultProps = {
    messages: [],
};