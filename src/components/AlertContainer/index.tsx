import React from 'react';
import {Alert, Fade} from '@mui/material';
import {iAlertContainer} from './interfaces';
import './index.css';

// Show any number of alerts, all in a column. Meant to be put at the top and descend over any content on the page, with each being removed after a period of seconds.
// There's no strategy for overflow here, so if more than a dozen or so alerts are added they'll flow off the bottom of the screen.
export function AlertContainer(props: iAlertContainer) {
  const alerts : React.ReactNode[] = [];
  props.alerts.forEach((alert, index) => {alerts.push(<Fade in={true} key={index}><Alert severity={alert.severity}>{alert.message}</Alert></Fade>)});
  return (
    <div className="alert-container">
      {alerts}
    </div>
  ) 
}
