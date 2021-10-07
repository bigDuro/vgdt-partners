export const getEquipmentRowData = (rows, tables) => {
  return rows.map(row => {
    const newRow = {...row};

    if(tables.partners && tables.partners.length) {
      tables.partners.map(partner => {
        if (partner.id === row.ownerId) {
          newRow.partner = partner.company
        }
        return partner
      })
    }

    newRow.description = `${row.year} ${row.make} ${row.model} | ${row.sub_type}`;
    return newRow;
  })
}
