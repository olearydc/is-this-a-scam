/* See the WhatsApp reply for a message without any accounts or servers.
   Usage: node forwarding/try-reply.js "An Post: pay the €2.99 fee at anpost-fee.top" */
var checker = require("./checker"), reply = require("./reply");
var text = process.argv.slice(2).join(" ");
if (!text) { console.log(reply.HELP); process.exit(0); }
console.log(reply.build(checker.check(text)));
