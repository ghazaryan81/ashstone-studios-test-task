import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

(async () => {
 await imagemin(["./public/assets/img/articles/*.{jpg,png}"], {
  destination: "./public/assets/img/articles/",
  plugins: [imageminWebp({ quality: 85 })],
 });

 console.log("Images optimized");
})();
