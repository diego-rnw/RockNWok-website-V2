#!/usr/bin/env python3
"""
Create the WOK YOUR SPIRIT hero image with:
- Black basalt granite texture background
- "WOK YOUR SPIRIT" text in center
- Golden maneki cats
"""

from PIL import Image, ImageDraw, ImageFilter
import random
import math

# Image dimensions
width, height = 1920, 1080

# Create image with black background
img = Image.new('RGB', (width, height), color=(20, 20, 20))
pixels = img.load()

# Create granite texture (black basalt)
print("Creating granite texture...")
random.seed(42)
for y in range(height):
    for x in range(width):
        # Mix of dark grays and black for granular effect
        variation = random.randint(-30, 30)
        base_color = 25 + variation
        base_color = max(0, min(255, base_color))
        pixels[x, y] = (base_color, base_color, base_color)

# Apply slight blur for more realistic granite look
img = img.filter(ImageFilter.GaussianBlur(radius=3))

# Add some noise/sparkle to simulate granite crystalline structure
print("Adding granite sparkles...")
draw = ImageDraw.Draw(img, 'RGBA')
for _ in range(5000):
    x = random.randint(0, width)
    y = random.randint(0, height)
    sparkle_color = (
        random.randint(40, 80),
        random.randint(40, 80),
        random.randint(40, 80),
        random.randint(30, 80)
    )
    draw.ellipse([x, y, x+2, y+2], fill=sparkle_color)

# Function to draw a maneki cat (simplified)
def draw_maneki(draw, cx, cy, size, angle=0):
    """Draw a simplified maneki cat"""
    # Body (circle)
    body_color = (255, 215, 0)  # Gold
    draw.ellipse([cx-size, cy-size*0.8, cx+size, cy+size*1.2], fill=body_color, outline=(200, 170, 0))

    # Head (circle on top)
    head_radius = size * 0.6
    draw.ellipse([cx-head_radius, cy-size*1.8, cx+head_radius, cy-size*0.6], fill=body_color, outline=(200, 170, 0))

    # Eyes
    eye_offset = head_radius * 0.4
    eye_radius = head_radius * 0.15
    draw.ellipse([cx-eye_offset-eye_radius, cy-size*1.5-eye_radius,
                  cx-eye_offset+eye_radius, cy-size*1.5+eye_radius], fill=(0, 0, 0))
    draw.ellipse([cx+eye_offset-eye_radius, cy-size*1.5-eye_radius,
                  cx+eye_offset+eye_radius, cy-size*1.5+eye_radius], fill=(0, 0, 0))

    # Smile (arc approximation with small circles)
    for i in range(5):
        offset = (i - 2) * 3
        y_pos = cy - size*1.15 + 5
        draw.ellipse([cx+offset-2, y_pos, cx+offset+2, y_pos+3], fill=(0, 0, 0))

    # Raised paw (circle on right side of body)
    paw_x = cx + size * 0.7
    paw_y = cy - size * 0.2
    draw.ellipse([paw_x-size*0.25, paw_y-size*0.3, paw_x+size*0.25, paw_y+size*0.3],
                 fill=body_color, outline=(200, 170, 0))
    # Paw details
    for i in range(3):
        for j in range(2):
            finger_x = paw_x - size*0.15 + (i * size*0.15)
            finger_y = paw_y - size*0.15 + (j * size*0.1)
            draw.ellipse([finger_x-2, finger_y-2, finger_x+2, finger_y+2], fill=(200, 170, 0))

# Draw maneki cats in corners and strategic positions
print("Drawing golden maneki cats...")
maneki_positions = [
    (150, 200, 80),      # Top left
    (width-150, 200, 80), # Top right
    (150, height-150, 70), # Bottom left
    (width-150, height-150, 70), # Bottom right
    (width//2 - 400, height//2 - 300, 75), # Left center area
    (width//2 + 400, height//2 - 300, 75), # Right center area
]

for cx, cy, size in maneki_positions:
    draw_maneki(draw, cx, cy, size)

# Add text "WOK YOUR SPIRIT"
print("Adding text...")
from PIL import ImageFont

try:
    # Try to use a bold font
    font_size = 120
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
except:
    font = ImageFont.load_default()

text = "WOK YOUR SPIRIT"
text_color = (255, 215, 0)  # Gold
stroke_color = (0, 0, 0)  # Black outline

# Get text bounding box to center it
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]

text_x = (width - text_width) // 2
text_y = (height - text_height) // 2 - 50

# Draw text with outline for better visibility
outline_width = 3
for adj_x in range(-outline_width, outline_width+1):
    for adj_y in range(-outline_width, outline_width+1):
        if adj_x != 0 or adj_y != 0:
            draw.text((text_x+adj_x, text_y+adj_y), text, font=font, fill=stroke_color)

# Draw main text
draw.text((text_x, text_y), text, font=font, fill=text_color)

# Add some decorative elements around the text
print("Adding decorative elements...")
for i in range(-2, 3):
    for j in range(-1, 2):
        if i != 0 or j != 0:
            x = text_x + (i * 80)
            y = text_y + text_height + (j * 80)
            if 0 <= x < width and 0 <= y < height:
                circle_color = (255, 215, 0, 100)
                draw.ellipse([x-15, y-15, x+15, y+15], fill=circle_color)

# Save the image
output_path = "assets/wokyourspirit-hero.png"
img.save(output_path, quality=95)
print(f"✅ Hero image created successfully: {output_path}")
