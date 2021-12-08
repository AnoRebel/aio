import { cpp } from "@codemirror/lang-cpp";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { java } from "@codemirror/lang-java";
import { php } from "@codemirror/lang-php";
import { markdown } from "@codemirror/lang-markdown";
import { lezer } from "@codemirror/lang-lezer";
import { rust } from "@codemirror/lang-rust";
import { python } from "@codemirror/lang-python";
import { GQL } from "@restbox/graphql";
import {
  sql,
  Cassandra,
  MSSQL,
  MariaSQL,
  MySQL,
  PLSQL,
  PostgreSQL,
  SQLite,
} from "@codemirror/lang-sql";
import { wast } from "@codemirror/lang-wast";
import { xml } from "@codemirror/lang-xml";
// Stream Parser
import { StreamLanguage } from "@codemirror/stream-parser";
// Legacy Modes
import { elixir } from "codemirror-lang-elixir";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import {
  clike,
  c,
  csharp,
  scala,
  kotlin,
  objectiveC,
  objectiveCpp,
  dart,
} from "@codemirror/legacy-modes/mode/clike";
import { cmake } from "@codemirror/legacy-modes/mode/cmake";
import { clojure } from "@codemirror/legacy-modes/mode/clojure";
import { coffeeScript } from "@codemirror/legacy-modes/mode/coffeescript";
import { sCSS, less } from "@codemirror/legacy-modes/mode/css";
import { commonLisp } from "@codemirror/legacy-modes/mode/commonlisp";
import { diff } from "@codemirror/legacy-modes/mode/diff";
import { dockerFile } from "@codemirror/legacy-modes/mode/dockerfile";
import { elm } from "@codemirror/legacy-modes/mode/elm";
import { erlang } from "@codemirror/legacy-modes/mode/erlang";
import { fortran } from "@codemirror/legacy-modes/mode/fortran";
import { go } from "@codemirror/legacy-modes/mode/go";
import { haskell } from "@codemirror/legacy-modes/mode/haskell";
import { haxe } from "@codemirror/legacy-modes/mode/haxe";
import { http } from "@codemirror/legacy-modes/mode/http";
import { groovy } from "@codemirror/legacy-modes/mode/groovy";
import { jinja2 } from "@codemirror/legacy-modes/mode/jinja2";
import { julia } from "@codemirror/legacy-modes/mode/julia";
import { liveScript } from "@codemirror/legacy-modes/mode/livescript";
import { oCaml, fSharp } from "@codemirror/legacy-modes/mode/mllike";
import { nginx } from "@codemirror/legacy-modes/mode/nginx";
import { pascal } from "@codemirror/legacy-modes/mode/pascal";
import { perl } from "@codemirror/legacy-modes/mode/perl";
import { powerShell } from "@codemirror/legacy-modes/mode/powershell";
import { r } from "@codemirror/legacy-modes/mode/r";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { scheme } from "@codemirror/legacy-modes/mode/scheme";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { solr } from "@codemirror/legacy-modes/mode/solr";
import { spreadsheet } from "@codemirror/legacy-modes/mode/spreadsheet";
import { stylus } from "@codemirror/legacy-modes/mode/stylus";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { tcl } from "@codemirror/legacy-modes/mode/tcl";
import { textile } from "@codemirror/legacy-modes/mode/textile";
import { toml } from "@codemirror/legacy-modes/mode/toml";
import { vb } from "@codemirror/legacy-modes/mode/vb";
import { vbScript } from "@codemirror/legacy-modes/mode/vbscript";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";

const elixirLang = StreamLanguage.define(elixir);
const luaLang = StreamLanguage.define(lua);
const clikeLang = StreamLanguage.define(clike);
const cLang = StreamLanguage.define(c);
const csharpLang = StreamLanguage.define(csharp);
const scssLang = StreamLanguage.define(sCSS);
const lessLang = StreamLanguage.define(less);
const scalaLang = StreamLanguage.define(scala);
const kotlinLang = StreamLanguage.define(kotlin);
const objectiveCLang = StreamLanguage.define(objectiveC);
const objectiveCppLang = StreamLanguage.define(objectiveCpp);
const dartLang = StreamLanguage.define(dart);
const cmakeLang = StreamLanguage.define(cmake);
const clojureLang = StreamLanguage.define(clojure);
const coffeescriptLang = StreamLanguage.define(coffeeScript);
const commonlispLang = StreamLanguage.define(commonLisp);
const diffLang = StreamLanguage.define(diff);
const dockerfileLang = StreamLanguage.define(dockerFile);
const elmLang = StreamLanguage.define(elm);
const erlangLang = StreamLanguage.define(erlang);
const fortranLang = StreamLanguage.define(fortran);
const goLang = StreamLanguage.define(go);
const haskellLang = StreamLanguage.define(haskell);
const haxeLang = StreamLanguage.define(haxe);
const httpLang = StreamLanguage.define(http);
const groovyLang = StreamLanguage.define(groovy);
const jinja2Lang = StreamLanguage.define(jinja2);
const juliaLang = StreamLanguage.define(julia);
const livescriptLang = StreamLanguage.define(liveScript);
const oCamlLang = StreamLanguage.define(oCaml);
const fSharpLang = StreamLanguage.define(fSharp);
const nginxLang = StreamLanguage.define(nginx);
const pascalLang = StreamLanguage.define(pascal);
const perlLang = StreamLanguage.define(perl);
const powershellLang = StreamLanguage.define(powerShell);
const rLang = StreamLanguage.define(r);
const rubyLang = StreamLanguage.define(ruby);
const schemeLang = StreamLanguage.define(scheme);
const shellLang = StreamLanguage.define(shell);
const solrLang = StreamLanguage.define(solr);
const spreadsheetLang = StreamLanguage.define(spreadsheet);
const stylusLang = StreamLanguage.define(stylus);
const swiftLang = StreamLanguage.define(swift);
const tclLang = StreamLanguage.define(tcl);
const textileLang = StreamLanguage.define(textile);
const tomlLang = StreamLanguage.define(toml);
const vbLang = StreamLanguage.define(vb);
const vbscriptLang = StreamLanguage.define(vbScript);
const yamlLang = StreamLanguage.define(yaml);

// SQL Specifics
const cassandraSQL = sql({ dialect: Cassandra });
const msSQL = sql({ dialect: MSSQL });
const mariaSQL = sql({ dialect: MariaSQL });
const mySQL = sql({ dialect: MySQL });
const plSQL = sql({ dialect: PLSQL });
const pgSQL = sql({ dialect: PostgreSQL });
const sqlite = sql({ dialect: SQLite });

export {
  cpp,
  json,
  html,
  javascript,
  css,
  java,
  GQL,
  php,
  markdown,
  lezer,
  rust,
  python,
  sql,
  wast,
  xml,
  elixirLang,
  luaLang,
  clikeLang,
  cLang,
  csharpLang,
  scalaLang,
  kotlinLang,
  objectiveCLang,
  objectiveCppLang,
  dartLang,
  cmakeLang,
  clojureLang,
  coffeescriptLang,
  commonlispLang,
  scssLang,
  lessLang,
  diffLang,
  dockerfileLang,
  elmLang,
  erlangLang,
  fortranLang,
  goLang,
  haskellLang,
  haxeLang,
  httpLang,
  groovyLang,
  jinja2Lang,
  juliaLang,
  livescriptLang,
  oCamlLang,
  fSharpLang,
  nginxLang,
  pascalLang,
  perlLang,
  powershellLang,
  rLang,
  rubyLang,
  schemeLang,
  shellLang,
  solrLang,
  spreadsheetLang,
  stylusLang,
  swiftLang,
  tclLang,
  textileLang,
  tomlLang,
  vbLang,
  vbscriptLang,
  yamlLang,
  cassandraSQL,
  msSQL,
  mariaSQL,
  mySQL,
  plSQL,
  pgSQL,
  sqlite,
};
