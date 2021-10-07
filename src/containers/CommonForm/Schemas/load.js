import { getTodayAndTommorrowDates } from '../../../utils/adjustDates';
import { LOAD_STATUS } from '../../../constants/';
const { today, tomorrow } = getTodayAndTommorrowDates();

// const

const statusOptions = LOAD_STATUS.reduce((opt, item) => {
  opt.enum.push(item.type)
  opt.enumNames.push(item.label)
  return opt;
}, {
  enum: [],
  enumNames: []
})



export const LoadJSONSchema = {
  "title": "Load Details",
  "description": "",
  "type": "object",
  "required": [
    "type",
    "status",
    "pickupDate",
    "dropoffDate",
    "pickupLocation",
    "dropoffLocation",
    "loadedMiles",
    "deadHead",
    "rate",
    "user",
    "driver",
    "broker",
    "tractor",
    "loadNumber"
    // "trailer"
  ],
  "properties": {
    "user": {
      "title": "Dispatch",
      "type": "string",
      "enum": [],
      "enumNames": [],
      "default": ""
    },
    "status": {
      "title": "Status",
      "type": "string",
      "enum": [...statusOptions.enum],
      "enumNames": [...statusOptions.enumNames],
      "default": "Planning"
    },
    "type": {
      "title": "Type",
      "type": "string",
      "enum": [
        "PO",
        "Van",
        "Reefer"
      ],
      "enumNames": [
        "PO",
        "Van",
        "Reefer"
      ],
      "default": "Van"
    },
    "broker": {
      "title": "Broker",
      "type": "string",
      "enum": ["addNew"],
      "enumNames": ["Add New"],
      "default": ""
    },
    "pickupLocation": {
      "type": "string",
      "title": "Origin",
      "description": "Pickup Location",
      "default": ""
    },
    "pickupDate": {
      "title": "Pickup",
      "type": "string",
      "format": "date-time",
      "default": ""
    },
    "dropoffLocation": {
      "type": "string",
      "title": "Destination",
      "default": ""
    },
    "dropoffDate": {
      "title": "Dropoff",
      "type": "string",
      "format": "date-time",
      "default": ""
    },
    "deadHead": {
      "title": "DeadHead",
      "type": "number",
      "default": 0
    },
    "loadedMiles": {
      "title": "Loaded Miles",
      "type": "number",
      "default": 0
    },
    "rate": {
      "title": "Rate",
      "type": "number",
      "default": 0
    },
    "weight": {
      "title": "Weight",
      "type": "number",
      "default": ""
    },
    "cargo": {
      "title": "Cargo",
      "type": "string",
      "default": ""
    },
    "driver": {
      "title": "Driver",
      "type": "string",
      "enum": [""],
      "enumNames": [""],
      "default": ""
    },
    "tractor": {
      "title": "Tractor",
      "type": "string",
      "enum": [""],
      "enumNames": [""],
      "default": ""
    },
    "trailer": {
      "title": "Trailer",
      "type": "string",
      "enum": ["none"],
      "enumNames": ["None"],
      "default": "none"
    },
    "detentionPay": {
      "title": "Detention hrs",
      "type": "number",
      "default": 0
    },
    "layoverPay": {
      "title": "Layover days",
      "type": "number",
      "default": 0
    },
    "breakdownPay": {
      "title": "Breakdown Days",
      "type": "number",
      "default": 0
    },
    "additionPay": {
      "title": "Additional Pay",
      "type": "number",
      "default": 0
    },
    "lumper": {
      "title": "Lumper Fee",
      "type": "number",
      "default": 0
    },
    "reimbursement": {
      "title": "Reimbursement",
      "type": "number",
      "default": 0
    },
    "loadNumber": {
      "title": "Load#",
      "type": "string",
      "default": ""
    },
    "pickUpNumber": {
      "title": "Pickup #",
      "type": "string",
      "default": ""
    },
    "bolNumber": {
      "title": "BOL #",
      "type": "string",
      "default": ""
    },
    "orderNumber": {
      "title": "Order #",
      "type": "string",
      "default": ""
    },
    "notes": {
      "title": "Notes",
      "type": "string",
      "default": ""
    },
    "tonu": {
      "type": "boolean",
      "title": "TONU",
      "default": "false"
    }
  }
}

export const LoadFormData = {
  "user": "select",
  "status": "Planning",
  "type": "Van",
  "broker": "addNew",
  "pickupLocation": "",
  "pickupDate": today,
  "dropoffLocation": "",
  "dropoffDate": tomorrow,
  "deadHead": 0,
  "loadedMiles": 0,
  "rate": 0,
  "weight": 0,
  "cargo": "",
  "driver": "",
  "tractor": "",
  "trailer": "none",
  "detentionPay": 0,
  "layoverPay": 0,
  "lumper": 0,
  "loadNumber": "",
  "notes": "",
  "tonu": 0,
  "ratecon": 0,
  "additionPay": 0,
  "breakdownPay": 0
};

export const LoadUISchema = {}
