if (import.meta.env.MODE !== 'production') {
  import('vconsole').then((VConsole) => {
    new VConsole.default()
  })
}
