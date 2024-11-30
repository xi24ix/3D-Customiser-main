import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#A865B5',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  designPreview: null, // Store the design preview for checkout
  uploadedFile: null, // Store the uploaded file information
  logoPosition: { x: 0, y: 0 }, // Position of the logo
  logoScale: 1, // Scale of the logo
});
  
export default state;