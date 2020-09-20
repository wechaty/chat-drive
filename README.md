# chat-drive

Chat Drive is a conversational storage solution that allows you to save files from the WeChat room and access them anytime by talking to our chatbot.

## The Motivation

Once upon a time...

## Features

1. Save all files in a WeChat room to GDrive
1. Search and get back the saved files by talking to the chatbot

## Usage

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
1. [Google Drive API: Files and folders overview](https://developers.google.com/drive/api/v3/about-files#file_organization)

## Contributors

[![Hall of Flame](https://sourcerer.io/fame/huan/wechaty/chat-drive/images/0)](https://sourcerer.io/fame/huan/wechaty/chat-drive/links/0)[![Hall of Flame](https://sourcerer.io/fame/huan/wechaty/chat-drive/images/1)](https://sourcerer.io/fame/huan/wechaty/chat-drive/links/1)[![Hall of Flame](https://sourcerer.io/fame/huan/wechaty/chat-drive/images/2)](https://sourcerer.io/fame/huan/wechaty/chat-drive/links/2)[![Hall of Flame](https://sourcerer.io/fame/huan/wechaty/chat-drive/images/3)](https://sourcerer.io/fame/huan/wechaty/chat-drive/links/3)[![Hall of Flame](https://sourcerer.io/fame/huan/wechaty/chat-drive/images/4)](https://sourcerer.io/fame/huan/wechaty/chat-drive/links/4)[![Hall of Flame](https://sourcerer.io/fame/huan/wechaty/chat-drive/images/5)](https://sourcerer.io/fame/huan/wechaty/chat-drive/links/5)[![Hall of Flame](https://sourcerer.io/fame/huan/wechaty/chat-drive/images/6)](https://sourcerer.io/fame/huan/wechaty/chat-drive/links/6)[![Hall of Flame](https://sourcerer.io/fame/huan/wechaty/chat-drive/images/7)](https://sourcerer.io/fame/huan/wechaty/chat-drive/links/7)

## Creators

Rui, Duan, Yuan, and Huan

## Copyright & License

- Code & Docs © 2020 Wechaty Contributors (<https://github.com/wechaty>)
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
