// malalog.js
const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Malalog.js - An enhanced and flexible logging library with multiple destinations.
 * 
 * Created by: Nishmal Vadakara
 */

/**
 * Initializes the Malalog logger.
 * @param {Object} options - Configuration options.
 * @param {string} [options.telegramBotToken] - Telegram Bot Token.
 * @param {string} [options.telegramChatId] - Telegram Chat ID.
 * @param {string} [options.filePath] - Path to the log file.
 * @param {boolean} [options.enableConsole=true] - Enable or disable console logging.
 * @returns {Object} - An object containing logging functions.
 */
function Malalog(options = {}) {
  const {
    telegramBotToken,
    telegramChatId,
    filePath,
    enableConsole = true,
  } = options;

  const isTelegramEnabled = telegramBotToken && telegramChatId;
  const isFileLoggingEnabled = filePath;

  if (isTelegramEnabled) {
    console.log(chalk.green('✅ Telegram logging is enabled.'));
  } else {
    console.log(chalk.yellow('⚠️  Telegram logging is disabled.'));
  }

  if (isFileLoggingEnabled) {
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Initialize log file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
    }

    console.log(chalk.green(`✅ File logging is enabled. Logs will be written to ${filePath}`));
  } else {
    console.log(chalk.yellow('⚠️  File logging is disabled.'));
  }

  /**
   * Sends a message to the specified Telegram chat using the Telegram Bot API.
   * @param {string} message - The message to send.
   */
  const sendToTelegram = async (message) => {
    if (!isTelegramEnabled) return;

    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: telegramChatId,
        text: message,
        parse_mode: 'Markdown', // Optional: Enables Markdown formatting
      });
    } catch (error) {
      console.error(chalk.red(`❌ Failed to send message to Telegram: ${error.message}`));
    }
  };

  /**
   * Logs a message to a file.
   * @param {string} message - The message to log.
   */
  const logToFile = (message) => {
    if (!isFileLoggingEnabled) return;

    fs.appendFile(filePath, `${message}\n`, (err) => {
      if (err) {
        console.error(chalk.red(`❌ Failed to write to log file: ${err.message}`));
      }
    });
  };

  // Define Malayalam color names with corresponding chalk colors
  const colorMap = {
    m: chalk.yellow,    // Manja (Yellow)
    p: chalk.green,     // Pacha (Green)
    c: chalk.red,       // Chuvappu (Red)
    n: chalk.blue,      // Neela (Blue)
    manja:chalk.yellow,
    pacha:chalk.green,
    chuvapp:chalk.red,
    neela:chalk.blue
  };

  /**
   * Helper function to process messages based on invocation style.
   * Supports both tagged template literals and regular function calls.
   * @param {string|Array} strings - Either a string or an array of strings from a tagged template literal.
   * @param {Array} values - Interpolated values from a tagged template literal.
   * @returns {string} - The processed message.
   */
  const processMessage = (strings, values) => {
    if (typeof strings === 'string') {
      // Called as m("message")
      return strings;
    } else {
      // Called as m`message`
      return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
    }
  };

  /**
   * Creates a logging function for a given color key.
   * @param {string} colorKey - The key corresponding to the color in colorMap.
   * @returns {Function} - The logging function.
   */
  const createLoggerFunction = (colorKey) => {
    return async (strings, ...values) => {
      const message = processMessage(strings, values);
      const timestamp = new Date().toISOString();
      const formattedMessage = `[${timestamp}] ${message}`;

      // Log to console with color
      if (enableConsole) {
        console.log(colorMap[colorKey](formattedMessage));
      }

      // Send log to Telegram
      if (isTelegramEnabled) {
        await sendToTelegram(formattedMessage);
      }

      // Log to file
      if (isFileLoggingEnabled) {
        logToFile(formattedMessage);
      }
    };
  };

  // Dynamically create logging functions
  const loggers = {};
  Object.keys(colorMap).forEach((key) => {
    loggers[key] = createLoggerFunction(key);
  });

  // Define aliases for better readability
  loggers.log = loggers.m;      // Alias 'log' to 'm' (Manja)
  loggers.info = loggers.p;     // Alias 'info' to 'p' (Pacha)
  loggers.error = loggers.c;    // Alias 'error' to 'c' (Chuvappu)
  loggers.debug = loggers.n;    // Alias 'debug' to 'n' (Neela)

  return loggers;
}

module.exports = Malalog;
