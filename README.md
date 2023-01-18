# first install dependences

```
npm install
```

# script

```
npm run start: to start the server. "nodemon ./src/index.ts",
npm run build: to compile TS to JS. "npx tsc",
npm run test: to compile and run tests. "npm run build && npm run jasmine",
```

# endpoint

- endpoint to resize images
  http://localhost:3000/api/images?fileName=fjord&height=200&width=900
  - fileName: name of the image to resize
  - height: height in pixels
  - width: width in pixels
