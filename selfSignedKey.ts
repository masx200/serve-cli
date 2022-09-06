import { join } from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const selfSignedKey = join(__dirname, "./certs/self-signed.key.pem");
export const selfSignedCert = join(__dirname, "./certs/self-signed.cert.pem");
