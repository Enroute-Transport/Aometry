const { CommandInteraction, MessageEmbed } = require('discord.js');
const guildConfig = require('../../schemas/guildConfig');

module.exports = {
    name: "set-welcome",
    description: "Set your Welcome Channel",
    permission: "ADMINISTRATOR",
    options: [{
        name: 'channel',
        description: 'Set a channel',
        type: 'SUB_COMMAND',
        options: [{
            name: 'channel',
            description: 'Set a channel',
            type: 'CHANNEL',
            required: true,
        }]
    }, {
        name: 'message',
        description: 'Set your welcome message',
        type: 'SUB_COMMAND',
        options: [{
            name: 'message',
            description: 'Set your welcome message',
            type: 'STRING',
            required: true,
        }]
    }, ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Guild} guild
     */
    async execute(interaction, guild) {
        const Sub = interaction.options.getSubcommand(['channel', 'message'])

        if (Sub === 'channel') {
            const welcChannel = interaction.options.getChannel('channel');
            guildConfig.findOne({
                guildId: interaction.guildId,
            }, async(err, data) => {
                if (err) console.log(err);
                if (!data) {
                    data = new guildConfig({
                        guildId: interaction.guildId,
                        guildName: interaction.guildName,
                        welcomeData: [{
                            welcomeChannel: welcChannel.id,
                            welcomeMessage: welcMessage,
                        }]
                    });
                }
                data.save();
            });
            interaction.reply({ embeds: [new MessageEmbed().setDescription(`Channel set to: ${welcChannel}`)] })
        } else if (Sub === 'message') {
            const welcMessage = interaction.options.getString('message');
            guildConfig.findOne({
                    guildId: interaction.guildId,
                    welcomeMessage: welcMessage,
                }, async(err, data) => {
                    if (err) console.log(err);
                    if (!data) {
                        data = new guildConfig({
                            guildId: interaction.guildId,
                            guildName: interaction.guildName,
                            welcomeMessage: welcMessage,
                        })
                    }
                    data.save();
                }

            );
            interaction.reply({ embeds: [new MessageEmbed().setDescription(`Message set to: ${welcMessage}`)] })
        }
    }
}