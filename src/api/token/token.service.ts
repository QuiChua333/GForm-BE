import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities';
import { TokenRepository } from './token.repository';
import { UserService } from '../user/user.service';
import { CreateTokenDto, UpdateTokenDto, UpdatedTokenDto } from './dto';
import { ITokenOptionWhere } from './token.interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: TokenRepository,

    private userService: UserService,
  ) {}

  public async create(tokenInfo: CreateTokenDto): Promise<Token> {
    const user = await this.userService.findOneById(tokenInfo.userId);
    const createToken = this.tokenRepository.create({
      ...tokenInfo,
      user,
    });

    await this.tokenRepository.save(createToken);

    return createToken;
  }

  public async updateByUserId(
    userId: string,
    updateTokenData: UpdateTokenDto,
  ): Promise<UpdatedTokenDto> {
    const updatedToken = await this.tokenRepository.update(
      {
        user: {
          id: userId,
        },
      },
      updateTokenData,
    );
    return updatedToken as UpdatedTokenDto;
  }

  public async findOneBy(option: ITokenOptionWhere): Promise<Token> {
    const token = await this.tokenRepository.findOneBy(option);
    return token;
  }
}
