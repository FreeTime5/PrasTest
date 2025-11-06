export interface AdminLoginDto {
    email: string;
    password: string;
}

export interface CreateNewsDto {
    title: string;
    imageUrl: string;
    subtitle: string;
    content: string;
    isPublished: boolean;
}

export interface UpdateNewsDto {
    title: string;
    imageUrl: string;
    subtitle: string;
    content: string;
    isPublished: boolean;
}

export interface NewsDto {
    id: number;
    title: string;
    imageUrl: string;
    subtitle: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
}

export interface NewsListItemDto {
    id: number;
    title: string;
    imageUrl: string;
    subtitle: string;
    createdAt: string;
}

export interface PagedResultDto<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
}