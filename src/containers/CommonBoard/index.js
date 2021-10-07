import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import TocIcon from '@material-ui/icons/Toc';
import ListView from '../../components/ListView';
import CardView from '../../components/CardView';
import InfiniteScroll from "react-infinite-scroll-component";
import GroupByDateCard from '../../components/GroupByDateCard';
import { getUpdatedRows } from './rows';
import { getColumnType } from './columns';
import { paperStylesTable } from '../../styles/paper';
import { getActions } from './actions';
import { get, getByID, save, deleteById, getAssets, exportToCSV, getRecordsByIds } from '../../services/';
import './index.scss';


function CommonBoard(props) {
  const classes = paperStylesTable();
  const { history, match } = props;
  const [showGrid, setShowGrid] = useState(true);
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [mappedInvoiceNo, setMappedInvoiceNo] = React.useState({});
  const [driver, setDriver] = React.useState('');
  const [tableData, setTableData] = React.useState({});
  const [searchTerm, setSearchTerm ] = React.useState('');
  const [filteredRecords, setFilteredRecords] = React.useState([]);

  const table = match.params.table;
  const columnData = getColumnType(table);
  const showCard = useMediaQuery('(max-width:1023px)');

  const fetchMoreData = () => {
    // const pageNum = page !== 'all' ? page + 1 : 1;
    if(page !== 1) {
      get(table, page).then(data => {
        if(data.length) {
          setRows([...rows, ...data]);
          getRequiredData([...rows, ...data]);
        }
      })
      setPage(page + 1)
    }


  };

  const filterRecords = (searchTerm) => {
    const fields = Object.keys(rows[0]);
    const filteredRecords = [];
    const cacheIDs = [];
    if(fields.length) {
      fields.map(field => {
        return rows.filter(record => {
          if(!cacheIDs.includes(record.id) && record[field] && record[field].length && (record[field].toLowerCase().includes(searchTerm.toLowerCase()))) {
            cacheIDs.push(record.id)
            filteredRecords.push(record)
          }
          return true
        });
      })
      setFilteredRecords(filteredRecords)
      setSearchTerm(searchTerm)
    }
  }

  const deleteRecords = (table, ids) => {
    ids.map(id => {
      deleteById(table, id);
      return false
    })
    refresh()

  }
  const exportRecordToCSV = (table, records) => {
    const exportRecordToCSVPromise = new Promise((resolve, reject) => {
      exportToCSV(table, records).then(data => {
        refresh()
      })
    })

    return exportRecordToCSVPromise
  }
  const getRequiredData = (data) => {
    if(table === 'loads'){
      const brokerIds = data.map(load => load.broker);
      const employeeIds = [...data.map(load => load.driver), ...data.map(load => load.user)];
      const equipmentIds = [...data.map(load => load.tractor), ...data.map(load => load.trailer)];
      Promise.all([
        getRecordsByIds('brokers', brokerIds),
        getRecordsByIds('employees', employeeIds),
        getRecordsByIds('equipment', equipmentIds)
      ]).then(data_sub => {
        const tables = {
          brokers: data_sub[0],
          employees: data_sub[1],
          equipment: data_sub[2]
        };
        const updatedRows = getUpdatedRows(table, tables, data);
        setTableData({...tableData, ...tables});
        setRows([...updatedRows]);
      })
    }
    // get invoices dependencies
    else if(table === 'invoices'){
      const brokerIds = data.map(invoice => invoice.brokerid);
      getRecordsByIds('brokers', brokerIds).then(data_sub => {
        const tables = {
          brokers: data_sub
        };
        const updatedRows = getUpdatedRows(table, tables, data);
        if(updatedRows.mappedInvoiceNo) {
          console.log('mappedInvoiceNo:: ', updatedRows.mappedInvoiceNo);
          setMappedInvoiceNo(updatedRows.mappedInvoiceNo)
        }
        setTableData({...tableData, ...tables});
        setRows([...updatedRows]);
      })
    }
    else if(table === 'equipment'){
      const partnerIds = data.map(eqmt => eqmt.ownerId);
      getRecordsByIds('partners', partnerIds).then(data_sub => {
        const tables = {
          partners: data_sub
        };
        const updatedRows = getUpdatedRows(table, tables, data);
        setTableData({...tableData, ...tables});
        setRows([...updatedRows]);
      })
    }
    else {
      const updatedRows = getUpdatedRows(table, {}, data)
      setRows([...updatedRows]);
    }
  }
  const refresh = () => {
    get(table, 1).then(data => {
      if(data.length){
        getRequiredData(data);
        setPage(2)
      }
    });
  }
  const services = { filterRecords, get, getByID, save, deleteRecords, getAssets, exportRecordToCSV, tableData, driver, setDriver, rows, refresh, mappedInvoiceNo }
  const actions = getActions(table, history, services);
  const data = searchTerm.length ?  filteredRecords : rows;
  const getListView = (rows, actions, searchTerm) => {
    return (
      <Paper className={classes.paper}>
        <ListView history={history} actions={actions} rows={rows} columns={columnData} order_by="name" searchTerm={searchTerm}/>
      </Paper>
    )
  }

  const getCardView = ( rows, table, tables, actions, searchTerm ) => {
    return (
      <React.Fragment>
      {(table === 'loads' && searchTerm === '') || ( table === 'loads' && driver !== '') ? <GroupByDateCard driverSelect={true} history={history} actions={actions} rows={rows} tables={tables} columns={columnData} table={table} searchTerm={searchTerm}/> :
      <CardView history={history} actions={actions} rows={rows} columns={columnData} table={table} searchTerm={searchTerm}/>}
      </React.Fragment>
    )
  }

  const handleLayout = () => {
    setShowGrid(!showGrid)
  }

  React.useEffect(() => {
    setPage(1)
    setRows([]);
    setSearchTerm('')
    setDriver('')
    refresh()
  }, [table])

  return (

    <Grid container spacing={3}>
      <div className="viewOptions">
          <IconButton onClick={handleLayout}>
            {!showCard ? !showGrid ? <AppsIcon/> : <TocIcon/> : ''}
          </IconButton>
      </div>
      <Grid item xs={12}>
          {showCard || (!showCard && showGrid) ?
            <InfiniteScroll
              dataLength={data.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
            {getCardView(data, table, tableData, actions, searchTerm)}
            </InfiniteScroll> :
            <InfiniteScroll
              dataLength={data.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
            {getListView(data, actions, searchTerm)}
            </InfiniteScroll>
          }
      </Grid>
    </Grid>

  )
}


export default CommonBoard;
