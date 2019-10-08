function copyAsync() {
  function* fn() {
    console.log(1)
    const a1 = yield a = promise('a');
    console.log(a1)
    const a2 = yield b = promise('b');
    console.log(a2)
    const a3 = yield c = promise(a2);
    console.log(a3)
  }
  const gn = fn()
  const promise = function (a) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(a)
      }, 1000)
    }).then(res => {
      gn.next(res)
    })
  }
  return gn.next()
}
copyAsync()