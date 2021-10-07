import { getFormData } from  '../../CommonForm/Schemas/';

export const getCommonActions = (table, history, services) => {
  const { filterRecords, deleteRecords, get, save } = services;
  const data = getFormData(table);
  const record = data.formData;

  return {
      handleClick: (id) => {
        history.push(`${table}/${id}`);
        return true
      },
      handleChange: (e) => {
        e.preventDefault();
        filterRecords(e.target.value)
      },
      handleAdd: () => {
        save(table, record).then(data => {
          const id = data.id;
          history.push(`${table}/${id}`);
        })
      },
      handleRefresh: (tbl) => {
        get(table, 1)
      },
      handleDelete: (ids) => {
        deleteRecords(table, ids)
      },
      handleClear: () => {
        filterRecords('');
      },
      handleUpload: (id) => {
        history.push(`assets/${table}/${id}`);
      }
    }
}
