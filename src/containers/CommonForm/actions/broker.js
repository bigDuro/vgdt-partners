

export const getBrokerActions = (services, table, history) => {
  const { save, getByID, get } = services;
  return {
    handleSave: (record, updateTable, recordIdToUpdate) => {
      return new Promise((resolve, reject) => {
        save(table, record).then( data => {
          if(updateTable && recordIdToUpdate && data.id) {
            getByID(updateTable, recordIdToUpdate).then(load => {
              const updatedLoad = { ...load };
              updatedLoad.broker = data.id;
              save(updateTable, updatedLoad).then(data => {
                get(updateTable, 1).then(response => {
                  history.goBack();
                  resolve(data);
                })
              })
            }).catch(e => {
              reject(e);
            })
          }else {
            history.goBack();
            resolve(data);
          }
        })
      })

    }
  }
}
