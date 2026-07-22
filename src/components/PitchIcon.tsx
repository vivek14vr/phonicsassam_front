"use client";

import type { ReactNode } from "react";
import type { PitchIconName } from "@/lib/workshopPitch";

type IconParts = {
  soft?: string;
  fill: string;
  accent: string;
  ink?: string;
};

const palette: Record<PitchIconName, IconParts> = {
  teacher: { soft: "#F3D9FA", fill: "#B66ACB", accent: "#7A3D96", ink: "#2A1A32" },
  parent: { soft: "#FFE0EC", fill: "#F06292", accent: "#B66ACB", ink: "#2A1A32" },
  counsel: { soft: "#DCEBFF", fill: "#5B9FD8", accent: "#B66ACB", ink: "#2A1A32" },
  coord: { soft: "#E8F8E0", fill: "#6BBF59", accent: "#B66ACB", ink: "#2A1A32" },
  content: { soft: "#FFF0D6", fill: "#F0A202", accent: "#B66ACB", ink: "#2A1A32" },
  head: { soft: "#E6E0FF", fill: "#7C6CF0", accent: "#B66ACB", ink: "#2A1A32" },
  coach: { soft: "#D9F5F2", fill: "#2EB8A8", accent: "#B66ACB", ink: "#2A1A32" },
  passion: { soft: "#FFE0E6", fill: "#E84A6F", accent: "#F7A1B5", ink: "#2A1A32" },
  secret: { soft: "#E8E0F7", fill: "#8B6BC9", accent: "#F0A202", ink: "#2A1A32" },
  story: { soft: "#FFE8D6", fill: "#E07A3D", accent: "#B66ACB", ink: "#2A1A32" },
  bulb: { soft: "#FFF6C8", fill: "#F5C542", accent: "#B66ACB", ink: "#2A1A32" },
  sound: { soft: "#DCF4FF", fill: "#3BA3E0", accent: "#B66ACB", ink: "#2A1A32" },
  write: { soft: "#E8F5E0", fill: "#B66ACB", accent: "#6BBF59", ink: "#2A1A32" },
  group: { soft: "#F3D9FA", fill: "#B66ACB", accent: "#F06292", ink: "#2A1A32" },
  cert: { soft: "#FFF0D6", fill: "#F0A202", accent: "#6BBF59", ink: "#2A1A32" },
  play: { soft: "#F3D9FA", fill: "#B66ACB", accent: "#7A3D96", ink: "#2A1A32" },
  cards: { soft: "#DCEBFF", fill: "#5B9FD8", accent: "#F06292", ink: "#2A1A32" },
  blend: { soft: "#E8F8E0", fill: "#6BBF59", accent: "#5B9FD8", ink: "#2A1A32" },
  sheet: { soft: "#FFF6C8", fill: "#F5C542", accent: "#B66ACB", ink: "#2A1A32" },
  steps: { soft: "#E6E0FF", fill: "#7C6CF0", accent: "#2EB8A8", ink: "#2A1A32" },
  tricky: { soft: "#FFE0EC", fill: "#E84A6F", accent: "#F0A202", ink: "#2A1A32" },
  bank: { soft: "#D9F5F2", fill: "#2EB8A8", accent: "#F0A202", ink: "#2A1A32" },
  notes: { soft: "#F3D9FA", fill: "#B66ACB", accent: "#5B9FD8", ink: "#2A1A32" },
  share: { soft: "#DCEBFF", fill: "#5B9FD8", accent: "#E84A6F", ink: "#2A1A32" },
  map: { soft: "#E8F8E0", fill: "#6BBF59", accent: "#F0A202", ink: "#2A1A32" },
  pin: { soft: "#FFE0EC", fill: "#E84A6F", accent: "#B66ACB", ink: "#2A1A32" },
  calendar: { soft: "#DCEBFF", fill: "#5B9FD8", accent: "#F5C542", ink: "#2A1A32" },
  camera: { soft: "#F3D9FA", fill: "#B66ACB", accent: "#2EB8A8", ink: "#2A1A32" },
  school: { soft: "#FFF0D6", fill: "#F0A202", accent: "#7C6CF0", ink: "#2A1A32" },
};

function buildIcon(name: PitchIconName): ReactNode {
  const c = palette[name];
  const ink = c.ink ?? "#2A1A32";

  switch (name) {
    case "teacher":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <circle cx="12" cy="8.2" r="3.4" fill={c.fill} />
          <path d="M5.5 19.5c1.4-3.6 3.8-5.4 6.5-5.4s5.1 1.8 6.5 5.4" fill={c.accent} />
          <circle cx="12" cy="8.2" r="3.4" fill="none" stroke={ink} strokeWidth="1.4" />
          <path d="M5.5 19.5c1.4-3.6 3.8-5.4 6.5-5.4s5.1 1.8 6.5 5.4" fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M4.2 12.2 7 10.8l1 2M19.8 12.2 17 10.8l-1 2" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      );
    case "parent":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <circle cx="8.2" cy="8.5" r="2.8" fill={c.fill} />
          <circle cx="15.6" cy="9" r="2.3" fill={c.accent} />
          <path d="M3.5 19c1.1-3.2 2.9-4.8 4.7-4.8 1.5 0 2.8.9 3.7 2.4" fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M12.5 19c.7-2.2 2.1-3.4 3.7-3.4 1.5 0 2.7 1 3.4 3.4" fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="12" cy="14.2" r="1.5" fill={c.fill} />
        </>
      );
    case "counsel":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M5 18.5V8.4A3.6 3.6 0 0112 7a3.6 3.6 0 017 1.4V18.5" fill={c.fill} opacity="0.85" />
          <path d="M5 18.5V8.4A3.6 3.6 0 0112 7a3.6 3.6 0 017 1.4V18.5" fill="none" stroke={ink} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M12 7v11.5M5 13h14" stroke={ink} strokeWidth="1.35" strokeLinecap="round" />
          <circle cx="8.4" cy="10.4" r="1.15" fill={c.accent} />
          <circle cx="15.6" cy="10.4" r="1.15" fill="#F5C542" />
        </>
      );
    case "coord":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <rect x="4.5" y="4.5" width="15" height="15" rx="2.2" fill={c.fill} opacity="0.9" />
          <rect x="4.5" y="4.5" width="15" height="15" rx="2.2" fill="none" stroke={ink} strokeWidth="1.4" />
          <path d="M4.5 9h15" stroke={ink} strokeWidth="1.35" />
          <circle cx="7.2" cy="6.7" r="0.85" fill="#E84A6F" />
          <circle cx="9.5" cy="6.7" r="0.85" fill="#F5C542" />
          <circle cx="11.8" cy="6.7" r="0.85" fill="#5B9FD8" />
          <path d="M7.2 13h4M7.2 16h6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14.8 12.4l1.7 1.7 3-3.1" stroke={c.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      );
    case "content":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M7 3.8h6.2L17.8 8v11.8a1.4 1.4 0 01-1.4 1.4H7A1.4 1.4 0 015.6 19.8V5.2A1.4 1.4 0 017 3.8z" fill={c.fill} />
          <path d="M7 3.8h6.2L17.8 8v11.8a1.4 1.4 0 01-1.4 1.4H7A1.4 1.4 0 015.6 19.8V5.2A1.4 1.4 0 017 3.8z" fill="none" stroke={ink} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M13.2 3.8V8h4.6" stroke={ink} strokeWidth="1.35" strokeLinejoin="round" fill="none" />
          <path d="M8.5 12h5.5M8.5 15h5.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="16.2" cy="16.2" r="3" fill={c.accent} />
          <path d="M16.2 14.7v3M14.7 16.2h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    case "head":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M4.2 19.2 6.5 10.2 12 5.5l5.5 4.7 2.3 9H4.2z" fill={c.fill} />
          <path d="M4.2 19.2 6.5 10.2 12 5.5l5.5 4.7 2.3 9H4.2z" fill="none" stroke={ink} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M12 5.5V2.8" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="12" cy="2.4" r="1.2" fill={c.accent} />
          <path d="M8.2 14h7.6M9.5 16.8h5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
    case "coach":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <circle cx="12" cy="7.2" r="3.2" fill={c.fill} />
          <path d="M5.2 19.2c1.5-3.8 4-5.8 6.8-5.8s5.3 2 6.8 5.8" fill={c.accent} opacity="0.85" />
          <circle cx="12" cy="7.2" r="3.2" fill="none" stroke={ink} strokeWidth="1.35" />
          <path d="M5.2 19.2c1.5-3.8 4-5.8 6.8-5.8s5.3 2 6.8 5.8" fill="none" stroke={ink} strokeWidth="1.35" strokeLinecap="round" />
          <path d="M8.4 13.2 7 11.2l2-.4M15.6 13.2 17 11.2l-2-.4" stroke={c.fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      );
    case "passion":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M12 19.5s-7.2-4.4-7.2-9A4.2 4.2 0 0112 6.5a4.2 4.2 0 017.2 4c0 4.6-7.2 9-7.2 9z" fill={c.fill} />
          <path d="M12 19.5s-7.2-4.4-7.2-9A4.2 4.2 0 0112 6.5a4.2 4.2 0 017.2 4c0 4.6-7.2 9-7.2 9z" fill="none" stroke={ink} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M9.2 10.8c.5-.8 1.3-1.2 2.2-1.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </>
      );
    case "secret":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <rect x="4.5" y="10" width="15" height="10" rx="2.2" fill={c.fill} />
          <rect x="4.5" y="10" width="15" height="10" rx="2.2" fill="none" stroke={ink} strokeWidth="1.35" />
          <path d="M8 10V7.4a4 4 0 018 0V10" fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="12" cy="14.8" r="1.7" fill={c.accent} />
          <path d="M12 16.4v2" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    case "story":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M4.5 5h6A3 3 0 0113.5 8v11.5l-3-2-3 2V8A3 3 0 014.5 5z" fill={c.fill} />
          <path d="M13.5 5H19v14.5l-2.8-1.9-2.7 1.9V8A3 3 0 0013.5 5z" fill={c.accent} opacity="0.85" />
          <path d="M4.5 5h6A3 3 0 0113.5 8v11.5l-3-2-3 2V8A3 3 0 014.5 5z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M13.5 5H19v14.5l-2.8-1.9-2.7 1.9V8A3 3 0 0013.5 5z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M7 9.5h3M7 12h3" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
        </>
      );
    case "bulb":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M8.4 10a3.6 3.6 0 117.2 0c0 2-1.1 3.1-2.1 4.1-.5.5-.7 1-.7 1.6h-1.6c0-.6-.2-1.1-.7-1.6-1-1-2.1-2.1-2.1-4.1z" fill={c.fill} />
          <path d="M8.4 10a3.6 3.6 0 117.2 0c0 2-1.1 3.1-2.1 4.1-.5.5-.7 1-.7 1.6h-1.6c0-.6-.2-1.1-.7-1.6-1-1-2.1-2.1-2.1-4.1z" fill="none" stroke={ink} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M10.2 18h3.6M10.8 20.5h2.4" stroke={ink} strokeWidth="1.35" strokeLinecap="round" />
          <path d="M12 3.5v1.4M18 6.5l-1.1 1.1M6 6.5l1.1 1.1" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    case "sound":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M4.5 9.2v5.6h3l4.2 3.1V6.1L7.5 9.2H4.5z" fill={c.fill} />
          <path d="M4.5 9.2v5.6h3l4.2 3.1V6.1L7.5 9.2H4.5z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M15.2 8a3.6 3.6 0 010 8" fill="none" stroke={c.accent} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M17.8 5.6a6.2 6.2 0 010 12.8" fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
    case "write":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M4 20h16" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6.5 15.2 15.5 6.2a1.9 1.9 0 012.7 2.7L9.2 18l-4 1.1 1.3-3.9z" fill={c.fill} />
          <path d="M6.5 15.2 15.5 6.2a1.9 1.9 0 012.7 2.7L9.2 18l-4 1.1 1.3-3.9z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M14 7.8l2.7 2.7" stroke={ink} strokeWidth="1.3" />
          <circle cx="18.5" cy="5" r="1.5" fill={c.accent} />
        </>
      );
    case "group":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <circle cx="8" cy="8.5" r="2.6" fill={c.fill} />
          <circle cx="16" cy="8.5" r="2.6" fill={c.accent} />
          <path d="M3.5 19c1-3.2 2.8-4.8 4.5-4.8S11 15.8 12 19" fill="none" stroke={ink} strokeWidth="1.35" strokeLinecap="round" />
          <path d="M12 19c1-3.2 2.8-4.8 4.5-4.8S20 15.8 21 19" fill="none" stroke={ink} strokeWidth="1.35" strokeLinecap="round" />
          <circle cx="12" cy="12.8" r="1.5" fill="#F5C542" />
        </>
      );
    case "cert":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <rect x="4.8" y="3.8" width="14.4" height="12.2" rx="2" fill={c.fill} />
          <rect x="4.8" y="3.8" width="14.4" height="12.2" rx="2" fill="none" stroke={ink} strokeWidth="1.3" />
          <path d="M8 8.2h8M8 11.2h5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M9.5 16 12 20.2 14.5 16" fill={c.accent} stroke={ink} strokeWidth="1.25" strokeLinejoin="round" />
          <circle cx="12" cy="13.5" r="1.3" fill="white" />
        </>
      );
    case "play":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <circle cx="12" cy="12" r="7.5" fill={c.fill} />
          <circle cx="12" cy="12" r="7.5" fill="none" stroke={ink} strokeWidth="1.35" />
          <path d="M10.2 8.8v6.4L15.8 12 10.2 8.8z" fill="white" stroke={ink} strokeWidth="1.2" strokeLinejoin="round" />
        </>
      );
    case "cards":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <rect x="8" y="5.5" width="10" height="14" rx="1.6" fill={c.accent} opacity="0.7" />
          <rect x="4.5" y="4" width="10" height="14" rx="1.6" fill={c.fill} />
          <rect x="4.5" y="4" width="10" height="14" rx="1.6" fill="none" stroke={ink} strokeWidth="1.3" />
          <rect x="8" y="5.5" width="10" height="14" rx="1.6" fill="none" stroke={ink} strokeWidth="1.25" />
          <path d="M7 8h5M7 11h5M7 14h3.2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
        </>
      );
    case "blend":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <rect x="3.8" y="5" width="7" height="14" rx="1.6" fill={c.fill} />
          <rect x="13.2" y="5" width="7" height="14" rx="1.6" fill={c.accent} />
          <rect x="3.8" y="5" width="7" height="14" rx="1.6" fill="none" stroke={ink} strokeWidth="1.3" />
          <rect x="13.2" y="5" width="7" height="14" rx="1.6" fill="none" stroke={ink} strokeWidth="1.3" />
          <path d="M5.8 9.5h3M5.8 13h3M15.2 9.5h3M15.2 13h3" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.4" fill="#F5C542" stroke={ink} strokeWidth="1" />
        </>
      );
    case "sheet":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M6.5 3.5h7L18 8v12a1.4 1.4 0 01-1.4 1.4H6.5A1.4 1.4 0 015.1 20V4.9A1.4 1.4 0 016.5 3.5z" fill={c.fill} />
          <path d="M6.5 3.5h7L18 8v12a1.4 1.4 0 01-1.4 1.4H6.5A1.4 1.4 0 015.1 20V4.9A1.4 1.4 0 016.5 3.5z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M13.5 3.5V8H18" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" fill="none" />
          <path d="M8.5 11.5h7M8.5 15h7M8.5 18.2h4" stroke={c.accent} strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
    case "steps":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M4 19h5v-4h4.5v-4H19V6.5" fill={c.fill} opacity="0.35" />
          <path d="M4 19h5v-4h4.5v-4H19V6.5" fill="none" stroke={ink} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="4" cy="19" r="1.6" fill={c.fill} stroke={ink} strokeWidth="1" />
          <circle cx="9" cy="15" r="1.4" fill={c.accent} stroke={ink} strokeWidth="1" />
          <circle cx="13.5" cy="11" r="1.4" fill="#F5C542" stroke={ink} strokeWidth="1" />
          <circle cx="19" cy="6.5" r="1.6" fill={c.fill} stroke={ink} strokeWidth="1" />
        </>
      );
    case "tricky":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M7.2 8.5h9.6l-1.1 11.2H8.3L7.2 8.5z" fill={c.fill} />
          <path d="M7.2 8.5h9.6l-1.1 11.2H8.3L7.2 8.5z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M9 8.5V6.9a3 3 0 016 0v1.6" fill="none" stroke={ink} strokeWidth="1.35" strokeLinecap="round" />
          <path d="M10.5 13h3M12 13v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="18.2" r="1" fill={c.accent} />
        </>
      );
    case "bank":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M3.8 9.5 12 4.8l8.2 4.7V12H3.8V9.5z" fill={c.fill} />
          <path d="M3.8 9.5 12 4.8l8.2 4.7V12H3.8V9.5z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M6.2 12.5v5.5M12 12.5v5.5M17.8 12.5v5.5M3.8 18h16.4" stroke={ink} strokeWidth="1.35" strokeLinecap="round" />
          <circle cx="12" cy="8.2" r="1.4" fill={c.accent} />
        </>
      );
    case "notes":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <rect x="5.5" y="3.5" width="13" height="17" rx="2" fill={c.fill} />
          <rect x="5.5" y="3.5" width="13" height="17" rx="2" fill="none" stroke={ink} strokeWidth="1.3" />
          <path d="M5.5 7h13" stroke={ink} strokeWidth="1.25" />
          <path d="M9 11h6M9 14.5h6M9 18h4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="16.5" cy="18" r="1.3" fill={c.accent} />
        </>
      );
    case "share":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <circle cx="7" cy="12" r="2.6" fill={c.fill} />
          <circle cx="17" cy="6.8" r="2.6" fill={c.accent} />
          <circle cx="17" cy="17.2" r="2.6" fill="#F5C542" />
          <path d="M9.3 10.9 14.6 7.8M9.3 13.1l5.3 3.1" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
    case "map":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M4.5 7.5 9.5 5.5 14.5 8 19.5 6v12.5l-5 2-5-2.5-5 2V7.5z" fill={c.fill} />
          <path d="M4.5 7.5 9.5 5.5 14.5 8 19.5 6v12.5l-5 2-5-2.5-5 2V7.5z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M9.5 5.5v12M14.5 8v12.5" stroke={ink} strokeWidth="1.25" />
          <circle cx="12" cy="12" r="1.5" fill={c.accent} />
        </>
      );
    case "pin":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M12 20.5s-6-4.2-6-9a6 6 0 1112 0c0 4.8-6 9-6 9z" fill={c.fill} />
          <path d="M12 20.5s-6-4.2-6-9a6 6 0 1112 0c0 4.8-6 9-6 9z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <circle cx="12" cy="11" r="2.2" fill="white" stroke={ink} strokeWidth="1.2" />
        </>
      );
    case "calendar":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <rect x="4.5" y="6" width="15" height="14" rx="2.2" fill={c.fill} />
          <rect x="4.5" y="6" width="15" height="14" rx="2.2" fill="none" stroke={ink} strokeWidth="1.3" />
          <path d="M4.5 10.5h15" stroke={ink} strokeWidth="1.25" />
          <path d="M8 4.2v3.2M16 4.2v3.2" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="8.5" cy="14" r="1.2" fill={c.accent} />
          <circle cx="12" cy="14" r="1.2" fill="white" />
          <circle cx="15.5" cy="14" r="1.2" fill="white" />
        </>
      );
    case "camera":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M4.5 9.5h3l1.5-2h6l1.5 2H19.5v9.5a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5V9.5z" fill={c.fill} />
          <path d="M4.5 9.5h3l1.5-2h6l1.5 2H19.5v9.5a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5V9.5z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <circle cx="12" cy="14" r="3.2" fill={c.accent} />
          <circle cx="12" cy="14" r="3.2" fill="none" stroke={ink} strokeWidth="1.25" />
          <circle cx="12" cy="14" r="1.4" fill="white" />
        </>
      );
    case "school":
      return (
        <>
          <circle cx="12" cy="12" r="10" fill={c.soft} />
          <path d="M3.5 11 12 5.5 20.5 11v1.5H3.5V11z" fill={c.fill} />
          <path d="M3.5 11 12 5.5 20.5 11v1.5H3.5V11z" fill="none" stroke={ink} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M6 12.5V19h4.5v-4h3v4H18v-6.5" fill={c.accent} opacity="0.85" />
          <path d="M6 12.5V19h4.5v-4h3v4H18v-6.5" fill="none" stroke={ink} strokeWidth="1.25" strokeLinejoin="round" />
          <circle cx="12" cy="9.5" r="1.2" fill="white" />
        </>
      );
    default:
      return null;
  }
}

export function PitchIcon({
  name,
  className = "h-8 w-8",
}: {
  name: PitchIconName;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {buildIcon(name)}
    </svg>
  );
}

export function IconBadge({
  name,
  className = "",
  size = "md",
}: {
  name: PitchIconName;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const box =
    size === "sm" ? "h-11 w-11" : size === "lg" ? "h-16 w-16" : "h-14 w-14";
  const icon =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_6px_0_0_rgba(182,106,203,0.18)] ${box} ${className}`}
    >
      <PitchIcon name={name} className={icon} />
    </div>
  );
}
