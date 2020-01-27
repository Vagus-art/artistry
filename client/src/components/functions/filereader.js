const readImage = (file) =>{
  const img = document.createElement("img");
  const reader = new FileReader();
  reader.onloadend = function() {
          img.src = reader.result;
  }
  reader.readAsDataURL(file);
  return img;
}

export default readImage;
