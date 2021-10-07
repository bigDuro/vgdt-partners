import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GroupByDateCard from '../../components/GroupByDateCard';
import LoadCard from '../../components/CardView/LoadCard';
import ListToolBar from '../../components/ListToolBar';
import { getActions } from './actions';
import { getUpdatedRows } from './rows';
import { getFormData } from  '../CommonForm/Schemas/';
import { get, getLoadsByKeyValue, getRecordsByIds, save, notifyDispatch } from '../../services';
import { filterRecords } from '../../utils/filterTables';
import { LOAD_STATUS } from '../../constants';
import './index.scss';




function PartnersBoard(props) {
  const { history, match } = props;
  const [tables, setTables] = useState({});
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [partnersId, setpartnersId] = useState('');
  const [partner, setpartners] = useState(match.params.partners);
  const loadId = match.params.id || '';
  const [searchTerm, setSearchTerm] = useState('');
  const actions = getActions(history, partner);
  const isMobile = useMediaQuery('(max-width:1023px)');
  const record = getFormData('loads');
  const steps = LOAD_STATUS.reduce((list, step) => {
    list.push(step.description);
    return list;
  }, []);

  const getData = (id, partners, units) => {
    units.map(unit => {
      getLoadsByKeyValue('tractor', unit.id).then(loads => {
        const brokerIds = loads.reverse().map(load => {
          return load.broker
        })
        console.log('loads: ', brokerIds);
        getRecordsByIds('brokers', brokerIds).then(brokers => {
          const tempData = {
            'partners': partners,
            'brokers': brokers.brokers,
            'loads': loads
          }
          setTables({...tables, ...tempData});
          setRows(getUpdatedRows('loads', tempData));
        });
      })
    })

  }
  // const data = searchTerm ? filteredRows : rows;

  React.useEffect(() => {
    const makeRequest = async () => {
      get('partners').then(partners => {
        const thePartners = partners.filter(data => {
          return `${data.firstname} ${data.lastname}` === partner
        })
        if(thePartners && thePartners.length){
          setpartnersId(thePartners[0].id);
          get('equipment', 'all').then(equipment => {
            const units = equipment.filter(unit => thePartners[0].id === unit.ownerId && unit.type === 'tractor');
            getData(thePartners[0].id, partners, units);
          })

        }
      });
    }
    makeRequest();
  }, []);


  actions.handleChange = (e) => {
    const term = e.currentTarget.value;
    setSearchTerm(term)
    setFilteredRows(filterRecords(rows, term));
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ListToolBar actions={actions} searchTerm={searchTerm}/>
        {rows && rows.length && searchTerm ?
          filteredRows.map((row, indx) => {
          return (
              <Grid item xs={12} key={indx} id={row.id}>
                <LoadCard key={indx} data={row} isMobile={isMobile} actions={actions} steps={steps}/>
              </Grid>
            )
          })
           : <GroupByDateCard partnersSelect={false} history={history} actions={actions} rows={rows} tables={tables} searchTerm={searchTerm}/> }
      </Grid>
    </Grid>
  )
}


export default PartnersBoard;
