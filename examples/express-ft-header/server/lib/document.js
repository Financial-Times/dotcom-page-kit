module.exports = (placeholder) => `<!DOCTYPE html>
<html class="core" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hi</title>
  <style>
    .core .o--if-js, .enhanced .o--if-no-js { display: none !important; }
    body {background-color:#fff1e5; color:#33302e;}
  </style>
  <link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v2/bundles/css?modules=o-header@^7.7.0,o-fonts@^3.2.0,o-normalise@^1.6.2" />
  <script>
    document.documentElement.classList.remove('core')
    document.documentElement.classList.add('enhanced')
  </script>
  <script src="https://www.ft.com/__origami/service/build/v2/bundles/js?modules=o-header@^7.7.0,o-fonts@^3.2.0,o-normalise@^1.6.2">
  </script>
</head>
<body>
  <header role="banner">
  ${placeholder}
  </header>
  <main role="main">
  </main>
  <footer role="contentinfo">
  </footer>
</body>
</html>`
