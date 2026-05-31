const fs = require('fs');
const data = fs.readFileSync('src/components/TechStack.jsx', 'utf8');
const lines = data.split('\n');

const newLines = [
  'import { FaHtml5, FaCss3Alt, FaReact, FaJava, FaGitAlt, FaGithub } from "react-icons/fa";',
  'import { SiJavascript, SiTailwindcss, SiNextdotjs, SiFramer, SiShadcnui, SiCplusplus, SiC, SiPython, SiFlask, SiFastapi, SiMysql, SiMongodb, SiFirebase, SiNumpy, SiPandas, SiJupyter } from "react-icons/si";',
  'import { VscVscode } from "react-icons/vsc";',
  '',
  'const iconClass = "w-5 h-5";',
  '',
  'const ICONS = {',
  '  html: <FaHtml5 className={iconClass} color="#E34F26" />,\n  css: <FaCss3Alt className={iconClass} color="#1572B6" />,\n  js: <SiJavascript className={iconClass} color="#F7DF1E" />,\n  tailwind: <SiTailwindcss className={iconClass} color="#38BDF8" />,\n  react: <FaReact className={`${iconClass} animate-[spin_12s_linear_infinite]`} color="#61DAFB" />,\n  nextjs: <SiNextdotjs className={iconClass} color="#FFFFFF" />,\n  framer: <SiFramer className={iconClass} color="#0055FF" />,\n  shadcn: <SiShadcnui className={iconClass} color="#FFFFFF" />,\n  java: <FaJava className={iconClass} color="#F89820" />,\n  cpp: <SiCplusplus className={iconClass} color="#00599C" />,\n  c: <SiC className={iconClass} color="#A8B9CC" />,\n  python: <SiPython className={iconClass} color="#3776AB" />,\n  flask: <SiFlask className={iconClass} color="#FFFFFF" />,\n  fastapi: <SiFastapi className={iconClass} color="#009688" />,\n  mysql: <SiMysql className={iconClass} color="#00758F" />,\n  mongodb: <SiMongodb className={iconClass} color="#47A248" />,\n  firebase: <SiFirebase className={iconClass} color="#FFCA28" />,\n  numpy: <SiNumpy className={iconClass} color="#013243" />,\n  pandas: <SiPandas className={iconClass} color="#150458" />,\n  jupyter: <SiJupyter className={iconClass} color="#F37626" />,\n  vscode: <VscVscode className={iconClass} color="#007ACC" />,\n  git: <FaGitAlt className={iconClass} color="#F05032" />,\n  github: <FaGithub className={iconClass} color="#FFFFFF" />\n};'
];

const finalLines = lines.slice(0, 2).concat(newLines).concat(lines.slice(141));
fs.writeFileSync('src/components/TechStack.jsx', finalLines.join('\n'));
