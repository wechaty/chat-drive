# chat-drive

## Google Drive API

### How to create a Service Account

(the following is taken from [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet) docs)

1. Go to the [Google Developers Console](https://console.developers.google.com/project)
2. Select your project or create a new one (and then select it)
3. Enable the Drive API for your project
    - In the sidebar on the left, expand **APIs & auth** > **APIs**
    - Search for "drive"
    - Click on "Drive API"
    - click the blue "Enable API" button
4. Create a service account for your project
    - In the sidebar on the left, expand **APIs & auth** > **Credentials**
    - Click blue "Add credentials" button
    - Select the "Service account" option
    - Select "Furnish a new private key" checkbox
    - Select the "JSON" key type option
    - Click blue "Create" button
    - your JSON key file is generated and downloaded to your machine (**it is the only copy!**)
    - note your service account's email address (also available in the JSON key file)
5. Share the doc (or docs) with your service account using the email noted above

### Links

1. [How to Use the Google Drive API with JavaScript](https://medium.com/@bretcameron/how-to-use-the-google-drive-api-with-javascript-57a6cc9e5262)
1. [Wrapper to simplify interaction with google drive apis](https://github.com/rainabba/node-cloudfs-drive)
1. [Node.js library to access Google Drive's API](https://github.com/niftylettuce/node-google-drive)

## Creators

Rui, Duan, Yuan, and Huan
