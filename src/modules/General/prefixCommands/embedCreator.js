const { MessageActionRow, MessageEmbed, MessageButton, MessageSelectMenu } = require("discord.js")
const component = MessageActionRow;
const embed = MessageEmbed;
const button = MessageButton;
const menu = MessageSelectMenu;


module.exports = {
  name: "embed",
  permission: ["MANAGE_MESSAGES"],
  description: "Create embed using command",
  usage: "<#channel>",
  async execute (message, args, commandName, client) {         
   let channel = message.mentions.channels.first();
      if(!channel) return message.reply("Please provide a **valid** channel to send the embed")
    
   let conf = false;
      
  let but = new component().addComponents(
  new button()
   .setStyle("SUCCESS")
   .setLabel("Create")
   .setEmoji("✅")
   .setCustomId("embc"),
   new button()
   .setStyle("DANGER")
   .setLabel("Cancel")
   .setEmoji("🗑")
   .setCustomId("embd")
  )  
   
  let result = new embed()
  .setColor("#2F3136");
      
  let opt = new component().addComponents(
  new menu()
   .setCustomId("embedder")
   .setPlaceholder("Select an option")
   .addOptions([
       {
      label: "Title",
      description: "Set a title for the embed",
      value: "etitle"
       },
       {
      label: "Description",
      description: "Set a description for the embed",
      value: "edesc"
       },
       {
       label: "Color",
       description: "Set a color for the embed",
       value: "ecolor"
       },
       {
      label: "Footer",
      description: "Set a footer text for the embed",
       value: "efooter"
       },
       {
        label: "Thumbnail",
        description: "Set a thumbnail for the embed",
        value: "ethumb"
       },
       {
        label: "Image",
        description: "Set an image for the embed (big image at bottom middle)",
       value: "eimg"
       },
       {
        label: "Author",
       description: "Set an author text for the embed (text above title)",
       value: "eauthor"
       },
       {
       label: "URL",
       description: "Set an URL for the embed (hyperlink for title)",
       value: "eurl"
       },
       {
       label: "Timestamp",
       description: "Set a timestamp for the embed (beside footer)",
       value: "etime"
       }
   ])
  )

  let filter1 = (i) => i.user.id === message.author.id;
  let filter2 = (m) => m.author.id === message.author.id;    
  
  let cr = new embed()
  .setTitle("Embed Creator")
  .setDescription("Please pick an option below to set a value for embed")
  .setColor("GOLD")
     
  let pre = new embed()
  .setColor("#2F3136")
  .setDescription("None")
  
  
  let msg = await message.channel.send({
      embeds: [cr],
      components: [opt]
  }) 
  
 let preview = await message.channel.send({
      content: "**Preview:**",
      embeds: [pre],
     components: [but]
  })
  
 const colb = await preview.createMessageComponentCollector({
     filter: filter1
 })
 
colb.on("collect", async (i) =>{
    if(i.customId === "embc") {
    if(conf === false) return i.reply({
        content: "You need to put description in embed first before you can send it!",
    ephemeral: true
    })
      i.channel.send(`Nice! Embed was successfully sent in ${channel}!`)
        msg.delete();
        preview.delete();
       channel.send({
           embeds: [result]
       })
   }
 if(i.customId === "embd") {  
     i.channel.send("Successfully cancelled making embed!")
    msg.delete();
    preview.delete(); 
  }
 })
 
 
 
  const col = await msg.createMessageComponentCollector({
    filter: filter1,
     componentType: "SELECT_MENU"
  })
  
 col.on("collect", async (i) =>{
     if(i.values[0] === "etitle") {
     i.reply({
    content: "**Title** option was selected! Now, please provide title for the embed.",
    ephemeral: true 
     })
       let t1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let title = t1.first().content;
   pre.setTitle(title);
   result.setTitle(title);
   t1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
     
   if(i.values[0] === "edesc") {
   i.reply({
    content: "**Description** option was selected! Now, please provide description for the embed.",
    ephemeral: true 
     })
       let d1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let desc = d1.first().content;
   conf = true;
   pre.setDescription(desc);
   result.setDescription(desc);
   d1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }   
     if(i.values[0] === "ecolor") {
     i.reply({
    content: "**Color** option was selected! Now, please provide HEX COLOR for the embed.",
    ephemeral: true 
     })
       let c1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let color = c1.first().content;
   if(!color.startsWith("#")) return i.followUp({
       content: "Hex code must start with #. To provide a color again, please click the menu and press this option again.",
       ephemeral: true
   })
   result.setColor(color);
   pre.setColor(color);
   c1.first().delete();
   preview.edit({
      content: "**Preview:**",
       embeds: [pre]
    });
     } 
     
    if(i.values[0] === "efooter") {
     i.reply({
    content: "**Footer** option was selected! Now, please provide footer text for the embed.",
    ephemeral: true 
     })
       let f1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let footer = f1.first().content;
   result.setFooter(footer);    
   pre.setFooter(footer);
   f1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
   if(i.values[0] === "ethumb") {
     i.reply({
    content: "**Thumbnail** option was selected! Now, please provide thumbnail URL for the embed.",
    ephemeral: true 
     })
       let th1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let thumb = th1.first().content; 
 function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}
     
    if(is_url(thumb) === false) {
        th1.first().delete();
        return i.followUp({
       content: "**__Thumbnail__** must be a link. To provide a thumbnail again, please click the menu and press this option again.",
       ephemeral: true
   }) 
    }               
   pre.setThumbnail(thumb);
  result.setThumbnail(thumb);     
   th1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }   
     if(i.values[0] === "eimg") {
     i.reply({
    content: "**Image** option was selected! Now, please provide image link for the embed.",
    ephemeral: true 
     })
       let i1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let img = i1.first().content; 
 function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}
     
    if(is_url(img) === false) {
        i1.first().delete();
        return i.followUp({
       content: "**__Image__** must be a link. To provide an image again, please click the menu and press this option again.",
       ephemeral: true
   }) 
    }               
   pre.setImage(img);
   pre.setImage(img);     
   i1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
     if(i.values[0] === "eurl") {
     i.reply({
    content: "**URL** option was selected! Now, please provide URL for the embed.",
    ephemeral: true 
     })
       let u1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let url = u1.first().content;
   pre.setURL(url);
   result.setURL(url);
   u1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
     if(i.values[0] === "eauthor") {
     i.reply({
    content: "**Author** option was selected! Now, please provide author text for the embed.",
    ephemeral: true 
     })
       let a1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let author = 
   a1.first().content;
   result.setAuthor(author);
   pre.setAuthor(author);
   a1.first().delete();
   preview.edit({
        content: "**Preview:**",
       embeds: [pre]
    });
     }
     if(i.values[0] === "etime") {
     i.reply({
    content: "**Timestamp** option was selected! **Now, __Are you sure you want to set timestamp? (TYPING TRUE WILL BE PERMANENT, FALSE CANCELS SETTING TIMESTAMP BUT IT WON'T REMOVE THE TIMESTAMP [unless you type the command again])** Please provide a boolean either `true` or `false` to set timestamp",
    ephemeral: true 
     })
         
       let ti1 = await message.channel.awaitMessages({
           filter: filter2,
           max: 1
       })
    let times = ti1.first().content;   
         let tim = [
             "true",
             "false"
         ];
         if(!tim.includes(times)) return i.followUp({
             content: "Option must be `true` or `false`. To set a timestamp again, please click the menu and press this option again.",
             ephemeral: true
         })
         if(times === "true") {
       pre.setTimestamp();
       result.setTimestamp(); 
              ti1.first().delete();
             preview.edit({
             content: "**Preview:**",
             embeds: [pre]
             });
         } else if(times === "false"){
    ti1.first().delete();
         }
     }
 }) 
  }
}