# 扩展模块变量

扩展模块变量也可以称为扩展**模块插件**，其实质就是扩展模块的插件的类型。

有时通过import导入一个模块插件，可以改变一个原有模块的结构。此时如果原有模块已经有了类型声明文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少插件部分的类型。ts提供了一个语法declare module,它可以用来扩展原有的模块类型。

## declare module

如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块。
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