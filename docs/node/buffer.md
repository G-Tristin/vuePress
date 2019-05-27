# Buffer - 缓冲器

简介:
buffer类的实例类似一个整数数组，对应于V8外部的固定大小的原始内存分配。Buffer的大小在创建时
已经固定，且无法更改。

Buffer 类在全局作用域中，因此无需再引用

## Buffer.allocUnsafe()与Buffer.allocUnsafeSlow()不安全的原因

当调用Buffer.allocUnsafe()和Buffer.allocUnsafeSlow()时，分配的内存是没有初始化的(没有使用0填充)。虽然这样的设计使得内存的分配速度会非常快，但是内存当中可能会包含旧数据。如果没有完全地重写内存，当读取Buffer时，旧数据就泄露了。

## Buffer的一些常用的方法

### Buffer的创建

1.Buffer.from(obj) obj支持的类型有string ,buffer ,arrayBuffer ,or array-like object 

注:

Buffer.from()不支持传入数字 如果一定要传入数字则可以使用传入数组的方式传入数字
```
const buf = Buffer.from([1,2,3,4])
console.log(buf) // <Buffer 7f ff>
```

但是使用该方法还是会有问题，当存入不同的数值时候bufer中记录的二进制数据会相同，如下代码
```
const buf = Buffer.from([127,-1])
console.log(buf) //<Buffer 7f ff>

const buf1 = Buffer.from([125,255])
console.log(buf1) // <Buffer 7f ff>

console.log(buf1.equals(buf2)) //true
```
当要记录的一组数全部在0到255(readUint8来读取)这个范围，或者落到-128到127(readInt8来读取)的范围内就不会存在问题
，否则的话就不建议使用Buffer.from()来保存一组数

2.Buffer.alloc Buffer.allocUnsafe Buffer.allocUnsafeSlow

一般当Buffer数据没有确定是会使用这些方法创建Buffer

buffer.alloc会使用用0值来填充已分配的内存，所以相对后者来说比较安全。我们也可以使用--zero--fill-buffers 的命令来使得
buffer.allocUnsafe或者buffer.allocUnsafeSlow在分配完内存后使用0来填充。

当分配的空间小于4KB的时候，allocUnsafe会直接从之前预分配的Buffer里面slice空间，因此速度比allocUnsafeSlow要快，当大于等于4KB的时候二者速度相差无异

### Buffer转换字符串

```
const buf = Buffer.from('string')
const str = buf.toString('utf-8') // string
const str = buf.toString('utf-8',0,2) // st
```

### Bufferz转json

const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
console.log(buf.toJSON());    // { type: 'Buffer', data: [ 1, 2, 3, 4, 5 ] }

### Buffer的截取

1.buf.slice

创建一个指向与原始Buffer同一个内存的新Buffer,但是使用了start和end进行了裁切。这就会导致修改新建的buf切片将会影响到原始的buffer,因为二者的内存地址是相同的。

### Buffer的拷贝
buffer的拷贝和数组的拷贝不同，因为buffer的长度是固定的，所以当拷贝的对象的长度小于被拷贝对象的长度时只会复制部分的值。
buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

示例：
```
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('ABCDEF');

buf1.copy(buf2, 1);
console.log(buf2.toString()); //Abcdef
```

### Buffer的比较
判断buffer的值是否相同，比较的时二进制值
```
buf.equals(otherBuffer)
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('414243', 'hex'); 
// buf1和buf2转换成2进制之后的值时完全相同的
console.log(buf1.equals(buf2));    // true
```

### Buffer是否包含特定值
```
buf.includes(value[, byteOffset][, encoding])
buf.indexOf(value[, byteOffset][, encoding])

const buf = Buffer.from('this is a buffer');
console.log(buf.includes('this'));  // true
console.log(buf.indexOf('this'));  // 0
```

### 获取或者操作Buffer的某一个值

`buf[i]`和操作数组的方式基本一致

### 写入和读取数据
write 和 read

### Buffer合并
```
Buffer.concat(list[, totalLength]) //totalLength不是必须的，如果不提供的话会为了计算totalLength会多一次遍历

const buf1 = Buffer.from('this is');
const buf2 = Buffer.from(' funny');
console.log(Buffer.concat([buf1, buf2], buf1.length + buf2.length));
// <Buffer 74 68 69 73 20 69 73 20 66 75 6e 6e 79>
```

### 清空Buffer
清空buffer数据最快的办法是buffer.fill(0)