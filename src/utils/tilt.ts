interface TiltSettings {
    max: number;
    duration: number;
    enabled: boolean;
}

const DEFAULT_SETTINGS: TiltSettings = { max: 15, duration: 300, enabled: true };

const getSettings = (customSettings: Partial<TiltSettings>): TiltSettings => {
    return { ...DEFAULT_SETTINGS, ...customSettings };
}

const calculateTilt = (e: MouseEvent, rect: DOMRect, max: number): { tiltX: number; tiltY: number } => {
    const percX = (e.clientX - rect.left) / rect.width;
    const percY = (e.clientY - rect.top) / rect.height;

    const tiltX = (max - percX * 2 * max);
    const tiltY = (percY * 2 * max - max);

    return { tiltX, tiltY };
}

export default function tilt(node: HTMLDivElement, customSettings: Partial<TiltSettings>) {
    if (DEFAULT_SETTINGS.enabled === false) return;

    let settings = getSettings(customSettings);
    let allowImmediateResponse = false;

    const applyTilt = (tiltX: number, tiltY: number, immediate = false) => {
        node.style.transition = immediate && allowImmediateResponse ? 'none' : `transform ${settings.duration}ms`;
        node.style.transform = `perspective(2000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
    }

    const onMouseMove = (e: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const { tiltX, tiltY } = calculateTilt(e, rect, settings.max);
        applyTilt(tiltX, tiltY, true);
    }

    const onMouseEnter = () => {
        allowImmediateResponse = false;
        applyTilt(settings.max / 4, -settings.max / 4);

        setTimeout(() => {
            allowImmediateResponse = true;
        }, 50);
    }

    const onMouseLeave = () => {
        applyTilt(0, 0);
    }

    node.addEventListener('mousemove', onMouseMove);
    node.addEventListener('mouseenter', onMouseEnter);
    node.addEventListener('mouseleave', onMouseLeave);

    return {
        destroy() {
            node.removeEventListener('mousemove', onMouseMove);
            node.removeEventListener('mouseenter', onMouseEnter);
            node.removeEventListener('mouseleave', onMouseLeave);
        },
        update(newSettings: Partial<TiltSettings>) {
            settings = getSettings(newSettings);
        }
    };
}