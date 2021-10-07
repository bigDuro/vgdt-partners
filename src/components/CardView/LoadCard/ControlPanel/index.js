import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { LOAD_STATUS } from '../../../../constants'

function ControlPanel(props) {
  const { row, actions  } = props;
  const { id, status, broker } = row;
  const { handleClick, handleStatus, handleCreateInvoice, handleUpload } = actions;
  const disabledStatus = ['Completed', 'Planning', 'Billed']
  const indexOfCurrentStatusFromList = LOAD_STATUS.findIndex(x => x.label === status);
  const updatedLabel = LOAD_STATUS[indexOfCurrentStatusFromList+1] ? LOAD_STATUS[indexOfCurrentStatusFromList+1].label : '';
  const statusMessage = LOAD_STATUS[indexOfCurrentStatusFromList+1] ? LOAD_STATUS[indexOfCurrentStatusFromList+1].description : '';

  return (
    <React.Fragment>
    <Grid container spacing={1}>
      <Grid item>
        {handleClick ? <Button color="primary" size="small" variant="contained" onClick={() => handleClick(id)}>Details</Button> : ''}
      </Grid>
      <Grid item>
        <Button color="primary" size="small" variant="contained" onClick={() => handleUpload(id)}>Docs</Button>
      </Grid>
      <Grid item>
        {disabledStatus.includes(status) ? '' :
          <Button color="primary" size="small" variant="outlined" onClick={() => handleStatus(id, updatedLabel)}>{statusMessage}</Button>
        }
      </Grid>
    </Grid>


    </React.Fragment>
  )
}

export default ControlPanel;
