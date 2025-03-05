import React from 'react';
import Step from '../ui/step';
// import { BlockAnimatedCard } from './ClientOnly/BlockAnimatedCard';
// Import CommonJS icon data
import { Icon } from '@iconify/react';
import html5 from '@iconify/icons-devicon/html5';
import vuetify from '@iconify/icons-devicon/vuetify';
import mongodb from '@iconify/icons-devicon/mongodb';
import css3 from '@iconify/icons-devicon/css3';
import javascript from '@iconify/icons-devicon/javascript';
import typescript from '@iconify/icons-devicon/typescript';
import nuxtjs from '@iconify/icons-devicon/nuxtjs';
import react from '@iconify/icons-devicon/react';
import reactNative from '@iconify/icons-vscode-icons/file-type-reactts';
import redux from '@iconify/icons-devicon/redux';
import vuejs from '@iconify/icons-devicon/vuejs';
import vite from '@iconify/icons-devicon/vitejs';
import vitest from '@iconify/icons-devicon/vitest';
import tailwind from '@iconify/icons-devicon/tailwindcss';
import sass from '@iconify/icons-devicon/sass';
import nodejs from '@iconify/icons-devicon/nodejs';
import php from '@iconify/icons-devicon/php';
import mysql from '@iconify/icons-devicon/mysql';
import wordpress from '@iconify/icons-skill-icons/wordpress';
import figma from '@iconify/icons-devicon/figma';
import photoshop from '@iconify/icons-logos/adobe-photoshop';
import github from '@iconify/icons-skill-icons/github-light';
import npm from '@iconify/icons-devicon/npm-wordmark';
import notion from '@iconify/icons-devicon/notion';
import pinia from '@iconify/icons-logos/pinia';
import nextjs from '@iconify/icons-logos/nextjs-icon';
import firebase from '@iconify/icons-vscode-icons/file-type-light-firebasehosting';
import elastic from '@iconify/icons-vscode-icons/file-type-elastic';

const skills = [
  'Vue2, Nuxtjs, Vue3, Next3, và hệ sinh thái Vue (Vuetify, VueUse, Primevue, Pinia, Vuex, v.v.)',
  'ReactJS, Nextjs, Redux, Shadcn, GSAP, framer-motion',
  'TypeScript, Tailwind CSS, Sass, Styled Components, Figma, Photoshop',
  'React Native, Capacitor',
  'Kinh nghiệm làm việc với Express(Nodejs) + MongodDB, PHP - Lavarel + mySQL, WordPress',
  'Notion/Notion Database, Elastic Search, Firebase, GTM',
  'Thành thạo GitHub (version control, collaboration, và quy trình CI/CD)',
  'Thông thạo xuất bản các module NPM (xây dựng, versioning, và bảo trì gói), kinh nghiệm làm việc với Vite',
  'Kiến trúc Microservices cho Frontend',
  'Hiểu biết và có kinh nghiệm làm việc với Webhooks, Server-Sent Events (SSE), WebSockets, RESTful API, và JSON Web Token (JWT)',
];
const techIcons = [
  html5,
  css3,
  javascript,
  typescript,
  nuxtjs,
  vuejs,
  react,
  nextjs,
  reactNative,
  redux,
  tailwind,
  sass,
  nodejs,
  mongodb,
  php,
  vuetify,
  mysql,
  wordpress,
  figma,
  photoshop,
  github,
  npm,
  vite,
  vitest,
  pinia,
  firebase,
  elastic,
  notion,
];

const SkillsSection = () => {
  return (
    <div className="max-w-6xl w-full mx-auto">
      <h1 className="sm:text-4xl text-2xl font-bold">Kỹ Năng 🚀</h1>
      <div className="grid sm:grid-cols-2 grid-cols-1">
        <ul className="mt-4">
          {skills.map((skill, index) => (
            <li key={index} className="my-3 leading-normal">
              <Step title={skill} />
            </li>
          ))}
        </ul>
        <div className="w-full flex flex-col items-center justify-center">
          {/* <BlockAnimatedCard /> */}
          <div className="grid grid-cols-6 gap-6">
            {techIcons.map((icon, index) => (
              <div key={index}>
                <Icon icon={icon} width="45" height="45" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
