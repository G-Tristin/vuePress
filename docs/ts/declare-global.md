# 在npm包或者UMD库的声明文件中扩展全局变量的类型

如之前所说，对于一个npm包或者UMD库的声明文件，只有export导出的类型声明才能被导入。所以对于npm包或者UMD库，
如果导入此库后会扩展全局变量，则需要使用另一种语法在声明文件中扩展全局变量的类型 ---而全局变量的类型就有可能是一个接口（interface），那就是declare global。

首先理解declare global就选要理解上面这段话的场景，意思是当我们在基础文件当中导入一个第三方库的时候，并且这个三方库当中定义了一些全局
变量或者说给某些全局变量添加了新的属性或者方法。那么我们需要给这个三方库的声明文件中通过declare扩展一些我们在使用这个第三方库时会使用到的全局变量的类型(一般使用interface)。并且由于可以扩展全局变量的这个特性，我们也可以在这个声明文件当中扩展一些我们会使用到的但是与这个三方库无关的全局变量的类型
这样虽然可以减少声明文件，但是会导致声明文件混淆，表意不清不建议使用。

## declare global

使用declare global可以在npm包或者UMD库的声明文件中扩展全局变量的类型
```
// types/foo/index.d.ts
declare global {
  interface String{ // 这里应当时理解为第三方库扩展了String对象的属性，我们需要在声明文件中声明这个扩展属性的类型
    prependHello():string;
  }
  interface User{ //这是扩展了object的一种类型 并且提升到全局对象变量的类型 
    name:string;
    age:number;
  }
}
export {}

// src/index.ts
'bar'.prependHello(); //此处使用了declare global扩展的全局变量String
```

## declare module

模块插件 有时通过import导入一个模块插件，可以改变一个原有模块的结构。此时如果原有模块已经有了类型声明文件，而插件模块没有
类型声明文件，就会导致类型不完整，缺少插件部分的类型。ts提供了一个语法declare module,它可以用来扩展原有的模块类型。

```
// types/moment-plugin/index.d.ts
import * as moment from 'moment'
declare module 'moment'{
  export function foo(): moemnt.CalendarKey
}

// src/index.ts
import * as moemnt from 'moment'
import 'moment-plugin'
moment.foo()
```

declare module 也可用于在一个文件中一次性声明多个模块的类型
```
// types/foo-bar.d.ts
declare module 'foo'{
  export interface Foo{
    foo:string;
  }
}

declare module 'bar'{
  export function bar():sting
}

// src/index.ts
import {Foo} from 'foo'
import * as bar from 'bar'

let f:Foo
bar.bar()
```

## 声明文件中的依赖

一个声明文件有时会依赖另一个声明文件中的类型，比如在前面的declare module的例子中，我们就在声明文件中导入了moment,并使用了moment.CalendarKey这个类型
```
// types/moment-plugin/index.d.ts
import * as moment from 'moment'
declare module 'moment'{
  export function foo():moment.CalendarKey
}
```