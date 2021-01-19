const { MessageAttachment } = require("discord.js")

module.exports = {
    name: 'avatar',
    description: 'get user profile picture',
    usage: '<optional: mention(s)>',
    execute(message, args) {
        if(args[0]) {
            const images = [];
            message.mentions.users.map(user => {
                return images.push(new MessageAttachment(user.avatarURL()))
            });
            message.channel.send(images);
        } else {
            message.channel.send(new MessageAttachment(message.author.avatarURL()));
        }
    }
}