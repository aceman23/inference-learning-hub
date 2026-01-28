# Quick Start: Adding Diagrams to Course Sections

## Step-by-Step Guide

### 1. Access the Diagram Manager

**Two ways to access:**
- From Admin Dashboard: Click "Manage Diagrams" button
- Direct URL: Navigate to `/admin/diagrams`

### 2. Prepare Your Image

You need to host your image online first. Here are the fastest options:

#### Option A: Imgur (Recommended - Easiest)

1. Go to [imgur.com](https://imgur.com)
2. Click "New post" (no account needed!)
3. Drag and drop your image or click to upload
4. Right-click the uploaded image
5. Select "Copy image address"
6. You'll get a URL like: `https://i.imgur.com/abc123.png`

✅ **This is ready to use!**

#### Option B: GitHub

1. Go to your GitHub repository
2. Navigate to where you want to store the image
3. Click "Add file" → "Upload files"
4. Upload your image
5. View the image in GitHub
6. Click "Raw" button
7. Copy the URL from address bar
8. You'll get: `https://raw.githubusercontent.com/username/repo/main/image.png`

✅ **This is ready to use!**

#### Option C: Google Drive

1. Upload image to Google Drive
2. Right-click the image → "Get link"
3. Set permissions to "Anyone with the link can view"
4. Copy the link (looks like: `https://drive.google.com/file/d/1ABC...XYZ/view`)
5. Extract the FILE_ID (the long string between `/d/` and `/view`)
6. Convert to direct link: `https://drive.google.com/uc?id=FILE_ID`

Example:
- ❌ Original: `https://drive.google.com/file/d/1ABC...XYZ/view`
- ✅ Convert to: `https://drive.google.com/uc?id=1ABC...XYZ`

### 3. Add Diagram in Platform

1. In Diagram Manager, find your target section
2. Click "Add Diagram" button
3. Fill in the form:

   **Title*** (Required)
   ```
   Example: "Disaggregation Architecture Overview"
   ```

   **Image URL*** (Required)
   ```
   Paste your image URL from Step 2
   Example: https://i.imgur.com/abc123.png
   ```

   **Description** (Optional)
   ```
   Example: "This diagram shows how prefill and decode clusters are separated"
   ```

   **Display Order** (Optional, default: 0)
   ```
   0 = First, 1 = Second, 2 = Third, etc.
   Use if adding multiple diagrams to same section
   ```

4. Click "Save Diagram"

### 4. Verify Display

1. Navigate to the course as a student (or log out of admin and view course)
2. Go to the section where you added the diagram
3. The diagram should appear in the content
4. If you see "Failed to load image":
   - Check that URL is correct
   - Verify image is publicly accessible
   - Try opening URL in new browser tab
   - Make sure URL ends with image extension (.png, .jpg, etc.)

## Common Issues and Solutions

### Issue: "Failed to load image"

**Causes:**
- URL is not a direct image link
- Image requires authentication
- Image was deleted from hosting service
- URL has typo

**Solutions:**
1. Open the URL in a new browser tab
2. Should see ONLY the image (no webpage around it)
3. URL should end with `.png`, `.jpg`, `.gif`, or `.svg`
4. Try right-clicking the image → "Copy image address" again

### Issue: Google Drive image not showing

**Problem:** Google Drive URLs need special format

**Solution:**
- Don't use: `https://drive.google.com/file/d/FILE_ID/view`
- Use instead: `https://drive.google.com/uc?id=FILE_ID`

### Issue: Image too large or too small

**Solution:**
- Images automatically scale to fit container
- Recommended width: 800-1200 pixels
- Can resize image before uploading
- Most image editors or online tools (like [ResizeImage.net](https://resizeimage.net/)) can help

### Issue: Image appears blurry

**Solution:**
- Use higher resolution image
- PNG format for diagrams (better quality)
- Avoid over-compressing when saving

## Tips for Best Results

### Image Quality
- **Resolution**: 1200px wide is ideal
- **Format**: PNG for diagrams, JPG for photos
- **File size**: Keep under 2MB for fast loading
- **Aspect ratio**: 16:9 or 4:3 works well

### Diagram Design
- **Clarity**: Ensure text is readable
- **Contrast**: Use dark text on light background (or vice versa)
- **Labels**: Clearly label all components
- **Simplicity**: One concept per diagram

### Organization
- **Relevant sections only**: Don't add diagrams everywhere
- **Logical order**: If multiple diagrams, order them logically
- **Descriptive titles**: Help students understand what they're viewing
- **Captions**: Use description field to provide context

## Example: Adding an Architecture Diagram

Let's say you want to add a diagram showing disaggregated architecture to Module 3:

1. **Create or find the diagram**
   - Create in PowerPoint, draw.io, or Figma
   - Export as PNG (1200x800px)

2. **Upload to Imgur**
   - Go to imgur.com
   - Upload your PNG
   - Copy image address: `https://i.imgur.com/xyz789.png`

3. **Add in Platform**
   - Go to `/admin/diagrams`
   - Find "Module 3: Core Content - Disaggregated Inference Deep Dive"
   - Click "Add Diagram"
   - Title: "Disaggregated Architecture Diagram"
   - URL: `https://i.imgur.com/xyz789.png`
   - Description: "Shows the separation of prefill and decode clusters with KV cache transfer"
   - Order: 0 (first diagram)
   - Click "Save Diagram"

4. **Verify**
   - View course section
   - Diagram appears after the main content
   - Students can see it immediately

## Managing Existing Diagrams

### Edit a Diagram
1. Find diagram in Diagram Manager
2. Click pencil icon (✏️)
3. Update any fields
4. Click "Save Changes"

### Delete a Diagram
1. Find diagram in Diagram Manager
2. Click trash icon (🗑️)
3. Confirm deletion
4. Diagram is removed immediately

### Reorder Diagrams
1. Edit the diagram
2. Change "Display Order" number
3. Lower numbers appear first (0, 1, 2, etc.)
4. Save changes

## Quick Reference: Image Hosting URLs

| Service | URL Format | Example |
|---------|-----------|---------|
| Imgur | `https://i.imgur.com/[ID].png` | `https://i.imgur.com/abc123.png` |
| GitHub | `https://raw.githubusercontent.com/[user]/[repo]/[branch]/[path]` | `https://raw.githubusercontent.com/user/repo/main/diagram.png` |
| Google Drive | `https://drive.google.com/uc?id=[FILE_ID]` | `https://drive.google.com/uc?id=1ABC...XYZ` |

## Need Help?

If you're having trouble:

1. **Test the URL**: Open it in a new browser tab - you should see ONLY the image
2. **Check the format**: URL must end with `.png`, `.jpg`, `.gif`, or `.svg`
3. **Try Imgur**: If other services aren't working, Imgur is the most reliable
4. **Browser console**: Open browser dev tools (F12) to see error messages

## Next Steps

Once you've added diagrams:
- View them in the course to ensure they display correctly
- Get feedback from students on clarity
- Update or replace diagrams as needed
- Consider adding diagrams to all major conceptual sections

Happy diagramming! 📊
