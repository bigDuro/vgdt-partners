import { getAssets } from '../../../services/';


export const WebHooksJSONSchema = (assets) => {
  return {
    "title": "Webhook Details",
    "description": "",
    "type": "object",
    "required": ["url", "icon", "logo", "type", "channel", "active", "status"],
    "properties": {
      "type": {
        "title": "Webhook Type",
        "type": "string",
        "enum": [
          "discord", "whatsapp"
        ],
        "enumNames": [
          "Discord", "WhatsApp"
        ],
        "default": "discord"
      },
      "url": {
        "type": "string",
        "title": "Webhook Url",
        "default": ""
      },
      "channel": {
        "type": "string",
        "title": "Channel",
        "default": ""
      },
      "active": {
        "type": "boolean",
        "title": "Active",
        "default": "true"
      },
      "status": {
        "title": "Status",
        "type": "string",
        "enum": [
          "wip", "stage", "prod"
        ],
        "enumNames": [
          "WIP", "Staging", "Production"
        ],
        "default": "wip"
      },
      "icon": {
        "type": "string",
        "title": "Icon Image",
        "type": "string",
        "enum": [...assets],
        "enumNames": [...assets],
        "default": ""
      },
      "logo": {
        "type": "string",
        "title": "Logo Image",
        "type": "string",
        "enum": [...assets],
        "enumNames": [...assets],
        "default": ""
      }
    }
  }
}

export const WebHooksFormData = {
  "url": "",
  "icon": "",
  "logo": "",
  "type": "",
  "appUrl": "",
  "channel": "",
  "active": true,
  "status": ""
};

export const WebHooksUISchema = {}
