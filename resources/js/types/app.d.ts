export interface Room {
    id: number;
    title: string;
    slug: string;
    created_at: DateTimeType;
    users: User[];
}

export interface DateTimeType {
    date: string;
    time: string;
    datetime: string;
    timestamp: number;
    timezone: Timezone;
    timezone_name: string;
    friendly: string;
}

export interface Timezone {
    timezone_type: number;
    timezone: string;
}

export interface Message {
    id: number;
    user_id: number;
    room_id: number;
    content: string;
    created_at: DateTimeType;
    updated_at: DateTimeType;
    user: User;
}

export interface Pagination<T> {
    data: T[];
    links: Links | null | undefined;
    meta: Meta | null | undefined;
}

export interface Links {
    first: string;
    last: string;
    prev: string;
    next: string;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Link {
    url?: string;
    label: string;
    active: boolean;
}
