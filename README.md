## Joulukalenteri ideoita
- GIF 
- luukku luukun sisällä
- minipeli
- vinkkejä
- linkki
- vitsejä
- kysymyksiä
- mahdollisesti video

## Mallikoodi

fetch("data.txt")
  .then(r => r.text())
  .then(text => {
    const lines = text.trim().split("\n");
    const items = [];

    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(";");

      const id = Number(parts[0]);
      const name = parts[1];
      const link = parts[2];

      items.push({ id, name, link });
    }

    console.log(items);
  });
