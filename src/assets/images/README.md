# Photo Gallery Assets 📸

Drop your personal photos with your girlfriend here!

### Recommended Photo Names:
- `photo1.jpg` (or `.png`, `.webp`)
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`
- `photo5.jpg`
- `photo6.jpg`
- `photo7.jpg`
- `photo8.jpg`

### How to use your own photos in the website:
In `src/components/Memories.jsx`, you can import your photos directly:

```javascript
import photo1 from '../assets/images/photo1.jpg';
import photo2 from '../assets/images/photo2.jpg';
// ...
```

and assign them to the `photos` array:
```javascript
const photos = [
  {
    id: 1,
    image: photo1, // <- Your personal image!
    caption: 'The day it all began ❤️',
    aspect: 'portrait',
  },
  // ...
];
```
Enjoy celebrating your special moments together! ❤️🪔
