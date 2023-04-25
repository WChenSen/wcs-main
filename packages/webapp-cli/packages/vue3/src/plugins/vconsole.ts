if (import.meta.env.MODE !== 'production') {
  import('vconsole').then((VConsole) => {
    const Console = VConsole.default
    new Console()
  })
}
