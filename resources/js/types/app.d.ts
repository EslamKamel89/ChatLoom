export interface Room {
    id: number;
    title: string;
    slug: string;
    created_at: DateTimeType;
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
