const fs = require("fs")
const path = require("path")
const foundryPath = require("./foundry-path.js");
import copy from 'rollup-plugin-copy-watch'

import jscc from 'rollup-plugin-jscc'

let manifest = JSON.parse(fs.readFileSync("./system.json"))

let systemPath = foundryPath.systemPath(manifest.id)

console.log("Bundling to " + systemPath)

export default {
    input: [`${manifest.id}.js`],
    output: {
        file : path.join(systemPath, `${manifest.id}.js`)
    },
    watch : {
        clareScreen: true
    },
    plugins: [
        jscc({      
            values : {_ENV :  process.env}
        }),
        copy({
            targets : [
                {src : "./template.json", dest : systemPath},
                {src : "./system.json", dest : systemPath},
                {src : "./WFRP-Header.jpg", dest : systemPath},
                {src : "./static/*", dest : systemPath},
            ],
            watch: ["./static/*/**", "system.json", "template.json"]
        })
    ]
}