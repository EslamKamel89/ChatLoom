<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder {
    protected array $rooms = ['Main', 'Inertia', 'Vue', 'React', 'Svelte', 'Alpine', 'Livewire', 'Laravel', 'PHP', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Tailwind CSS', 'Bootstrap', 'Foundation', 'Bulma', 'Materialize CSS'];
    /**
     * Run the database seeds.
     */
    public function run(): void {
        collect($this->rooms)->each(function (string $roomStr) {
            Room::create([
                'title' => $roomStr,
                'slug' => str($roomStr)->slug(),
            ]);
        });
    }
}
