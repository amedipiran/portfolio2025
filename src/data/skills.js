const devicon = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

export const skillRows = [
  [
    { name: 'Claude', src: 'https://cdn.simpleicons.org/claude/d97757' },
    { name: 'TypeScript', src: devicon('typescript') },
    { name: 'Python', src: devicon('python') },
    { name: 'Node.js', src: devicon('nodejs') },
    { name: 'Cloudflare', src: devicon('cloudflare') },
    { name: 'Google Cloud', src: devicon('googlecloud') },
    { name: 'WooCommerce', src: devicon('woocommerce') },
    { name: 'React', src: devicon('react') },
    { name: 'Vue', src: devicon('vuejs') },
    { name: 'MongoDB', src: devicon('mongodb') },
    { name: 'MySQL', src: devicon('mysql') },
  ],
  [
    { name: 'C#', src: devicon('csharp') },
    { name: '.NET', src: devicon('dotnetcore') },
    { name: 'Java', src: devicon('java') },
    { name: 'PHP', src: devicon('php') },
    { name: 'Laravel', src: devicon('laravel') },
    { name: 'WordPress', src: devicon('wordpress', 'plain') },
    { name: 'JavaScript', src: devicon('javascript') },
    { name: 'Tailwind', src: devicon('tailwindcss') },
    { name: 'Sass', src: devicon('sass') },
    { name: 'Pulumi', src: devicon('pulumi') },
    { name: 'Git', src: devicon('git') },
  ],
];
