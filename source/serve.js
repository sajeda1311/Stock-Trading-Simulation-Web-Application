import app from './app.js'
const port = 3000;

app.listen(port, () => {
  console.log('Example app listening at http://localhost:%d', port);
});

export default app // useful when started as a module
