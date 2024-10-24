// const executablePath = process.env.CI ? '/usr/bin/google-chrome-stable' : undefined

module.exports = {
  server: {
    command: 'npm start',
    port: 3000
  }
  // launch: {
  //   // https://discuss.circleci.com/t/puppeteer-fails-on-circleci/22650
  //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
  //   executablePath
  // }
}
