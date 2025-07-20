const { Module } = require('../main');
const config = require('../config');
const axios = require('axios');

const isPrivateBot = config.MODE !== 'public';

// Owner command for Raganork-MD style
Module({
    pattern: 'owner',
    fromMe: isPrivateBot,
    desc: 'Bot Owner',
    type: 'user'
}, async (message, match) => {
    try {
        const name = 'BL DRAGON';
        const title = 'DRAGON-D';
        const number = '916235141427';
        const body = 'edit';
        const image = "https://i.ibb.co/PZdr7GK6/temp.jpg";
        const thumbnailUrl = 'https://gist.github.com/';

        // Thumbnail as buffer if supported, else null
        let thumbnailBuffer = null;
        try {
            const imgRes = await axios.get(image, { responseType: 'arraybuffer' });
            thumbnailBuffer = Buffer.from(imgRes.data, 'binary');
        } catch (e) {}

        // vCard format
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;type=CELL;type=VOICE;waid=${number}:${number}
END:VCARD`;

        await message.client.sendMessage(message.jid, {
            contacts: {
                contacts: [{ vcard }]
            },
            contextInfo: { 
                externalAdReply: {
                    title: title,
                    body: body,
                    thumbnailUrl: thumbnailUrl,
                    mediaUrl: thumbnailUrl,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: false,
                    thumbnail: thumbnailBuffer
                }
            }
        });
    } catch (error) {
        console.error('Error occurred:', error);
        await message.client.sendMessage(message.jid, { text: 'Error occurred while executing the command.' });
    }
});
