require('dotenv').config();
const { Client, IntentsBitField, ButtonStyle, ActionRowBuilder, ButtonBuilder} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '1237743682329907321',
        label: 'Membre'
    },
    {
        id: '1237743918536196188',
        label: 'Valorant'
    }
]

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1237764893252386876');
        if(!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({
            content: 'Choisir ou retirer un rôle :',
            components: [row],
        });
        process.exit();

    } catch (error) {
        console.log(error);
    }
});



client.login(process.env.TOKEN);