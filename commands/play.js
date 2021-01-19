const ytdl = require('ytdl-core');
const yts = require( 'yt-search' );
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'play a youtube song by url',
    args: true,
    usage: '<url | search>',
    guildOnly: true,
    aliases: ['p'],
    async execute(message, args) {
        if(message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const wURL = args[0].indexOf('watch?v=');
            const mobileURL = args[0].indexOf('.be/');
            const videoId = args[0].slice(wURL + 8) || args[0].slice(mobileURL + 4);

            const video = args[0].startsWith('http')? await yts({videoId}) : (await yts(args.join(' '))).videos[0];

            connection.play(ytdl(video.url, { filter: 'audioonly' }))

            message.channel.send(
                new MessageEmbed()
                .setColor('#00FF7F')
                .setAuthor(video.title + ` (${video.timestamp})`, 'https://bit.ly/35RNueA', video.url)
                .setImage(video.thumbnail)
                .setFooter(`author: ${video.author.name}`)
            )
        } else {
            message.reply('Please enter a voice channel first!')
        }
    }
}