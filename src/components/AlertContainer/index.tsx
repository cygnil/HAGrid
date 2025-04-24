import React from 'react';
import {Alert, Fade} from '@mui/material';
import {iAlertContainer} from './interfaces';
import './index.css';

export function AlertContainer(props: iAlertContainer) {
  const alerts : React.ReactNode[] = [];
  props.alerts.forEach((alert, index) => {alerts.push(<Fade in={true} key={index}><Alert severity={alert.severity}>{alert.message}</Alert></Fade>)});
  return (
    <div className="alert-container">
      {alerts}
    </div>
  ) 
}
