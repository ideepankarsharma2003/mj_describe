require("dotenv").config();
const { Midjourney } = require("midjourney");

async function initialImagine(initial_prompt) {
    prompt = `${initial_prompt} `;
    

    const client = new Midjourney({
        ServerId: process.env.SERVER_ID,
        ChannelId: process.env.CHANNEL_ID,
        SalaiToken: process.env.SALAI_TOKEN,
        Debug: false,
        Ws: true,
        SessionId: process.env.SALAI_TOKEN || "8bb7f5b79c7a49f7d0824ab4b8773a81",
    });
    const regex = /https:\/\/s.mj.run\/[^>]+/gm;
  
    client.init();
  
    const msg = await new Promise((resolve) => {
        client.Imagine(prompt, (uri) => {
        console.log("loading", uri);
        }).then((result) => {
        client.Close();
        resolve(result);
        });
    });

    // to get the mj links for cref parameter
    content= msg.content
    // mj_links= content.match(regex)

    // console.log(
    //     "regex matches are: ",
    //     mj_links
    // )

    // msg.mj_links= mj_links

    // await initialImagine_with_cref(initial_prompt, mj_links).then((result)=>{
    //     cref_imagine_msg= result
    //     msg.cref_uri= cref_imagine_msg.uri
    // });

    return msg;
    
}











async function initialImaginewithUpscaling(initial_prompt) {
    prompt = `${initial_prompt} `;
    
    const client = new Midjourney({
        ServerId: process.env.SERVER_ID,
        ChannelId: process.env.CHANNEL_ID,
        SalaiToken: process.env.SALAI_TOKEN,
        Debug: false,
        Ws: true,
        SessionId: process.env.SALAI_TOKEN || "8bb7f5b79c7a49f7d0824ab4b8773a81",
    });
    client.init();

    
    const msg = await new Promise((resolve) => {
        client.Imagine(prompt, (uri) => {
        console.log("IMAGINE |", uri);
        }).then((result) => {
        // client.Close();
        resolve(result);
        });
    });


    // console.log(msg)
    if (!msg) {
        console.log("no message");
        return;
      }



    const msg1= await new Promise((resolve)=>{
        client.Upscale({
            index: 2,
            msgId: msg.id,
            hash: msg.hash,
            flags: msg.flags,
            content: msg.content,
            loading: (uri, progress) => {
              console.log("UPSCALE | ", uri, "progress", progress);
            },
          }).then((result) => {
            resolve(result);
          });
        })
        
        
        
        
    content= msg.content
    client.Close();


    return msg1;
    
}

async function initialImaginewithUpscalingv2(initial_prompt, client) {
    prompt = `${initial_prompt} `;
    


    
    const msg = await new Promise((resolve) => {
        client.Imagine(prompt, (uri) => {
        console.log("IMAGINE |", uri);
        }).then((result) => {
        // client.Close();
        resolve(result)
        });
    });


    // console.log(msg)
    if (!msg) {
        console.log("no message");
        return;
      }



    const msg1= await new Promise((resolve)=>{
        client.Upscale({
            index: 2,
            msgId: msg.id,
            hash: msg.hash,
            flags: msg.flags,
            content: msg.content,
            loading: (uri, progress) => {
              console.log("UPSCALE | ", uri, "progress", progress);
            },
          }).then((result) => {
            resolve(result);
          })
        })
        
        
        
        
    content= msg.content
    return msg1;
    
}















async function initialImagine_with_cref(prompt, mj_links) {
    const cref = mj_links.join(" ");
    prompt = `${prompt} --cref ${cref} --cw 100`;  
    const client = new Midjourney({
        ServerId: process.env.SERVER_ID,
        ChannelId: process.env.CHANNEL_ID,
        SalaiToken: process.env.SALAI_TOKEN,
        Debug: false,
        Ws: true,
        SessionId: process.env.SALAI_TOKEN || "8bb7f5b79c7a49f7d0824ab4b8773a81",
    });  
    client.init();
  
    const msg = await new Promise((resolve) => {
        client.Imagine(prompt, (uri) => {
        console.log("loading", uri);
        }).then((result) => {
        client.Close();
        resolve(result);
        });
    });
    return msg;
}











module.exports = {
    initialImagine,
    initialImaginewithUpscaling,
    initialImaginewithUpscalingv2
};




/*

function main() {
  initialImagine("John Wick with Poonam Panday",
  ["https://cdn.codechef.com/sites/default/files/uploads/pictures/f1f904666c92b03b6392b981e62b9b45.png", "https://assets.nst.com.my/images/articles/olskeareejwmstet001a_1559544036.jpg"," https://d1nslcd7m2225b.cloudfront.net/Pictures/480xAny/2/4/5/1287245_johnwickchapter2_906536.jpg" ])
    .then((msg) => {
      console.log("The msg is: \n", msg);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

main();

*/