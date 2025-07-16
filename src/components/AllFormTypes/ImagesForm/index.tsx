import React, { useState } from 'react';

function ImagePositioner() {
  const [imageSrc, setImageSrc] = useState(null);

  // Handle image upload and convert to base64
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  }; 

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && (
        <div style={{ display: 'flex', flexWrap: 'wrap', width: 420, height: 420, position: 'relative', marginTop: 20 }}>
          {/* Top Left */}
          <img src={imageSrc} alt="Top Left" style={{ position: 'absolute', top: 0, left: 0, width: 200, height: 200, border: '2px solid #333' }} />
          {/* Top Right */}
          <img src={imageSrc} alt="Top Right" style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, border: '2px solid #333' }} />
          {/* Bottom Left */}
          <img src={imageSrc} alt="Bottom Left" style={{ position: 'absolute', bottom: 0, left: 0, width: 200, height: 200, border: '2px solid #333' }} />
          {/* Bottom Right */}
          <img src={imageSrc} alt="Bottom Right" style={{ position: 'absolute', bottom: 0, right: 0, width: 200, height: 200, border: '2px solid #333' }} />
        </div>
      )}
    </div>
  );
}

export default ImagePositioner;
