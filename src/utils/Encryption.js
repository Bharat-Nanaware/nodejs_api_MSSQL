// encryption.js
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; // Using AES encryption
const key = Buffer.alloc(32, 0);
const iv = Buffer.alloc(16, 0); // Define a static IV with all zeros
console.log(key)


module.exports = {
  // Encryption function
  Encrypt: function (text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  },

  // Decryption function
  Decrypt: function (text) {
    let iv1 = Buffer.from(iv, 'hex');
   let encryptedText = Buffer.from(text, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv1);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
   
    // const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // let decrypted = decipher.update(text, 'hex', 'utf8');
    // decrypted += decipher.final('utf8');
    // return decrypted;
  }

};

