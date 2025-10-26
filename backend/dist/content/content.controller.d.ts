import { CreateContentDto } from './dto/create-content.dto';
import { ContentService } from './content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    findAll(): Promise<import("./entities/content.entity").Content[]>;
    findOne(id: string): Promise<import("./entities/content.entity").Content>;
    create(payload: CreateContentDto): Promise<import("./entities/content.entity").Content>;
}
//# sourceMappingURL=content.controller.d.ts.map