# gulp

gulp的作用：需要看完参考资料之后再详细的说明

## gulp的详细学习[文档](https://juejin.im/entry/586a417561ff4b006d77fe85)

## gulp的工作方式

gulp的使用流程一般是这样子的：首先通过gulp.src()方法获取到我们想要处理的文件流，
然后把文件流通过pipe方法导入到gulp的插件中，最后把经过插件处理后的流再通过pipe方法导入到gulp.dest()中，gulp.dest()方法则把流中的内容写入到文件中.

eg：

```
var gulp = require('gulp')
gulp.src('./app.js') //通过路劲获取流文件
.pipe(gulp.dest('dist/dest.js')) //将处理后的文件输出到dist/dest.js当中
```
使用gulp，仅需知道4个API即可：gulp.task(),gulp.src(),gulp.dest(),gulp.watch()，所以很容易就能掌握.

### gulp.src()

可以简单的理解为获取我们想要操作的文件

第一个参数为文件的路径 第二个参数为待定？

### gulp.dest()

可以简单的理解为输出被操作之后的文件

note:必须要清楚的一点是通过gulp.dest()接收的第一个参数是输出文件的路径名称，而不是文件名称。输出文件的文件名称由dest.src()当中获取的名称决定，
这2个名称是一致的。

下面说说生成的文件路径与我们给gulp.dest()方法传入的路径参数之间的关系。gulp.dest(path)生成的文件路径是我们传入的path参数后面再加上gulp.src()中有通配符开始出现的那部分路径。

eg:
```
gulp.src('script/avalon/avalon.js') //没有通配符出现的情况
.pipe(gulp.dest('dist')); //最后生成的文件路径为 dist/avalon.js

//有通配符开始出现的那部分路径为 **/underscore.js
gulp.src('script/**/underscore.js')
//假设匹配到的文件为script/util/underscore.js
.pipe(gulp.dest('dist')); //则最后生成的文件路径为 dist/util/underscore.js

gulp.src('script/*') //有通配符出现的那部分路径为 *
//假设匹配到的文件为script/zepto.js    
.pipe(gulp.dest('dist')); //则最后生成的文件路径为 dist/zepto.js 
```

### gulp.task()

语法`gulp.task(name[,deps],fn)`：通过gulp.task()来定义任务。

**name** 任务的名称，必填

**deps** 指代当前任务的依赖任务是一个数组，如果存在当前任务的依赖任务，则会等待依赖的任务执行完毕之后再执行，可选

**fn** 任务函数，需要执行的代码都写在此处,可选

#### 如果执行多个任务

如果我们想通过一个任务命令执行多个任务，则可以充分的利用deps这个特性
```
gulp.task('default',['one','two','three'])
```

这样只要执行gulp default命令,那么one、two、three这些依赖任务都会被执行

#### 异步操作的问题

虽然当我们使用`gulp.task('two',['one'],fn)`时会先执行被依赖的one任务但是two任务是不会等待one任务当中的异步函数执行完毕的

实现的方式有三种

- 在异步操作完成之后使用回调函数来通知gulp这个异步任务已经完成，这个回调函数就是任务函数的第一个参数
```
gulp.task('one',function(cb){
  setTimeout(function(){
    console.log('1');
    cd();
  },3000)
})
gulp.task('two',[one],function(){
  console.log('two is done')
})
```

这是被two会在one的异步操作完成之后再执行

- 定义任务是返回一个流对象 适用于任务就是操作gulp.src获取到的流的情况。

```
var Q = require('q'); //一个著名的异步处理的库 https://github.com/kriskowal/q
gulp.task('one',function(cb){
  var stream = gulp.src('client/**/*.js')
      .pipe(doSomething()) //doSomething()中有某些异步操作
      .pipe(gulp.dest('build'));
    return stream;
});

gulp.task('two',['one'],function(){
  console.log('two is done');
});
```

- 返回一个Promise对象

```
var Q = require('q'); //一个著名的异步处理的库 https://github.com/kriskowal/q
gulp.task('one',function(cb){
  var deferred = Q.defer();
  // 做一些异步操作
  setTimeout(function() {
     deferred.resolve(); // promise的进程被放在异步处理函数当中
  }, 5000);
  return deferred.promise; //返回值是一个promise
});

gulp.task('two',['one'],function(){
  console.log('two is done');
});
```

### gulp.watch()

gulp.watch用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等等。其语法为：
```
gulp.watch(glob[,opts],tasks)
```

**glob**为要监视的文件匹配模式

**opts**可选的参数 基本不使用

**tasks**为文件变化后要执行的任务，是一个数组

```
gulp.task('uglify',function(){
  //do something
});
gulp.task('reload',function(){
  //do something
});
gulp.watch('js/**/*.js', ['uglify','reload']); 
```

gulp还有另外一种使用方式

```
gulp.watch(glob[, opts, cb])
```

glob和 opts 参数与第一种用法相同
cb参数为一个函数。每当监视的文件发生变化时，就会调用这个函数,并且会给它传入一个对象，该对象包含了文件变化的一些信息，type属性为变化的类型，可以是 added , changed , deleted ； path 属性为发生变化的文件的路径
```
gulp.watch('js/**/*.js', function(event){
  console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变 
  console.log(event.path); //变化的文件的路径
})
```