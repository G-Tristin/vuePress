(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{186:function(e,a,t){"use strict";t.r(a);var r=t(0),s=Object(r.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"content"},[t("p",[e._v("#fs模块")]),e._v(" "),t("h2",{attrs:{id:"基本概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基本概念","aria-hidden":"true"}},[e._v("#")]),e._v(" 基本概念")]),e._v(" "),t("h3",{attrs:{id:"文件描述符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#文件描述符","aria-hidden":"true"}},[e._v("#")]),e._v(" 文件描述符")]),e._v(" "),t("p",[e._v("1.任何指定的文件描述符都必须支持读取\n2.如果将文件描述符指定为path，则不会自动关闭它")]),e._v(" "),t("p",[e._v("fs模块的API有很多，如果想详细的了解则需要仔细的查看文档，但是在日常的开发中我们可能不会使用到那么多的API，以下介绍一些在\n开发过程中将会常用到的Api,并且介绍的都是异步版本的API。")]),e._v(" "),t("h3",{attrs:{id:"fs-open-path-flags-mode-callback-该方法用于打开文件-以便fs-read-读取"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-open-path-flags-mode-callback-该方法用于打开文件-以便fs-read-读取","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.open(path,flags,mode,callback) 该方法用于打开文件,以便fs.read()读取")]),e._v(" "),t("ul",[t("li",[e._v("path 文件路径")]),e._v(" "),t("li",[e._v("flags 打开文件的方式")]),e._v(" "),t("li",[e._v("mode 文件的权限")]),e._v(" "),t("li",[e._v("callback 回调函数\n"),t("ul",[t("li",[e._v("err 错误信息")]),e._v(" "),t("li",[e._v("fd 文件描述符")])])])]),e._v(" "),t("h3",{attrs:{id:"fs-close-fd-callback-关闭当前文件-fd是被打开文件时创建的描述符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-close-fd-callback-关闭当前文件-fd是被打开文件时创建的描述符","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.close(fd,callback) 关闭当前文件 fd是被打开文件时创建的描述符")]),e._v(" "),t("h3",{attrs:{id:"fs-read-fd-buffer-offset-length-position-calllback"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-read-fd-buffer-offset-length-position-calllback","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.read(fd,buffer,offset,length,position,calllback)")]),e._v(" "),t("ul",[t("li",[e._v("fd 文件描述符 从被打开的文件中获取")]),e._v(" "),t("li",[e._v("buffer 是存放读取到的数据的buffer对象")]),e._v(" "),t("li",[e._v("offset 指定向buffer中存放数据的起始位置")]),e._v(" "),t("li",[e._v("length 指定文件中数据的字节数")]),e._v(" "),t("li",[e._v("position 指定文件中读取内容的起始位置")]),e._v(" "),t("li",[e._v("callback 回调")]),e._v(" "),t("li",[e._v("err 抛出错误")]),e._v(" "),t("li",[e._v("bytesRead 从文件中读取内容的实际字节数")]),e._v(" "),t("li",[e._v("buffer 被读取的缓存区对象\neg:")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("var fs = require('fs'); // 引入fs模块\n// 打开文件\nfs.open('./text.txt', 'r', function(err, fd) {\n    if (err) {\n        throw err;\n    }\n    console.log('open file success.');\n    var buffer = new Buffer(255); // 创建一个buffer对象，用于存储fs.read读取到的数据\n    // 读取文件\n    fs.read(fd, buffer, 0, 10, 0, function(err, bytesRead, buffer) {\n        if (err) {\n            throw err;\n        }\n        // 此时已经将数据存放到我们创建出来的buffer对象当中\n        // 打印出buffer中存入的数据\n        console.log(bytesRead, buffer.slice(0, bytesRead).toString());\n \n        // 关闭文件\n        fs.close(fd);\n    });\n});\n")])])]),t("h3",{attrs:{id:"fs-readdir-path-options-callback"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-readdir-path-options-callback","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.readdir(path,options,callback)")]),e._v(" "),t("ul",[t("li",[e._v("path")]),e._v(" "),t("li",[e._v("options")]),e._v(" "),t("li",[e._v("encoding  默认utf-8")]),e._v(" "),t("li",[e._v("withFileTypes  默认值为false")]),e._v(" "),t("li",[e._v("callback")]),e._v(" "),t("li",[e._v("err")]),e._v(" "),t("li",[e._v("files\n异步读取目录的内容，回调中有2个参数,其中files是目录中文件名的数组\n如果 options.withFileTypes 设置为 true，则 files 数组将包含 fs.Dirent 对象。")])]),e._v(" "),t("h3",{attrs:{id:"fs-readfile-path-options-callback"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-readfile-path-options-callback","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.readFile(path,options,callback)")]),e._v(" "),t("p",[e._v("异步的读取文件的全部内容 --- 注意是全部")]),e._v(" "),t("ul",[t("li",[e._v("path:string|buffer|url|integer 文件名或者文件描述符")]),e._v(" "),t("li",[e._v("option\n"),t("ul",[t("li",[e._v("enconding 编码方式 默认值是null 常用utf-8")]),e._v(" "),t("li",[e._v("flag 默认值r 表示是读取文件")])])]),e._v(" "),t("li",[e._v("callback\n"),t("ul",[t("li",[e._v("err")]),e._v(" "),t("li",[e._v("data - 读取的数据 如果没有指定编码方式则默认是二进制数据")])])])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("fs.readFile('./message',(err,data)=>{\n  console.log(data)\n})\n")])])]),t("h3",{attrs:{id:"fs-write-fd-buffer-offset-length-position-callback"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-write-fd-buffer-offset-length-position-callback","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.write(fd,buffer,offset,length,position,callback)")]),e._v(" "),t("ul",[t("li",[e._v("fd 通过fs.open()获取到的文件描述符")]),e._v(" "),t("li",[e._v("buffer 将要被写入文件当中的buffer对象")]),e._v(" "),t("li",[e._v("offset 决定buffer中要被写入的部位，")]),e._v(" "),t("li",[e._v("length 一个整数指定要写入的字节数")]),e._v(" "),t("li",[e._v("position 指定文件开头的偏移量(数据应该被写入到的目标文件的偏移量)")]),e._v(" "),t("li",[e._v("callback")]),e._v(" "),t("li",[e._v("err 错误信息")]),e._v(" "),t("li",[e._v("bytesWritten 被写入到文件当中的实际buffer字节数")]),e._v(" "),t("li",[e._v("buffer 目前我认为是被写入的buffer")])]),e._v(" "),t("h3",{attrs:{id:"fs-write-fd-string-position-enconding-callback"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-write-fd-string-position-enconding-callback","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.write(fd,string,position,enconding,callback)")]),e._v(" "),t("p",[e._v("大部分参数和上面的方法类似")]),e._v(" "),t("ul",[t("li",[e._v("string 将要被写入文件的字符串")]),e._v(" "),t("li",[e._v("callback")]),e._v(" "),t("li",[e._v("err 错误")]),e._v(" "),t("li",[e._v("written 指定传入的字符串中被写入的字节数。被写入的字节数不一定与被写入的字符串字符数相同")]),e._v(" "),t("li",[e._v("string 被写入额字符串")])]),e._v(" "),t("h3",{attrs:{id:"fs-writefile-file-data-options-callback"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-writefile-file-data-options-callback","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.writeFile(file,data,options,callback)")]),e._v(" "),t("ul",[t("li",[e._v("file 文件名或者文件描述符 当 file 是一个文件名时，异步地将数据写入到一个文件，如果文件已存在则覆盖该文件。")]),e._v(" "),t("li",[e._v("data  可以是字符串或 buffer。将要被写入到特定文件的数据")]),e._v(" "),t("li",[e._v("options")]),e._v(" "),t("li",[e._v("encoding 字符编码方式")]),e._v(" "),t("li",[e._v("mode 文件的权限 可读|可写|可执行")]),e._v(" "),t("li",[e._v("flag 文件系统标志 r-打开文件用于读取 w-打开文件用于写入")]),e._v(" "),t("li",[e._v("callback\n"),t("ul",[t("li",[e._v("err 错误信息")])])])]),e._v(" "),t("h3",{attrs:{id:"fs-rename-oldpath-newpath-callback-对文件重命名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-rename-oldpath-newpath-callback-对文件重命名","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.rename(oldPath,newPath,callback) 对文件重命名")]),e._v(" "),t("h3",{attrs:{id:"fs-stat-path-options-callback-该方法一般用于查看被打开的是文件还是文件夹"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-stat-path-options-callback-该方法一般用于查看被打开的是文件还是文件夹","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.stat(path,options,callback) 该方法一般用于查看被打开的是文件还是文件夹")]),e._v(" "),t("ul",[t("li",[e._v("callback")]),e._v(" "),t("li",[e._v("err")]),e._v(" "),t("li",[e._v("stats  ---是一个fs.Stats对象\n不建议在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.stat() 检查文件是否存在。 而是应该直接打开、读取或写入文件，如果文件不可用则处理引发的错误。\n要检查文件是否存在但随后并不对其进行操作，则建议使用 fs.access()。")])]),e._v(" "),t("h3",{attrs:{id:"fs-watch-filename-options-listener"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-watch-filename-options-listener","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.watch(fileName,options,listener)")]),e._v(" "),t("ul",[t("li",[e._v("options")]),e._v(" "),t("li",[e._v("persistent 如果文件已经被监视,进程是否应继续进行 默认值true")]),e._v(" "),t("li",[e._v("recursive 指示应监视所有子目录 默认值false")]),e._v(" "),t("li",[e._v("enconding 指定用于传给监听器的文件名的字符编码 默认utf-8")]),e._v(" "),t("li",[e._v("listener function|undefined 默认值undefined")]),e._v(" "),t("li",[e._v("evenType string")]),e._v(" "),t("li",[e._v("filename string\n返回值是fs.FSWatcher")])]),e._v(" "),t("p",[e._v("监听fileName的更改，fileName是文件或者目录")]),e._v(" "),t("p",[e._v("第二个参数是可选的。如果传入字符串，则它指定encoding。否则需要传入对象。")]),e._v(" "),t("p",[e._v("监听器回调有2个参数(eventType,filename)。eventType是'rename'或者'change',filename是触发事件的文件名称")]),e._v(" "),t("p",[e._v("在大多数平台上，每当文件名在目录当中消失或者出现，就会触发'rename'事件")]),e._v(" "),t("p",[e._v("监听器回调绑定在由 fs.FSWatcher触发的change事件上，但它与eventType的'change'值不是一回事")]),e._v(" "),t("h3",{attrs:{id:"fs-watchfile-filename-options-listener"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-watchfile-filename-options-listener","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.watchFile(filename,options,listener)")]),e._v(" "),t("ul",[t("li",[e._v("options")]),e._v(" "),t("li",[e._v("presistent 如果文件已经被监视,进程是否应继续进行 默认值true")]),e._v(" "),t("li",[e._v("interval 指示轮询目标的频率")]),e._v(" "),t("li",[e._v("listener")]),e._v(" "),t("li",[e._v("current 当前的stat对象")]),e._v(" "),t("li",[e._v("previous 之前的stat对象\n监视filename的更改。每当访问文件时都会调用listener回调")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("fs.watchFile('message.text', (curr, prev) => {\n  console.log(`当前的最近修改时间是: ${curr.mtime}`);\n  console.log(`之前的最近修改时间是: ${prev.mtime}`);\n});\n")])])]),t("p",[e._v("这些 stat 对象是 fs.Stat 的实例。")]),e._v(" "),t("h3",{attrs:{id:"fs-appendfile-path-data-optiions-callback"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-appendfile-path-data-optiions-callback","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.appendFile(path,data,optiions,callback)")]),e._v(" "),t("ul",[t("li",[e._v("path 文件名或者文件描述符")]),e._v(" "),t("li",[e._v("data 将要被追加到目标文件的数据资源 string|buffer")]),e._v(" "),t("li",[e._v("options\n"),t("ul",[t("li",[e._v("enconding 编码方式 默认utf-8")]),e._v(" "),t("li",[e._v("mode 权限值 默认O066")]),e._v(" "),t("li",[e._v("flag 文件系统标志 默认'a'")])])]),e._v(" "),t("li",[e._v("callback\n"),t("ul",[t("li",[e._v("err 错误\n异步的将数据追加到目标文件当中,如果文件尚不存在则创建文件。data可以是字符串或者buffer。")])])])]),e._v(" "),t("h2",{attrs:{id:"读写文件当中的流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#读写文件当中的流","aria-hidden":"true"}},[e._v("#")]),e._v(" 读写文件当中的流")]),e._v(" "),t("h3",{attrs:{id:"fs-createreadstream-path-options"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-createreadstream-path-options","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.createReadstream(path,options)")]),e._v(" "),t("ul",[t("li",[e._v("path string|buffer|url")]),e._v(" "),t("li",[e._v("options string | object")]),e._v(" "),t("li",[e._v("flag 文件系统标识符 默认'r'")]),e._v(" "),t("li",[e._v("encoding 默认为null")]),e._v(" "),t("li",[e._v("fd 默认为null")]),e._v(" "),t("li",[e._v("mode 默认为O066 文件的权限值")]),e._v(" "),t("li",[e._v("autoClose 默认值为true 出现错误或者读取结束会自动关闭流")]),e._v(" "),t("li",[e._v("start")]),e._v(" "),t("li",[e._v("end 默认值 infinity")]),e._v(" "),t("li",[e._v("highWaterMark 默认值是64*1024")])]),e._v(" "),t("p",[e._v("返回值为 fs.ReadStream")]),e._v(" "),t("p",[e._v("该方法只是创建了一个可读流，但是监听的事件在readStream实例上")]),e._v(" "),t("p",[e._v("与可读流的16KB的默认highWaterMark不同，此方法返回的流具有64kb的默认值")]),e._v(" "),t("p",[e._v("options可以包括start和end值,以从当前文件中读取一定范围的字节而不是读取整个文件。start和end都包含在内\n并且statr的默认值为0。如果指定了fd并且start被省略或是undefined,则fs.createReadStream()从当前文件位置开始顺序读取。enconding可以是buffer接收的任何一种字符编码。")]),e._v(" "),t("p",[e._v("如果指定了fd,则ReadStream将忽略path参数并使用指定的文件描述符。")]),e._v(" "),t("h3",{attrs:{id:"fs-readstream类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-readstream类","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.ReadStream类")]),e._v(" "),t("p",[e._v("通过fs.createReadStream创建的可读流的返回值都是fs.ReadStream类的实例。所以都可以调用到该类底下的方法。")]),e._v(" "),t("p",[e._v("并且可以使用到可读流下面的所有方法具体可在stream那一章观看")]),e._v(" "),t("p",[e._v("close事件 fs.ReadStream的底层描述符关闭时触发")]),e._v(" "),t("p",[e._v("open事件 fs.ReadStream的文件描述符打开时触发")]),e._v(" "),t("p",[e._v("ready事件 fs.ReadStream准备好使用时触发")]),e._v(" "),t("p",[e._v("data事件 fs.ReadStream读取完文件时触发")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const fs = require('fs')\nconst readStream =  fs.createReadStream('./message1','utf-8')\nreadStream.on('open',(fd)=>{\n  console.log('文件被打开了' + fd)\n})\nreadStream.on('data',(chunk)=>{\n  console.log(chunk)\n})\nreadStream.on('err',(err)=>{\n  console.log('文件读取失败' + err)\n})\nreadStream.on('colse',()=>{\n  console.log('文件被关闭')\n})\nreadStream.on('end',()=>{\n  console.log('文件读取结束')\n})\n")])])]),t("h3",{attrs:{id:"fs-createwritestream"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-createwritestream","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.createWriteStream")]),e._v(" "),t("ul",[t("li",[e._v("path string|buffer|url")]),e._v(" "),t("li",[e._v("options string|object")]),e._v(" "),t("li",[e._v("flags 文件系统标识 默认值为'w'")]),e._v(" "),t("li",[e._v("encoding 字符集 utf-8")]),e._v(" "),t("li",[e._v("mode 文件的权限 默认值O066")]),e._v(" "),t("li",[e._v("autoClose 是否自动关闭 true")]),e._v(" "),t("li",[e._v("start")])]),e._v(" "),t("p",[e._v("该方法只是创建了一个可写流，但是监听的事件在writeStream实例上")]),e._v(" "),t("p",[e._v("options可以包括一个start选项，允许在文件开头之后的某个位置写入文件，允许的值范围在[0,Number.MAX_SAFE_INTEGER]范围内。如果要修改文件而不是覆盖它，则flags需要为r+而不是默认的w默认。\nencoding可以是buffer接受的任何一种字符编码。")]),e._v(" "),t("p",[e._v("与 ReadStream 类似，如果指定了 fd，则 WriteStream 将忽略 path 参数并使用指定的文件描述符。")]),e._v(" "),t("h3",{attrs:{id:"fs-writestream类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fs-writestream类","aria-hidden":"true"}},[e._v("#")]),e._v(" fs.WriteStream类")]),e._v(" "),t("p",[e._v("通过fs.createWriteStream创建的可写流的返回值都是fs.WriteStream类的实例。所以都可以调用到该类底下的方法。")]),e._v(" "),t("p",[e._v("并且可以使用到可写流下面的所有方法具体可在stream那一章观看")]),e._v(" "),t("h4",{attrs:{id:"事件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#事件","aria-hidden":"true"}},[e._v("#")]),e._v(" 事件")]),e._v(" "),t("p",[e._v("err事件 读取文件错误时触发的事件")]),e._v(" "),t("p",[e._v("open 被读取文件被打开时触发的事件")]),e._v(" "),t("p",[e._v("finish 文件写入完成时触发的事件")]),e._v(" "),t("p",[e._v("close 被写入的文件已经关闭")]),e._v(" "),t("h4",{attrs:{id:"方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#方法","aria-hidden":"true"}},[e._v("#")]),e._v(" 方法")]),e._v(" "),t("p",[e._v("writeStream.write('这是我要做的测试内容') 写入数据到文件，参数代表写入的数据")]),e._v(" "),t("p",[e._v("writeStream.end() 停止写入数据到文件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const fs=require('fs');\nconst path=require('path');\nlet writeStream=fs.createWriteStream('./test/b.js',{encoding:'utf8'});\n \n//写入文件发生错误事件\nwriteStream.on('error', (err) => {\n    console.log('发生异常:', err);\n});\n//已打开要写入的文件事件\nwriteStream.on('open', (fd) => {\n    console.log('文件已打开:', fd);\n});\n//文件已经就写入完成事件\nwriteStream.on('finish', () => {\n    console.log('写入已完成..');\n    console.log('读取文件内容:', fs.readFileSync('./test/b.js', 'utf8')); //打印写入的内容\n    console.log(writeStream);\n});\n \n//文件关闭事件\nwriteStream.on('close', () => {\n    console.log('文件已关闭！');\n});\n \nwriteStream.write('这是我要做的测试内容');\nwriteStream.end() 结束写入数据到文件\n")])])])])}],!1,null,null,null);a.default=s.exports}}]);