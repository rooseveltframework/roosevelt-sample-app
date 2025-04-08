module.exports = () => {
  return {
    content: {
      appTitle: 'My Roosevelt Sample App',
      pageTitle: '{content.appTitle}', // override this on a per route level
      titleTag: '{content.appTitle} — {content.pageTitle}'
    }
  }
}
