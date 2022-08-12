const fs = require("fs/promises");


const replace = (buf, a, b) => {
    if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
    const idx = buf.indexOf(a);
    if (idx === -1) return buf;
    if (!Buffer.isBuffer(b)) b = Buffer.from(b);
  
    const before = buf.slice(0, idx);
    const after = replace(buf.slice(idx + a.length), a, b);
    const len = idx + b.length + after.length;
    return Buffer.concat([ before, b, after ], len);
  }

(async () => {
    const slug = "post-2"

    const handle = await fs.open(`./blog/${slug}.md`)
    // drop first 5 bytes for ---\n
    const buffer = replace((await handle.readFile({ encoding: "utf-8" })), '\r\n', '\n').slice(4).toString()
    console.log(buffer)

    // parse metadata into Post type
    const post = {}
    buffer.slice(0, buffer.indexOf('-') - 1).split('\n').map(v => {
        const r = v.split(':')
        post[r[0]] = r[1].trim().replace(/\"+/g, "")
    })

    return { ...post }
})()