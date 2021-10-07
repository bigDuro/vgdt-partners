import { generateInvoiceItems } from '../../../utils/generateInvoice'
import { getFormData } from  '../../CommonForm/Schemas/';

export const getLoadsActions = (table, history, services) => {
  const { save, filterRecords, driver, tableData, getByID, refresh, rows, setDriver } = services;
  const { brokers, equipment } = tableData;
  return {
      handleBrokerClick: (e, loadId, brokerId) => {
        e.preventDefault();
        if(brokerId !== 'addNew'){
          history.push(`brokers/${brokerId}`);

        }else {
          const data = getFormData('brokers');
          const record = data.formData;
          save('brokers', record).then(data => {
            const id = data.id;
            history.push(`brokers/${id}/add/${table}/${loadId}`);
          })
        }
      },
      handleChange: (e) => {
        e.preventDefault();
        filterRecords(e.target.value)
      },
      handleExport: false,
      handleCreateInvoice: (selected, isClicked) => {
        const billed = selected.map(id => {
          const load = rows && rows.length && rows.filter(l => l.id === id)[0];
          const broker = brokers && brokers.length && brokers.filter(b => b.id === load.broker)[0];
          if(broker && load && load.status === 'Completed' && load.broker !== 'addNew') {
              const invoiceItems = generateInvoiceItems(load, broker, equipment);
              if(invoiceItems.length) {
                invoiceItems.map(invoice => {
                  if (invoice) {
                    save('invoices', invoice).then(data => {
                      refresh()
                    });
                  }
                  return false
                })
                // update load status
                getByID(table, id).then(load => {
                  const updatedLoad = { ...load };
                  updatedLoad.status = "Billed";
                  save(table, updatedLoad).then(data => {
                    refresh()
                  });

                })
              }
            }
          return false
        })

        return !billed.includes(false)
      },
      handleStatus: (id, status) => {
        return new Promise((resolve, reject) => {
          const record = {
            id, status
          }
          save(table, record).then(data => {
            refresh()
          });
        })
      },
      filterByDriver: (driver) => {
        setDriver(driver)
        filterRecords(driver);
      },
      getDriver: () => driver,
      getDrivers: () => '',
      handleClear: () => {
        filterRecords('');
        setDriver('')
      }
    }
}
