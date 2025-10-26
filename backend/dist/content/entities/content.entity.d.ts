import { User } from '../../database/entities/user.entity';
export declare class Content {
    id: string;
    title: string;
    body: string;
    publishedAt?: Date | null;
    author: User;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=content.entity.d.ts.map