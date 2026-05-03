const crypto = require("crypto");

const HASH_ALGORITHM = "scrypt";
const KEY_LENGTH = 64;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), salt, KEY_LENGTH).toString("hex");

  return `${HASH_ALGORITHM}:${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword) {
    return false;
  }

  const [algorithm, salt, hash] = String(storedPassword).split(":");

  if (algorithm !== HASH_ALGORITHM || !salt || !hash) {
    return false;
  }

  const passwordHash = crypto.scryptSync(String(password), salt, KEY_LENGTH).toString("hex");

  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(passwordHash, "hex"));
}

module.exports = {
  hashPassword,
  verifyPassword
};
