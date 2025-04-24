export interface iAlert {
  // This is the same as the MUI AlertColor interface, but it's short and gains clarity from being explicitly stated here for reference
  severity: "info" | "success" | "warning" | "error";
  message: string;
}

export interface iAlertContainer {
  alerts: iAlert[];
}
