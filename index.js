const fs = require("fs");
const requests = require("request")

invite_code = "invite-code-here"

async function readFile(filePath) {
      try {
           const fileRead = await fs.readFile(filePath)
           return fileRead.toString()
      }
      catch (error) {console.log(error)}
}

function getProxy() {
      fs.readFile(
         "guildedjoiner/proxies.txt",
         function(error, content) {
             if (error) {
                throw error;
             } 
             
             // Here are the proxies of the text file
             var lines = content.split("\n")
             var line  = lines[Math.floor(Math.random()*lines.length)]

             return line
         }
      )
}

function sendSession(hmac, invite) {
         try {
             if (hmac == "" || " ") {
                 console.log("Empty Session")
             } else if (invite == "" || " ") {
                       console.log("Empty Invite")
             } else {
                    requests.put({
                            url: "https://www.guilded.gg/api/invites/" + invite,
                            headers: {
                                   "guilded-client-id" : "f1a162c9-8992-468c-afdd-de50fd3fd428",
                                   "guilded-stag" :      "90156f8d1cc4886a65e92aded2861869",
                                   "guilded-stag" :      "90156f8d1cc4886a65e92aded2861869",

                                   // This is where the hmac signed session goes
                                   "cookie": "hmac_signed_session=" + hmac
                            }, proxies: {
                               "http": "http://" + getProxy()
                            }
                    })
             }
         } catch (error) {
                 console.log(error)
         }
}

// This is where the magic happens, everything will get started here
fs.readFile(
   "guildedjoiner/sessions.txt", (error, content) => {
       content.forEach(session => {
               sendSession(session, invite_code)
       }) 
   }
)
