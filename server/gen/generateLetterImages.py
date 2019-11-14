import string, os
from PIL import Image, ImageFont, ImageDraw

# using python 3.7.3
# using varela round font (license http://scripts.sil.org/OFL) (download https://www.fontsquirrel.com/fonts/varela-round)

for i, l in enumerate(list(string.ascii_uppercase)):
  x, y = (1280, 720)
  img = Image.new(mode = 'RGB', size = (x, y), color = (248, 249, 250))

  font = ImageFont.truetype(font = 'gen/varela-round.ttf', size = 600)
  draw = ImageDraw.Draw(img, mode = 'RGB')

  top = y / 2 - draw.textsize(l, font = font)[1] / 2 - 60
  left = x / 2 - draw.textsize(l, font = font)[0] / 2
  draw.text(xy = (left, top), text = l, fill = (0, 0, 0), font = font)

  filename = os.path.join('gen/letterImages', string.ascii_lowercase[i] + '.jpg')
  img.save(filename)
