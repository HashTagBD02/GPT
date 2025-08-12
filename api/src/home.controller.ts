import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import type { Response } from 'express';

@Controller()
export class HomeController {
  @Get('/')
  root(@Res() res: Response) {
    const filePath = join(process.cwd(), 'src', 'public', 'index.html');
    res.type('html');
    createReadStream(filePath).pipe(res);
  }

  @Get('/app.js')
  appJs(@Res() res: Response) {
    const filePath = join(process.cwd(), 'src', 'public', 'app.js');
    res.type('application/javascript');
    createReadStream(filePath).pipe(res);
  }

  @Get('/styles.css')
  styles(@Res() res: Response) {
    const filePath = join(process.cwd(), 'src', 'public', 'styles.css');
    res.type('text/css');
    createReadStream(filePath).pipe(res);
  }
}