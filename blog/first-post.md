---
title: "First post best post"
date: 12/08/22
desc: "A small test post to mark creation"
---


This was pretty simple to put together, I'd never used `Next.js` before so I decided to give it a go with a small scale blog project to put under my domain. Initially I was going to self-host a headless CMS via Docker but my ISP doesn't provide free static IPs anymore so I decided to just write a [simple filesystem markdown API](https://github.com/izzymg/blog-izzymg/blob/main/lib.ts).

All this does is generate static pages by iterating the `./blog/` directory, each post being generated based on the slug (filename) of the `.md` file. Technically front-matter (the metadata inside the MD files) actually uses full on YAML, but I had no use for that/didn't feel like grabbing a YAML parser, so I just used some simple string manipulation to break each line of metadata into key/value pairs and passed that into the Post prop. 

All in all I like how Next.JS feels, although I think for a more intense full-stack application I'd prefer to keep my backend API separate and use Golang or Rust rather than Node.JS. Although it's beneficial to technically use the "same language everywhere", pragmatically the kind of JS/TS you end up writing for say, back-end Auth/SQL/REST/etc tends to be nearly a whole different language than what you'd use in your typical front-end JSX. The ecosystem is passable for trivial front-end heavy applications like this, but when I've written more complex full-stack apps, such as forums, I've run into issues with Typescript in the ecosystem, be it either bad type definition files or just outright lack of support by major packages. If I'm going for a statically typed experience, I'd like that to be decided the whole way down my dependency stack, rather than crossing my fingers an image manipulation library happens to define its types correctly.

Obviously I'm padding this out for the sake of having some content in here to test properly, so I'll wrap it up around here.