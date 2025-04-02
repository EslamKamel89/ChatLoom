import { Room } from '@/types/app';
import { useAxios } from './useAxios';

const { data: rooms, execute, loading } = useAxios<Room[]>({ baseURL: route('rooms.index') });
export default function useRoomsIndex() {
    return {
        rooms,
        execute,
        loading,
    };
}
