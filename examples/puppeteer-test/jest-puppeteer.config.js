module.exports = {
  server: {
    command: 'npm run start',
    port: 3456
  },
  launch: {
    // https://discuss.circleci.com/t/puppeteer-fails-on-circleci/22650
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
}
