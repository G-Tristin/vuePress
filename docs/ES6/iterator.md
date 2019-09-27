# interator 遍历器
interator是一个遍历器，主要用于给`for...of`循环消费，也就是说只要部署了interator接口的数据就能使用`for...of`循环。

## interator的本质
interator本质上是一个函数，它主要返回一个既有`next`方法的对象。`next`方法返回包含数据的信息和是否遍历完成的状态对象。一般遍历器部署在`Symbol.interator`属性上。
```
    const obj = {
      num: 0,
      [Symbol.iterator]: function () {
        const self = this
        let done = false
        return {
          next: function () {
            self.num++
            if (self.num > 10) {
              done = true
            }
            return {
              value: self.num, done
            }
          }
        }
      }
    }
```
## return方法和throw方法
遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选。

`return` 方法使用的场合是，如果`for...of`循环提前退出(通常是因为出错，或者有break语句)，就会调用`return`方法。如果一个对象在完成遍历前，需要清理或释放资源，既可以部署return方法
```
readLinesSync(fileName)返回的是一个遍历器

// 情况一
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}
```
throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。请参阅《Generator 函数》一章。

## for...of循环
一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有`iterator`接口，就可以用`for...of`循环遍历它的成员。也就是说`for...of`内部调用的是数据结构的`Symbol.iterator`方法。

`for...of`循环可以使用的范围包括数组、Set和Map结构、某些类似数组的对象(比如arguments对象、DOM NodeList对象)、后文的Generator对象，以及字符串。

## for...of循环与其它循环的比较

1. for与 for...of相比
for循环的写法太过麻烦，虽然有`forEach`的简化但是不支持`return`, `break`, `Continue`等跳出循环的方式。

2. for...in 与 for...of相比
for...in循环有几个缺点。
- 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
- for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，for...in循环会以任意顺序遍历键名。
总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。

