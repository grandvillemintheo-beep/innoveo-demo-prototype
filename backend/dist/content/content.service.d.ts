import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entities/content.entity';
export declare class ContentService {
    private readonly contentRepository;
    private readonly usersRepository;
    constructor(contentRepository: Repository<Content>, usersRepository: Repository<User>);
    findAll(): Promise<Content[]>;
    findOne(id: string): Promise<Content>;
    create(payload: CreateContentDto): Promise<Content>;
}
//# sourceMappingURL=content.service.d.ts.map