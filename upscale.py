from PIL import Image, ImageEnhance
import sys

def upscale_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Upscale 2x
    width, height = img.size
    new_size = (width * 2, height * 2)
    img = img.resize(new_size, Image.Resampling.LANCZOS)
    
    # Increase sharpness slightly for premium feel
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.5)
    
    # Enhance color slightly
    color_enhancer = ImageEnhance.Color(img)
    img = color_enhancer.enhance(1.1)
    
    img.save(output_path)
    print(f"Upscaled to {new_size[0]}x{new_size[1]} and saved to {output_path}")

if __name__ == "__main__":
    upscale_image(sys.argv[1], sys.argv[2])
