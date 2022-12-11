const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const mongoose = require("mongoose");
const testSchema = require("../../test-schema.js");

module.exports = {
    name: "setinfo", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Development", //the command category for helpcmd [OPTIONAL]
    aliases: ["setdevinfo"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "setinfo <rank (no spaces)> <description of what u do>", //the command usage for helpcmd [OPTIONAL]
    description: "Set Developer information", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: ["1051431287077998603"], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 1, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "Missing Args", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "Too many words", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
        const target = message.author;
        const rank2 = args[0];
        const description2 = args.slice(1).join(" ");
        const test = await testSchema.findOne({ id: message.author.id });
        if (test === null || test === undefined) {
            setTimeout(async () => {
                await new testSchema({
                    id: message.author.id,
                    rank: rank2,
                    description: description2,
                }).save();
            }, 1000);
            message.delete();
            const set = new MessageEmbed()
                .setTitle(`Developer Information Set`)
                .setDescription("Developer information has been set")
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon);
            message.channel.send(set);

        } else {
            message.delete();
            test.rank = rank2;
            test.description = description2;
            await test.save();
            const reset = new MessageEmbed()
                .setTitle(`Developer Information Set`)
                .setDescription("Developer information has been set")
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon);
            message.channel.send(reset);

        }
    }
}

        