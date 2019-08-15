# 扩展模块插件

有时通过import导入一个模块插件，可以改变另一个原有模块的结构。此时如果原有模块已经有了类型申明文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少插件部分的类型。TS提供了一个语法 declare module，它可以用来扩展原有模块的类型。

如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用declare module扩展原有模块
```
// types/moment/ment-plugin/index.d.ts
import * as moment from 'moment'
declare module 'moment'{
  export function foo():moment.CalendarKey
}

// src/index.ts
import * as moment from 'moment';
import 'moment-plugin';
moment.foo
```

declare module 也可用于在一个文件中一次性声明多个模块的类型
```
//types/foo-bar.d.ts
declare module 'foo'{
  export interface Foo{
    foo:string
  }
}

declare module 'bar'{
  export function bar():string
}

// src/index.ts
import {Foo} from 'foo'
import * as bar from 'bar'
let f:Foo
bar.bar()
```

