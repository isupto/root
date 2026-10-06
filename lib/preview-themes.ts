export type PreviewTheme = {
  id: string;
  label: string;
  bg: string;
  surface: string;
  fg: string;
  muted: string;
  line: string;
  accent: string;
  radius: string;
  headingFont: string;
  headingVoice: "casual" | "linear" | "mono";
  bodyVoice: "linear" | "mono";
  layout: "stacked" | "split";
};

const recursive = "var(--font-recursive), ui-sans-serif, system-ui, sans-serif";

export const previewThemes: PreviewTheme[] = [
  {
    id: "studio",
    label: "Studio",
    bg: "#f5f4f8",
    surface: "#ffffff",
    fg: "#1e1a2e",
    muted: "#5b5670",
    line: "#e3dfeb",
    accent: "#6d3fd6",
    radius: "14px",
    headingFont: recursive,
    headingVoice: "casual",
    bodyVoice: "linear",
    layout: "split",
  },
  {
    id: "night",
    label: "Night shift",
    bg: "#0f1a2e",
    surface: "#15233c",
    fg: "#e6edf9",
    muted: "#93a4c3",
    line: "#243553",
    accent: "#6b9bff",
    radius: "6px",
    headingFont: recursive,
    headingVoice: "mono",
    bodyVoice: "mono",
    layout: "stacked",
  },
  {
    id: "journal",
    label: "Journal",
    bg: "#ffffff",
    surface: "#ffffff",
    fg: "#1a1a1a",
    muted: "#5f5f5f",
    line: "#1a1a1a",
    accent: "#2764e7",
    radius: "0px",
    headingFont: "ui-serif, 'Iowan Old Style', 'Palatino Linotype', Georgia, serif",
    headingVoice: "linear",
    bodyVoice: "linear",
    layout: "stacked",
  },
  {
    id: "sherbet",
    label: "Sherbet",
    bg: "#fff1f6",
    surface: "#ffffff",
    fg: "#3b1026",
    muted: "#8a5070",
    line: "#f6cfe0",
    accent: "#c2255c",
    radius: "22px",
    headingFont: recursive,
    headingVoice: "casual",
    bodyVoice: "linear",
    layout: "split",
  },
];
