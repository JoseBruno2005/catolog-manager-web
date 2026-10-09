import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const CatalogTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554',
        },

        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
        },
    },
    components: {
        button: {
            root: {
                borderRadius: '8px',
                paddingX: '1.25rem',
                paddingY: '0.625rem',
                gap: '0.5rem',
                label: {
                    fontWeight: '600',
                },
                focusRing: {
                    width: '2px',
                    style: 'solid',
                    offset: '2px',
                },
            },

            colorScheme: {
                light: {
                    root: {
                        primary: {
                            background: '{primary.600}',
                            hoverBackground: '{primary.700}',
                            activeBackground: '{primary.800}',
                            borderColor: '{primary.600}',
                            hoverBorderColor: '{primary.700}',
                            activeBorderColor: '{primary.800}',
                            color: '#ffffff',
                            hoverColor: '#ffffff',
                            activeColor: '#ffffff',
                        },
                        secondary: {
                            background: '{surface.100}',
                            hoverBackground: '{surface.50}',
                            color: '{surface.700}',
                        },
                    },
                    outlined: {
                        primary: {
                            hoverBackground: '{primary.50}',
                            borderColor: '{primary.300}',
                            color: '{primary.700}',
                        },
                    },
                    text: {
                        primary: {
                            hoverBackground: '{primary.50}',
                            color: '{primary.700}',
                        },
                    },
                },
            },
        },
    },
});