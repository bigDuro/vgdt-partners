const getInvoiceItemsWithIds = (ids, records) => {
  const idsToDelete = [];
  const invoiceId = [];
  console.log('ids, records:: ', ids, records);
  ids.map(id => {
    records.filter(record => {
      if(record.id === id) {
        invoiceId.push(record['*InvoiceNo'])
      }
    return record
    })
  return id
  })

  invoiceId.map(id => {
    records.map(record => {
      if(record['*InvoiceNo'] === id) {
        idsToDelete.push(record.id)
      }
      return record
    })
    return id
  })
  return idsToDelete;
}


export const getInvoiceActions = (table, history, services) => {
  console.log('table: ', table);
  const { save, get, exportRecordToCSV, tableData, deleteRecords, getByID, rows, filterRecords, mappedInvoiceNo } = services;
  return {
    handleClick: false,
    handleLoadClick: (e, id) => {
      e.preventDefault();
      history.push(`loads/${id}`);
    },
    handleBrokerClick: (e, id) => {
      e.preventDefault();
      history.push(`brokers/${id}`);
    },
    handleAdd: false,
    handleDelete: (ids) => {
      const idsToDelete = getInvoiceItemsWithIds(ids, rows);
      deleteRecords(table, idsToDelete)
    },
    handleExport: (ids) => {
      const recordsToExport = rows.filter(record => {
        return ids.includes(record.id);
      }).reverse()

      const invoiceNums = recordsToExport.map(rec => {
        return rec['*InvoiceNo']
      })

      const invoicesToExport = invoiceNums.map(num => {
        return mappedInvoiceNo[num]
      }).flat()

      exportRecordToCSV(table, invoicesToExport)
      ids.map(id => {
        const record = {
          id,
          billed: "1"
        };
        save(table, record).then( data => {
          // get(table, 1);
          return data
        })
      })
    }
  }
}
