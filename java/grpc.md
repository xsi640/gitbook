###  server

开始服务：

```java
 server = ServerBuilder.forPort(port)
                .addService(new GreeterImpl()) //注册服务
                .build()
                .start();
        logger.info("Server started, listening on " + port);
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                // Use stderr here since the logger may have been reset by its JVM shutdown hook.
                System.err.println("*** shutting down gRPC server since JVM is shutting down");
                HelloWorldServer.this.stop();
                System.err.println("*** server shut down");
            }
        });
```

grpc注册服务addService()方法

里面传的实现BindableService接口，如果使用protobuff，会帮助自动生成

```java
public interface BindableService {
  /**
   * Creates {@link ServerServiceDefinition} object for current instance of service implementation.
   *
   * @return ServerServiceDefinition object.
   */
  ServerServiceDefinition bindService();
}
```

bindService方法中，通常使用ServerServiceDefinition.builder去构造ServerServiceDefinition。

```java
ServerServiceDefinition.builder(
                    GreeterGrpc.getServiceDescriptor()) //ServiceDescriptor，服务定义，(服务名称，方法描述...)
                    .addMethod(GreeterGrpc.METHOD_SAY_HELLO, ServerCalls.asyncUnaryCall(new GreeterGrpc.MethodHandlers(this, 0)))//添加方法，方法名称，处理方法的handler
  .build()
```

两步创建ServerServiceDefinition

- 实现服务定义
- 增加方法

实现服务定义非常简单，传入服务名称和，方法名称即可，如下

```java
new ServiceDescriptor("Greeter", new MethodDescriptor[]{MethodDescriptor.create(MethodDescriptor.MethodType.UNARY, 
                MethodDescriptor.generateFullMethodName("Greeter", "SayHello"), 
                ProtoUtils.marshaller(HelloRequest.getDefaultInstance()), 
                ProtoUtils.marshaller(HelloReply.getDefaultInstance()))})
```

其中，MethodType为方法类型，grpc提供了几种的远程调用的方法类型，通常使用UNARY。

```java
public enum MethodType {
    /**
     * One request message followed by one response message.
     */
    UNARY,

    /**
     * Zero or more request messages followed by one response message.
     */
    CLIENT_STREAMING,

    /**
     * One request message followed by zero or more response messages.
     */
    SERVER_STREAMING,

    /**
     * Zero or more request and response messages arbitrarily interleaved in time.
     */
    BIDI_STREAMING,

    /**
     * Cardinality and temporal relationships are not known. Implementations should not make
     * buffering assumptions and should largely treat the same as {@link #BIDI_STREAMING}.
     */
    UNKNOWN;
}
```

添加方法addMethod()相对来说比较复杂，第一个参数MethodDescriptor，第二个参数ServerCallHandler

第一个参数MethodDescriptor，和new ServiceDescriptor()方法的第二个参数一致。

第二个参数实现ServerCallHandler<ReqT, RespT>，这个接口。

第二个参数通常使用下面代码构建

```java
ServerCalls.asyncUnaryCall(new GreeterGrpc.MethodHandlers(this, 0))
```

GreeterGrpc.MethodHandlers中，会实现UnaryMethod<ReqT, RespT>，等方法接口，接口实现类中会调用真正处理sayHello的方法，grpc会将参数封装成request和reply对象，实际上这两个对象继承GeneratedMessageV3抽象类，实现MessageOrBuilder接口。

我们会创建两类

