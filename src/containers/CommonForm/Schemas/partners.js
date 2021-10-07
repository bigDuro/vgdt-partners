export const PartnersJSONSchema = {
  "title": "Partner Details",
  "description": "",
  "type": "object",
  "required": ["firstname", "lastname", "username", "password"],
  "properties": {
    "firstname": {
      "type": "string",
      "title": "First Name",
      "default": ""
    },
    "lastname": {
      "type": "string",
      "title": "Last Name",
      "default": ""
    },
    "username": {
      "type": "string",
      "title": "User Name",
      "default": ""
    },
    "password": {
      "type": "string",
      "title": "Password",
      "default": ""
    },
    "email": {
      "type": "string",
      "title": "Email",
      "default": ""
    },
    "company": {
      "type": "string",
      "title": "Company",
      "default": ""
    },
    "status": {
      "title": "Status",
      "type": "string",
      "enum": [
        "active",
        "deactivated"
      ],
      "enumNames": [
        "Active",
        "Deactivated"
      ],
      "default": "active"
    }
  }
}

export const PartnersFormData = {
  "username": "",
    "firstname": "",
    "lastname": "",
    "email": "",
    "password": "",
    "company": "",
    "create_datetime": "",
    "last_login": "",
    "active": "",
    "status": "active",
    "bio": "Roundhouse kicking asses since 1940"
};

export const PartnersUISchema = {
  "password": {
    "ui:widget": "password"
  }
}
