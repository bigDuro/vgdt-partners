import { notifyDispatch, save } from '../../../services/';
export const getCommonActions = (services, table, history, dispatch) => {
  return {
    handleSave: (record) => {
        save(table, record).then(data => {

          if(table === 'loads'){
            const updatedRecord = {...record}
            updatedRecord.pickupDate = new Date(record.pickupDate).toLocaleString();
            updatedRecord.dropoffDate = new Date(record.dropoffDate).toLocaleString();
            updatedRecord.driverName = dispatch;
            notifyDispatch(updatedRecord);
          }
          history.goBack();
        })
    },
    handleChange: (data) => {
    },
    handleBack: () => {
      history.goBack();
    }
  }
}
