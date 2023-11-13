import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './exception/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(RootModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  /*
  // To get the module dependency graph.
  // 1. Visit https://mermaid.live/
  // 2. Paster the log value
  
  import { SpelunkerModule } from 'nestjs-spelunker';
  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  console.log('graph LR');
  const mermaidEdges = edges.map(
    ({ from, to }) => `  ${from.module.name}-->${to.module.name}`,
  );
  console.log(mermaidEdges.join('\n'));
  */
  /*
    Global body validation. Now we just need to validate the body in DTO. The only problem with
    this is that now for each route this validation is enabled, what if we want to have different rules for different methods. For body validation, we will use Joi
    
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        whitelist: true,
      }),
    );
  */
  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The User API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
