module.exports = {
    name: 'stop',
    description: 'stop the song',
    guildOnly: true,
    aliases: ['s'],
    async execute(message, args) {
        if(message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();

            if(connection.dispatcher) {
                connection.dispatcher.destroy();
            } else {
                message.reply('there is no songs are playing!')
            }
        } else {
            message.reply('Please enter a voice channel first!')
        }
    }
}