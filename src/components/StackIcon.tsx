type IconProps = { size?: number };

// Возвращает брендовый цвет для градиента на карточке
export const ICON_COLORS: Record<string, string> = {
  react:           '#61DAFB',
  next:            '#ffffff',
  typescript:      '#3178C6',
  layers:          '#6366f1', // TanStack
  wind:            '#38BDF8', // Tailwind
  sparkles:        '#a78bfa', // Framer Motion
  pencil:          '#1a1a2e', // tldraw
  video:           '#DD0B78', // LiveKit
  server:          '#E0234E', // NestJS
  flame:           '#FF5B11', // Hono
  plug:            '#398CCB', // tRPC
  network:         '#E535AB', // GraphQL
  database:        '#2D3748', // Prisma
  'hard-drive':    '#336791', // PostgreSQL
  zap:             '#DC382D', // Redis
  shield:          '#7c3aed', // Better Auth
  box:             '#2496ED', // Docker
  split:           '#009900', // Nginx
  workflow:        '#2088FF', // GitHub Actions
  terminal:        '#FCC624', // Linux
  'git-branch':    '#F05032', // Git
  figma:           '#F24E1E', // Figma
  code:            '#007ACC', // VS Code
  send:            '#FF6C37', // Postman
  notebook:        '#000000', // Notion
  'message-circle':'#26A5E4', // Telegram
};

function ReactIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 12 12)" />
    </svg>
  );
}

function NextIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#000" />
      <path d="M8 16V8.5L17.5 19.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8.5h5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TSIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path d="M6 10h6M9 10v7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.5 15.5c0 .8.6 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-1.5-3-1.5-3-3 0-.8.6-1.5 1.5-1.5s1.5.7 1.5 1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TanStackIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#EF4444" />
      <path d="M4 8h16M4 12h10M4 16h13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TailwindIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 10.5C6.75 7.5 8.625 6 11.25 6c4.125 0 5.063 3 7.688 3.5C21 10 23 9 24 7.5c-.75 3-2.625 4.5-5.25 4.5-4.125 0-5.063-3-7.688-3.5C9 8 7 9 6 10.5Z" fill="#38BDF8" />
      <path d="M0 16.5C.75 13.5 2.625 12 5.25 12c4.125 0 5.063 3 7.688 3.5C15 16 17 15 18 13.5c-.75 3-2.625 4.5-5.25 4.5-4.125 0-5.063-3-7.688-3.5C3 14 1 15 0 16.5Z" fill="#38BDF8" />
    </svg>
  );
}

function FramerIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 3h14v6H5zM5 9h7l7 6H5zM5 15h7v6z" fill="#a78bfa" />
    </svg>
  );
}

function LiveKitIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#DD0B78" />
      <circle cx="8" cy="12" r="2" fill="white" />
      <circle cx="16" cy="12" r="2" fill="white" />
      <path d="M10 12h4" stroke="white" strokeWidth="1.5" />
      <path d="M4 8c2-2 4-3 8-3s6 1 8 3M4 16c2 2 4 3 8 3s6-1 8-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NestIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9.5 4C7 5.5 5 8 5 12c0 4.5 3.5 8 7.5 8 .8 0 1.5-.1 2.2-.3" stroke="#E0234E" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.5 4C17 5.5 19 8 19 12c0 4.5-3.5 8-7.5 8-.8 0-1.5-.1-2.2-.3" stroke="#E0234E" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 4v16" stroke="#E0234E" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HonoIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3c-1.5 3-4 5-4 9a4 4 0 0 0 8 0c0-4-2.5-6-4-9z" fill="#FF5B11" />
      <path d="M10 14c0 1.1.9 2 2 2s2-.9 2-2" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

function TRPCIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="12" fill="#398CCB" />
      <path d="M7 9h10M7 12h7M7 15h9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GraphQLIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" stroke="#E535AB" strokeWidth="1.5" />
      <circle cx="12" cy="3" r="1.5" fill="#E535AB" />
      <circle cx="20" cy="7.5" r="1.5" fill="#E535AB" />
      <circle cx="20" cy="16.5" r="1.5" fill="#E535AB" />
      <circle cx="12" cy="21" r="1.5" fill="#E535AB" />
      <circle cx="4" cy="16.5" r="1.5" fill="#E535AB" />
      <circle cx="4" cy="7.5" r="1.5" fill="#E535AB" />
      <line x1="12" y1="3" x2="20" y2="16.5" stroke="#E535AB" strokeWidth="1" />
      <line x1="12" y1="3" x2="4" y2="16.5" stroke="#E535AB" strokeWidth="1" />
      <line x1="4" y1="7.5" x2="20" y2="7.5" stroke="#E535AB" strokeWidth="1" />
    </svg>
  );
}

function PrismaIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 19.5L12 3l5 13.5-13 3z" fill="#2D3748" stroke="#718096" strokeWidth="1" />
      <path d="M12 3l5 13.5-13 3" stroke="#A0AEC0" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function PostgresIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="8" rx="7" ry="4" stroke="#336791" strokeWidth="1.5" />
      <path d="M5 8v8c0 2.2 3.1 4 7 4s7-1.8 7-4V8" stroke="#336791" strokeWidth="1.5" />
      <path d="M5 12c0 2.2 3.1 4 7 4s7-1.8 7-4" stroke="#336791" strokeWidth="1.5" />
    </svg>
  );
}

function RedisIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 15l9 4.5 9-4.5" stroke="#DC382D" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 11l9 4.5 9-4.5" stroke="#DC382D" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 7l9 4.5 9-4.5-9-4.5z" stroke="#DC382D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DockerIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="11" width="3" height="3" rx=".5" fill="#2496ED" />
      <rect x="6" y="11" width="3" height="3" rx=".5" fill="#2496ED" />
      <rect x="10" y="11" width="3" height="3" rx=".5" fill="#2496ED" />
      <rect x="10" y="7" width="3" height="3" rx=".5" fill="#2496ED" />
      <rect x="14" y="7" width="3" height="3" rx=".5" fill="#2496ED" />
      <rect x="6" y="7" width="3" height="3" rx=".5" fill="#2496ED" />
      <path d="M21 12c-.5-1-1.8-1.5-3-1.2-.2-1.5-1.2-2.5-2.5-2.8" stroke="#2496ED" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M2 14.5c.5 2 2.5 3.5 7 3.5h4c3 0 5-1.5 5-4" stroke="#2496ED" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function GitIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="2" fill="#F05032" />
      <circle cx="6" cy="18" r="2" fill="#F05032" />
      <circle cx="18" cy="10" r="2" fill="#F05032" />
      <path d="M6 8v8M6 8c0-2 2-4 4-4h2M8 10h4a2 2 0 0 1 2 2v0a2 2 0 0 0 2 2h0" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FigmaIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 3h4a4 4 0 0 1 0 8H8z" fill="#F24E1E" />
      <path d="M8 11h4a4 4 0 0 1 0 8H8z" fill="#A259FF" />
      <path d="M8 3H4a4 4 0 0 0 0 8h4z" fill="#FF7262" />
      <circle cx="16" cy="15" r="4" fill="#1ABCFE" />
      <path d="M8 11v8" stroke="#0ACF83" strokeWidth="0" />
      <path d="M4 11a4 4 0 0 0 4 4" fill="#0ACF83" />
    </svg>
  );
}

function VSCodeIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17 3L5 13.5l-2-1.5-1 1 3 2.5L3 17l1 1 2-1.5L17 21l4-2V5l-4-2z" fill="#007ACC" />
      <path d="M17 7l-7 6 7 5V7z" fill="white" opacity=".5" />
    </svg>
  );
}

function PostmanIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="#FF6C37" />
      <path d="M8 12h8M14 9l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NotionIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#000" />
      <path d="M7 7h6l4 4v6H7z" fill="white" />
      <path d="M7 7v10M7 17h10M17 11h-4V7" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

function TelegramIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#26A5E4" />
      <path d="M6 12l3 3 7-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 11l14-5-5 14-3-5-6-4z" fill="white" />
    </svg>
  );
}

function NginxIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L3 19h18z" fill="#009900" />
      <path d="M9 16V10l6 6V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubActionsIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#2088FF" />
      <circle cx="12" cy="12" r="3" fill="white" />
      <path d="M12 5v4M12 15v4M5 12h4M15 12h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LinuxIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3C9 3 7 6 7 9c0 2 .5 3.5 1 5l-2 4c-.5 1 0 2 1 2h10c1 0 1.5-1 1-2l-2-4c.5-1.5 1-3 1-5 0-3-2-6-5-6z" fill="#FCC624" />
      <circle cx="10" cy="9" r="1" fill="#333" />
      <circle cx="14" cy="9" r="1" fill="#333" />
      <path d="M10 13c.5 1 3.5 1 4 0" stroke="#333" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function BetterAuthIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#7c3aed" />
      <path d="M12 5l2 4h4l-3 3 1 4-4-2.5L8 16l1-4-3-3h4z" fill="white" />
    </svg>
  );
}

function TldrawIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#1a1a2e" />
      <path d="M6 18L12 6l6 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 13h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const map: Record<string, (p: IconProps) => JSX.Element> = {
  react:           ReactIcon,
  next:            NextIcon,
  typescript:      TSIcon,
  layers:          TanStackIcon,
  wind:            TailwindIcon,
  sparkles:        FramerIcon,
  pencil:          TldrawIcon,
  video:           LiveKitIcon,
  server:          NestIcon,
  flame:           HonoIcon,
  plug:            TRPCIcon,
  network:         GraphQLIcon,
  database:        PrismaIcon,
  'hard-drive':    PostgresIcon,
  zap:             RedisIcon,
  shield:          BetterAuthIcon,
  box:             DockerIcon,
  split:           NginxIcon,
  workflow:        GithubActionsIcon,
  terminal:        LinuxIcon,
  'git-branch':    GitIcon,
  figma:           FigmaIcon,
  code:            VSCodeIcon,
  send:            PostmanIcon,
  notebook:        NotionIcon,
  'message-circle':TelegramIcon,
};

export default function StackIcon({ name, size = 22 }: { name: string; size?: number }) {
  const I = map[name];
  if (!I) return null;
  return <I size={size} />;
}
