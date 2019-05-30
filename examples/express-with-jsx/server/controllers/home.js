export function homePageController(req, res) {
  res.render('Home.jsx', { greeting: 'hello world...' })
}
