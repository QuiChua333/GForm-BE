import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinearScale } from './Entity/linear_scale';
import { UpdateLinearScaleDTO } from './DTO/update-linear-scale.dto';

@Injectable()
export class LinearScaleService {
  constructor(
    @InjectRepository(LinearScale)
    private readonly linearScaleRepository: Repository<LinearScale>,
  ) {}

  async changeLinearScale(id: string, body: UpdateLinearScaleDTO) {
    const linearScale = await this.linearScaleRepository.findOne({
      where: {
        id: id,
      },
    });
    linearScale.min = body.min ?? linearScale.min;
    linearScale.max = body.max ?? linearScale.max;
    linearScale.leftLabel = body.leftLabel ?? linearScale.leftLabel;
    linearScale.rightLabel = body.rightLabel ?? linearScale.rightLabel;

    return await this.linearScaleRepository.save(linearScale);
  }
}
