
export const getCommonActions = (history, driver) => {

  return {
      handleClick: (id) => {
        history.push(`/vgdt-dispatch/name/${driver}/loads/${id}`);
      },
      handleBack: (id) => {
        history.back();
      },
      handleAdd: false,
      handleRefresh: false,
      handleDelete: false,
      handleExport: false,
      getDriver: () => driver,
      handleUpload: (id) => {
        history.push(`./assets/loads/${id}`);
      }
    }
}
