import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import * as winston from 'winston'
import * as os from 'os'
import * as fs from 'fs'
import { Loggly } from 'winston-loggly-bulk'

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new Loggly({
          token: process.env.LOGGLY_TOKEN,
          subdomain: 'influencercrm',
          tags: [process.env.NODE_ENV, 'influencercrm', os.hostname()],
          json: true,
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('influencercrm', { prettyPrint: true })
          ),
        }),
      ],
    }),
  })

  app.disable('x-powered-by')
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({})
    }

    next()
  })

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Influencer CRM')
    .setDescription('Influencer API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' })
    .build()
  const document = SwaggerModule.createDocument(app, config)

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document))

  SwaggerModule.setup('swagger', app, document)

  const port = process.env.PORT || 5000
  await app.listen(port)
}

bootstrap()
