import process from "process";

export function showhelp() {
    console.log(
        [
            "usage: serve-cli [options]",
            "",
            "options:",
            "  --path,-p       Path to folder [process.cwd()]",
            "  --host,-h       Host to use [0.0.0.0]",
            "  --port,-p       Port to use [3000]",

            "  --ssl,-s        Enable https [false]",
            "  --sslKey     Path to ssl key file [self-signed]",
            "  --sslCert    Path to ssl cert file [self-signed]",
            "  --help,-h       Print this list and exit",

            "",
        ].join("\n")
    );
    process.exit(1);
}
