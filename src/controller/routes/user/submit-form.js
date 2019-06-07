const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '855673551:AAEyaktCKUHxom_O2tJzShC603UQsdZkFW8';
const bot = new TelegramBot(token, {polling: true});

const submitForm = async (request, response) => {
    const { 
        name = 'default name',
        mail = 'default descr',
        feedback = '',
        country = '',
    } = request.body;
    // Create a bot that uses 'polling' to fetch new updates
    const dataChat = await bot.getChat('@clev1n');
    const id = dataChat.id + '';
    console.log("id:", id.replace('-', ''))
    console.log('my channel id:', dataChat);
    bot.sendMessage(id, `
        name: ${name}
        mail: ${mail}
        feedback: ${feedback}
        country: ${country}
    `);

}

module.exports = submitForm;