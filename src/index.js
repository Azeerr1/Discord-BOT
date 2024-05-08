require('dotenv').config();
const { Client, IntentsBitField} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} est en ligne.`);
});

client.on('interactionCreate', async (interaction) => {
   try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role){
        interaction.editReply({
            content: "Je ne trouve pas ce rôle",
        });
        return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole){
        await interaction.member.roles.remove(role);
        await interaction.editReply(`Le role ${role} a été retiré.`);
        return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`Le role ${role} a été ajouté.`);
   } catch (error) {
    console.log(error);
   }
});

client.login(process.env.TOKEN);