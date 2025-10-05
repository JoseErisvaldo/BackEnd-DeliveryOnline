import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { EstablishmentService } from "./establishment.service";
import { CreateEstablishmentDto } from "./dto/create-establishment.dto";
import { UpdateEstablishmentDto } from "./dto/update-establishment.dto";
import { EstablishmentResponseDto } from "./dto/establishment-response.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("establishments")
@UseGuards(JwtAuthGuard)
export class EstablishmentController {
  constructor(
    private readonly establishmentService: EstablishmentService,
  ) {}

  @Post()
  async create(@Body() body: CreateEstablishmentDto & { userId: string }) {
    const createEstablishmentDto: CreateEstablishmentDto = {
      ...body,
      ownerId: body.userId,
    };
    delete (createEstablishmentDto as any).userId;
    return this.establishmentService.create(createEstablishmentDto, body.userId);
  }

  @Get()
  findAll(@Request() req): Promise<EstablishmentResponseDto[]> {
    return this.establishmentService.findAllByUser(req.user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<EstablishmentResponseDto> {
    return this.establishmentService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
    @Request() req,
  ) {
    return this.establishmentService.update(
      id,
      updateEstablishmentDto,
      req.user.id,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Request() req) {
    return this.establishmentService.remove(id, req.user.id);
  }
}
