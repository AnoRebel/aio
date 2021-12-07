const require = name => new URL(name, import.meta.url).href;
const { nord } = require("codemirror-nord-theme");
import { oneDark } from "@codemirror/theme-one-dark";
import { materialLight } from "@ddietr/codemirror-themes/theme/material-light";
import { materialDark } from "@ddietr/codemirror-themes/theme/material-dark";
import { solarizedLight } from "@ddietr/codemirror-themes/theme/solarized-light";
import { solarizedDark } from "@ddietr/codemirror-themes/theme/solarized-dark";
import { dracula } from "@ddietr/codemirror-themes/theme/dracula";
import { githubLight } from "@ddietr/codemirror-themes/theme/github-light";
import { githubDark } from "@ddietr/codemirror-themes/theme/github-dark";
import { aura } from "@ddietr/codemirror-themes/theme/aura";
import { materialPalenight } from "codemirror6-themes";
import { materialDarker } from "codemirror6-themes";
import { duotoneSpaceDark } from "codemirror6-themes";

export {
  oneDark,
  nord,
  materialLight,
  materialDark,
  solarizedLight,
  solarizedDark,
  dracula,
  githubLight,
  githubDark,
  aura,
  materialPalenight,
  materialDarker,
  duotoneSpaceDark,
};
