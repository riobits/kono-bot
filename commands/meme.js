const axios = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'get a random memes from reddit',
    cooldown: 5,
    execute(message, args) {
        axios('https://meme-api.herokuapp.com/gimme')
        .then(res => {
            const data = res.data.preview;
            message.channel.send(new MessageAttachment(data[data.length - 1]))
        })
    }
}