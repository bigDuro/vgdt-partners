export const getInvoiceRowData = (rows, tables) => {
  const formatProductServices = (records) => {
    const services = records.map(record => {
      return record.ProductService
    });
    return services.join(', ');
  }
  const newRows = [];
  const mappedInvoiceNo = [...rows].reduce((map, row) => {
    map[row['*InvoiceNo']] = map[row['*InvoiceNo']] ? [...map[row['*InvoiceNo']], row] : [row];
    return map
  },{});

  Object.keys(mappedInvoiceNo).map(id => {
    const productServices = formatProductServices(mappedInvoiceNo[id].reverse());
    const mergedRow = {
      ...mappedInvoiceNo[id][0],
      ProductService: productServices
    }
    newRows.push(mergedRow)
    return mergedRow
  })

  const updateRowData = newRows.map(row => {
    const newRow = {...row};
    // newRow.edit = editButton(row.id);
    newRow.ServiceDate = new Date(row.ServiceDate).toLocaleString();
    newRow['*DueDate'] = new Date(row['*DueDate']).toLocaleString();
    newRow.loadId = row['*InvoiceNo'].split('-')[0]; // get load id
    newRow.billed = row.billed === "0" ? false : true;

    return newRow;
  });

  console.log('mappedInvoiceNo:: ', mappedInvoiceNo);
  updateRowData.mappedInvoiceNo = {...mappedInvoiceNo};
  return updateRowData;
}
