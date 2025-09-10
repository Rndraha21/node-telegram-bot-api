 ## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1.  **Clone the repository or set up your project folder.**

2.  **Navigate into your project directory:**
    ```bash
    cd your-folder-name
    ```

3.  **Initialize a new Node.js project:**
    ```bash
    npm init -y
    ```

4.  **Install the required dependencies:**
    ```bash
    npm install node-telegram-bot-api dotenv nodemon
    ```

5.  **Create your main file**, for example `main.js`.

6.  **Create a `.env` file** in the root of your project to store your environment variables:
    ```
    TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
    ```
    *Replace `YOUR_TELEGRAM_BOT_TOKEN_HERE` with your actual token from BotFather.*

7.  **Update your `package.json`** to include a `start` or `dev` script.
    ```json
    "scripts": {
      "dev": "nodemon main.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

## Usage

Run the bot with the following command. The `nodemon` script will automatically restart the bot when you make changes to the file.

```bash
npm run dev
```
