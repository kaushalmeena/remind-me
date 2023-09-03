# Remind Me

A Netlify function for sending reminders in telegram

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Requirements

To install and run this project you need:

- [Node.js](https://nodejs.org/ "Node.js")
- [git](https://git-scm.com/downloads "git") (only to clone this repository)

### Installation

To set up everything in your local machine, you need to follow these steps:

1. Clone this repo and then change the directory to the `remind-me` folder:

```bash
$ git clone https://github.com/kaushalmeena/remind-me.git
$ cd remind-me
```

2. Install project dependencies using npm:

```bash
$ npm install
```

3. Create a `.env` file from `.env.example`

```bash
$ cp .env.example .env
```

4. Get a Telegram bot token

    * **Open Telegram:** If you don't have the Telegram app, download it from your app store and create an account if you don't have one already.
    * **Start a Chat with BotFather:** 
        * Open Telegram and search for "BotFather" or use this link to start a chat: [BotFather on Telegram](https://t.me/BotFather).
        * Click on the BotFather profile, and then click "Start" to initiate a conversation.
    * **Create a New Bot:**
        * Send the command `/newbot` to the BotFather.
        * You will be prompted to choose a name for your bot. Choose a unique name for your bot.
        * After that, you'll need to choose a username for your bot. This username must end with the word "bot" and be unique.
    * **Receive Your Token:**
        * Once you've successfully chosen a name and username, the BotFather will provide you with a bot token.
        * The token will look something like this: `1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg`.
    * **Save Your Token:** Set `TELEGRAM_BOT_TOKEN` in `.env` file with generated token

5. Get a Telegram chat ID

    * **Start a Chat with Your Bot:**
        * Make sure your bot is a member of the chat you want to obtain the chat ID from.
        * Start a conversation with your bot in the chat. You can simply send a "hello" or any other message to your bot.
    * **Use the Telegram API:**
        * You can use the Telegram API to retrieve the chat ID. You'll need to make a request to the `getUpdates` method of the Telegram Bot API.
        * In browsers's address bar paste this URL `https://api.telegram.org/bot{BOT_TOKEN}/getUpdates` after replacing `{BOT_TOKEN}` with your token
        * The chat ID can be found in the `id` field of the `chat` object of response,
    * **Save your Chat ID:** Set `TELEGRAM_CHAT_ID` in `.env` file with received chat id

6. Login to your Netlify account, and follow the instructions
```bash
$ npx netlify login
```    

7. Set Netlify environment variables
```bash
$ npx netlify env:import .env
```    

### Usage

1. Create an `events.json` file in the root of the `remind-me` folder and add events in it in this format:
```json
[
  {
    "name": "<EVENT_NAME>",
    "date": "<EVENT_DATE_IN_ISO_FORMAT>"
  }
  ...
]
```    
or can use this [tool](https://myapp-remind-me.netlify.app/) for creating events file.


2. Deploy project
```bash
$ npm run deploy
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.