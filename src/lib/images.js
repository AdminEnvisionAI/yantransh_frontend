const modules = import.meta.glob('../assets/*', { eager: true });

const imageMap = {};
for (const [path, mod] of Object.entries(modules)) {
  const filename = path.replace('../assets/', '');
  imageMap[filename] = mod.default || mod;
}

export function getImage(filename) {
  if (!filename) return '';
  return imageMap[filename] || '';
}
