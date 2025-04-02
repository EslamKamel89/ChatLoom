<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DateTimeResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        /** @var \Carbon\Carbon $dateTime */
        $dateTime = $this->resource;
        return [
            'date' => $dateTime->format('Y-m-d'),
            'time' => $dateTime->format('H:i:s'),
            'datetime' => $dateTime->format('Y-m-d H:i:s'),
            'timestamp' => $dateTime->timestamp,
            'timezone' => $dateTime->timezone,
            'timezone_name' => $dateTime->getTimezone()->getName(),
            'friendly' => $dateTime->diffForHumans(),
        ];
    }
}
