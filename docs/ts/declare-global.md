# 在npm包或者UMD库中扩展全局变量

如之前所说，对于一个npm包或者UMD库的声明文件，只有export导出的类型声明才能被导入。所以对于npm包或者UMD库，如果导入此库后
会扩展全局变量，则需要使用另一种语法在声明文件中扩展全局变量的类型，那就是declare global。

## declare global

使用declare global可以在npm包或者UMD库的声明文件中扩展全局变量的类型
```
// types/foo/index.d.ts
declare global {
  interface String{
    prependHello():string;
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