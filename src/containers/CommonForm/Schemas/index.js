import { LoadJSONSchema, LoadUISchema, LoadFormData } from './load';
import { BrokerJSONSchema, BrokerUISchema, BrokerFormData } from './broker';
import { DispatchJSONSchema, DispatchUISchema, DispatchFormData } from './dispatch';
import { EquipmentJSONSchema, EquipmentUISchema, EquipmentFormData } from './equipment';
import { DriverJSONSchema, DriverUISchema, DriverFormData } from './driver';
import { UsersJSONSchema, UsersUISchema, UsersFormData } from './users';
import { PartnersJSONSchema, PartnersUISchema, PartnersFormData } from './partners';
// import { WebHooksJSONSchema, WebHooksUISchema, WebHooksFormData } from './webHooks';
import { addValues } from '../../../utils/addItemsToSchema';


export const getSchemaType = (type, tables) => {
  const types = {
    loads: () => { return { JSONSchema: addValues(LoadJSONSchema, tables, type), UISchema: LoadUISchema}},
    brokers: () => { return { JSONSchema: BrokerJSONSchema, UISchema: BrokerUISchema}},
    dispatch: () => { return { JSONSchema: DispatchJSONSchema, UISchema: DispatchUISchema}},
    equipment: () => { return { JSONSchema: addValues(EquipmentJSONSchema, tables, type), UISchema: EquipmentUISchema}},
    tractor: () => { return { JSONSchema: addValues(EquipmentJSONSchema, tables, type), UISchema: EquipmentUISchema}},
    trailer: () => { return { JSONSchema: addValues(EquipmentJSONSchema, tables, type), UISchema: EquipmentUISchema}},
    driver: () => { return { JSONSchema: DriverJSONSchema, UISchema: DriverUISchema}},
    employees: () => { return { JSONSchema: DriverJSONSchema, UISchema: DriverUISchema}},
    users: () => { return { JSONSchema: UsersJSONSchema, UISchema: UsersUISchema}},
    partners: () => { return { JSONSchema: PartnersJSONSchema, UISchema: PartnersUISchema}},
    // webhooks: { JSONSchema: WebHooksJSONSchema(assets), UISchema: WebHooksUISchema},
  }
  return types[type] ? types[type]() : [];
}


export const getFormData = (type) => {
  const types = {
    loads: () => { return { formData: LoadFormData }},
    brokers: () => { return { formData: BrokerFormData }},
    dispatch: () => { return { formData: DispatchFormData }},
    equipment: () => { return { formData: EquipmentFormData }},
    tractor: () => { return { formData: EquipmentFormData }},
    trailer: () => { return { formData: EquipmentFormData }},
    driver: () => { return { formData: DriverFormData }},
    employees: () => { return { formData: DriverFormData }},
    users: () => { return { formData: UsersFormData }},
    partners: () => { return { formData: PartnersFormData }},
    // webhooks: { formData: WebHooksFormData },
  }
  return types[type] ? types[type]() : [];
}
