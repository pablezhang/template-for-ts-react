一个基于`React16`、`Antd`、`Mobx`、`Typescript`的前端脚手架。
## 为什么是template-for-ts-react
<hr />

目前市面上已经有`create-react-app`等开箱即用的脚手架，但`create-react-app`一方面没有默认支持`typescript`，另一方面，大量的的项目实践中，我们已经将`Typescript`、`React16`、`Mobx`、`Antd`作为`React`项目的最佳实践。因此，我们开始了这个项目，并把大量的后台管理系统实践逐经验渐加入本项目中，我们希望该项目可以为后台管理系统，提供一个快速启动的脚手架、设计良好的模块实践。如果你对项目中有优秀的建议，欢迎联系我们。

## src文件目录结构
├─ App  <br/>
├─ assets <br/>
├─ components <br/>
├─ packages <br/>
├─ pages <br/>
├─ services <br/>
├─ styles <br/>
├─ utils <br/>
├─ widget <br/>
├─ router.ts <br/>

**Note**<br/>
App ----  项目入口文件夹<br />
assets ----  静态资源文件将爱<br />
config ---- 在代码逻辑中会反复读取并且只可读取的内容，如不同环境下的后台服务地址、`cookie`中的关键`keyName`等等 <br />
packages ---- 独立功能模块，通常除了第三方包，它不应该依赖任何模块。随着项目体量的逐渐增大，它可以逐步从项目中分离成为一个独立存在的私有或公有的第三方包。<br />
pages ---- 页面文件：页面级组件，通常情况下我们建议一条`route`对应一个`page`文件夹，并且route名称与page名称保持一致。  <br />
services ---- 系统接口文件，我们需要将系统中所有用到的请求隔离在services文件夹下各个接口文件中。目的是，避免后台接口变动而我们需在在代码逻辑中跟随更改。我们将在下方详细说明我们[设计理由](###接口隔离)。如果你看到了`ExampleService.ts`的内容觉得很奇怪，别着急，我们会同样给出这么做的原因，也不要担心会加大你的工作量，我们同样给出[解决方案](###自动感知接口)。 <br />
style ---- 全局样式文件夹：全系统的通用样式文件，如你的`theme.less`  `common.less`等 <br />
utils ---- 通用功能模块：通常是逻辑固定、大量复用的功能模块，如`request.ts`、`PinYin.ts`等固定输入固定输出的纯净功能模块 <br />
widget ---- 部件模块：通常是固定不变的、没有功能逻辑的组件，如`Footer`、`Header`等UI组件。 <br />
router.ts ---- 前端路由定义文件


### 接口隔离

想象你在工作中是否遇到过这样的场景：

>接到需求后，前后端各自开发对应功能，2天后汇报进度，后台同学：”后端功能做好了，就等前端联调了“，前端同学：“前端功能做好了，就剩跟后台联调了”。产品经理、项目经理听后大喜，向上汇报进度，前后端功能进度完成80%。2天后产品经理迟迟未收到提测邮件，去找前后端同学，发现他们还在联调，前端同学委屈的说到：“后台的接口有问题需要改接口或者改参数。同一个接口在3个页面里调用过，后端同学改一个url，前端需要修改3个页面里的url，并且再提交再发布，再测试”。

在这里不讨论前后端如何高效协作的问题。考虑下前端在这种情形下，有哪些情况是可以避免的。把前端、后端分别看成两个功能模块A和B的情形，此时A依赖B，而B并不依赖A，同时B对外暴露的功能可能是变化的。此时我们需要考虑两个情况，1、B提供的功能可能是变化的，我们需要随时应对这种变化。2、我们完全不知道B变化的可能性。应对于此，我们需要将变化的部分隔离出去，将固定的部分封装起来。

思考下`Socket`通信，`Socket`两端不用考虑对方是什么样的情形，`Service`设计的目的也是基于此，不论后台接口的url、参数如何变化，我们的调用方式是不变的，如`ExampleService.getExampleList(...restPara)`。

在一个用户管理的功能里，当前端需要删除一个用户时，前端的代码逻辑应该是：调用删除接口-->删除成功/失败-->提示并刷新。而不应该关心这个接口url是什么，参数是什么。根据迪米特法则，我们的功能应该只负责调用接口，不关心如何调用到后台的接口。至于参数，我们应该尽早提前约定，或者预判需要参数。此时应对上述场景，我们只需要修改`Service`文件即可，不用修改逻辑代码文件。
另外一个场景
>在工作中，后台同学提供了一份swagger接口文档。前端同学每次查询该文档调用某个接口。相当于，我们从swagger-ui上摘录接口使用方法，想象大家在开发过程中是否遇到过以下问题：
>1. 调用接口发现接口报404，费心费力检查发现把单词拼错了~
>2. 调用接口发现接口报400，仔细对比swagger发现参数类型写错、参数名称写错~
>3. 一时大意把请求类型写错了~

如果有10位开发同学调用过同一个接口，上述的犯错情形的次数会被放大10倍，严重浪费前端的开发时间。如果后台需要修改某一个接口，他可能要通知10个前端，或者某些情形下不敢修改该接口。因此我们要将这些变化、机械抄录的内容隔离在`Service`文件中。

### 自动感知接口

如果需要手动抄录swagger接口文件并保存在前端，这无疑是一个既无聊枯燥又无人情愿的"dirty work"，而[auto-swagger](https://github.com\/pablezhang\/auto-swagger\#auto-swagger)正是为了解决这种情况而出现的，使用`auto-swagger`你可以在几秒内获取到全部的接口文件，而后台接口变化时，我们又可以很及时感知到接口发生了变化。
