from PIL import Image, ImageOps
import sys

def replace_qr_code(banner_path, qr_path, output_path):
    banner = Image.open(banner_path).convert("RGBA")
    qr = Image.open(qr_path).convert("RGBA")
    
    # Simple heuristic to find the QR code:
    # Look for a dark region on the right side of the image
    width, height = banner.size
    
    # Convert to grayscale to find dark pixels
    gray = banner.convert("L")
    
    # Define search area: right third of the image, middle height
    search_x_start = int(width * 0.6)
    search_x_end = width - 50
    search_y_start = int(height * 0.3)
    search_y_end = int(height * 0.9)
    
    min_x, max_x = width, 0
    min_y, max_y = height, 0
    
    pixels = gray.load()
    
    for y in range(search_y_start, search_y_end):
        for x in range(search_x_start, search_x_end):
            if pixels[x, y] < 50: # Dark pixel
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    qr_w = max_x - min_x
    qr_h = max_y - min_y
    
    print(f"Found QR code region: {min_x}, {min_y} to {max_x}, {max_y} (Size: {qr_w}x{qr_h})")
    
    # If the found region is roughly square and large enough
    if qr_w > 50 and qr_h > 50 and 0.8 < qr_w / qr_h < 1.2:
        # Resize the real QR code to fit the found region
        # Make it slightly smaller to fit nicely in the white box if needed, or exact
        size = max(qr_w, qr_h)
        qr_resized = qr.resize((size, size), Image.Resampling.LANCZOS)
        
        # Paste it
        banner.paste(qr_resized, (min_x, min_y), qr_resized)
        banner.save(output_path)
        print("Success: Replaced QR code.")
    else:
        print("Error: Could not confidently find the QR code region.")

if __name__ == "__main__":
    replace_qr_code("mele_data_ad_banner_premium.png", "real_qr_code.png", "final_banner.png")
