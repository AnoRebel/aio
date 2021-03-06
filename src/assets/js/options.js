import * as themes from "@/assets/js/themes";
import * as languages from "@/assets/js/languages";

const themeOptions = [
  { value: themes.aura, label: "Aura" },
  { value: themes.dracula, label: "Dracula" },
  { value: themes.duotoneSpaceDark, label: "Duotone SpaceDark" },
  { value: themes.githubDark, label: "Github Dark" },
  { value: themes.githubLight, label: "Github Light" },
  { value: themes.materialDark, label: "Material Dark" },
  { value: themes.materialDarker, label: "Material Darker" },
  { value: themes.materialLight, label: "Material Light" },
  { value: themes.materialPalenight, label: "Material PaleNight" },
  { value: themes.nord, label: "Nord" },
  { value: themes.oneDark, label: "One Dark" },
  { value: themes.solarizedDark, label: "Solarized Dark" },
  { value: themes.solarizedLight, label: "Solarized Light" },
];

const languageOptions = [
  { value: languages.cLang, label: "C" },
  { value: languages.cassandraSQL, label: "Cassandra SQL" },
  { value: languages.clikeLang, label: "C-like" },
  { value: languages.csharpLang, label: "c#" },
  { value: languages.clojureLang, label: "Clojure" },
  { value: languages.cmakeLang, label: "CMake" },
  { value: languages.coffeescriptLang, label: "CoffeeScript" },
  { value: languages.commonlispLang, label: "CommonLisp" },
  { value: languages.cpp, label: "cpp" },
  { value: languages.css, label: "CSS" },
  { value: languages.dartLang, label: "Dart" },
  { value: languages.diffLang, label: "Diff" },
  { value: languages.dockerfileLang, label: "Dockerfile" },
  { value: languages.elixirLang, label: "Elixir" },
  { value: languages.elmLang, label: "Elm" },
  { value: languages.erlangLang, label: "Erlang" },
  { value: languages.fortranLang, label: "Fortran" },
  { value: languages.fSharpLang, label: "F#" },
  { value: languages.goLang, label: "Go" },
  { value: languages.GQL, label: "GraphQL" },
  { value: languages.groovyLang, label: "Groovy" },
  { value: languages.haskellLang, label: "Haskell" },
  { value: languages.haxeLang, label: "Haxe" },
  { value: languages.html, label: "Html" },
  { value: languages.httpLang, label: "http" },
  { value: languages.java, label: "Java" },
  { value: languages.javascript, label: "Javascript/TypeScript" },
  { value: languages.jinja2Lang, label: "Jinja2" },
  { value: languages.json, label: "Json" },
  { value: languages.julia, label: "Julia" },
  { value: languages.kotlinLang, label: "Kotlin" },
  { value: languages.lessLang, label: "Less" },
  { value: languages.lezer, label: "Lezer" },
  { value: languages.livescriptLang, label: "LiveScript" },
  { value: languages.luaLang, label: "Lua" },
  { value: languages.markdown, label: "Markdown" },
  { value: languages.mariaSQL, label: "Maria SQL" },
  { value: languages.msSQL, label: "MS SQL" },
  { value: languages.mySQL, label: "MySQL" },
  { value: languages.nginxLang, label: "Nginx" },
  { value: languages.objectiveCLang, label: "Objective C" },
  { value: languages.objectiveCppLang, label: "Objective Cpp" },
  { value: languages.oCamlLang, label: "oCaml" },
  { value: languages.pascalLang, label: "Pascal" },
  { value: languages.perlLang, label: "Perl" },
  { value: languages.php, label: "PHP" },
  { value: languages.plSQL, label: "PLSQL" },
  { value: languages.pgSQL, label: "PostgreSQL" },
  { value: languages.powershellLang, label: "Powershell" },
  { value: languages.python, label: "Python" },
  { value: languages.rLang, label: "R" },
  { value: languages.rubyLang, label: "Ruby" },
  { value: languages.rust, label: "Rust" },
  { value: languages.scalaLang, label: "Scala" },
  { value: languages.schemeLang, label: "Scheme" },
  { value: languages.scssLang, label: "SCSS" },
  { value: languages.shellLang, label: "Shell" },
  { value: languages.solrLang, label: "Solr" },
  { value: languages.spreadsheetLang, label: "Spreadsheet" },
  { value: languages.sql, label: "SQL" },
  { value: languages.sqlite, label: "SQLite" },
  { value: languages.stylusLang, label: "Stylus" },
  { value: languages.swiftLang, label: "Swift" },
  { value: languages.tclLang, label: "Tcl" },
  { value: languages.textileLang, label: "Textile" },
  { value: languages.tomlLang, label: "Toml" },
  { value: languages.vbLang, label: "vb" },
  { value: languages.vbscriptLang, label: "vbScript" },
  { value: languages.wast, label: "Wast" },
  { value: languages.xml, label: "xml" },
  { value: languages.yamlLang, label: "Yaml" },
];

const fileExts = {
  "haskell-literate": "hs",
  groovy: "groovy",
  jsx: "jsx",
  vue: "vue",
  htmlembedded: "html",
  pascal: "pascal",
  css: "css",
  perl: "pl",
  markdown: "md",
  erlang: "erl",
  shell: "sh",
  nginx: "",
  sql: "sql",
  "yaml-frontmatter": "yaml",
  go: "go",
  dockerfile: "",
  dart: "dart",
  ruby: "rb",
  haml: "haml",
  haxe: "hx",
  protobuf: "proto",
  tornado: "py",
  commonlisp: "gcl",
  toml: "toml",
  rust: "rs",
  verilog: "v",
  django: "py",
  coffeescript: "coffee",
  swift: "swift",
  yaml: "yaml",
  htmlmixed: "html",
  php: "php",
  scheme: "ss",
  turtle: "py",
  lua: "lua",
  elm: "elm",
  julia: "jl",
  diff: "diff",
  xml: "xml",
  clojure: "clj",
  twig: "twig",
  vb: "vb",
  jinja2: "jinja2",
  http: "http",
  sass: "sass",
  stylus: "styl",
  livescript: "js",
  properties: "props",
  pug: "pug",
  r: "r",
  javascript: "js",
  spreadsheet: "xlsx",
  tcl: "tcl",
  haskell: "hs",
  vbscript: "vbs",
  handlebars: "hbs",
  textile: "textile",
  powershell: "ps",
  python: "py",
  rst: "rst",
  cmake: "make",
  fortran: "f",
};

export { languageOptions, themeOptions, fileExts };
