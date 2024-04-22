import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
  constructor(private mensajesService: MensajesService) {}

  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
    this.mensajesService
      .createMensaje(createMensajeDto)
      .then((mensaje) => {
        response.status(HttpStatus.CREATED).json(mensaje);
      })
      .catch(() =>
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'err en la creacion del mensaje' }),
      );
  }

  @Get()
  getAll(@Res() response) {
    this.mensajesService
      .getAll()
      .then((mensajeList) => {
        response.status(HttpStatus.OK).json(mensajeList);
      })
      .catch(() =>
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'err en la obtencion de mensajes' }),
      );
  }

  @Put(':id')
  update(
    @Body() updateMensajeDto: CreateMensajeDto,
    @Res() response,
    @Param('id') idMensaje,
  ) {
    this.mensajesService
      .updateMensaje(idMensaje, updateMensajeDto)
      .then((mensaje) => {
        response.status(HttpStatus.OK).json(mensaje);
      })
      .catch(() =>
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'err en la edicionn del mensaje' }),
      );
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') idMensaje) {
    this.mensajesService
      .deleteMensaje(idMensaje)
      .then((mensaje) => {
        response.status(HttpStatus.OK).json(mensaje);
      })
      .catch(() =>
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'err en la eliminacion del mensaje' }),
      );
  }
}
