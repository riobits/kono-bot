const { MessageEmbed } = require("discord.js");
const { prefix, botname } = require("../config");

module.exports = {
    name: 'help',
    description: 'list of all available commands',
    async execute(message, args) {
        
        const { commands } = message.client;

        if(args[0]) {
            if(commands.has(args[0])) {
                const command = commands.get(args[0]);
                if(command.usage) message.reply(
                    `${prefix}${command.name}: ${command.description}\nusage: \`${prefix}${command.name} ${command.usage}\``
                );
                else if(command.description) message.reply(
                    `${prefix}${command.name}: ${command.description}`
                );
            } else {
                message.reply(
                    `please enter a valid command! to see all the commands: \`${prefix}${this.name}\``)
            }
        } else {
            const list = [];
            commands.map(command => {
                if(command.name === 'help') return;

                let data = ``;
            
                if(command.description) {
                    data += command.description
                }
                if(command.aliases) {
                    data += `\naliases: ${command.aliases.map(alias => `\`${alias}\``)}`
                }
                if(command.usage) {
                    data +=`\nusage:\n \`${prefix}${command.name} ${command.usage}\``
                }
                list.push({ name: command.name, value: data })
            })

            message.author.send(
                new MessageEmbed()
                .setColor('#00FF7F')
                .setTitle('Help Command')
                .setAuthor(botname, 'https://bit.ly/2LKENMj')
                .setDescription(this.description)
                .addField('\u200B', '\u200B')
                .addFields(list)
                .addField('\u200B', '\u200B')
                .setThumbnail('https://bit.ly/39LNspJ')
                .setFooter('Thanks for using me!', 'https://bit.ly/2LKENMj')
            )
            .then(() => {
                if (message.channel.type === 'dm') return;
		        message.reply('I\'ve sent you a DM with all my commands!');
            }).catch(() => {
		        message.reply('it seems like I can\'t DM you! Do you have DMs disabled?')
            });
        }
    }
}