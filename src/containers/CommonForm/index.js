import React from 'react';
import Form from '@rjsf/material-ui';
import { Button, useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AssetManager from '../../containers/AssetManager/';
import { paperStyles } from '../../styles/paper';
import { getSchemaType } from  './Schemas/';
import { getActions } from './actions/'
import { formatData } from '../../utils/formatData';
import { get, getByID, save } from '../../services/';
import './index.scss';



function CommonForm(props) {
  const classes = paperStyles();
  const { history, match } = props;
  const table = match.params.table;
  const recordId = match.params.id
  const updateTable = match.params.updateTable
  const recordIdToUpdate = match.params.recordIdToUpdate;
  const [dispatch, setDispatch] = React.useState(match.params.dispatch);
  const [record, setRecord] = React.useState({})
  const [disabled, setdisabled] = React.useState(false);
  const [schema, setSchema] = React.useState({});
  const services = { get, getByID, save };
  const actions = getActions(services, table, history, dispatch);
  const formData = formatData(table, record);
  const isMobile = useMediaQuery('(max-width:1023px)');
  const handleLockToggle = (e) => {
    e.preventDefault();
    setdisabled(!disabled);
  }

  const handleBack = (e) => {
    e.preventDefault();
    history.goBack()
  }

  const handleSave = (formData) => {
    actions.handleSave(formData, updateTable, recordIdToUpdate);
  }

  React.useEffect(() => {
    const makeRequest = async () => {
      getByID(table, recordId).then(data => {
        setRecord(data);
      });
      if(table === 'loads') {
        Promise.all([
          get('brokers', 'all'),
          get('employees', 'all'),
          get('equipment', 'all')
        ]).then(data => {
          setSchema(getSchemaType(table, {
            brokers: data[0],
            employees: data[1],
            equipment: data[2]
          }))

        })
      } else if(table === 'equipment') {
        Promise.all([
          get('partners', 'all'),
        ]).then(data => {
          setSchema(getSchemaType(table, {
            partners: data[0]
          }))

        })
      } else {
        setSchema(getSchemaType(table, false))
      }


    }
    makeRequest();
  }, []);
  console.log('schema:: ', schema);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div className="common_Form">
              <div className="common_Form_Toolbar">
                {actions && actions.hasToggle ?
                  <Button color="primary" onClick={handleLockToggle}>
                    {disabled ?
                      <LockIcon/> :
                      <LockOpenIcon/>
                    }
                  </Button> :
                ''}
                <Button color="primary" onClick={handleBack}>
                  <ArrowBackIcon/>
                </Button>
              </div>
              {record.id && schema.JSONSchema ? <Form
                schema={schema.JSONSchema}
                uiSchema={schema.UISchema}
                formData={formData}
                onSubmit={(data) => handleSave(data.formData)}
                disabled={disabled}
                onChange={(data) => actions.handleChange(data.formData)}>
              </Form> : 'No Form Data'}
            </div>
          </Paper>

        </Grid>
        {
          recordId ?
            <Grid item xs={12}>
              <Paper variant="outlined" >
                 <AssetManager {...props} isMobile={isMobile}/>
              </Paper>
            </Grid> : ''
        }
    </Grid>
  )
}

export default CommonForm;
