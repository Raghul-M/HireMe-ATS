# Resume Templates

This folder contains the free ATS-optimized resume templates that users can download from the HireMe app.

## Current Templates

### 1. Professional Modern
- **File**: `professional-modern.zip`
- **Contents**: PDF + DOCX versions
- **Target**: Tech and business roles
- **Description**: Clean and modern design perfect for tech and business roles

### 2. ATS Optimized Classic  
- **File**: `ats-classic.zip`
- **Contents**: PDF + DOCX versions
- **Target**: All industries
- **Description**: Traditional format that passes all ATS systems with high scores

### 3. Tech Developer
- **File**: `tech-developer.zip` 
- **Contents**: PDF + DOCX versions
- **Target**: Software developers
- **Description**: Developer-focused template with sections for projects and technical skills

## File Structure

Each template should be packaged as a ZIP file containing:
```
template-name.zip
├── template-name.pdf      # PDF version for viewing/printing
├── template-name.docx     # DOCX version for editing
└── README.txt             # Usage instructions
```

## Adding New Templates

1. Create the template files (PDF + DOCX)
2. Package them in a ZIP file with the naming convention: `template-name.zip`
3. Update the Templates page in `frontend/src/pages/Templates.tsx` to include the new template
4. Update the download counts and stats accordingly

## Template Guidelines

- **ATS-Friendly**: Use standard fonts (Arial, Calibri, Times New Roman)
- **Clean Layout**: Clear sections and proper spacing
- **Keywords**: Include relevant industry keywords
- **Format**: Both PDF and DOCX versions
- **Size**: Keep file sizes under 5MB per template

## Usage Instructions for Users

1. Download the template ZIP file
2. Extract the contents
3. Upload the PDF or DOCX to Canva
4. Edit and customize as needed
5. Export your final resume

## Download URLs

Templates are served from GitHub raw URLs:
- `https://github.com/Raghul-M/HireMe-ATS/raw/main/templates/[template-name].zip` 