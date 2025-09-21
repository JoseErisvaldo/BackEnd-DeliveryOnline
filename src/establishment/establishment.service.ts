import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEstablishmentDto } from "./dto/create-establishment.dto";
import { UpdateEstablishmentDto } from "./dto/update-establishment.dto";
import { EstablishmentResponseDto } from "./dto/establishment-response.dto";
import { plainToInstance } from "class-transformer";
import { EstablishmentRepository } from "./establishment.repository";
import { User } from "../users/user.entity";

@Injectable()
export class EstablishmentService {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
  ) {}
  async create(
    createEstablishmentDto: CreateEstablishmentDto,
    ownerId: string,
  ) {
    console.log("for ownerId:", ownerId);
    const establishment = this.establishmentRepository.create({
      ...createEstablishmentDto,
      owner: { id: ownerId } as User,
    });
    const saved = await this.establishmentRepository.save(establishment);
    return plainToInstance(EstablishmentResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAllByUser(userId: string) {
    const establishments =
      await this.establishmentRepository.findAllByOwner(userId);
    return plainToInstance(EstablishmentResponseDto, establishments, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<EstablishmentResponseDto> {
    const establishment = await this.establishmentRepository.findOneById(id);
    if (!establishment) {
      throw new NotFoundException(`Establishment with id ${id} not found`);
    }
    return plainToInstance(EstablishmentResponseDto, establishment, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDto: UpdateEstablishmentDto, ownerId: string) {
    const existing = await this.establishmentRepository.findOneById(id);
    if (!existing || existing.owner.id !== ownerId) {
      throw new NotFoundException(
        `Establishment with id ${id} not found for this user`,
      );
    }
    await this.establishmentRepository.update(id, updateDto);
    return { message: `Establishment with id ${id} updated successfully` };
  }

  async remove(id: string, ownerId: string) {
    const existing = await this.establishmentRepository.findOneById(id);
    if (!existing || existing.owner.id !== ownerId) {
      throw new NotFoundException(
        `Establishment with id ${id} not found for this user`,
      );
    }
    await this.establishmentRepository.delete(id);
    return { message: `Establishment with id ${id} deleted successfully` };
  }
}
