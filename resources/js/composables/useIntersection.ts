import { useIntersectionObserver } from '@vueuse/core';
import { shallowRef, useTemplateRef } from 'vue';

export default function useIntersection() {
    const target = useTemplateRef<HTMLDivElement>('target');
    const targetIsVisible = shallowRef(false);
    const { stop } = useIntersectionObserver(target, ([entry], observerElement) => {
        targetIsVisible.value = entry?.isIntersecting || false;
    });
    return { target, targetIsVisible, stop };
}
