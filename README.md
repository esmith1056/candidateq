# CandidateQueue

This was originally a skills test I didn't do so well on because all of my code-snippets belonged to my current employer, so I couldn't use them. I'm now building this out into a little practice app to apply new ideas, techniques, and create my own code-snippets. When life hands you lemons, make lemon sandwiches!

## Prequisites

1. yarn v1.22.x, https://classic.yarnpkg.com/en/
2. node  v16.16.0 (nvm compatible), https://nodejs.org/en/download/
3. _Nice to have_: nvm, https://github.com/nvm-sh/nvm#installing-and-updating 

## Installation

1. Clone the repo at https://github.com/esmith1056/candidateq.
2. From project directory, run `yarn`.
3. Start dev server with `yarn dev`.
4. The [mkcert](https://github.com/liuweiGL/vite-plugin-mkcert) plugin will attempt to install SSL certs to support HTTPS. You may be asked for your password a times while the certs are installed.
5. Navigate to https://127.0.0.1:5173/.
6. If you receive an HTTPS privacy error, click on the browser's advanced options and choose to proceed anyway.

### Quick installation on macOS or Linux

```shell
git clone git@github.com:esmith1056/candidateq.git candidateq
cd $_
nvm use # If you have nvm installed, use it to ensure you're running the correct nodeJS
yarn
yarn start
```
